var app = angular.module('FlashCards', []);

app.factory('FlashCardsFactory', function ($http) {
    return { 
        getFlashCards: function(category){
            var queryParams = {};

            if (category) {
                queryParams.category = category;
            }

            return $http.get('/cards', {
                params: queryParams
            }).then(function (response) {
                return response.data;
            });
        }
    };
});

app.controller('MainController', function ($scope, FlashCardsFactory) {

    FlashCardsFactory.getFlashCards().then(function(cards){
        $scope.flashCards = cards;
    });

    $scope.categories = [
        {
            name:'MongoDB',
            clicked:false
        },
        {
            name:'Express',
            clicked:false},
        {
            name:'Angular',
            clicked:false
        },
        {
            name:'Node',
            clicked:false
        }
    ];
    $scope.reset = function(){
        $scope.categories.forEach(function(cat){
            cat.clicked = false;
        });
        FlashCardsFactory.getFlashCards().then(function(cards){
            $scope.flashCards = cards;
        });
    }

    $scope.getCategoryCards = function(category){
        $scope.categories.forEach(function(cat){
            cat.clicked = false;
        });

        FlashCardsFactory.getFlashCards(category.name).then(function(cards){
            $scope.flashCards = cards;
            category.clicked = true;
        });
    };

});


app.controller('FlashCardController', function ($scope, ScoreFactory) {

    $scope.answered = false;
    $scope.answeredCorrectly = null;

    $scope.answerQuestion = function (answer) {

        if ($scope.answered) {
            return;
        }

        $scope.answered = true;
        $scope.answeredCorrectly = answer.correct;
        if (answer.correct){
            ScoreFactory.correct++            
        }else{
            ScoreFactory.incorrect++            
        }
    };

});

app.controller("StatsController", function($scope, ScoreFactory){
    $scope.scores = ScoreFactory

})
app.factory("ScoreFactory", function(){
    return {
        correct: 0,
        incorrect: 0
    };

})