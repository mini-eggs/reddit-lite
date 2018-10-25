export default obj =>
  "?" +
  Object.keys(obj)
    .filter(item => !!obj[item])
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join("&");
