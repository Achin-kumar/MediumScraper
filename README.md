# MediumScraper
A scraper in node.js that will fetch all internal urls from all pages of medium.com (recursively) and save them into a file.

### Build with 
* [NodeJS](https://nodejs.org/en/)
* [cheerio](https://www.npmjs.com/package/cheerio) - Fast, flexible & lean implementation of core jQuery designed specifically for the server.

### Prerequisites
```
Node v12.1.0
NPM 6.8.0
```

### Install
```
npm install
```

### Usage
```js

  const { getLink } = require('./getLinks')
  const links = new getLink(); // optional path parameter with default directory as the base folder
  links.getlinks('https://medium.com')
```

### Run
```
npm start
```
