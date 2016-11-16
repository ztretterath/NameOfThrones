(function(){
  angular.module('nameofthrones', ['ui.router'])
    .config(MainRouter);

    MainRouter.$inject = ['$stateProvider', '$urlRouterProvider']

    function MainRouter($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: '../partials/_home.html'
        })
        .state('profile', {
          url: '/profile',
          templateUrl: '../partials/_profile.html'
        })
        .state('login', {
          url: '/login',
          templateUrl: '../partials/_login.html'
        })
        .state('houses', {
          url: '/houses',
          templateUrl: '../partials/_houses.html'
        })


      $urlRouterProvider.otherwise('/');
    }

})()
