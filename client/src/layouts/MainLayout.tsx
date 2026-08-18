import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { get, post } from "../api/requester.ts";
import { endpoints } from "../api/endpoints.ts";

import type { User } from "../types/User.ts";

import { calculateStreak } from "../helpers/calculateStreak.ts";

import Header from "../components/Header.tsx";
import Navigation from "../components/Navigation.tsx";

const MainLayout = () => {
    const [streak, setStreak] = useState<number>(0);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const location = useLocation();
    let errorCount = 0;

    async function getUserData() {
        if (errorCount >= 4) {
            alert("Something went wrong. Please try again later.");
            return;
        }

        try {
            setLoading(true);
            let userExists: boolean = localStorage.getItem("accessToken") !== null;

            if (!userExists) {
                const token = await post<{ userId: string }>(endpoints.anonymous);
                
                if (!token.userId) {
                    throw new Error("Error creating user");
                }

                localStorage.setItem("accessToken", token.userId);
            }

            const userId = localStorage.getItem("accessToken")!;
            const user = await get<User>(endpoints.user, { id: userId });

            setUser(user);
            
            errorCount = 0;
        }
        catch (e) {
            console.error(e);
            localStorage.removeItem("accessToken");
            errorCount++;
            await getUserData();
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getUserData();
    }, []);

    useEffect(() => {
        if (user) {
            setStreak(calculateStreak(user.answers));
        }
    }, [user]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <>
            <Header streak={streak} />
            <Navigation />
            <Outlet context={{ user, setUser, streak, setStreak, loading }} />
            <footer>
                <p>&copy; {new Date().getFullYear()} Code Quest</p>
            </footer>
        </>
    );
}

export default MainLayout;