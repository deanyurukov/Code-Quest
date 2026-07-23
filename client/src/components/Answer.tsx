const Answer = ({ answer, letter, selected, setSelected, index, isSubmitted, correctIndex }: { answer: string, letter: string, selected: number | null, setSelected: any, index: number, isSubmitted: boolean, correctIndex: number }) => {
    return (
        <article className={selected === index && isSubmitted  ? selected === correctIndex ? "selected correct" : "selected wrong" : selected === index ? "selected" : isSubmitted && index === correctIndex ? "selected correct" : ""} onClick={() => !isSubmitted && setSelected(index)} >
            <span>{letter}</span>
            <p>{answer}</p>
        </article>
    );
}

export default Answer;