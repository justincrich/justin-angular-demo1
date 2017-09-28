(function(){
  'use strict';
  angular.module('app')
  .controller('RecipeDetailController',function ($scope,$routeParams,$location,dataService){

    if(typeof $routeParams.id != 'undefined'){
      //load only if we are opening a previously created item
      $scope.type = 'update';
      dataService.getSingleRecipe($routeParams.id).then(resp=>{
        $scope.recipe = resp;
        $scope.$apply();
      })
    }else{
      //create new recepie object if it's a new item
      $scope.type = 'new';
      $scope.recipe = {
        ingredients:[],
        steps:[],
        name:'',
        description:'',
        category:'',
        prepTime:'',
        cookTime:''
      }
    }

    $scope.saveRecipe = function(){
      if($scope.type === 'new'){
        //create new
        dataService.createRecipe($scope.recipe)
        .then((result)=>{
          $location.path('/');
          $scope.$apply();
        });

      }else{
        //save current
        dataService.updateRecipe($scope.recipe)
          .then(result=>{
            $location.path('/');
            $scope.$apply();
          });
      }
    }

    $scope.cancelRecipe = ()=>{
      $location.path('/')
    }

    $scope.setCategory = ()=>{
      $scope.recipe.category = $scope.categorySelected.name;
    }

    $scope.deleteIngredient = function (ingredient){
      let index = $scope.recipe.ingredients.findIndex(item =>{
        return item.foodItem === ingredient.foodItem;
      });
      $scope.recipe.ingredients.splice(index,1);

    }

    $scope.addIngredient = function (){

      $scope.recipe.ingredients.push({});
    }

    dataService.getCategories().then(function(json){
      $scope.categories = json;
      //check if we are editing a recipe
      if(typeof $scope.recipe != 'undefined'){
        let index = $scope.categories.findIndex(cat =>{
          return cat.name === $scope.recipe.category;
        })
        $scope.categorySelected = $scope.categories[index];
      }
      $scope.$apply();
    })

    dataService.getFoodItems().then(function(json){
      $scope.foodItems = json;
      $scope.$apply()
    });

    $scope.deleteStep = function(step){
      console.log(step)
      $scope.recipe.steps.splice(step,1);
    };
    $scope.addStep = function (){
      $scope.recipe.steps.push({});
    }


  })
})();
