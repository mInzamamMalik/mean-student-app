/**
 * Created by Administrator on 12/21/2015.
 */
angular.module("myApp")

    .controller("signinController", function ($scope, $http) {

        $scope.signin = function () {

            $http({
                method: "post",
                url: "http://localhost:3000/signin",
                data: {user : $scope.user}
            }).then(function (res) {


                $scope.user = {};
                console.log(res);



            }, function (err) {
                console.log(err);

            });


        };

    });
