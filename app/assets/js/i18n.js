myApp.factory('i18n', function($rootScope, $http) {
  var items = [];
  
  var lang = {};

  lang.getLang = function() {
    return $rootScope.data.options.default.lang;
  }

  lang.setLang = function(lang){
    // var url = $rootScope.root + 'i18n/lang.' + lang + '.js';
    var url = 'i18n/lang.' + lang + '.json';

    var promise = $http.get(url).then(function (response) {
      return response.data;
    });
      // Return the promise to the controller
    return promise;
  }

  return lang; // returning this is very important
});

