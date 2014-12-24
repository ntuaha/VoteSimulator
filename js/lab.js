
  (function(){


  var pop={"20":302633,"30":384349,"40":438306,"50":419795,"60":393467,"70+":376245};
  var vote_rate={"20":0.68,"30":0.78,"40":0.89,"50":0.89,"60":0.9,"70+":0.9};
  var supports = [
  {name:"柯文哲",no:7,color:"#777",party:"無",rate:{"20":0.538,"30":0.547,"40":0.406,"50":0.401,"60":0.381,"70+":0.282}},
  {name:"連勝文",no:6,color:"#428bca",party:"中國國民黨",rate:{"20":0.295,"30":0.183,"40":0.311,"50":0.307,"60":0.398,"70+":0.376}},
  {name:"馮光遠",no:5,color:"#777",party:"無",rate:{"20":0,"30":0.031,"40":0.008,"50":0,"60":0,"70+":0}}
  ];




    var app = angular.module('voteSimulator',[]);

    app.filter('percentage', ['$filter', function ($filter) {
      return function (input, decimals) {
        return $filter('number')(input * 100, decimals) + '%';
      };
    }]);
    app.controller('VoteSimulator',['$scope',function($scope){
      $scope.pops = pop;
      $scope.vote_rates = vote_rate;
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
      no_comment.color = "#aaa";
      $scope.supports.push(no_comment);

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
      $scope.getSimVoteCnt = function(support){
        var votes = 0;
        for (var i in support.rate){
          votes = votes + $scope.vote_rates[i]*$scope.pops[i] * support.rate[i];
        }
        return votes;
      }
      $scope.getSimVotePct = function(support){
        var votes = 0;
        var total_votes = 0;
        for (var i in support.rate){
          votes = votes + $scope.vote_rates[i]*$scope.pops[i] * support.rate[i];
          total_votes = total_votes + $scope.vote_rates[i]*$scope.pops[i];
        }
        return votes/total_votes;
      }
      $scope.getSimVotePctWidth = function(support){
        var votes = 0;
        var total_votes = 0;
        for (var i in support.rate){
          votes = votes + $scope.vote_rates[i]*$scope.pops[i] * support.rate[i];
          total_votes = total_votes + $scope.vote_rates[i]*$scope.pops[i];
        }
        return {width:(votes/total_votes)*100+"%","background-color":support.color};
      }



      //D3

      var dashBorard = new DashBoard("#dashboard",$scope.supports,$scope.vote_rates,$scope.pops);
      //Refresh Dashboard if parameters are updated.
      var list = ['supports','vote_rates','pops'];
      for (var i in list){
        $scope.$watch(list[i],function(){
          //histogram
          dashBorard.updateData($scope.supports,$scope.vote_rates,$scope.pops);
          dashBorard.hG.update(dashBorard.fData.map(function(v){
            return [v.State,v.total];}), dashBorard.barColor);
          //pei
          dashBorard.pC.update(dashBorard.tF);
          dashBorard.leg.update(dashBorard.tF);
        },true);
      }



    }]);

    app.directive("voteSimulator", function() {
      return{
        restrict:"A"
      };
    });




  })();
