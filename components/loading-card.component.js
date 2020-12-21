import Spinner from './spinner.component'

const LoadingCard = () => {
    return (
        <div className="card-container" role="Quote Card" aria-label="Quote Card">
            <p>Test Spinner</p>
            <Spinner />
        </div>
    )
}

export default LoadingCard