/**
 * Created by Administrator on 12/21/2015.
 */
angular.module("myApp")

    .controller("signinController", function ($scope, $http, $state) {

        $scope.signin = function () {

            $http({
                method: "post",
                url: "http://localhost:3000/signin",
                data: {user : $scope.user}
            }).then(function (res) {


                $scope.user = {};
                console.log(res.data.logedIn);
                if (res.data.logedIn) {
                    $state.go("dashboard");

                } else {

                    $scope.msg = "Invalid User Id or Password";
                }

            }, function (err) {
                console.log(err);

            });


        };

    });
