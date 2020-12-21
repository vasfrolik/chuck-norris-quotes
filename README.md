# Chuck Norris Quotes Search Component
This page allows you to run a text search on all Chuck Norris quotes and jokes made available by the Chuck Norris API (api.chucknorris.io)

The page is built with Next.js and hosted on Vercel (insert url here)
### Structure

The application only includes one page and three components:
- Loading Card (/components/loading-card.component): This is a loading component used as placeholder when lazy loading results
- Quote Card (/components/quote-card.component): This is the main component that showcases each joke/quote text and icon.
- Spinner (/components/spinner.component): This is a generic, re-usable spinner component. It's currently used in both the Loading Card and in the main homepage(index.js) as a loading spinner.
- Image (/components/image.component): This image component is used to allow for Lazy loading inside Quote Card for the Chuck Norris Icon.

### Logic
The API logic is included in the index.js file, it uses the native browser fetch() method.
The function has an initial state clean-up function to clear up any results present if users have already completed one search

### Styling
All styling is included in styles/globals.css

There are no libraries or pre-processors used for this specific projects for simplicity.

Colours are Greyscale, with the exception of accent colour (#B4d433) strictly used for the main Call to Action only.

Typography is system-based (San Francisco, Calibri, etc.)

### State Management
React Hooks are used for state management, the only hook used is useState and all state logic is included in the index.js file

### Accessibility 
Each Semantic element has been accessibility tested with VoiceOver on MAC and includes ARIA labels and tags where necessary.

### Left to Right

There is a left to right button floating in the bottom right that allows you to switch from left aligned reading (for English, Spanish language, etc.) to right aligned reading (Mandarin, Arabic, Japanese, etc.) and viceversa.

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

The app uses Cypress for end-to-end testing, the test scripts are found in the cypress/integrations directory.
To initialise Cypress run
```bash
yarn init-test
```
To run the test:
```bash
yarn run-test
```



