/**
 * Created by Administrator on 12/18/2015.
 */
angular.module("myApp", ["ngMaterial", "ui.router"])

    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");

        $stateProvider

            .state("/", {
                url: "/",
                templateUrl: "views/stureg/stureg.html",
                controller: "studentRegistration"
            })
            .state("/signup", {
                url: "/signup",
                templateUrl: "views/signup/signup.html",
                controller: "signupController"
            })
            .state("/signin", {
                url: "/signin",
                templateUrl: "views/signin/signin.html",
                controller: "signinController"
            })

            .state("/welcome", {
                url: "/welcome",
                templateUrl: "views/welcome/welcome.html"

            })

            .state("dashboard", {
                url: "/dashboard",
                templateUrl: "views/dashboard/dashboard.html",
                controller: "dashboardController"

            })
    });