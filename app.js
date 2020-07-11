(function(){
	'use strict';

	angular.module("LunchCheck",[])
	.controller("LunchCheckController", LunchCheckController);

	LunchCheckController.$inject=['$scope'];

	function LunchCheckController($scope){
		$scope.lunchItems ='';

		$scope.checkNumberOfItems = function(){
			//Input field must not be null
			if($scope.lunchItems!=""){
				//get list  of  items from string
				var items = $scope.lunchItems.split(',');
				//remove empty items in between comma
				items = items.filter(Boolean);
				//store number of items in scope variable
				$scope.numberOfItems = items.length;
				
				//if number of items is between 1-3
				if( $scope.numberOfItems>0 && $scope.numberOfItems<=3){
					$scope.message = "Enjoy!";
				}
				//if number of items is more than 3
				else if($scope.numberOfItems>3){
					$scope.message ="Too much!";
				}
				//if number of items is 0
				else if ($scope.numberOfItems==0){
					$scope.message ="Please enter data first!";
				}
			}
			//when the input field is empty
			else
			{
				$scope.message ="Please enter data first!";
			}
			

		}

		
	}
})();