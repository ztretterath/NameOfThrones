(function(){
  angular.module('nameofthrones')
    .controller('usersController', usersController);

    function usersController($http, $state) {
      var self = this;

      //Helper to get currentUser
      $http.get('/helpers/getUser')
        .then(function(response){
          self.currentUser = response.data.user;
        })
        .catch(function(error){
          console.log(error);
        })

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

      this.logout = function(user){
        return $http({
          url: '/users/logout',
          method: 'DELETE',
          data: user
        })
        .then(function(response){
          console.log('LOGOUT SUCCESSFUL');
          $state.go('home', {url: '/'})
        })
        .catch(function(error){
          console.log('ERROR ==> ', error);
        })
      }

      //Add Character
      this.add = function(character){
        return $http({
          url: '/users/add',
          method: 'POST',
          data: character
        })
        .then(function(response){
          console.log(response);
          self.currentUser.characters.push(character);
        })
        .then(function(response){
          console.log(self.currentUser.characters);
        })
        .catch(function(error){
          console.log('ERROR ==> ', error);
        })
      }

      this.update = function(character){
        $http.put('/users/update', {character: character})
          .then(function(response){
            console.log(response);
          })
          .catch(function(error){
            console.log('ERROR ==> ', error);
          })
      }

      this.delete = function(character){
        return $http({
          url: `/users/delete/${character._id}`,
          method: 'DELETE',
          data: character
        })
        .then(function(reponse){
          console.log('DELETED');
        })
        .catch(function(error){
          console.log(error);
        })
      }



    }
})()
