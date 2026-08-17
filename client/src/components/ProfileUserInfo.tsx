import { Link } from "react-router-dom";
import type { User } from "../types/User.ts";
import type { LevelProgress } from "../types/LevelProgress.ts";

const ProfileUserInfo = ({ user, levelProgress }: { user: User | null, levelProgress: LevelProgress | null }) => {
    return (
        <article className="user-info">
            <section className="info">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </span>

                <div>
                    <h3>Guest Adventurer</h3>
                    <p>Playing without an account.</p>
                </div>
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
                !user?.isVerified &&
                <section className="create-account">
                    <article>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" x2="19" y1="8" y2="14"></line><line x1="22" x2="16" y1="11" y2="11"></line></svg>

                        <div>
                            <h5>Don't lose your progress!</h5>
                            <p>Create an account to save your streak, XP, and stats permanently.</p>
                        </div>
                    </article>

                    <Link to={"/auth"}>Join the Battle, Warrior ⚔️</Link>
                </section>
            }
        </article>
    );
}

export default ProfileUserInfo;