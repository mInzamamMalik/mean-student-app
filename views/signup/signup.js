/**
 * Created by Administrator on 12/20/2015.
 */
angular.module("myApp")

    .controller("signupController", function ($scope, $http) {

        $scope.saveuser = function () {

            $http({
                method: "post",
                url: "http://localhost:3000/usersave",
                data: {data: $scope.user}
            }).then(function (res) {


                $scope.user = {};
                console.log(res);



            }, function (err) {
                console.log(err);

            });


        };

    });
