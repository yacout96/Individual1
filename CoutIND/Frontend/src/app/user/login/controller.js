var app= angular.module('mainApp',['ngRoute']);

app.config(function($routeProvider)
{
    $routeProvider
        .when('/', {templateUrl: 'Login.html'})
        .when('/home', {templateUrl: 'home.html'})
        .otherwise({redirectTo:'/'});
});


app.controller('loginControl',function($scope,$location)
{
    $scope.submit=function()
    {
        var username=$scope.username;
        var password=$scope.password;
        $location.path('/home');
    };
});