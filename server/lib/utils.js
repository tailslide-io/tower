/* map over each and value pairs
If key ends with _percentage, divide by 10

*/
const formatPercentagesInBody = (body) => {
  return Object.entries(body).reduce((newBody, [key, value]) => {
    if (isPercentageField(key)) {
      value = Math.ceil(value * 10);
    }
    newBody[key] = value;
    return newBody;
  }, {});
};

const formatPercentagesInData = (body) => {
  return Object.entries(body).reduce((newBody, [key, value]) => {
    if (isPercentageField(key)) {
      value /= 10;
    }
    newBody[key] = value;
    return newBody;
  }, {});
};

const isPercentageField = (text) => {
  return /_percentage$/.test(text);
};

module.exports = { formatPercentagesInBody, formatPercentagesInData };
