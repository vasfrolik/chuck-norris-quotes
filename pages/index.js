import { useState, Suspense, lazy } from 'react'

import Spinner from '../components/spinner.component'
import LoadingCard from '../components/loading-card.component'

const QuoteCard = lazy(() => import('../components/quote-card.component'))

export default function Home() {
  const [results, setResults] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [query, setQuery] = useState('')

  const runQuery = async () => {
    try {
      // clean up results and set loading true
      setResults('')
      setLoading(true)
      await fetch('https://api.chucknorris.io/jokes/search?query=' + `${query}`)
      .then(response => response.json())
      .then((jsonResponse) => {
        setResults(jsonResponse)
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
      // Clean up query value in search bar input
      .finally(() => setQuery(''))
    } catch(error) {
      console.error(error)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    runQuery()
  }

  const RenderNumberOfResults = () => {
    // Only show number of results if there are results - rest of logic in JSX markup below
    if (results.result.length > 0) {
      return (
        <h4 aria-label="Number of results">{results.result.length} results</h4>
      )
    } else {
      return null
    }
  }

  const RenderListOfResults = () => {
    // Only show if there are results - rest of logic in JSX markup below
    if (results.result.length > 0) {
      return results.result.map((item) => (
        <Suspense key={item.id} fallback={LoadingCard}>
          <QuoteCard
            title={item.value}
            imageURL={item.icon_url}
          />
         </Suspense>
      ))
    } else {
      return null
    }
  }


  return (
    <main>
    {/* HEADER */}
      <header>
        <h1 aria-label="Site Title">Chuck Norris Quote Search</h1>
      </header>
    {/* SEARCH BAR COMPONENT */}
      <form data-cy="search-form" role="Search Form" className="form-container" onSubmit={handleSubmit}>
        <input data-cy="search-input"  className={'search-bar'} aria-label="Search Bar" placeholder="Search Chuck's quotes" type="search" autoFocus value={query} onChange={e => setQuery(e.target.value)} minLength="3" maxLength="120" />
        <input aria-label="Search Button" className="submit-button" type="submit" value="go!"/>
      </form>
      {/* RESULTS CONTAINER */}
      <div role="Results Container" aria-atomic="true">
      {/* SHOW IF RESULTS ONLY */}
        {results !== '' ? (
          <div data-cy="results-container">
          {/* SHOW SPINNER IF LOADING */}
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
          {/* RESULTS CONTAINER WHEN USER HASN'T SEARCHED YET */}
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
