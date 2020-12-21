import { Suspense, lazy } from 'react'

import Spinner from './spinner.component'

const Image = lazy(() => import('./image.component'))

const QuoteCard = ({title, imageURL, orientation}) => {
    return (
        <div className="card-container" role="Quote Card" aria-label="Quote Card">
            <Suspense fallback={Spinner}>
                <Image imageURL={imageURL} />
            </Suspense>
            <h2 aria-label="Quote Text" className={orientation === 'left' ? (null) : (`right-text`)} role="Quote Text">"{title}"</h2>
        </div>
    )
}

export default QuoteCard
