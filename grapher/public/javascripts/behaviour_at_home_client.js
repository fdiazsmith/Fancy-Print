



//When the document is ready. Kick of things.
$(document).ready(function(){
  BATH.init();
  //add to body
  //oncontextmenu="return false"
  socket.emit("test", {where: null});
 socket.on("tagRemoved", function (data) {
   console.log("Removed tag",data);
 });
  socket.on("tag", function (data) {

    console.log("received tag", data );
    // // console.log(objTag[data].name);
    // console.log("17002CF503CD�" == data.replace('[^\w]', ''));

    console.log(data.toString().length);

    for(var key in objTag) {
      if(objTag[key].hasOwnProperty && data.search(key) !== -1) {

          console.log("found it");
          console.log(objTag[key]);

      }
    }
    
  });
  bool = false;
  $('body').keypress(function (e) {
    console.log("KEYPRESS ", e.keyCode);
    var _id = "";
    switch (e.keyCode-48) {
      case 1:
        _id = "Cardboard_Box";
          break;
      case 2:
        _id = "Yarn";
          break;
      default:

    }
    displauHUD((bool)?BATH.objects[_id] :false)
    bool = !bool;
  })

});

displauHUD = function(_target){
  if(typeof _target === "boolean" ){
    BATH.log("Hiding HUD");
    $('#hud').removeClass("active");
    $("#prompt").removeClass("active");
  }
  else{
    var _containerOffset = {x: 300, y : 10}//BATH.container.matrix;
    console.log("Displaying HUD", _target);

    var _hudPos = {
      x :parseInt(( _target.getBBox().cx ) - $('#hud').outerWidth()/2 ),
      y :parseInt((_target.getBBox().y ) - $('#hud').outerHeight() ),
    }
    console.log(_target.getBBox().cx, _target.getBBox().y, _hudPos , _containerOffset.e);
    $('#hud').css({top:  _hudPos.y, left: _hudPos.x }).addClass("active");
    $("#prompt").addClass("active");
  }
}

//I like my Objects. It helps me get organized.
//BATH - Behaviour at Home
var BATH = {
  debug : true,
  log : function(argument){
    if(BATH.debug){
      console.log(arguments);
      // for(i = 0 ; i < arguments.length; i++){
      //   console.log(arguments[i]);
      // }
    }
  },
};



BATH.init = function (argument) {
  BATH.log("*****Behaviour at Home*****");
  this.s = Snap("#canvas");
  this.getStuff();
  this.loadSVG();
  this.log("d", 44, "fdf");
  // this.s.attr({height: this.height});
  $('#canvas').height(this.height);
  BATH.log("BATH init done",this);

  console.log("LLL",this.room);

}
BATH.getStuff = function (argument) {
  BATH.log("getting stuff\n\tlike metrics and elements");
  this.width = $(window).width();
  this.height = $(window).height();
  BATH.log("Width: "+this.width, "Height: "+this.height);
}


