# Fetch Dog Adoption App 🐕

This is a React-based frontend application designed to help users find shelter dogs for adoption. Users can search, filter, sort, favorite, and match with dogs using Fetch's provided backend API.

# 🌐 Live Demo

Deployed Site: https://fetch-assignment-sandy.vercel.app/


## Prerequisites
1. Install [Node.js](https://nodejs.org/) (LTS version recommended).
2. Install [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/).

## Steps to Run

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/bashubisht/Fetch-Assignment.git
   cd Fetch-Assignment
   ```
2. **Install Dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Run the Development Server:**
   ```bash
   npm start
   # or
   yarn start
   ```
4. **Access the Application:**
   
   Once the server is running, open your browser and navigate to:
     
    ```bash
    http://localhost:3000
    ```

# 🚀 Features

## User Authentication:

- Simple login screen where users enter their name and email.

- Authentication via Fetch's login endpoint.

## Dog Search Page:

- Filter dogs by breed, age range, and ZIP code.

- Results are paginated, showing 25 dogs per page.

- Sort results by breed, name, or age.

- Sorting can be toggled between ascending and descending order.

- Displays dog name, age, breed, location (ZIP code), and image.

- Ability to reset all filters.

## Favorite & Match Dogs:

- Users can favorite or unfavorite dogs from search results.

- A separate favorites page lists all favorited dogs.

- Generate a match from favorite dogs using the /dogs/match endpoint.

- Matched dog is displayed in a modal with detailed information.

## Navigation:

- Navigation bar with links to Home (search page), Favorites page, and Logout.

- Logout functionality clears session and favorites.

## Responsive Design:

- Responsive UI ensuring usability across different device sizes.
  

# 🔧 Technologies Used

- React.js

- React Router for navigation

- Axios for HTTP requests

- CSS for styling

- React Icons

- Git for version control

  

# 💡 Usage

- Login with your name and email to access the application.

- Search dogs using filters for breed, age, and ZIP code.

- Sort results by breed, name, or age in ascending or descending order.

- Favorite dogs by clicking the "Add to Favorites" button.

- Visit the Favorites page to view favorited dogs.

- Click "Find My Match!" to generate a match from favorite dogs.
