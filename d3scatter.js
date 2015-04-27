var margin = {top: 20, right: 20, bottom: 30, left: 50};
    var w = window.innerWidth - margin.left - margin.right;
    var h = window.innerHeight- margin.top - margin.bottom;
    //var w = 960 - margin.left - margin.right;
    //var h = 570- margin.top - margin.bottom;
var data = [
  {name: "A", type: "tech", price: 999, tValue: 500, vol: 1200},
  {name: "B", type: "transp", price: 772, tValue: 800, vol: 367},
  {name: "C", type: "transp", price: 372, tValue: 670, vol: 558},
  {name: "D", type: "tech", price: 774, tValue: 801, vol: 431},
  {name: "E", type: "retail", price: 389, tValue: 130, vol: 123},
  {name: "F", type: "fastfood", price: 739, tValue: 888, vol: 45},
  {name: "G", type: "fastfood", price: 582, tValue: 230, vol: 999},
  {name: "H", type: "tech", price: 972, tValue: 284, vol: 87},
  {name: "I", type: "pharm", price: 791, tValue: 609, vol: 449},
  {name: "J", type: "pharm", price: 291, tValue: 701, vol: 870},
  {name: "K", type: "transp", price: 134, tValue: 921, vol: 699},
  {name: "L", type: "retail", price: 532, tValue: 731, vol: 1002},
  {name: "M", type: "retail", price: 788, tValue: 631, vol: 310}
];

var dataset = data;

//var col = d3.scale.category10();
var col = d3.scale.linear()     
  .domain([45, 1200])     
  .range(["white", "black"]);

var svg = d3.select("body").append("svg")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scale.linear()
        .domain([0, 1000])
        .range([0, w]);

var y = d3.scale.linear()
        .domain([0, 1000])
        .range([h, 0]);

var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom")

var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left")

svg.append("g")
  .attr("class","axis")
  .attr("transform", "translate(0," + h + ")")
  .call(xAxis)
  .append("text")
  .attr("x",w)
  .attr("y",-6)
  .style("text-anchor","end")
  .text("Price")

svg.append("g")  
  .attr("class", "axis")    
  .call(yAxis)      
  .append("text")   
  .attr("transform", "rotate(-90)")  
  .attr("y", 6)  .attr("dy", ".71em")         
  .style("text-anchor", "end")          
  .text("True Value");

var circles = svg.selectAll("circle")
 .data(data)
 .enter()
 .append("circle")
    .attr("cx", function(d) { return x(d.price);  })
    .attr("cy", function(d) { return y(d.tValue);  })
    .attr("r", 4)
    .style("fill", function(d){return col(d.vol);})
    .style("stroke", "black")
    .style("opacity", 0.5)
    //.on("mouseover", function(d,i){ d3.select(this).attr(“r”, 8); })
    //.on("mouseout", function(d,i){ d3.select(this).attr(“r”, 4); })

$(function() { 
  $( "#vol" ).slider({
    range: true,
    min:  0, 
    max: maxVol, 
    values: [ 0, maxVol ],       
    slide: function( event, ui ) {
      $( "#volamount" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
      filterData("vol", ui.values); }  });                                                   
  $( "#volamount" ).val( $( "#vol" ).slider( "values", 0 ) +    
    " - " + $( "#vol" ).slider( "values", 1 ) );   });

var attributes = ["vol", "price", ...];
var ranges = [[0,maxVol], [0, maxPrice]];

function filterData(attr, values) {
  for(i=0; i < attributes.length; i++) {
    if (attr == attributes[i]) {
      ranges[i] = values;
    }
  }
  var toViz = dataset.filter(function(d)) {
    for (i = 0; i < attributes.length; i++) {
      return d[attributes[i]] >= ranges[i][0] && d[attributes[i]] <= ranges[i][1];
    }
  });
  drawVis(toViz);
}






