
const axios = require('axios');
const cheerio = require('cheerio');


axios.get('https://www.nytimes.com/section/technology?action=click&pgtype=Homepage&region=TopBar&module=HPMiniNav&contentCollection=Tech&WT.nav=page')
  .then(function(data) {
    const $ = cheerio.load(data.data, {
      normalizeWhitespace: true,
      xmlMode: true
    });

    const articles = $('.story-menu .story .story-body .story-meta').each((i,el) => {
      // let result = {};
      // const url = el.parent.attribs.href;
      // const headLine = el.children[0].next.children[0].data;
      // const summary = el.children[3].children[0].data;
      const byLine = el.children[2].prev.children;
      console.log(byLine);
      console.log('==========');
      // return result;
    });

    // Make sure to Array.from() these array-like objects

  });

  function recursiveHelper () {
    for (let i = 0; i < close.length; i ++) {
      if(typeof el[i] === 'object') {
        recursiveHelper(el[i]);
      }
    }
  }

  // recursiveHelper();