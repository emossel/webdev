(function () {
    'use strict';
    
    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);
    
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
      var controller = this;
      controller.toBuyList = ShoppingListCheckOffService.toBuy;
      
      controller.buy = function (item) {
        ShoppingListCheckOffService.buy(item);
      } 
    }                   
    
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
      var controller = this;
      controller.alreadyBoughtList = ShoppingListCheckOffService.alreadyBought;
    }
    
    function ShoppingListCheckOffService() {
      var service = this;
      
      service.toBuy = [{name: 'orange juice', quantity: 2}, 
                   {name: 'bottle of wine', quantity: 1},
                   {name: 'pizza', quantity: 4},
                   {name: 'yoghurt', quantity: 2},
                   {name: 'salad', quantity: 3}
                  ];
                  
      service.alreadyBought = [];
      
      service.buy = function (item) {
        var index = service.toBuy.indexOf(item);
        if (index > -1) {
          service.toBuy.splice(index, 1);
          service.alreadyBought.push(item);
        }
      
      }                  
                  
    }

})();

