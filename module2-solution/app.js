(function(){
	'use strict';
	 angular.module("ShoppingListCheckOff",[])
	 .controller("ToBuyController", toBuyController)
	 .controller("AlreadyBoughtController", alreadyBoughtController)
	 .service("ShoppingListCheckOffService",ShoppingListCheckOffService)

	 toBuyController.$inject =['ShoppingListCheckOffService'];
	 function toBuyController(ShoppingListCheckOffService){
	 	this.itemsToBuy = ShoppingListCheckOffService.getToBuyItems();

	 	this.buy = function(index){
	 		ShoppingListCheckOffService.buyItem(index);
	 	};
	 }


	 alreadyBoughtController.$inject=['ShoppingListCheckOffService'];
	 function alreadyBoughtController(ShoppingListCheckOffService){
	 	this.itemsBought = ShoppingListCheckOffService.getAlreadyBoughtItems();
	 }

	 function ShoppingListCheckOffService(){
	 	var toBuyItem = [{"name":"Chocolate cookies","quantity":10},
	 				{"name":"Vanilla Ice cream","quantity":6},
	 				{"name":"Pizza","quantity":1},
	 				{"name":"Soft drink","quantity":7},
	 				{"name":"Champagne","quantity":10},
	 				{"name":"Chicken Tigh","quantity":12}];

	 	var alreadyBought = [];

	 	this.getToBuyItems =  function(){

	 		return toBuyItem;
	 	};

	 	this.getAlreadyBoughtItems= function (){
	 		return alreadyBought;
	 	}

	 	this.buyItem = function (index){
	 		alreadyBought.push(toBuyItem[index]);
	 		toBuyItem.splice(index,1);

	 	};
	 }
})();