const Answer = ({ answer, letter, selected, setSelected, index }: { answer: string, letter: string, selected: number | null, setSelected: any, index: number }) => {
    return (
        <article className={selected === index  ? "selected" : ""} onClick={() => setSelected(index)} >
            <span>{letter}</span>
            <p>{answer}</p>
        </article>
    );
}

export default Answer;