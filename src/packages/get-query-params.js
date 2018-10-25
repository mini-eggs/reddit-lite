export default () => {
  var str = location.search;
  var values = str
    .split("?")
    .join("___")
    .split("&")
    .join("___")
    .split("=")
    .join("___")
    .split("___");

  var obj = {};
  for (var e = 1; e < values.length; e += 2) {
    var key = values[e];
    var value = values[e + 1];
    obj[key] = value;
  }

  return obj;
};
