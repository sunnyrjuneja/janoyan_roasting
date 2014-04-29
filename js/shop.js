var coffeeApp = angular.module('coffeeApp', ['ngSanitize', 'ui.router'])
  .run(['$rootScope', '$state', '$stateParams',
      function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
      }])
  .config(['$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("home");
        $stateProvider
          .state('home', {
            url: '/home',
            templateUrl: 'templates/home.html'
          })
          .state('shop', {
            url: '/shop',
            templateUrl: 'templates/shop.html',
            resolve: {
              contacts: ['coffees',
                function(coffees) {
                  return coffees.all();
                }]
            },
            controller: ['$scope', '$state', 'coffees',
              function($scope, $state, coffees) {
                $scope.coffees = coffees;
              }]
          })
          .state('shop.category', {
            url: '/:category',
            templateUrl: 'templates/shop.category.html',
            controller: ['$scope', '$stateParams', 'coffees', 'utils', 
              function($scope, $stateParams, coffees, utils) {
                coffees.all().then(function (coffees) { $scope.coffees = utils.findByCategory(coffees, $stateParams.category); });
            }]
          })
         .state('shop.coffee', {
            url: '/:coffee',
            templateUrl: 'templates/shop.coffee.html',
            controller: ['$scope', '$stateParams', 'utils', function($scope, $stateParams, utils) {
              $scope.coffee = utils.findById($scope.coffees, $stateParams.coffee) 
            }]
          })
          .state('wholesale', {
            url: '/wholesale',
            templateUrl: 'templates/wholesale.html'
          })
          .state('club', {
            url: '/club',
            templateUrl: 'templates/club.html'
          })
          .state('contact', {
            url: '/contact',
            templateUrl: 'templates/contact.html'
          });
    }])
  .value('$anchorScroll', angular.noop);

coffeeApp
  .controller('NavCtrl', ['$scope', '$location', 
    function($scope, $location) {
      $scope.isActive = function(viewLocation) {
        return viewLocation === $location.path();
      };
    }])
  .controller('MenuFilterCtrl', ['$scope', '$stateParams',
    function($scope, $stateParams) {
      $scope.isActive = function(menuItem) {
        return menuItem == $stateParams.category;
      };
    }]);

coffeeApp.factory('coffees', ['$http', 'utils', function($http, utils) {
  var path = 'coffee_inventory.json';
  var coffees = $http.get(path).then(function(resp) {
    return resp.data;
  });

  var factory = {};
  factory.all = function() {
    return coffees;
  }

  factory.get = function(id) {
    return coffees.then(function() {
      return utils.findById(coffees, id);
    })
  };
  return factory;
}]).factory('utils', function() {
  return {
    findById: function(coffees, id) {
      for(var i = 0; i < coffees.length; i++) {
        if(coffees[i].id == id) { return coffees[i]; }
      }
    },
    findByCategory: function(coffees, cat) {
      coffee_category = [];
      if(cat == "all") {
        return coffees;
      } else {
        for(var i = 0; i < coffees.length; i++) {
          if(coffees[i].categories.indexOf(cat) != -1) { coffee_category.push(coffees[i]); }
        }
        return coffee_category;
      }
    }
  }
});

coffeeApp.filter('unsafe', function($sce) {
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
});