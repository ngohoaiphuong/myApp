function DialogController($scope, dialog, $routeParams){
  $scope.close = function(result){
    dialog.close(result);
  };
}

// function GlobalCtrl($scope, $rootScope, $routeParams){
//   $scope.data_ = {imgLanguage:'img/languages', language:'vi'};
// }

function openDialogLogin($rootScope, $template){
  $rootScope.data.options.dialog.templateUrl = $template;

  var d = $rootScope.dialog.dialog($rootScope.data.options.dialog);
  d.open().then(function(result){
  });
}

function generateURL($routeParams, html){
  var lang = 'en';
  if($routeParams['lang']){
    lang = $routeParams['lang'];
  }
  return 'partials/template/' + lang + html;
}