const Answer = ({ answer, letter }: { answer: string, letter: string }) => {
    return (
        <article>
            <span>{letter}</span>
            <p>{answer}</p>
        </article>
    );
}

export default Answer;