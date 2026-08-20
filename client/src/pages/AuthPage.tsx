import { Link, useLocation, useNavigate, useOutletContext } from "react-router-dom";
import type { User } from "../types/User.ts";
import { useEffect, useRef, useState } from "react";
import FormInput from "../components/FormInput.tsx";
import FormPasswordInput from "../components/FormPasswordInput.tsx";
import { post } from "../api/requester.ts";
import { endpoints } from "../api/endpoints.ts";
import PageTitle from "../components/PageTitle.tsx";

const AuthPage = () => {
    const { user, setUser }: { user: User | null, setUser: React.Dispatch<React.SetStateAction<User | null>> } = useOutletContext();
    const [isLoginOpen, setIsLoginOpen] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const location = useLocation();
    const navigate = useNavigate();
    const formRef = useRef<HTMLFormElement | null>(null);
    const [loading, setLoading] = useState(false);

    function changeOpenTab(): void {
        setIsLoginOpen(prev => prev = !prev);
        setError(null);
        formRef.current?.reset();
    }

    async function submitForm(e: any) {
        if (loading) {
            return;
        }

        setLoading(true);

        e.preventDefault();
        const formData = new FormData(formRef.current!);

        const email = formData.get("email") as string;
        const username = formData.get("username") as string | null;
        const password = formData.get("password") as string;

        try {
            if (password.length <= 7 || password.length >= 101) {
                throw new Error("Password must be between 8 and 100 characters long");
            }

            if (isLoginOpen) {
                const newUser: User = await post(endpoints.login, { id: user?._id, email, password });
                setUser(newUser);
                localStorage.setItem("accessToken", newUser._id);
            }
            else {
                const data: { email: string, username: string } = await post(endpoints.register, { id: user?._id, email, username, password });

                if (user) {
                    user.email = data.email;
                    user.username = data.username;
                    user.isVerified = true;
                }
            }

            navigate("/profile");
            setError(null);
        }
        catch (e: any) {
            setError(e.message);
            throw new Error(e);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user && user?.isVerified) {
            navigate("/profile");
        }
    }, [user, location]);

    return (
        <main className="auth-page">
            <PageTitle title="Log in & Register" />

            <Link to="/profile">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>
                <span>Go back</span>
            </Link>

            <article>
                <section>
                    <button className={isLoginOpen ? "active" : ""} onClick={changeOpenTab}>Log in</button>
                    <button className={isLoginOpen ? "" : "active"} onClick={changeOpenTab}>Register</button>
                </section>

                {error && <p>{error}</p>}

                <form ref={formRef} onSubmit={submitForm}>
                    {!isLoginOpen && <FormInput label="Username" type="text" name="username" placeholder="ProCoder_42" />}

                    <FormInput label="Email" type="email" name="email" placeholder="you@example.com" />
                    <FormPasswordInput />

                    <button disabled={loading} type="submit">{isLoginOpen ? loading ? "Logging In..." : "Log in" : loading ? "Creating account..." : "Start your quest"}</button>
                </form>
            </article>
        </main>
    );
}

export default AuthPage;