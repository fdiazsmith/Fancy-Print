/**
  * Constructor – Create an object for the constructor methods
  * EXPLORE: _ http://bl.ocks.org/benjchristensen/2657838
  *          - http://bl.ocks.org/mbostock/1256572
  *          - http://kyrandale.com/viz/d3-smartphone-walking.html (Really nice for debuggin accelerometer ) explore this
  *          - http://bl.ocks.org/mbostock/3970883 (REally nice example of threshold encoding)
  * @class Grapher – 
  * @param {String} – type. What type of graph.
  *
  */

var DummyData = [
  [42, 17],
  [26, 26],
  [44, 15],
  [45, 35],
  [13, 49],
  [33, 34],
  [27 ,40]
];








// DummyData =  DummyData.reduce(function(o, v, i) {
//           o[i] = v;
//           return o;
//         }, {});
      dddd =[{x:3,y:9},{x:14,y:5},{x:3,y:5},{x:6,y:16},];
  Grapher = function (type){
    console.log("Inside new Grapher class");
    // P U B L I C
    var self = this;
    self.margin = {top: 20, right: 20, bottom: 30, left: 50};
    self.width = 960 - self.margin.left - self.margin.right;
    self.height = 500 - self.margin.top - self.margin.bottom;
    self.dateFormat = "%d-%b-%y";
    // P R I V A T E

    //Define D3 function for later use.
    var x_scale = d3.scale.linear()//time.scale()
        .range([0, self.width]);

    var y_scale = d3.scale.linear()
        .range([self.height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x_scale)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y_scale)
        .orient("left");

    var line = d3.svg.line()
        .x(function(d,i) { return x_scale(i+1); })
        .y(function(d) { return y_scale(d[0]); });
    //Create "canvas".
    var svg = d3.select("#graph").append("svg")
        .attr("width", self.width + self.margin.left + self.margin.right)
        .attr("height", self.height + self.margin.top + self.margin.bottom)
      .append("g")
        .attr("transform", "translate(" + self.margin.left + "," + self.margin.top + ")");

    document.addEventListener('dataLine', function (e) {
      if (e.error) throw e.error;
      //Update data array and call the update method

      if(e.data[1] != undefined) { // if the second on is not undefined
        console.log("received ",e.data);
        //good place to put self.formatIncomingData(e);
        self.data.push(e.data);
        self.update();
      }

    }, false);

      self.data = DummyData;
      var line_1 = svg.append("path")
            .datum(self.data)
            .attr("class", "line")
            .attr("d", line);

      self.update = function () {
        console.log("max",d3.max(self.data, function(d) { return d[0]; }));
        // console.log("min",d3.min(self.data, function(d) { return d[0]; }))
        x_scale.domain([0,self.data.length])//d3.extent(dddd, function(d) { return d.x; })
        y_scale.domain([0,d3.max(self.data, function(d) { return d[0]; })]);
        //Add the X Axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + self.height + ")")
            .call(xAxis);
        //Add the Y Axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("ARDUINO VARS");

        var circle = svg.selectAll('circle')
                        .data(self.data);
            circle.exit().remove();

            circle.enter().append("circle")
                  .attr("r", 1.5);

            circle.attr("cx", function(d,i) {return x_scale(i+1); })
                  .attr("cy", function(d) { return y_scale(d[0]); });

        line_1.attr("d", line);

      };
      self.update();




    // d3.tsv("data.tsv", self.formatIncomingData, function(error, data) {
    //   if (error) throw error;
    //   console.log(data);
    //
    //
    //
    // // for (var i = 0; i < DummyData.length; i++) {
    //   // console.log(DummyData[i])
    //   // data = DummyData[i];
    //   x.domain(d3.extent(data, function(d) { return d.date; }));
    //   y.domain(d3.extent(data, function(d) { return d.close; }));
    //
    //   svg.append("g")
    //       .attr("class", "x axis")
    //       .attr("transform", "translate(0," + self.height + ")")
    //       .call(xAxis);
    //
    //   svg.append("g")
    //       .attr("class", "y axis")
    //       .call(yAxis)
    //     .append("text")
    //       .attr("transform", "rotate(-90)")
    //       .attr("y", 6)
    //       .attr("dy", ".71em")
    //       .style("text-anchor", "end")
    //       .text("Price ($)");
    //
    //   svg.append("path")
    //       .datum(data)
    //       .attr("class", "line")
    //       .attr("d", line);
    // // }
    //
    // });




  }



/**
  * (D3 Time formatting)[https://github.com/mbostock/d3/wiki/Time-Formatting]
  *
  * @method formatIncomingData - converts string in to integer or floats and assigns
  *                              them to their right column.
  * @param {String} - D3 specific string format
  */
Grapher.prototype.formatIncomingData = function(d, how){
    if(how != undefined){
      for (var i = 0; i < d.length; i++) {
        d[i] = parseInt(d[i]);
      }
      return d;
    }
    else{
      d.date = d3.time.format("%d-%b-%y").parse(d.date);
      d.close = +d.close;
      return d;
    }
};
Grapher.prototype.onReceive = function(e){
  console.log("Grapher on receive ", e);
}
// Grapher.prototype.onDataReceived =onReceive;

Grapher.prototype.bar = function(){
  // console.log(this.ffff("dd"))
};

$(document).ready(function(){
  thisGraph = new Grapher();
// typeOne();
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
    random = d3.random.normal(0, 0.2);
    // data = DummyData;//d3.range(n).map(random);
    data = d3.range(n).map(random);

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
