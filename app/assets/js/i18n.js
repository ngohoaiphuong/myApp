// var i18n = function(data){
//   if(data){
//     this.data = data;
//   }

//   this.lang = {};
  
//   this.getLang = function(){
//     return this.data.data.options.default.lang;
//   };

//   this.setLang = function(lang){
//     var url;
//     if(lang){
//       url = 'i18n/lang.' + lang + '.js';
//     }else{
//       url = 'i18n/lang.' + this.data.data.options.default.lang + '.js';
//     }
//     console.log('URL:' + url);
//     return "";
//   };
// }

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

