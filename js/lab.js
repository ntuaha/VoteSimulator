  /*
  {"age":20,"No5":0,"No6":0.295,"No7":0.538,"NoComment":0.167,"pop":302633,"voterate":0.68 },
{"age":30,"No5":0.031,"No6":0.183,"No7":0.547,"NoComment":0.239,"pop":384349,"voterate":0.78 },
{"age":40,"No5":0.008,"No6":0.311,"No7":0.406,"NoComment":0.275,"pop":438306,"voterate":0.89 },
{"age":50,"No5":0,"No6":0.307,"No7":0.401,"NoComment":0.292,"pop":419795,"voterate":0.89 },
{"age":60,"No5":0,"No6":0.398,"No7":0.381,"NoComment":0.221,"pop":393467,"voterate":0.9 },
{"age":70,"No5":0,"No6":0.376,"No7":0.282,"NoComment":0.342,"pop":376245,"voterate":0.9 }
  */
  //Data




  (function(){


  var pop={"20":302633,"30":384349,"40":438306,"50":419795,"60":393467,"70+":376245};
  var vote_rate={"20":0.68,"30":0.78,"40":0.89,"50":0.89,"60":0.9,"70+":0.9};
  var supports = [
  {name:"柯文哲",no:7,party:"無",rate:{"20":0.538,"30":0.547,"40":0.406,"50":0.401,"60":0.381,"70+":0.282}},
  {name:"連勝文",no:6,party:"中國國民黨",rate:{"20":0.295,"30":0.183,"40":0.311,"50":0.307,"60":0.398,"70+":0.376}},
  {name:"馮光遠",no:5,party:"無",rate:{"20":0,"30":0.031,"40":0.008,"50":0,"60":0,"70+":0}}
  ];




    var app = angular.module('voteSimulator',[]);
/*
    var VoteSimulator = function($scope){
      $scope.pops = pop;
      $scope.vote_rates = vote_rate;

      $scope.getVotePop = function(i){
        console.log( "T"+$scope.pops[i] * $scope.vote_rates[i]);
        return $scope.pops[i] ;
      }


      $scope.supports = support;
      $scope.no_comment = {name:"不表態",no:0,party:"無"};
      var rate = {"20":0,"30":0,"40":0,"50":0,"60":0,"70+":0};
      for (var i in $scope.support){
        for (var j in rate){
          rate[j] = rate[j] + $scope.support[i].rate[j];
        }
      }
      for (var j in rate){
        rate[j] = 1 - rate[j];
      }
      $scope.no_comment.rate = rate;
    };
    */

    app.controller('VoteSimulator',['$scope',function($scope){
      $scope.pops = pop;
      $scope.vote_rates = vote_rate;

      $scope.getVotePop = function(i){
        console.log( "T"+$scope.pops[i] * $scope.vote_rates[i]);
        return $scope.pops[i] * $scope.vote_rates[i] ;
      }
      $scope.setVoteRate = function(i,v){$scope.vote_rates[i] = +v;}
      $scope.setPop = function(i,v){$scope.pops[i] = +v;}
      $scope.setSupportRate = function(support,key,v){

        $scope.supports[$scope.supports.length-1].rate[key] = $scope.supports[$scope.supports.length-1].rate[key] + support.rate[key]-v;
        support.rate[key] = +v;
      }


      $scope.supports = supports;
      var no_comment = {name:"不表態",no:0,party:"無"};
      var rate = {"20":0,"30":0,"40":0,"50":0,"60":0,"70+":0};
      for (var i in $scope.supports){
        for (var j in rate){
          rate[j] = rate[j] + $scope.supports[i].rate[j];
        }
      }
      for (var j in rate){
        rate[j] = 1 - rate[j];
      }
      no_comment.rate = rate;
      $scope.supports.push(no_comment);



    }]);

    app.directive("voteSimulator", function() {
      return{
        restrict:"A"
      };
    });



  })();
