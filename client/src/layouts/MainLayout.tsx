import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { get, post } from "../api/requester.ts";
import { endpoints } from "../api/endpoints.ts";

import type { User } from "../types/User.ts";

import { calculateStreak } from "../helpers/calculateStreak.ts";

import Header from "../components/Header.tsx";
import Navigation from "../components/Navigation.tsx";

const MainLayout = () => {
    const [streak, setStreak] = useState<number>(0);
    const [user, setUser] = useState<User | null>(null);

    async function getUserData(): Promise<void> {
        try {
            let userExists: boolean = localStorage.getItem("accessToken") !== null;

            if (!userExists) {
                const token = await post<{ userId: string }>(endpoints.anonymous);
                
                if (!token.userId) {
                    throw new Error("Error creating user");
                }

                localStorage.setItem("accessToken", JSON.stringify({ userId: token.userId }));
            }

            const userId = JSON.parse(localStorage.getItem("accessToken")!).userId;
            const user = await get<User>(endpoints.user, { id: userId });

            setUser(user);
            setStreak(calculateStreak(user.answers));
        }
        catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        void getUserData();
    }, []);

    return (
        <>
            <Header streak={streak} />
            <Navigation />
            <Outlet context={{ user, setUser, streak, setStreak, }} />
            <footer>
                <p>&copy; {new Date().getFullYear()} Code Quest</p>
            </footer>
        </>
    );
}

export default MainLayout;