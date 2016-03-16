/**
  * Constructor – Create an object for the constructor methods
  * TODO: _ http://bl.ocks.org/benjchristensen/2657838
  *       - http://bl.ocks.org/mbostock/1256572
  *       - http://kyrandale.com/viz/d3-smartphone-walking.html (Really nice for debuggin accel ) explore this
  *       - http://bl.ocks.org/mbostock/3970883 (REally nice example of threshold encoding)
  * @class Grapher – 
  * @param {String} – type. What type of graph.
  *
  */

var DummyData = [
{"date":"24-Apr-07" , "close":	93.24},
{"date":"25-Apr-07" , "close":	95.35},
{"date":"26-Apr-07" , "close":	98.84},
{"date":"27-Apr-07" , "close":	99.92},
{"date":"30-Apr-07" , "close":	99.80},
{"date":"1-May-07"  , "close":  99.47},
{"date":"2-May-07"  , "close":  100.39},
{"date":"3-May-07"  , "close":  100.40},
{"date":"4-May-07"  , "close":  100.81},
{"date":"7-May-07"  , "close":  103.92},
{"date":"8-May-07"  , "close":  105.06},
{"date":"9-May-07"  , "close":  106.88},
{"date":"10-May-07" , "close":	107.34},
{"date":"11-May-07" , "close":	108.74},
{"date":"14-May-07" , "close":	109.36},
{"date":"15-May-07" , "close":	107.52},
{"date":"16-May-07" , "close":	107.34},
{"date":"17-May-07" , "close":	109.44},
{"date":"18-May-07" , "close":	110.02},
{"date":"21-May-07" , "close":	111.98},
{"date":"22-May-07" , "close":	113.54},
{"date":"23-May-07" , "close":	112.89},
{"date":"24-May-07" , "close":	110.69},
{"date":"25-May-07" , "close":	113.62},
{"date":"29-May-07" , "close":	114.35},
{"date":"30-May-07" , "close":	118.77},
{"date":"31-May-07" , "close":	121.19},
{"date":"1-Jun-07"  , "close":  118.40},
{"date":"4-Jun-07"  , "close":  121.33},
{"date":"5-Jun-07"  , "close":  122.67},
{"date":"6-Jun-07"  , "close":  123.64},
{"date":"7-Jun-07"  , "close":  124.07},
{"date":"8-Jun-07"  , "close":  124.49},
{"date":"11-Jun-07" , "close":	120.19},
{"date":"12-Jun-07" , "close":	120.38},
{"date":"13-Jun-07" , "close":	117.50},
{"date":"14-Jun-07" , "close":	118.75},
{"date":"15-Jun-07" , "close":	120.50},
{"date":"18-Jun-07" , "close":	125.09},
{"date":"19-Jun-07" , "close":	123.66},
{"date":"20-Jun-07" , "close":	121.55},
{"date":"21-Jun-07" , "close":	123.90},
{"date":"22-Jun-07" , "close":	123.00},
{"date":"25-Jun-07" , "close":	122.34},
{"date":"26-Jun-07" , "close":	119.65},
{"date":"27-Jun-07" , "close":	121.89},
{"date":"28-Jun-07" , "close":	120.56},
{"date":"29-Jun-07" , "close":	122.04},
{"date":"2-Jul-07"  , "close":  121.26},
{"date":"3-Jul-07"  , "close":  127.17},
{"date":"5-Jul-07"  , "close":  132.75}
];
// DummyData =  DummyData.reduce(function(o, v, i) {
//           o[i] = v;
//           return o;
//         }, {});

  Grapher = function (type){
    console.log("Inside new Grapher class");
    // P U B L I C
    var self = this;
    self.margin = {top: 20, right: 20, bottom: 30, left: 50};
    self.width = 960 - self.margin.left - self.margin.right;
    self.height = 500 - self.margin.top - self.margin.bottom;
    // P R I V A T E
    // formatDate("%d-%b-%y");
    self.dateFormat = "%d-%b-%y";
    // var formatDate = d3.time.format("%d-%b-%y");

    var x = d3.time.scale()
        .range([0, self.width]);

    var y = d3.scale.linear()
        .range([self.height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var line = d3.svg.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.close); });

    var svg = d3.select("#graph").append("svg")
        .attr("width", self.width + self.margin.left + self.margin.right)
        .attr("height", self.height + self.margin.top + self.margin.bottom)
      .append("g")
        .attr("transform", "translate(" + self.margin.left + "," + self.margin.top + ")");
    // self.onDataReceived(function(){
    //   console.log("jkasdfksj");
    // })
    // Listen for the event.
    // self.onDataReceived(){
    //
    // }
