import { useState, Suspense, lazy } from 'react'

// import QuoteCard from '../components/quote-card.component'
import Spinner from '../components/spinner.component'
import LoadingCard from '../components/loading-card.component'

const QuoteCard = lazy(() => import('../components/quote-card.component'))

export default function Home() {
  const [results, setResults] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [textOrientation, setTextOrientation] = useState('left')

  const runQuery = async () => {
    const query = inputValue
    try {
      setResults('')
      setLoading(true)
      await fetch('https://api.chucknorris.io/jokes/search?query=' + `${query}`)
      .then(response => response.json())
      .then((jsonResponse) => {
        setResults(jsonResponse)
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
      .finally(() => setInputValue(''))
    } catch(error) {
      console.error(error)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    runQuery()
  }

  const RenderNumberOfResults = () => {
    if (results.result.length > 0) {
      return (
        <h4 aria-label="Number of results">{results.result.length} results</h4>
      )
    } else {
      return null
    }
  }

  const RenderListOfResults = () => {
    if (results.result.length > 0) {
      return results.result.map((item) => (
        <Suspense key={item.id} fallback={LoadingCard}>
          <QuoteCard
            title={item.value}
            imageURL={item.icon_url}
            orientation={textOrientation}
          />
         </Suspense>
      ))
    } else {
      return null
    }
  }


  return (
    <main>
      <header>
        <h1 aria-label="Site Title">Chuck Norris Quote Search</h1>
        {textOrientation === 'left' ? (
          <button className="text-orientation-button" aria-label="Change Text Orientation" onClick={() => setTextOrientation('right')}>Right to Left</button>
        ) : (
          <button className="text-orientation-button" aria-label="Change Text Orientation" onClick={() => setTextOrientation('left')}>Left to Right</button>
        )}
      </header>
      <form data-cy="search-form" role="Search Form" className="form-container" onSubmit={handleSubmit}>
        <input data-cy="search-input" aria-label="Search Bar" className="search-bar" placeholder="Search Chuck's quotes" type="search" autoFocus value={inputValue} onChange={e => setInputValue(e.target.value)} minLength="3" maxLength="120" />
        <input aria-label="Search Button" className="submit-button" type="submit" value="go!"/>
      </form>
      <div role="Results Container" aria-atomic="true">
        {results !== '' ? (
          <div data-cy="results-container">
            {isLoading === true ? (
              <div role="Spinner Container">
                <Spinner />
              </div>
            ) : (
              <div role="Results Sub-Container">
              {results.total === 0 ? (
                <h4 aria-label="No results message" aria-live="polite">Your search did not return any results</h4>
              ) : (
                <div role="Results List">
                  <RenderNumberOfResults />
                  <RenderListOfResults />
                </div>
              )}
              </div>
            )}
          </div>
        ) : (
          <div role="Results Sub-Container">
            {isLoading === true ? (
              <div role="Spinner Container">
                  <Spinner />
                </div>
            ) : (
              <h4 aria-label="Initial Message">
              Search thousands of Chuck Norris quotes
            </h4>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
