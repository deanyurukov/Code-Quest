import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";

import type { User } from "../types/User.ts";
import type { LevelProgress } from "../types/LevelProgress.ts";

import { calculateLevelProgress } from "../helpers/calculateLevelProgress.ts";

import ProfileUserInfo from "../components/ProfileUserInfo.tsx";
import ProfileUserStats from "../components/ProfileUserStats.tsx";

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
            <ProfileUserStats user={user} level={levelProgress?.currentLevel || 0} streak={streak} />
        </main>
    );
}

export default ProfilePage;