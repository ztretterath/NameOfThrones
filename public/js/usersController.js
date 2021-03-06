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
          console.log('ERROR ==> ', error);
        })

      // Query API by ID
      self.query = function(response){
        var char = response;
        return $http({
          url: '/helpers/got',
          method: 'POST',
          data: {char: char}
        })
        .then(function(char){
          self.charInfo = {};
          self.charInfo.name = char.data.name
          self.charInfo.dob = char.data.born
          self.charInfo.alias = char.data.aliases[0]
          self.charInfo.playedBy = char.data.playedBy[0]
          return self.charInfo
        })
        .catch(function(error){
          console.log('ERROR ==> ', error);
        })
      }

      // Helper to get characters
      self.getChars = function(characters){
        return $http({
          url: '/users/getChars',
          method: 'GET',
          data: characters
        })
        .then(function(response){
          self.currentUser.characters = response.data.characters;
        })
        .catch(function(error){
          console.log('ERROR ==> ', error);
        })
      }

      // Create new instance of user
      self.createUser = function(user){
        return $http({
          url: '/users/signup',
          method: 'POST',
          data: user
        })
        .then(function(response){
          $state.go('login', {url: '/login'})
        })
        .catch(function(error){
          console.log('ERROR ==> ', error);
        })
      }

      // Registered user login
      self.login = function(user){
        return $http({
          url: '/users/login',
          method: 'POST',
          data: user
        })
        .then(function(response){
          self.currentUser = response.data.user
          $state.go('profile', {url: '/profile'});
        })
        .catch(function(error){
          console.log('ERROR ==> ', error);
        })
      }

      // Registered user logout
      self.logout = function(user){
        return $http({
          url: '/users/logout',
          method: 'DELETE',
          data: user
        })
        .then(function(response){
          self.currentUser = ''
          $state.go('home', {url: '/'})
        })
        .catch(function(error){
          console.log('ERROR ==> ', error);
        })
      }

      //Add Character
      self.add = function(character){
        return $http({
          url: '/users/add',
          method: 'POST',
          data: character
        })
        .then(function(response){
          self.currentUser.characters.push(character);
          self.getChars();
        })
        .catch(function(error){
          console.log('ERROR ==> ', error);
        })
      }

      // Update existing character
      self.update = function(character){
        $http.put('/users/update', {character: character})
          .then(function(response){
            self.getChars();
          })
          .catch(function(error){
            console.log('ERROR ==> ', error);
          })
      }

      // Delete existing character
      self.delete = function(character){
        return $http({
          url: `/users/delete/${character._id}`,
          method: 'DELETE',
          data: character
        })
        .then(function(reponse){
          self.getChars();
        })
        .catch(function(error){
          console.log('ERROR ==> ', error);
        })
      }

    }
})()
