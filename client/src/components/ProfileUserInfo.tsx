import type { User } from "../types/User.ts";
import type { LevelProgress } from "../types/LevelProgress.ts";
import { useState } from "react";
import { get } from "../api/requester.ts";
import { endpoints } from "../api/endpoints.ts";
import CreateAccount from "./CreateAccount.tsx";

const ProfileUserInfo = ({ user, levelProgress, getUserData }: { user: User | null, levelProgress: LevelProgress | null, getUserData: () => Promise<void> }) => {
    const [loading, setLoading] = useState<boolean>(false);

    async function logoutUser(e: any) {
        e.preventDefault();

        try {
            if (confirm("Are you sure you want to log out?")) {
                setLoading(true);
                await get(endpoints.logout, { id: user?._id });
                localStorage.removeItem("accessToken");
                await getUserData();
            }
        }
        catch (e) {
            console.error(e);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <article className="user-info">
            <section className="info">
                {
                    user?.isVerified ?
                        <article className="logged-in">
                            <p>{user.username.slice(0, 2)}</p>

                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>
                            </span>
                        </article> :
                        <article className="guest">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        </article>
                }

                <article className="user-details">
                    <h3>{user?.isVerified ? user.username : "Guest Adventurer"}</h3>
                    {
                        user?.isVerified ?
                            <div>
                                <p>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                                    {user.email}
                                </p>
                                <p>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path><path d="M8 14h.01"></path><path d="M12 14h.01"></path><path d="M16 14h.01"></path><path d="M8 18h.01"></path><path d="M12 18h.01"></path><path d="M16 18h.01"></path></svg>
                                    Member since {new Date(user?.joinedOn).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                                </p>
                            </div> :
                            <p>Playing without an account</p>
                    }
                </article>
            </section>

            <hr />

            <section className="level-progress">
                <article>
                    <span style={{ background: `${levelProgress?.tier.color}` }} >{levelProgress?.currentLevel}</span>

                    <div>
                        <h5>Level {levelProgress?.currentLevel} <span style={{ color: `${levelProgress?.tier.color}` }}>{levelProgress?.tier.title}</span></h5>
                        <p>{levelProgress?.current} / {levelProgress?.required} XP to Level {(levelProgress?.currentLevel || 0) + 1}</p>
                    </div>

                    <h6 style={{ color: `${levelProgress?.tier.color}` }}>{(levelProgress?.percentage || 0).toFixed(1)}%</h6>
                </article>

                <span>
                    <div style={{ width: `${Math.max(levelProgress?.percentage || 0, 1.5)}%`, background: `${levelProgress?.tier.color}` }}></div>
                </span>
            </section>

            {
                user?.isVerified ?
                    <>
                        <hr />
                        <button disabled={loading} type="button" onClick={logoutUser}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" x2="9" y1="12" y2="12"></line></svg>
                            {loading ? "Logging out..." : "Log out"}
                        </button>
                    </> :
                    <CreateAccount text="Don't lose your progress!" desc="Create an account to save your streak, XP, and stats permanently." linkText="Join the Battle, Warrior ⚔️" />
            }
        </article>
    );
}

export default ProfileUserInfo;