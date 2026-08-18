import { useEffect } from "react";

const PageTitle = ({ title }: { title: string }) => {
    useEffect(() => {
        document.title = `${title} | Code Quest`;
    }, [title]);

    return null;
};

export default PageTitle;