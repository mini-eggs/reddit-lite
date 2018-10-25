export default ({ url, method, props, headers }) => {
  var req = new XMLHttpRequest();

  var promise = new Promise((resolve, reject) => {
    req.open(method.toUpperCase(), url);
    props && req.setRequestHeader("Content-Type", "application/json");
    req.onload = () => {
      var res = req.responseText;

      try {
        res = JSON.parse(res);
      } catch (_) {
        reject({ error: "Unexpected error." });
      }

      if (req.status === 200) {
        resolve(res);
      } else {
        reject(res);
      }
    };

    if (headers) {
      for (var key in headers) {
        req.setRequestHeader(key, headers[key]);
      }
    }

    req.send(JSON.stringify(props));
  });

  return Object.assign(promise, { abort: () => req.abort() });
};
