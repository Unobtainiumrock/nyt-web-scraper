
const getKeyPath = require('keypather/get');

// WASTE OF TIME!!!!! I WAS BASICALLY BUILDING .find()!!! Assuming find will recursively traverse for a target
// depth first

const collection = {
  a: [1, 2, 3],
  b: {
    c: 4,
    d: 5
  },
  e: [{ f: 10 }, { g: 9 }, { h: 8 }]
}




const test = ['a', 'b', 'c'];


const path = test.reduce((mem,el) => {
  return mem + `[${el}]`
},``);

console.log(path);
// test[path]

/**
 * A custom each for iterating objects or arrays.
 * @param  {Array or Object} col is an iterable
 * @param  {Function} cb is a callback function to be performed on each element in the iterable
 */
function customEach(col, cb) {
  if (typeof col === 'object') {
    if (Array.isArray(col)) {
      for (let i = 0; i < col.length; i++) {
        cb(col[i], i, col);
      }
    } else {
      for (let key in col) {
        cb(col[key], key, col);
      }
    }
  }
}

/**
 * @param  {number || string} str is the desired DOM element to be found.
 * @param  {Object} collection is an iterable.
 * @returns {Array} returns an array of keys for building a path to a found target.
 */
function getElementsPath(str, collection) {
  const pathToTarget = [];
  let target = null;
  let timesCalled = 0;

  findTarget(str, collection);

  return pathToTarget;

  
  /**
   * @param  {number || string} str, passed down from the parent function, is the desired DOM element to be found.
   * @param  {Object} col, passed down from the parent function, is an iterable;
   */
  function findTarget(str, col) {

    customEach(col, (el, idx, arr) => {

      // Recursion base-case
      if (target === null) {
        if (typeof el === 'object') {
          // save a path to how we arrive at the target value
          pathToTarget.push(idx);

          // check times recursively called -- also representative of the # of node's.
          timesCalled++;
          // recursively call if there's more to search
          findTarget(str, el);

        } else {
          if (el === str) {
            target = el;
            pathToTarget.push(idx);
          }
        }
      }

    })

    // Remove failed paths
    if (target === null) {
      pathToTarget.shift();
    }
  }

}

console.log(getKeyPath(collection,"['e'][0]['f']"));

// console.log(JSON.stringify(getElementsPath(10, collection)));
