/**
 * Created by Administrator on 12/18/2015.
 */



angular.module("myApp")

    .controller("studentRegistration", function ($scope, $http) {


        $scope.saveFrm = true;
        $scope.updateFrm = false;

        $scope.savestu = function () {

            $http({
                method: "post",
                url: "http://localhost:3000/",
                data: {data: $scope.student}
            }).then(function (res) {

                $scope.getAllStd();
                $scope.student = {};
                console.log(" resssss ", res);

                if (res.data.status == "error") {
                    console.log("fdfdffd")

                }


            }, function (err) {
                console.log(err);

            });


        };

        $scope.deletestu = function (stuid) {

            $http({
                method: "delete",
                url: "http://localhost:3000/delete/" + stuid + ""

            }).then(function (res, err) {

                if (res) {
                    $scope.getAllStd();

                    console.log(res);
                }
                if (err) {
                    console.log(err);
                }

            });
        };

        $scope.updatestu = function (stuid) {

            $http({
                method: "put",
                url: "http://localhost:3000/update/" + stuid + "",
                data: {data: $scope.student}
            }).then(function (res, err) {

                if (res) {
                    $scope.getAllStd();

                    console.log(res);
                }
                if (err) {
                    console.log(err);
                }

            });
        };

        $scope.geteditstu = function (data) {

            $scope.student = {};

            $scope.student._id = data._id;
            $scope.student.stu_id = data.stu_Id;
            $scope.student.stu_name = data.stu_Name;
            $scope.student.stu_age = data.Age;


            $scope.saveFrm = false;
            $scope.updateFrm = true;

        };


        $scope.getAllStd = function () {
            console.log("hit");

            $http({
                method: "get",
                url: "http://localhost:3000/"
            }).then(function (res, err) {

                if (err) {
                    console.log(err);
                } else {
                    $scope.list = res.data;

                    //setTimeout(function(){
                    //    $scope.getAllStd();
                    //},3000)
                }
            });

        };

        $scope.getAllStd();

    });

