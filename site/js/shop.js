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
                $scope.category = $stateParams.category;
                coffees.all().then(function (coffees) { $scope.coffees = utils.findByCategory(coffees, $stateParams.category); });
            }]
          })
         .state('shop.category.coffee', {
            url: '/coffee/:coffee',
            onEnter: function($stateParams, $state, $modal) {
              $modal.open({
                templateUrl: 'templates/shop.coffee.html',
                //resolve: {
                //  coffee: ['coffees', function(coffees) { coffees.get($stateParams.coffee); }]
                //},
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
        return $location.path().indexOf(viewLocation) > -1;
      };
    }])
  .controller('MenuFilterCtrl', ['$scope', '$stateParams',
    function($scope, $stateParams) {
      $scope.isActive = function(menuItem) {
        return menuItem == $stateParams.category;
      };
    }]);


coffeeApp
  .directive("snipcartButton", function() {
    return {
      templateUrl: 'templates/snipcartbutton.html',
      restrict: 'E',
      scope: {
        product: '='
      },
      link: function (scope, element, attrs) {
        scope.text = attrs.text;
      }  
    }
  });


coffeeApp
  .factory('coffees', ['$http', 'utils', function($http, utils) {
    var path = 'coffee_inventory.json';
    var coffees = $http.get(path).then(function(resp) {
      return resp.data;
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
  });