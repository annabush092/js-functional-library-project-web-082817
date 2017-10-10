//fi.funcName();

const fi = (function() {
  //variables
  return {
    each: function(collection, callback) {
      if (Array.isArray(collection)) {
        for (let i = 0; i < collection.length; i++) {
          callback(collection[i], i, collection);
        }
      } else if (typeof collection === "object") {
        for (const key in collection) {
          callback(collection[key], key, collection);
        }
      }
    },

    map: function(collection, callback) {
      const returnArray = [];
      if (Array.isArray(collection)) {
        for (let i = 0; i < collection.length; i++) {
          returnArray.push(callback(collection[i], i, collection));
        }
      } else if (typeof collection === "object") {
        for (const key in collection) {
          returnArray.push(callback(collection[key], key, collection));
        }
      }
      return returnArray;
    },

    reduce: function(collection, callback, agg) {
      if (Array.isArray(collection)) {
        let i = 0;
        if (agg === undefined) {
          agg = collection[i++];
        }
        for (; i < collection.length; i++) {
          agg = callback(agg, collection[i], i, collection);
          //agg = agg + collection[i]; with function(a,b){return a+b;}
        }
      } else if (typeof collection === "object") {
        for (const key in collection) {
          if (agg === undefined) {
            agg = collection[key];
          } else {
            agg = callback(agg, collection[key], key, collection);
          }
        }
      }
      return agg;
    },

    find: function(collection, callback) {
      if (Array.isArray(collection)) {
        for (let i = 0; i < collection.length; i++) {
          if (callback(collection[i], i, collection)) {
            return collection[i];
          }
        }
      } else if (typeof collection === "object") {
        for (const key in collection) {
          if (callback(collection[key], key, collection)) {
            return { [key]: collection[key] };
          }
        }
      }
    },

    filter: function(collection, callback) {
      const returnArray = [];
      if (Array.isArray(collection)) {
        for (let i = 0; i < collection.length; i++) {
          if (callback(collection[i], i, collection)) {
            returnArray.push(collection[i]);
          }
        }
      } else if (typeof collection === "object") {
        for (const key in collection) {
          if (callback(collection[key], key, collection)) {
            returnArray.push({ [key]: collection[key] });
          }
        }
      }
      return returnArray;
    },

    sortBy: function(collection, callback) {
      const returnArray = [];
      if (typeof callback === "function") {
        let i = 0;
        returnArray.push(collection[i++]); //returnArray.push(collection[0])
        for (; i < collection.length; i++) {
          const cbReturn = callback(collection[i], i, collection);
          let j = 0;
          for (; j < returnArray.length; j++) {
            if (cbReturn < callback(returnArray[j], j, returnArray)) {
              returnArray.splice(j, 0, collection[i]);
              break;
            }
          }
          if (j === returnArray.length) {
            returnArray.push(collection[i]);
          }
        }
      } else if (typeof callback === "string") {
        let i = 0;
        returnArray.push(collection[i++]);
        for (; i < collection.length; i++) {
          const cbReturn = collection[i][callback];
          let j = 0;
          for (; j < returnArray.length; j++) {
            if (cbReturn < returnArray[j][callback]) {
              returnArray.splice(j, 0, collection[i]);
              break;
            }
          }
          if (j === returnArray.length) {
            returnArray.push(collection[i]);
          }
        }
      }
      return returnArray;
    },

    size: function(collection) {
      let counter = 0;
      if (Array.isArray(collection)) {
        while (collection[counter] !== undefined) {
          counter++;
        }
      } else if (typeof collection === "object") {
        while (keys(collection)[counter] !== undefined) {
          counter++;
        }
      }
      return counter;
    },

    first: function(collection, num = 1) {
      return collection.slice(0, num);
    },

    last: function(collection, num = 1) {
      return collection.slice(-num);
    },

    compact: function(collection) {
      const returnArray = [];
      for (let i = 0; i < collection.length; i++) {
        if (collection[i]) {
          returnArray.push(collection[i]);
        }
      }
      return returnArray;
    },

    uniq: function(collection) {
      const returnArray = [];
      for (let i = 0; i < collection.length; i++) {
        if (!returnArray.includes(collection[i])) {
          returnArray.push(collection[i]);
        }
      }
      return returnArray;
    },

    keys: function(collection) {
      const returnArray = [];
      for (const key in collection) {
        returnArray.push(key);
      }
      return returnArray;
    },

    values: function(collection) {
      const returnArray = [];
      for (const key in collection) {
        returnArray.push(collection[key]);
      }
      return returnArray;
    },

    functions: function(collection) {
      const returnArray = [];
      for (const key in collection) {
        if (typeof collection[key] === "function") {
          returnArray.push(key);
        }
      }
      return returnArray;
    },

    flatten: function(collection) {
      let returnArray = [];
      for (let i = 0; i < collection.length; i++) {
        if (Array.isArray(collection[i])) {
          returnArray = returnArray.concat(this.flatten(collection[i]));
        } else {
          returnArray.push(collection[i]);
        }
      }
      return returnArray;
    },

    bind: function(callback, obj) {
      obj.func = callback;
      return function() {
        return obj.func();
      };
      //return function that is now within object scope
    },

    oBind: function(callback, obj) {
      return obj.callback;
      //return function that is now within object scope
    }
  };
})();
