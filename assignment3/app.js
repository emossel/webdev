(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', foundItemsDirective);

    function foundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItemsDirective.html',
            scope: {
                items: '<',
                onRemove: '&'
            }
        };

        return ddo;
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var vm = this;

        vm.removeItem = function (index) {
            vm.found.splice(index, 1);
        }

        vm.retrieveAndMatch = function (searchTerm) {
            MenuSearchService.getMatchedMenuItems(searchTerm).then(function (foundItems) {
                vm.found = foundItems;
            });
        }
    }

    MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            return $http.get("https://davids-restaurant.herokuapp.com/menu_items.json")
                .then(function (response) {
                    // process result and only keep items that match
                    var foundItems = response.data.menu_items.filter(function (obj) {
                        return !searchTerm || obj.description.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0;
                    });

                    // return processed items
                    return foundItems;
                });
        };

    }

})();
