module.exports = function () {

  var getApiUri = () => {
    var kubeHost = process.env.RSSBE_API_SERVICE_HOST;
    if (kubeHost) return `http://${kubeHost}:3000`;

    return `http://localhost:3000`;
  };

  return {
    apiBaseUri: getApiUri(),
    cacheTemplates: false
  };

}();