import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <main id="not-found-page">
            <section>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 15">
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                </svg>

                <h1>Page not found</h1>
                <p>This route doesn't exist. Looks like someone forgot to commit it.</p>
                <Link to="/">Back to quest</Link>
            </section>
        </main>
    )
}

export default NotFoundPage;