//     document.addEventListener('dataLine', function (e) {
//       // console.log("New line: ", e.data)
//       // convert into an object
//       var data = e.data.reduce(function(o, v, i) {
//                 o[i] = v;
//                 return o;
//               }, {});
//
//       data.date = new Date().getTime();
//       data.close = Math.random() * 100;
//         if (e.error) throw e.error;
// console.log(data);
//         // x.domain(d3.extent(data, function(d) { return parseInt(d["0"]); }));
//         // y.domain(d3.extent(data, function(d) { return parseInt(d["1"]); }));
//         x.domain(d3.extent(data, function(d) { return d.date; }));
//         y.domain(d3.extent(data, function(d) { return d.close; }));
//
//         svg.append("g")
//             .attr("class", "x axis")
//             .attr("transform", "translate(0," + self.height + ")")
//             .call(xAxis);
//
//         svg.append("g")
//             .attr("class", "y axis")
//             .call(yAxis)
//           .append("text")
//             .attr("transform", "rotate(-90)")
//             .attr("y", 6)
//             .attr("dy", ".71em")
//             .style("text-anchor", "end")
//             .text("Price ($)");
//
//         svg.append("path")
//             .datum(data)
//             .attr("class", "line")
//             .attr("d", line);
//     }, false);




    d3.tsv("data.tsv", self.formatIncomingData, function(error, data) {
      if (error) throw error;
      console.log(data);



    // for (var i = 0; i < DummyData.length; i++) {
      // console.log(DummyData[i])
      // data = DummyData[i];
      x.domain(d3.extent(data, function(d) { return d.date; }));
      y.domain(d3.extent(data, function(d) { return d.close; }));

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + self.height + ")")
          .call(xAxis);

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Price ($)");

      svg.append("path")
          .datum(data)
          .attr("class", "line")
          .attr("d", line);
    // }

    });











    function type(d) {
      d.date = d3.time.format("%d-%b-%y").parse(d.date);
      d.close = +d.close;
      return d;
    }
  }
Grapher.prototype.ffff = d3.time.format;
/**
  * @method formatIncomingData - converts string in to integer or floats and assigns
  *                              them to their right column.
  */
Grapher.prototype.formatIncomingData = function(d){
    d.date = d3.time.format("%d-%b-%y").parse(d.date);
    d.close = +d.close;
    return d;
};
Grapher.prototype.onReceive = function(e){
  console.log("Grapher on receive ", e);
}
// Grapher.prototype.onDataReceived =onReceive;

Grapher.prototype.bar = function(){
  // console.log(this.ffff("dd"))
};

$(document).ready(function(){
  // thisGraph = new Grapher();
typeOne();
});


$('body').on('keypress', function(e){
  console.log("Keypress", e.keyCode);
  switch(e.keyCode){
    case 49: break;//1
    case 50: break;//2
    case 51: break;//3
    default: break;//Any
  }
});

function typeOne() {
  console.log("type one");
  var n = 40,
    random = d3.random.normal(0, 0.2),
    data = DummyData;//d3.range(n).map(random);

var margin = {top: 20, right: 20, bottom: 20, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .domain([0, n - 1])
    .range([0, width]);

var y = d3.scale.linear()
    .domain([-1, 1])
    .range([height, 0]);

var line = d3.svg.line()
    .x(function(d, i) { return x(i); })
    .y(function(d, i) { return y(d); });

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("defs").append("clipPath")
    .attr("id", "clip")
  .append("rect")
    .attr("width", width)
    .attr("height", height);

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + y(0) + ")")
    .call(d3.svg.axis().scale(x).orient("bottom"));

svg.append("g")
    .attr("class", "y axis")
    .call(d3.svg.axis().scale(y).orient("left"));

var path = svg.append("g")
    .attr("clip-path", "url(#clip)")
  .append("path")
    .datum(data)
    .attr("class", "line")
    .attr("d", line);

  tick();

  function tick() {

    // push a new data point onto the back
    data.push(random());

    // redraw the line, and slide it to the left
    path
        .attr("d", line)
        .attr("transform", null)
      .transition()
        .duration(500)
        .ease("linear")
        .attr("transform", "translate(" + x(-1) + ",0)")
        .each("end", tick);

    // pop the old data point off the front
    data.shift();
  }
}




/**
  * @method clearData - Takes on an Array of objects and wipe clear all its values
  */
function clearData(){
  for (var i = 0; i < this.data.length; i++) {
    for (var data in this.data[i]) {
      if (this.data[i].hasOwnProperty(data)) {
        switch (typeof this.data[i][data]) {
          case "number":
              this.data[i][data] = (data === "heart rate")? this.min : 0;
            break;
            case "object":
              for (var key in this.data[i][data]) {
                if (this.data[i][data].hasOwnProperty(key)) {
                  if(this.data[i][data].value !== undefined ){
                    this.data[i][data].value = this.data[i][data].min
                  }
                  // this.data[i][data][key] = (this.data[i][data][key].min !== undefined)? this.data[i][data][key].min: 0 ;
                }
              }
            break;
            case "string":
              this.data[i][data] = "";
            break;
          default:
        }
      }
    }
  }
}
