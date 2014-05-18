var coffeeApp = angular.module('coffeeApp', ['ngSanitize', 'ui.bootstrap', 'ui.router'])
  .run(['$rootScope', '$state', '$stateParams',
      function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
      }])
  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: 'templates/home.html'
        })
        .state('shop', {
          url: '/shop',
          templateUrl: 'templates/shop.html',
        })
        .state('shop.category', {
          url: '/:category',
          templateUrl: 'templates/shop.category.html',
          controller: ['$scope', '$stateParams', 'coffees', 'utils', 
            function($scope, $stateParams, coffees, utils) {
              $scope.category = $stateParams.category;
              coffees.all().then(function (coffees) { $scope.coffees = utils.findByCategory(coffees, $stateParams.category); });
          }]
        })
        .state('shop.category.coffee', {
          url: '/coffee/:coffee',
          onEnter: function($stateParams, $state, $modal) {
            $modal.open({
              templateUrl: 'templates/shop.coffee.html',
              controller: ['$scope', '$stateParams', 'coffees', function($scope, $stateParams, coffees) {
                coffees.get($stateParams.coffee).then(function(coffee) { $scope.coffee = coffee; });

                $scope.dismiss = function() {
                  $scope.$dismiss($stateParams.category);
                }

                $scope.close = function() {
                  $scope.$close($stateParams.category);
                };
              }]
            }).result.then(function(category) {
              return $state.transitionTo("shop.category", {category: category});
            }, function() {
              return $state.transitionTo("shop.category", {category: $stateParams.category});
            })
          }
        })
        .state('wholesale', {
          url: '/wholesale',
          templateUrl: 'templates/wholesale.html'
        })
        .state('contact', {
          url: '/contact',
          templateUrl: 'templates/contact.html'
        });
        $urlRouterProvider.when("", "/home");
    }])
  .value('$anchorScroll', angular.noop);

coffeeApp
  .controller('NavCtrl', ['$scope', '$location', 
    function($scope, $location) {
      $scope.isActive = function(viewLocation) {
        return $location.path().indexOf(viewLocation) > -1;
      };
    }])
  .controller('MenuFilterCtrl', ['$scope', '$stateParams',
    function($scope, $stateParams) {
      $scope.isActive = function(menuItem) {
        return menuItem == $stateParams.category;
      };
    }])
  .controller('FormCtrl', ['$scope', '$http',
    function($scope, $http) {
      $scope.formData = {};

      $scope.processForm = function() {
        $http.jsonp('http://getsimpleform.com/messages/ajax?form_api_token=7e4ad92db7435ec9a4ea74ca1ecfe273', {params: $scope.formData})
          .success(function(data) {
            $scope.formData = {};
            alert("Thanks for contacting us. We'll get back to you shortly. You can also reach us at 818-275-7035 or JRCCoffee@live.com.");
          })
          .error(function(data) {
            $scope.formData = {};
            alert("Thanks for contacting us. We'll get back to you shortly. You can also reach us at 818-275-7035 or JRCCoffee@live.com.");
          })
      }
    }]);


coffeeApp
  .directive("snipcartButton", function() {
    return {
      templateUrl: 'templates/snipcartbutton.html',
      restrict: 'E',
      scope: {
        product: '='
      },
      link: function(scope, element, attrs) {
        scope.text = attrs.text;
      }  
    };
  })
  .directive("roastrange", function() {
    return {
      templateUrl: 'templates/roastrange.html',
      restrict: 'E',
      scope: {
        product: '='
      },
      link: function(scope, element, attrs) {
        scope.ranges = ['city', 'cityplus', 'fullcity', 'fullcityplus', 'vienna'],
        scope.isActive = function(range, roastRange) {
          return roastRange.map(cssRoastClass).indexOf(range) !== -1;
        }
      }
    };
  });


coffeeApp
  .factory('coffees', ['$http', 'utils', function($http, utils) {
    var path = 'coffees/inventory.json';
    var coffees = $http.get(path).then(function(resp) {
      coffee_arr = []
      for(i in resp.data) { coffee_arr[i] = JSON.parse(resp.data[i]); }
      return coffee_arr;
    });

    var factory = {};
    factory.all = function() {
      return coffees;
    }

    factory.get = function(id) {
      return coffees.then(function(coffees) {
        return utils.findById(coffees, id);
      })
    };
    return factory;
  }]).factory('utils', function() {
    return {
      findById: function(coffees, id) {
        for(var i = 0; i < coffees.length; i++) {
          if(coffees[i].id === id) { return coffees[i]; }
        }
      },
      findByCategory: function(coffees, cat) {
        coffee_category = [];
        if(cat == "all") {
          return coffees;
        } else {
          for(var i = 0; i < coffees.length; i++) {
            console.log(cat);
            if(coffees[i].categories.indexOf(cat) != -1) { coffee_category.push(coffees[i]); }
          }
          return coffee_category;
        }
      }
    }
  });

coffeeApp
  .filter('unsafe', function($sce) {
    return function(val) {
      return $sce.trustAsHtml(val);
    };
  }).filter('shorthand', function() {
    return function(val) {
      if(val === "liquid container") {
        return "(liq.)"
      } else {
        return val;
      }
    }
  }).filter('modalImage', function() {
    return function(coffee) {
      return '/img/modals/' + coffee['location'] + '-modal.jpg'
    }
  }).filter('previewImage', function() {
    return function(coffee) {
      return '/img/previews/' + coffee['location'] + '-preview.jpg'
    }
  });

var cssRoastClass = function(roast) {
  if(roast) return roast.replace(" ", "").toLowerCase();
};
