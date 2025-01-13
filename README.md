```markdown
# The News App

This is a React Native app that allows you to search for news sources based on different filters like category, language, and country. It uses the [News API](https://newsapi.org/) to fetch the latest news sources.

## Features

- **Search by category:** Filter news sources by category (e.g., Business, Science, Technology, etc.).
- **Filter by language:** Choose news sources from different languages (e.g., English, Spanish, French, etc.).
- **Select country:** Fetch news sources from various countries (e.g., US, UK, Australia, etc.).
- **Display news sources:** View the list of news sources with their name, description, and a link to the news website.
- **Search History:** Stores the search queries and displays the previous searches for easy access.

## Screenshots

![App Screenshot](./screenshot.png)  <!-- Optional: Add a screenshot if needed -->

## Installation

### Prerequisites

Before you start, make sure to set up React Native development environment by following the official guide:

- [React Native Environment Setup](https://reactnative.dev/docs/environment-setup)

### Install Dependencies

1. Clone the repository:

```bash
git clone https://github.com/sszdhlh/SitemateChallenge.git
```

2. Navigate to the project directory:

```bash
cd SitemateChallenge
```

3. Install dependencies:

```bash
npm install
```

or if you're using Yarn:

```bash
yarn install
```

## Running the App

### Start the Metro Server

In the project directory, run the following command to start the Metro bundler:

```bash
npm start
```

or using Yarn:

```bash
yarn start
```

### Running on Android

To run the app on an Android emulator or device:

```bash
npm run android
```

or using Yarn:

```bash
yarn android
```

### Running on iOS

For iOS, you can run the app on the iOS simulator (macOS only):

```bash
npm run ios
```

or using Yarn:

```bash
yarn ios
```

## App Overview

### `App.tsx`

The main file of the app contains the following features:

- **Search Input:** A text input field for users to enter their search query.
- **Category Picker:** A dropdown to select the category of news (e.g., General, Business, Health, etc.).
- **Language Picker:** A dropdown to choose the language for news sources (e.g., English, Spanish, French).
- **Country Picker:** A dropdown to choose the country for news sources (e.g., US, UK, Australia).
- **Search Button:** When clicked, it fetches the news sources based on the selected filters.
- **News Results:** Displays the list of news sources with their name and description. Clicking on a source will open its URL.
- **Loading State:** Shows a loading indicator while fetching data from the API.

## Code

```tsx
// Full code of the app as provided above
```

## API Usage

This app fetches news sources using the News API. The API requires an API key, which is added to the app configuration.

### Example of Fetching Sources

```ts
const fetchSources = async (category?: string, language?: string, country?: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/top-headlines/sources`, {
      params: {
        category,
        language,
        country,
        apiKey: API_KEY,
      },
    });
    return response.data.sources; // Return the list of sources
  } catch (error) {
    throw error; // Propagate the error
  }
};
```

## Contributing

If you'd like to contribute to the development of this project, feel free to fork this repository, make changes, and create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```
