
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async () => {
  try {
    const data = await axios.get('https://www.nytimes.com/section/technology?action=click&pgtype=Homepage&region=TopBar&module=HPMiniNav&contentCollection=Tech&WT.nav=page');

    const $ = cheerio.load(data.data, {
      normalizeWhitespace: true,
      xmlMode: true,
      lowerCaseTags: true
    });

    // We use each because cheerio map is giving an array-like object in addition
    // to the original data. Cheerio each behaves like native each for the most part
    const articles = [];
    $('#latest-panel .story-menu .story').each(function (i, el) {
      const url = $(this).find('.story-link').attr().href;
      const headLine = $(this).find('.headline').text();
      const summary = $(this).find('.summary').text();
      const photo = $(this).find('img').attr('src');
      const byLine = $(this).find('.byline').text();
      articles.push({ url, headLine, summary, photo, byLine });
    });

    return articles;

  } catch (err) {
    console.log(err);
  }
};
