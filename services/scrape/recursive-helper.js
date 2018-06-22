
// Recursive helper function that will help traverse nodes. 
// Just need to reformat it for returning the path of the found target
// Totally works! Just tested it. The node traversal works.

// Note to self:
// Look back to previous exercise Jerome gave where I made a
// recursive function that returns a path to a target found recursively
// It uses call stack logic

// Go back to nyt-test later and implement recursive searching for desired targets.
// Still need article-by attribute, and image attribute

const collection = {
  a: [1, 2, 3],
  b: {
    c: 4,
    d: 5
  },
  e: [{ f: 10 }, { g: 9 }, { h: 8 }]
}

function recursiveHelper(col) {

  if (Array.isArray(col)) {
    for (let i = 0; i < col.length; i++) {
      if (typeof col[i] === 'object') {
        recursiveHelper(col[i]);
      } else {
        console.log(col[i]);
      }
    }
  } else if (typeof col === 'object') {
    for (let key in col) {
      if (typeof col[key] === 'object') {
        recursiveHelper(col[key]);
      } else {
        console.log(col[key]);
      }
    }
  }




}

// recursiveHelper(collection);

