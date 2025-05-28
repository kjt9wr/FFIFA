<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">

<h1 align="center">FFIFA Webapp</h1>

</div>
<img width="1000" alt="image" src="https://github.com/user-attachments/assets/1e2144c7-23a0-4eb4-b270-9659c78222bd" />



<!-- ABOUT THE PROJECT -->

## About The Project

This web app was created to manage and manipulate data related to a specific fantasy football league. This application is designed to streamline the process of understanding the league, offering seamless management of the additional, complex ruleset, and providing insights that can be used advantageously.

## Technologies

- `MongoDB`
- `Express.js`
- `React`
- `Node.js`
- `Typescript`
- `Reactstrap`

## About FFIFA

What once began as a typical fantasy football league has gradually transformed into a complex web of intricate rules designed to make the experience more demanding and fun. As the scope of this league surpassed the capabilities of existing fantasy platforms, a need for managing this additional data was created. These rules include but are not limited to:

- The option to keep players for an increased salary
- The optional franchise tag to keep a player for a variable amount depending on other players kept at the position
- The optional supermax contract to keep a player over a fixed duration for a percentage cost of league-wide salary cap
- Arbitration rules to hinder players' salary costs after a few years
- A salary cap that fluctuates as a function of owner spending
- A luxury tax to generate additional fees for owners with large spending habits
- The ability to trade players, current cap amounts, and future cap amounts

## Features

### Roster Page
#### Desktop View
<img width="1440" alt="image" src="https://github.com/user-attachments/assets/eaf354b1-1b3d-43e3-8617-c8f624308fd4" />

#### Mobile View
![image](https://github.com/user-attachments/assets/23e46f37-0bea-4034-9e1f-44e30897c292)


The Roster Page allows you to view the selected owner's roster, various cap information based on potential players kept, and additional fees or bonuses. The page contains an interactive table that allows you to toggle different players as selected keepers, and subsequently update the ripple effects throughout not only the selected roster but the various prices throughout the rest of the league.

### Trade Page

This page displays all accepted trades, filterable by year.

### Preview Roster Page

This page allows the user to temporarily add or remove any player to their roster to visualize the resulting cap and price changes.

### Franchise Tag Page

This page displays the relevant kept players and calculates the respective franchise tag costs for each position

### Supermax Page

This page displays each of the existing Supermax contracts

### Arbitration Page

This page displays all of the players that are currently up for an arbitrated price change, filterable by year.

### Cap Page

This page displays each owner's current cap amounts and every change to those amounts via trade, filterable by year.

### Free Agents Page

This page displays all players that are not currently being kept by owners, grouped by position.

### Draft Page

This page calculates and displays relevant data regarding cap fees and bonuses to be added on draft day, as well as the calculation for the following season's base league cap.

### Admin Page

This page fetches roster data from the [Sleeper Api](https://docs.sleeper.com/#leagues) and updates the rosters here. This page also includes the ability to save the future prices of players by fetching the draft data from the Sleeper Api and calculating the increased values.

# Getting Started

### Available Scripts

In the project `/frontend` directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Run unit tests using Jest.

## Process and Learning

I chose to create this project because I wanted to develop something practical that I could personally use to help me with an existing passion of mine. This provided an opportunity to strengthen both my development skills and my fantasy football skills.

I opted to leverage the MERN stack for a few reasons. The flexibility and adaptability of a NoSQL database like MongoDB proved to be invaluable for handling the data in an ever-changing system. React was an ideal front-end library to use for its component reusability and fast rendering on pages where I refresh the data frequently.

<!-- ROADMAP -->

## Potential Features

This personal project will never be truly "done". As the fantasy league introduces more rules, I will update the project to ensure it aligns with them. In addition, I will continue to add features and functionality to expand on the adaptability and user experience, such as:

- [x] Authentication
- [ ] Form for logging a trade in the UI
- [ ] Additional trade data viewable on the Cap Tracker Page
