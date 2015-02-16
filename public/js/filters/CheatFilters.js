app.filter('cheat', function() {
    return function(potentialAnswers){
    	return potentialAnswers.filter(function(answer){
    		console.log(answer)
    		return answer.correct;
    	});
    };
});
