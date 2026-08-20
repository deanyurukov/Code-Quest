import { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle.tsx";
import { useOutletContext } from "react-router-dom";
import type { User } from "../types/User.ts";
import { get } from "../api/requester.ts";
import { endpoints } from "../api/endpoints.ts";
import Spinner from "../components/Spinner.tsx";

const RanksPage = () => {
    const { user }: { user: User | null } = useOutletContext();
    const [ranksData, setRanksData] = useState<{ username: string, xp: number }[] | null>(null);
    const [userRank, setUserRank] = useState<number>(999);
    const [loading, setLoading] = useState<boolean>(false);

    async function getRanksData() {
        try {
            setLoading(true);
            const data: { username: string, xp: number }[] = await get(endpoints.ranks);
            setRanksData(data);

            const userRank = data.findIndex(u => u.username === user?.username);
            setUserRank(userRank + 1);
        }
        catch (e) {
            console.error(e);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getRanksData();
    }, [user]);

    if (loading || !ranksData) {
        return <Spinner />;
    }

    return (
        <main id="ranks-page">
            <PageTitle title="Ranks" />

            <article>
                <div className="section-heading">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>
                    <h3>Top champions</h3>
                </div>

                <section>
                    <div className="silver">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15"></path><path d="M11 12 5.12 2.2"></path><path d="m13 12 5.88-9.8"></path><path d="M8 7h8"></path><circle cx="12" cy="17" r="5"></circle><path d="M12 18v-2h-.5"></path></svg>
                        <p>{ranksData[1].username.slice(0, 2)}</p>
                        <h5>{ranksData[1].username} {userRank === 2 && <span><br />(You)</span>}</h5>
                        <h6>{ranksData[1].xp} XP</h6>
                        <span>2</span>
                    </div>
                    <div className="gold">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"></path><path d="M5 21h14"></path></svg>
                        <p>{ranksData[0].username.slice(0, 2)}</p>
                        <h5>{ranksData[0].username} {userRank === 1 && <span><br />(You)</span>}</h5>
                        <h6>{ranksData[0].xp} XP</h6>
                        <span>1</span>
                    </div>
                    <div className="bronze">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15"></path><path d="M11 12 5.12 2.2"></path><path d="m13 12 5.88-9.8"></path><path d="M8 7h8"></path><circle cx="12" cy="17" r="5"></circle><path d="M12 18v-2h-.5"></path></svg>
                        <p>{ranksData[2].username.slice(0, 2)}</p>
                        <h5>{ranksData[2].username}  {userRank === 3 && <span><br />(You)</span>}</h5>
                        <h6>{ranksData[2].xp} XP</h6>
                        <span>3</span>
                    </div>
                </section>
            </article>

            <section>
                <div className="section-heading">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" x2="18" y1="20" y2="10"></line><line x1="12" x2="12" y1="20" y2="4"></line><line x1="6" x2="6" y1="20" y2="14"></line></svg>
                    <h3>Full rankings</h3>
                </div>

                <article>
                    {ranksData.slice(3).map((info, i) => (
                        <div key={i} className={userRank === i + 4 ? "you" : ""}>
                            <p>{i + 4}</p>
                            <h5>{info.username} {userRank === i + 4 && <span>You</span>}</h5>

                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path></svg>
                                {info.xp}
                            </span>
                        </div>
                    ))}
                </article>
            </section>
        </main>
    );
}

export default RanksPage;