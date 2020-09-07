 
(function(){
	'use strict';

	angular.module('NarrowItDownApp',[])
	.controller('NarrowItDownController',NarrowItDownController)
	.service('MenuSearchService',MenuSearchService)
	.directive('foundItems',FoundItems)
	.constant('ApiBasePath',"https://davids-restaurant.herokuapp.com");

	NarrowItDownController.$inject=['MenuSearchService']
	function NarrowItDownController (MenuSearchService){
		var ctrl=this;
		ctrl.error="";
			
		ctrl.narrowItems = function(){
			var promise= MenuSearchService.getMatchedMenuItems();
			promise.then(function(result){

				var data = result.data;
				ctrl.found=[];
				ctrl.removedItems=[]

				if(ctrl.searchItem=="" || ctrl.searchItem==null){
					console.log('error detected');
					ctrl.error="Nothing  Found";
					return;
				}else{
					for (var i = data.menu_items.length - 1; i >= 0; i--) {
					if (data.menu_items[i].name.includes(ctrl.searchItem))
					{
						ctrl.found.push(data.menu_items[i]);
						ctrl.error="";
					}
				}
				}
				
				
				if(ctrl.found.length==0){
					ctrl.error="Nothing  Found";
				}
				// return itemsFound;
			});

		}; 

		// remove item
		ctrl.removedItems=[]
		ctrl.removeItem=function(index){
			ctrl.removedItems.push(ctrl.found[index]);
			ctrl.found.splice(index,1);
		}

	}

	MenuSearchService.$inject=['$http','ApiBasePath'];
	function MenuSearchService($http,ApiBasePath){
		var service = this;
		service.itemsFound=[];
		this.getMatchedMenuItems = function(){
			var menuItems = $http({
				method:"GET",
				url:(ApiBasePath+"/menu_items.json")
			});

			return menuItems;
		}
	}

	function FoundItems(){
		var ddo={			
			templateUrl:'foundItems.html',
			scope:{
				list:'<found',
				onRemove:'&'
			}
		};

		return ddo;
	}
})();