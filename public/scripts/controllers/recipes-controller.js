(function(){
  'use strict';
  angular.module('app')
  .controller('RecipesController',function ($scope,dataService){
    //set dropdown to all by default
    $scope.categorySelect = 'all';
    dataService.getCategories().then(function(json){
      console.log(json)
      $scope.visible = true;
      $scope.categories = json;
      $scope.$apply()
    })
    $scope.selectByCategory= function(selectedCategory){

      if(selectedCategory === 'all'){
        getAllRecipes();
      }else{
        dataService.getRecipesByCategory(selectedCategory).then(resp=>{
          $scope.recipes = resp;
          $scope.$apply();
        })
      }
    }

    $scope.deleteSingleRecipe = function(id,index){
      dataService.deleteSingleRecipe(id).then(resp =>{
        console.log("deleted")
        $scope.recipes.splice(index,1);
        $scope.$apply();
      })
    }
    const getAllRecipes = function(){
      dataService.getRecipes().then(function (json){
        $scope.recipes = json;
        $scope.$apply();
      })
    }
    getAllRecipes();
  })
})();
