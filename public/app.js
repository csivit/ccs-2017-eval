var routerApp = angular.module('routerApp', ['ui.router', 'ngMaterial', 'md.data.table']);

routerApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home/tech');

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'partial-home.html'
        })
        .state('home.details', {
            url: '/:type',
            templateUrl: 'partial-home-list.html',
            controller: 'tableController'
        })
        .state('evaluate', {
            url: '/evaluate/:userId',
            templateUrl: 'partial-evaluate.html',
            controller: 'evaluateController'
        })
});

routerApp.controller('tableController', function ($scope, $stateParams, $http) {

    $scope.message = $stateParams.type;
    $scope.responses = [];

    $scope.getQuestionSets = function(){
        $http.get('/responses/' + $stateParams.type)
        .then(function(response){
            console.log(response.data);
            $scope.responses = response.data;
        })
    }

    $scope.submitAndContinue = function(){

    }

    $scope.getQuestionSets();

    $scope.query = {
    order: 'name',
    limit: 5,
    page: 1
  };
});

routerApp.controller('evaluateController', function ($scope, $state, $stateParams, $http) {
    $scope.rating = 0;

    $scope.getQuestions = function(){
        $http.get('/response/' + $stateParams.userId)
        .then(function(response){
            $scope.questions = response.data._questions;
            $scope.answers = response.data.answers;
            $scope.user = response.data._user;
            $scope.type = response.data.type;
            $scope.id = response.data._id;
        })
    }

    $scope.getQuestions();
    $scope.submitRating = function(){
        var data = {
            type: $scope.type,
            rating: $scope.rating,
            id: $scope.id
        }

        $http
        .post('/submit', data)
        .then(function(response){
            $state.go('evaluate', {userId: response.data.id})
        })
    };
})