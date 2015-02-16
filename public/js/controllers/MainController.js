
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