import { Link } from "react-router-dom";

const CreateAccount = ({ text, desc, linkText }: { text: string, desc: string, linkText: string }) => {
    return (
        <section className="create-account">
            <article>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" x2="19" y1="8" y2="14"></line><line x1="22" x2="16" y1="11" y2="11"></line></svg>

                <div>
                    <h5>{text}</h5>
                    <p>{desc}</p>
                </div>
            </article>

            <Link to={"/auth"}>{linkText}</Link>
        </section>
    );
}

export default CreateAccount;