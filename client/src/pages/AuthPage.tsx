import { Link, useLocation, useNavigate, useOutletContext } from "react-router-dom";
import type { User } from "../types/User.ts";
import { useEffect, useRef, useState } from "react";
import FormInput from "../components/FormInput.tsx";
import FormPasswordInput from "../components/FormPasswordInput.tsx";

const AuthPage = () => {
    const { user }: { user: User | null } = useOutletContext();
    const [isLoginOpen, setIsLoginOpen] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const location = useLocation();
    const navigate = useNavigate();
    const formRef = useRef<HTMLFormElement | null>(null);

    function changeOpenTab(): void {
        setIsLoginOpen(prev => prev = !prev);
        setError(null);
        formRef.current?.reset();
    }

    useEffect(() => {
        if (user && user?.isVerified) {
            navigate("/profile");
        }
    }, [user, location]);

    return (
        <main className="auth-page">
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

                <form ref={formRef}>
                    {!isLoginOpen && <FormInput label="Username" type="text" name="username" placeholder="ProCoder_42" />}

                    <FormInput label="Email" type="email" name="email" placeholder="you@example.com" />
                    <FormPasswordInput />

                    {
                        isLoginOpen ?
                            <button type="submit">Log in</button> :
                            <button type="submit">Start your quest</button>
                    }
                </form>
            </article>
        </main>
    );
}

export default AuthPage;