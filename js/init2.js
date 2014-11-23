

var votedata=null;
var w=null;
var h=null;
var svg=null;


function readData(){
  votedata = d3.csv.parse("./data/votemart.csv");
}



$(function(){
    readData();
    //設定邊界
    w = $(".svg:eq(0)").width();
    h = w*3/5 -90;
    $(".svg:eq(0)").height(h);
    svg = d3.select(".svg").append("svg").attr("width",w).attr("height",h);





});