BATH.loadSVG = function(){
  // behavior_at_home
  Snap.load("images/BATH_main.svg", function(_loadedSVG){
    BATH.log("Loaded Main SVG.\n\t", _loadedSVG, "");
    this.room = _loadedSVG;

    console.log( this.room.node.children[0].children );
    this.objects = {}
    for (var layer in this.room.node.children[0].children) {
      if (this.room.node.children[0].children.hasOwnProperty(layer)) {
        var _id = $(this.room.node.children[0].children[layer]).attr("id")
        // console.log( $(this.room.node.children[0].children[layer]).attr("id"), this.room.node.children[0].children[layer]  );
        this.objects[_id] = this.room.select("#"+_id);
        // console.log(this.room.select("#"+_id))
        this.s.append(this.objects[_id] )
        this.objects[_id].transform(new Snap.Matrix().translate(300,120));
        // this.s.append(this.room.node.children[0].children[layer]);
        // this.s.group(this.s.select("#"+_id));
      }
    }
    this.objects["Blinds_Closed"].clear();
    // this.objects["Yarn"].attr({filter:f});
    // this.s.append(this.objects["Cardboard_Box"].remove())



    // //take elements out of the _loadedSVG
    // this.wallPost = this.s.group(this.room.selectAll('#Scratching_Post_Jungle_Gym'));
    // this.box = this.s.group(this.room.selectAll('#Cardboard_Box'));
    // this.post = this.s.group(this.room.selectAll('#Scratching_Post'));
    // this.plant = this.s.group(this.room.selectAll('#Aloe'));
    // this.shelves = this.s.group(this.room.selectAll('#Box_Shelves'));
    // deleted = this.s.group(this.room.selectAll('g[style="display:none;"]')).clear();
    // //what remains is the room
    // this.R = this.room.selectAll("g:first-child");
    // //group everything again, so that they have the same reference matrix
    // this.container = this.s.g(this.R, this.box, this.post, this.plant, this.shelves, this.wallPost);
    // this.wallPost.clear();
    // //append it to the room
    // this.s.append(this.container)
    //
    // this.container.transform(new Snap.Matrix().translate(300,0) );
    //
    // this.box.transform(new Snap.Matrix().translate(30,50) );
    //
    // testM = this.box.matrix.clone();
    // this.post.transform(testM);
    // this.box.drag();
    // this.post.drag();
    // this.s.align(this.post, "b");

  }, this);



  this.cat_object = Array(13);

  objectPos_top = this.height*.08;
  x_spacing = (this.width/(this.cat_object.length - 2))*.95;
  x_walking = x_spacing * -.8;
  // console.log("XXXXXXXX\n\n",objectPos_top, x_spacing,"\n" );

  // for (var i = 2; i < this.cat_object.length; i++) {
  //   var num = (i < 10)? '0'+i: i;
  //   Snap.load("images/BATH_cat-object-"+num+".svg", function(_loadedSVG){
  //     x_walking += x_spacing;
  //     // console.log("Succeffully loaded SVG.\n\t", _loadedSVG);
  //
  //     g = _loadedSVG.selectAll("#Menu g");
  //     this.cat_object[i] = this.s.group(g);//_loadedSVG;
  //     this.s.append(this.cat_object[i]);
  //
  //   //  this.cat_object[i].attr({transform : "matrix=1,0,0,1, "+x_walking+","+objectPos_top });
  //   // this.cat_object[i].node.clientTop = objectPos_top;
  //   var _m = new Snap.Matrix();
  //   _m.translate(x_walking,objectPos_top);
  //
  //   this.cat_object[i].transform(_m);
  //
  //   // this.cat_object[i].click(function(e){
  //   //   console.log("click on cat object", this, e);
  //   //   this.transform('"matrix(1,0,0,1, '+x_walking+','+objectPos_top+')"');
  //   // })
  //
  //    this.cat_object[i].drag();
  //
  //   }, this);
  // }
  // Snap.load("images/BATH-13.svg", function(_loadedSVG){
  //   // console.log("Succeffully loaded SVG.\n\t", this);
  //   g = _loadedSVG;
  //   g = _loadedSVG.selectAll("#Text_Blurb g");
  //   this.hud  = this.s.group(g);//_loadedSVG;
  //
  //   this.s.append(this.hud);
  //
  //   this.hud.transform(new Snap.Matrix().translate(300, 300));
  //   this.hud.addClass("hud");
  //   this.hud.drag();
  //   console.log(this.hud);
  //
  // }, this);
  console.log("\n\n\n\n***");




}
var objTag = {
  "010231674217" : {
    "name" : "Cardboard Box",
    "obj" : BATH.box,
  },
  "1200BBE26823": {
    "name" : "Scratching Post",
    "obj" : BATH.post,
  },
  "17002CF503CD": {
    "name" : "Scratching Post",
    "obj" : BATH.post,
  }
}
f = Snap.filter.blur(500, 100);
