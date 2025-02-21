# Fetch Dog Adoption App

This is a React-based frontend application designed to help users find shelter dogs for adoption. Users can search, filter, sort, favorite, and match with dogs using Fetch's provided backend API.

Live Demo

Deployed Site: https://fetch-assignment-sandy.vercel.app/

Repository

GitHub Repository: [Your Repository URL]

Features

User Authentication:

Simple login screen where users enter their name and email.

Authentication via Fetch's login endpoint.

Dog Search Page:

Filter dogs by breed, age range, and ZIP code.

Results are paginated, showing 25 dogs per page.

Sort results by breed, name, or age.

Sorting can be toggled between ascending and descending order.

The default sorting order is alphabetically by breed in ascending order.

Displays dog name, age, breed, location (ZIP code), and image.

Ability to reset all filters.

Favorite & Match Dogs:

Users can favorite or unfavorite dogs from search results.

A separate favorites page lists all favorited dogs.

Generate a match from favorite dogs using the /dogs/match endpoint.

Matched dog is displayed in a modal with detailed information.

Navigation:

Navigation bar with links to Home (search page), Favorites page, and Logout.

Logout functionality clears session and favorites.

Responsive Design:

Responsive UI ensuring usability across different device sizes.

Technologies Used

React.js

React Router for navigation

Axios for HTTP requests

CSS for styling

React Icons

Git for version control

Installation

Prerequisites

Node.js (v14 or later recommended)

npm (Node package manager)

Setup

Clone the repository:

git clone [Your Repository URL]

Navigate to the project directory:

cd [Your Project Directory]

Install dependencies:

npm install

Running the Application Locally

Start the application:

npm start

The app will be accessible at:

http://localhost:3000

Usage

Login with your name and email to access the application.

Search dogs using filters for breed, age, and ZIP code.

Sort results by breed, name, or age in ascending or descending order.

Favorite dogs by clicking the "Add to Favorites" button.

Visit the Favorites page to view favorited dogs.

Click "Find My Match!" to generate a match from favorite dogs.