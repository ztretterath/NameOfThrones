(function(){
  angular.module('nameofthrones')
    .controller('usersController', usersController);

    function usersController($http, $state) {
      var self = this;

      //https://api.got.show/api/characters/paths/:name
      this.createUser = function(user){
        return $http({
          url: '/users/signup',
          method: 'POST',
          data: user
        })
        .then(function(response){
          $state.go('login', {url: '/login'})
          console.log('USER ==> ', response.data.user);
        })
        .catch(function(error){
          console.log('ERROR ==> ', error);
        })
      }

      this.login = function(user){
        return $http({
          url: '/users/login',
          method: 'POST',
          data: user
        })
        .then(function(response){
          self.currentUser = response.data.user
          $state.go('profile', {url: '/profile'});
          console.log(self.currentUser);
        })
        .catch(function(error){
          console.log('ERROR ==> ', error);
        })
      }


    }
})()
