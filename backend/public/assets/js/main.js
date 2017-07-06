(function(angular) {
    let app = angular.module('health', ['ui.router']);


    // app.config(['$qProvider', function($qProvider) {
    //     $qProvider.errorOnUnhandledRejections(false);
    // }]);


    app.factory('Auth', function($http) {
        return {
            async: function() {
                return $http.get('/api/user');
            }
        }
    });

    app.run(function($rootScope, Auth) {
        Auth.async().then(function(auth) {
            auth = auth.data;
            $rootScope.user = auth;
            $rootScope.isAuth = function() {
                return auth._id ? 1 : 0;
            };
        });
    });


    app.config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: '/static/page/index.html',
                controller: 'HomeCtrl'
            })
            .state('login', {
                url: '/login',
                templateUrl: '/static/page/login.html',
                controller: 'LoginCtrl'
            })
            .state('register', {
                url: '/register',
                templateUrl: '/static/page/register.html',
                controller: 'RegisterCtrl'
            });
    });


    // Controller
    app.controller('HomeCtrl', function($scope, $rootScope, $state) {
        /*
        if (!$rootScope.isAuth()) {
            $state.go('login');
        } 
        */
        
        // Real time
        socket.on('data', function(data) {
            data = JSON.parse(data);
            // $scope.chat.push(data);
            $scope.$digest();
        });

        // socket.emit('',{});




    });

    app.controller('LoginCtrl', function($scope, $state, $http) {
        $scope.form = {};
        $scope.submit = function() {
            if ($scope.form.email && $scope.form.password) {

                console.log($scope.form);

                $http.post(
                    '/api/user/login',
                    $scope.form, {
                        headers: { 'Content-Type': 'application/x-www-formurlencoded' }
                    }
                ).then(function(data) {
                    data = data.data;
                    if (data.success == 1) {
                        $state.go('/index');
                    }
                });
            }
        }
    });

    // Controller
    app.controller('RegisterCtrl', function($scope, $state, $http) {
        $scope.form = {};
        $scope.submit = function() {
            if ($scope.form) {
                $http.post(
                    '/api/user/signup',
                    $scope.form, {
                        headers: { 'Content-Type': 'application/x-www-formurlencoded' }
                    }
                ).then(function(data) {
                    console.log(data);
                    /*
                    data = data.data;
                    if (data.success == 1) {
                        $.notify({
                            icon: 'glyphicon glyphicon-star',
                            title: 'Амжилттай !!!',
                            message: data.text
                        });
                        $state.go('/login');
                    } else {
                        $.notify({
                            icon: 'glyphicon glyphicon-star',
                            title: 'Алдааны мэдээлэл',
                            message: data.text
                        });
                    }
                    */
                });
            }
        }

    });



}(angular));
