
// Stuff for crawl. I placed this in here to keep my routes from becoming cluttered with too much logic
// This file will handle scraping and formatting.
// It will pass the formatted data off to my scrape route for writing to the DB using 
// info from models.
const axios = require('axios');
const cheerio = require('cheerio');

const scrape = async () => {

  try {
    const data = await axios.get('http://www.echojs.com/');

    const $ = cheerio.load(data.data);

    // Evaluates to an array-like object of article objects
    const articles = $('article h2').map(function(i, post) {
      let result = {};

      result.title = $(this)
        .children('a')
        .text();

      result.link = $(this)
        .children('a')
        .attr('href');
      return result;
    });

    // Return the array-like object of article objects to be used in the scrape.js route
    return articles;

  } catch (err) {
    console.log(err);
  }

}

module.exports = scrape;
