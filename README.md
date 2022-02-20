# Simple Node with Express + PostgreSQL Server

[![Build Status](https://travis-ci.org/rwieruch/node-express-postgresql-server.svg?branch=master)](https://travis-ci.org/rwieruch/node-express-postgresql-server) [![Slack](https://slack-the-road-to-learn-react.wieruch.com/badge.svg)](https://slack-the-road-to-learn-react.wieruch.com/) [![Greenkeeper badge](https://badges.greenkeeper.io/rwieruch/node-express-postgresql-server.svg)](https://greenkeeper.io/)

An easy way to get started with a Express server with PostgreSQL with Node.js. [Read more about it.](https://www.robinwieruch.de/postgres-express-setup-tutorial/)

## Features

- Express
- REST API
- PostgreSQL

## Requirements

- [node & npm](https://nodejs.org/en/)
- [git](https://www.robinwieruch.de/git-essential-commands/)

## Installation

- `git clone git@github.com:rwieruch/node-express-postgresql-server.git`
- `cd node-express-postgresql-server`
- `npm install`
- `docker-compose up`
- `npm start`
- optional: include _.env_ in your _.gitignore_

### GET Routes

- visit http://localhost:3000
  - /messages
  - /messages/1
  - /users
  - /users/1

### Beyond GET Routes

#### CURL

- Create a message with:
  - `curl -X POST -H "Content-Type:application/json" http://localhost:3000/messages -d '{"text":"Hi again, World"}'`
- Delete a message with:
  - `curl -X DELETE -H "Content-Type:application/json" http://localhost:3000/messages/1`

#### Postman

- Install [Postman](https://www.getpostman.com/apps) to interact with REST API
- Create a message with:
  - URL: http://localhost:3000/messages
  - Method: POST
  - Body: raw + JSON (application/json)
  - Body Content: `{ "text": "Hi again, World" }`
- Delete a message with:
  - URL: http://localhost:3000/messages/1
  - Method: DELETE
