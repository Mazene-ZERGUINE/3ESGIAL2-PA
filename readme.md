# CLM Project

a school project developed by a team of 3, and it aims to provide an interactive platform for exchanging used goods between users using Angular, a team management application with auto-updates, exports, themes, and console mode developed in JavaFX, and a Miro programming language for web scraping.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [ExpressJS API](#expressjs-api)
- [Angular Front Application](#angular-front-application)
- [JavaFX Team Management Application](#javafx-team-management-application)
- [Miro Programming Language](#miro-programming-language)

## Technologies Used

- **ExpressJS:** A fast and minimalist web framework for building the API.
- **Angular:** A popular front-end framework for building dynamic single-page applications.
- **JavaFX:** A Java library used for building desktop applications with rich graphical user interfaces.
- **python**

## Getting Started

To run this project locally, you'll need to have the following prerequisites installed on your system:

- Node.js (for ExpressJS and Angular)
- Java Runtime Environment (JRE) (for JavaFX)
- Python 3

Clone this repository to your local machine and follow the setup instructions for each component below.

## ExpressJS API

The ExpressJS API acts as the backend for the entire system. It handles user authentication, item listings, and facilitates communication between the front-end application and the database. To set up the ExpressJS API, follow these steps:

1. Navigate to the `backend` directory.
2. Install the required dependencies by running `npm install`.
3. Start the server with `npm run start`.

The ExpressJS API will be available at `http://localhost:3000`.

## Angular Front Application

The Angular front-end application provides an interactive interface for users to browse and exchange used goods. To set up the Angular application, follow these steps:

1. Navigate to the `frontend` directory.
2. Install the required dependencies by running `npm install`.
3. Start the application with `ng serve`.

You can access the Angular app in your browser at `http://localhost:4200`.

## JavaFX Team Management Application

The JavaFX application serves as a team management tool and includes features such as auto-updates, exports, themes, and console mode. To run the JavaFX application, follow these steps:

Navigate to the the `java/app` directory then run the application jar file `clm.jar` using the commande `java -jar clm.jar` in your terminal
if you are using a unix system you can directly run the script `run.sh`

The JavaFX application will launch, and you can interact with its various features.

## Miro Programming Language

The Miro programming language is designed for web scraping tasks. To use the Miro programming language, follow these steps:

1. make sure you have python3 installed in your machine
2. navigate to `scrap-lang` directory
3. write your script than run the commande ./scr your_script.scr

**For examples :** look at the files in `scrap-lang/tests `
