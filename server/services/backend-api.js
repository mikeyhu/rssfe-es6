var axios = require('axios');

module.exports = function (baseUri) {
  return {
    latest: function() {
      return axios.get(baseUri + '/stories/latest');
    }
  };
};