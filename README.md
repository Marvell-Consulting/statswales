# StatsWales Private Alpha (Completed)

> This repository is now archieved as Marvell Consulting
> has now completed the Alpha phase of this project. This
> Repository will recieve no further updates.

## Introduction

This was the monolithic alpha app which was used to test out
a number of Azure Services and asumptions during the alpha
phase of the project. The Alpha app was built using TypeScript
and runs on Node.JS 20.12.0.

Servicess and technologies we explored included:

-   Internationalization (I18n)
-   Database and ORM technologies
    -   Microsoft SQL
    -   PostgreSQL
-   Azure Datalake
-   Kubernettes
-   File upload and Download
-   Displaying various types of CSV data

The app provides a complete user journey from uploadinging and
listing data files to displaying the data with a mostly complete
API as well.

## Requirements

-   Node.JS 20.12.0
-   Azure Account
-   Azure Datalake
-   PostgreSQL Database

## Running the App

Configure a .env file with the following variables:

```
DB_HOST=
DB_PORT=5432
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=
AZURE_STORAGE_ACCOUNT_NAME=
AZURE_STORAGE_ACCOUNT_KEY=
AZURE_STORAGE_DIRECTORY_NAME=
```

Once these items are configured running the app should be as
simple as:

```
npm install
npm run dev
```

## Our Beta Services

We used this as a base for our frontend and backend beta services.
These services can be found at:

-   [StatsWales Backend Service](https://github.com/Marvell-Consulting/statswales-backend)
-   [StatsWales Frontend Service](https://github.com/Marvell-Consulting/statswales-frontend)
