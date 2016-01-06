$(function(){
//function to get links:

function getLinks(contentArray, url){
for(var j = 0; j < contentArray.length; j++){
    (function(index){
    $.getJSON('http://en.wikipedia.org//w/api.php?action=query&prop=info&format=json&titles='+ contentArray[index].title +'&continue=&callback=?', function(obj){
      //create hyperlink to page:
      url = Object.keys(obj.query.pages);
      if(contentArray[index].snippet !== undefined){
      data.append(
        "<a href='http://en.wikipedia.org/?curid=" + url + "' target='_blank'>" +
        "<div style='border: 1px solid black; margin: 5px; background-color: #FFF'>" +
        "<h3>" + contentArray[index].title + "</h3>" +
        "<p>" + contentArray[index].snippet + "</p>" +
        "</div></a>"
      );
    }
      else{
        data.append(
          "<a href='http://en.wikipedia.org/?curid=" + url + "' target='_blank'>" +
          "<div style='border: 1px solid black; margin: 5px; background-color: #FFF'>" +
          "<center><h3>" + contentArray[index].title + "</h3></center>" +
          "</div></a>"
        );
      }
    });
  })(j);
}
}


var query = $(".query");
var data = $(".data");


function updateSearch(){
    //reset search fields:
    data.html("");
    url = "";
    results = [];

//don't forget about &callback=? and its always better to do it this way
$.getJSON('http://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch='+ query.val().toString() +'&indexpageids=&srlimit=5&continue=&callback=?', function(obj){
//loop through pageids and dynamically create the html with all related info contained
for(var i = 0; i < obj.query.search.length; i++){
  results.push(obj.query.search[i]);
}
//retrive links and store info
getLinks(results, url);

}).error(function(){
  console.log("File not found!"); //Just in case something crazy happens and Wikimedia doesn't handle to 404 error
});
}


var url;
var results = []; //for getting the pageids and having other info

//every time the enter is pressed a new query is made
query.keyup(updateSearch);

var random = $(".random");
random.click(function(){
  //reset searching materials:
  data.html("");
  url = "";
  results = [];
  $.getJSON('http://en.wikipedia.org/w/api.php?action=query&list=random&format=json&rnnamespace=0&rnlimit=10&continue=&callback=?', function(obj){
    console.log(obj);
    for(var i = 0; i < obj.query.random.length; i++){
      results.push(obj.query.random[i]);
    }
    getLinks(results, url);
  });
});
});
