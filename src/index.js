const types = {
  absolute: new RegExp(/([+-]?(?:\d+|\d*\.\d+))(px|mm|cm|in|pt|pc|mozmm)/g),
  percentage: new RegExp(/([+-]?(?:\d+|\d*\.\d+))(%)/g),
  viewport: new RegExp(/([+-]?(?:\d+|\d*\.\d+))(vh|vw|vmin|vmax)/g),
  relative: new RegExp(/([+-]?(?:\d+|\d*\.\d+))(em|ex|ch|rem)/g),
  unitless: new RegExp(/([+-]?(?:\d+|\d*\.\d+))(?=\s|$)/g)
};

const execRegex = (re, str) => {
  var match;
  var results = [];
  re.lastIndex = 0;
  while ((match = re.exec(str)) !== null) {
    results.push({
      match: match[0],
      value: parseFloat(match[1]),
      unit: match[2] ? match[2] : null,
      index: match.index
    });
  }
  return results;
};

const getMatches = (str) => ({
  absolute: types.absolute.test(str) ? execRegex(types.absolute, str) : null,
  percentage: types.percentage.test(str) ? execRegex(types.percentage, str) : null,
  viewport: types.viewport.test(str) ? execRegex(types.viewport, str) : null,
  relative: types.relative.test(str) ? execRegex(types.relative, str) : null,
  unitless: types.unitless.test(str) ? execRegex(types.unitless, str) : null
});

module.exports = (str) => {
  if (!str) { return; }
  else if (typeof str !== 'string') {
    throw new Error('You must provide a string');
  }
  let matches = getMatches(str);
  let results = [];
  for (let key in matches) {
    let match = matches[key];
    if (match) {
      match.forEach((result) => {
        result.type = key;
        results.push(result);
      });
    }
  }

  return results.sort((a, b) => (a.index - b.index));
};
