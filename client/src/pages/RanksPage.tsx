import { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle.tsx";
import { useOutletContext } from "react-router-dom";
import type { User } from "../types/User.ts";
import { get } from "../api/requester.ts";
import { endpoints } from "../api/endpoints.ts";

const RanksPage = () => {
    const { user }: { user: User | null } = useOutletContext();
    const [ranksData, setRanksData] = useState<{ username: string, xp: number } | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    async function getRanksData() {
        try {
            setLoading(true);
            const data: { username: string, xp: number } = await get(endpoints.ranks);
            setRanksData(data);
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
    }, []);

    return (
        <main id="ranks-page">
            <PageTitle title="Ranks" />
        </main>
    );
}

export default RanksPage;