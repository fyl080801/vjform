import Vue from "vue";

function hasOwnProperty(object, property) {
  return Object.prototype.hasOwnProperty.call(object, property);
}

function isNumberLike(value) {
  return String(value).match(/^\d+$/);
}

function toPath(pathString) {
  if (Array.isArray(pathString)) {
    return pathString;
  }
  if (typeof pathString === "number") {
    return [pathString];
  }
  pathString = String(pathString);

  // lodash 的实现 - https://github.com/lodash/lodash
  let pathRx = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(\.|\[\])(?:\4|$))/g;
  let pathArray = [];

  pathString.replace(pathRx, (match, number, quote, string) => {
    pathArray.push(
      quote ? string : number !== undefined ? Number(number) : match
    );
    return pathArray[pathArray.length - 1];
  });
  return pathArray;
}

export const getMapDefault = (map, key, def) => {
  const value = map.get(key);
  if (value === undefined || value === null) {
    map.set(key, def);
    return map.get(key);
  } else {
    return value;
  }
};

export const deepSet = (obj, path, value) => {
  let fields = Array.isArray(path) ? path : toPath(path);
  let prop = fields.shift();

  if (!fields.length) {
    return Vue.set(obj, prop, value);
  }

  if (!hasOwnProperty(obj, prop) || obj[prop] === null) {
    // 当前下标是数字则认定是数组
    const objVal = fields.length >= 1 && isNumberLike(fields[0]) ? [] : {};
    Vue.set(obj, prop, objVal);
  }

  deepSet(obj[prop], fields, value);
};
