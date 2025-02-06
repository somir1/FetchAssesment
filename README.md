## Dog Finder

A React + TypeScript app that allows users to search, filter, and favorite dogs, then generate a match based on their selections.

Features
User Authentication: Log in with a name and email to access the app.
Search & Filter: Filter dogs by breed.
Sorting: Sort results by breed, name, or age (ascending/descending).
Favorites: Select favorite dogs.
Match Feature: Generate a best-match dog based on selected favorites.

1. Clone the repository

   1. git clone (https://github.com/somir1/FetchAssesment) then
   2. "cd fetch-Take-Home"

2. Install dependencies

   1. npm install

3. Create an .env file

   1. Add the following environment variable: VITE_API_BASE_URL=(API URL goes here)

4. Run Testing

   1. npm run test

5. Start the development server
   1. npm run dev

How Sign-In Works

1. A user enters their name and email on the login page.

2. The app sends this data to the API login endpoint.

3. If valid, the server responds with an authentication token.

4. This token is stored in an HTTP-only cookie and is automatically included in API requests.

5. The token is valid for 1 hour. After that, users must log in again.
