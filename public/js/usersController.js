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
          console.log('USER ==> ', response.data.user);
        })
        .catch(function(error){
          console.log('ERROR ==> ', error);
        })
      }



    }
})()
