const QuoteCard = ({title, imageURL, orientation}) => {
    return (
        <div className="card-container" role="Quote Card" aria-label="Quote Card">
            <img src={imageURL} alt="Chuck Norris Icon" aria-label="Chuck Norris Icon" />
            <h2 aria-label="Quote Text" className={orientation === 'left' ? (null) : (`right-text`)} role="Quote Text">"{title}"</h2>
        </div>
    )
}

export default QuoteCard
