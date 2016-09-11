(function () {
    'use strict';
    
    angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);
    
    LunchCheckController.$inject = ['$scope', '$filter'];
    function LunchCheckController($scope) {
        
        $scope.calculateIfTooMuch = function() {
            var numItems = numberOfCommaSeparatedItems($scope.userInput);
            var message;
            if (numItems == 0) {
                message = "Please enter data first";
            } else if (numItems > 3) {
                message = "Too much!";
            } else {
                message = "Enjoy!";
            }
            
            $scope.message = message;
        }
        
        function numberOfCommaSeparatedItems(string) {
            return string.trim().split(',').length;
        }
    }
    
})();
