## Dog Finder

A React + TypeScript app that allows users to search, filter, and favorite dogs, then generate a match based on their selections.

### Features

- **User Authentication**: Log in with a name and email to access the app.
- **Sorting**: Sort results by breed, name, or age (ascending/descending).
- **Favorites**: Select favorite dogs.
- **Match Feature**: Generate a best-match dog based on selected favorites.

### Getting Started

1. **Clone the repository**

   ```sh
   git clone https://github.com/somir1/FetchAssesment
   cd fetch-Take-Home
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Create an .env file**
   Add the following environment variable:

   ```env
   VITE_API_BASE_URL=(API URL goes here)
   ```

4. **Run Testing**

   ```sh
   npm run test
   ```

5. **Start the development server**
   ```sh
   npm run dev
   ```

### How Sign-In Works

1. A user enters their name and email on the login page.
2. The app sends this data to the API login endpoint.
3. If valid, the server responds with an authentication token.
4. This token is stored in an HTTP-only cookie and is automatically included in API requests.
5. The token is valid for 1 hour. After that, users must log in again.

### How Favorites and Matching Work

#### Adding a Dog to Favorites

- When a user clicks the favorite button on a dog card, the dog's ID is added to the favoriteDogs list in local state.
- If the dog is already in favoriteDogs, clicking the favorite button again removes it.

#### Viewing Favorites Tab

- When the user navigates to the "Matches" tab:
  - The app fetches detailed dog data for all favorite dog IDs.
  - These favorite dogs are displayed as cards.

#### Finding a Match

- When the user clicks "Find a Match", the following happens:
  - The list of favorite dog IDs is sent to the `/dogs/match` API endpoint.
  - The API returns a single matched dog ID based on the favorited dogs.
  - The app then fetches detailed data for the matched dog.
  - The matched dog is displayed separately above the list of favorite dogs.
