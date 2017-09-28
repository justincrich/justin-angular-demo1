(function(){
  'use strict';

  const url = "http://localhost:5000/";

  angular.module('app')
    .service('dataService',function ($http){
      this.getRecipes = ()=>{
        return new Promise(function (res,rej){
          fetch(url+`api/recipes`)
            .then(function(response){
              res(response.json())
            })
        });
      }

      this.getCategories = ()=>{
        return new Promise((res,rej)=>{
          fetch(url+`api/categories`)
            .then(response => res(response.json()))
        })
      }

      this.getFoodItems = ()=>{
        return new Promise((res,rej)=>{
          fetch(url+`api/fooditems`)
            .then(response =>res(response.json()))
        })
      }

      this.getRecipesByCategory = (category)=>{
        return new Promise((res,rej)=>{
          fetch(url+`api/recipes?category=${category}`)
            .then(response => res(response.json()))
        })
      }

      this.getSingleRecipe = (id)=>{
        return new Promise((res,rej)=>{
          fetch(url+`api/recipes/${id}`)
            .then(response => res(response.json()))

        })
      }

      //update recepie
      this.updateSingleRecipe = (recipe)=>{
        return new Promise((res,rej)=>{
          console.log('update',recipe)
        })
      }

      //create recipe
      this.createRecipe = (recipe)=>{
        return new Promise((res,rej)=>{

          let init = {
            method:'post',
            body:angular.toJson(recipe),
            headers:{
              'Content-Type': 'application/json'
            }
          };
          var myRequest = new Request(url+`api/recipes`,init);
          fetch(myRequest)
          .then(response=>response.json())
          .then(json=>{
            res(json)
          })
          .catch(err=>{
            rej(err)
          })
        })
      }

      //create recipe
      this.updateRecipe = (recipe)=>{
        return new Promise((res,rej)=>{

          let init = {
            method:'put',
            body:angular.toJson(recipe),
            headers:{
              'Content-Type': 'application/json'
            }
          };
          var myRequest = new Request(url+`api/recipes/${recipe._id}`,init);
          fetch(myRequest)
          .then(response=>response.json())
          .then(json=>{
            res(json)
          })
          .catch(err=>{
            rej(err)
          })
        })
      }

      this.deleteSingleRecipe = (id)=>{
        return new Promise((res,rej)=>{
          let init = {method:'delete'};
          fetch(url+`api/recipes/${id}`,init)
            .then(response => res())
            //send back nothing because the api comes back w nothing
        })
      }

    })
})();
