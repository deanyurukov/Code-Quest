import { useOutletContext } from "react-router-dom";
import type { User } from "../types/User.ts";
import ProfileUserInfo from "../components/ProfileUserInfo.tsx";
import { useEffect, useState } from "react";
import { calculateLevelProgress } from "../helpers/calculateLevelProgress.ts";
import type { LevelProgress } from "../types/LevelProgress.ts";

const ProfilePage = () => {
    const { user, streak }: { user: User | null, streak: number } = useOutletContext();
    const [ levelProgress, setLevelProgress ] = useState<LevelProgress | null>(null);

    useEffect(() => {
        if (user) {
            setLevelProgress(calculateLevelProgress(user.xp));
        }
    }, [user]);
    
    return (
        <main id="profile-page">
            <ProfileUserInfo user={user} levelProgress={levelProgress} />
        </main>
    );
}

export default ProfilePage;