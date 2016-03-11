
//BATH - Behaviour at Home
var BATH = {
  debug : true,
  color: {
    green: "#A9C738",
  },
  width : $(window).width(),
  height:  $(window).height(),
};



//When the document is ready. Kick of things.
$(document).ready(function(){
  BATH.init();
  /**
    * Socket
    */
  socket.emit("test", {where: null});
  socket.on("tagRemoved", function (data) {
     console.log("Removed tag",data);
     BATH.catObject.stop();
     BATH.welcomeScreen.stop();
     BATH.catObject.hide(function(){BATH.welcomeScreen.show()});
   });
  socket.on("tag", function (data) {
    for(var key in objTag) {
      if(objTag[key].hasOwnProperty && data.search(key) !== -1) {
          console.log("found it");
          console.log(objTag[key], key);
          BATH.catObject.stop();
          BATH.welcomeScreen.stop();
          var thisTAG = objTag[key];
          BATH.welcomeScreen.hide(function(){BATH.catObject.show( thisTAG ) } );
      }
    }
  });
  /**
    * key press listener, for testing
    */
    var keyIndex = 0;
  $('body').keypress(function (e) {
    console.log("KEYPRESS ", e.keyCode);
    switch (e.keyCode-48) {
      case 1:
            BATH.catObject.stop();
            BATH.welcomeScreen.stop();
        BATH.welcomeScreen.hide(function(){BATH.catObject.show( objTag["30006B3CC2A5"] )} );
          break;
      case 2:
        BATH.welcomeScreen.hide(function(){BATH.catObject.show( objTag["12345678dfa90"] ) } );
          break;
      case 3:
        BATH.welcomeScreen.hide(function(){BATH.catObject.show( objTag["2342hdf42"] ) } );
          break;
      case 5:
      var count = 0;
        for (var tags in objTag) {
          if (objTag.hasOwnProperty(tags)) {
            // console.log(tags);
            if(keyIndex === count){
              BATH.welcomeScreen.hide(function(){BATH.catObject.show( objTag[tags] ) } );
              // lastKey = tags;
              keyIndex++;
              break;
            }
            count++;
          }
        }
        break;
      default:
      // if(BATH.catObject.animatingIn )
      BATH.catObject.stop();
      BATH.welcomeScreen.stop();
        BATH.catObject.hide(function(){BATH.welcomeScreen.show()});
    }
  });
  /**
    * Run request animation frame
    */
  animate();
});





BATH.init = function (argument) {

}


BATH.welcomeScreen =  new Welcome();

function Welcome() {
  this.s = Snap(".canvas#main")
                .attr("width", BATH.width)
                .attr("height", BATH.height);
  // public vars
  var self = this;
  self.animatingIn = false;
  self.animatingOut = false;

  // private vars
  var canvas = this.s;
  var _middle_vertexs = BATH.height*.4;
  var furniture = {};
  var furnitureG = canvas.group();

  var topLeft = {
    vars_to : {
      x1: 0,                  y1: 0,
      x2: 0,                  y2: _middle_vertexs,
      x3: _middle_vertexs,    y3: 0,
    }
  };
  var btmLeft = {
    vars_to : {
        x1: 0,                y1: _middle_vertexs,
        x2: 0,                y2: BATH.height,
        x3: BATH.width*.5,    y3: BATH.height,
      }
  };
  var imgClip = {
    vars_to : {
      x1: 0,                y1: 0,
      x2: 0,                y2: BATH.width*.8,
      x3: BATH.width*.8,    y3: 0,
    }
  };

  constructor.call(imgClip,{op:"op-5", t: 300},{url:"images/intro-cat-1.jpg", x: -100, y: -10 });
  imgClip.vars_from.y2 = 0;
  imgClip.vars_from.x3 = 0;

  constructor.call(topLeft, {t:300} );
  topLeft.vars_from.y2 = 0;

  constructor.call(btmLeft, {t:300} );
  btmLeft.vars_from.y1 = btmLeft.vars_to.y2;

  furnitureG.addClass("main instructions");
  Snap.load("images/furniture.svg", function (f) {
    furniture =  digestAI(f, canvas );
    for (var layer in furniture) {
      if (furniture.hasOwnProperty(layer)) {
        furnitureG.add(furniture[layer]);
      }
    }
    // Position the lable for instructions
    var offsetX = BATH.width - furnitureG.getBBox().w;

    furnitureG.transform('translate('+offsetX+', 350)');
    var copy = $("section.main").append('<h4 class="instructions main">Place an object on the mark to find out more</h4>')
                .find("h4.instructions.main").css({
                  top: furnitureG.getBBox().cy,
                  left: furnitureG.getBBox().cx + 100,
                  width: "200px"
                });
  }, this);

  function constructor(obj, img){
    // caller local vars
    var self = this;
    op = obj === undefined || obj.op === undefined? "op-5": obj.op;
    self.t  = obj === undefined || obj.t  === undefined? 500: obj.t;
    self.vars_from = clone(self.vars_to);
    self.format = Snap.format("M{x1} {y1}, L{x2} {y2}, L{x3} {y3}Z", self.vars_to);

    self.elem    = canvas.path(Snap.format("M{x1} {y1}, L{x2} {y2}, L{x3} {y3}Z", self.vars_from))//start in 0
                        .attr({"class" : "geometry "+op,})
                        .addClass("main");

    if (typeof img === "object") {
      self.img = canvas.image(img.url,img.x,img.y, BATH.width, BATH.height + 20).addClass("main")
                  .attr({ mask: self.elem.attr({fill: "white", "fill-opacity": 1 }),
                preserveAspectRatio:"xMidYMin slice ", });
    }
    createTweens.call(this);
  }

  function createTweens(obj) {
    // caller local vars
    var self = this
    // if object not undefined we are dealing with text
    if(obj !== undefined && typeof obj === "object"){
      self.t = obj.t !== undefined? obj.t : 100;
      self.vars_to = obj.to !== undefined? obj.to : obj;
      self.vars_from = obj.from !== undefined? obj.from : obj;
      self.selector = obj.selector !== undefined? obj.selector : ".main";
    }
    self.vars_toogle = clone(self.vars_from);

    self.tweenIn =  new TWEEN.Tween(self.vars_toogle)
              .to(self.vars_to, self.t).easing(TWEEN.Easing.Quadratic.In)
              .onUpdate(function(){
                BATH.welcomeScreen.animatingIn = true;
                if(obj !== undefined && typeof obj === "object"){
                  $(self.selector).css(this)
                }else{
                  self.elem.attr({"d" : Snap.format("M{x1} {y1}, L{x2} {y2}, L{x3} {y3}Z", this) } );
                }
              }).onComplete(function(){});
    self.tweenOut =  new TWEEN.Tween(self.vars_toogle)
              .to(self.vars_from, self.t).easing(TWEEN.Easing.Quadratic.In)
              .onUpdate(function(){
                BATH.welcomeScreen.animatingOut = true;
                if(obj !== undefined && typeof obj === "object"){
                  $(self.selector).css(this)
                }else{
                  self.elem.attr({"d" : Snap.format("M{x1} {y1}, L{x2} {y2}, L{x3} {y3}Z", this) } );
                }
              }).onComplete(function(){});
  }
  self.name = {};
  createTweens.call( self.name, {t: 50, selector: ".main.name",
                  to:{ opacity: 1},
                  from:{ opacity: 0}, });
  self.instructions = {};
  createTweens.call( self.instructions, {t: 100, selector: ".main.instructions",
                  to:{ opacity: 1},
                  from:{ opacity: 0}, });

  this.hide = function (callback) {
    BATH.welcomeScreen.animatingOut = true;
    self.instructions.tweenOut.start();
    self.name.tweenOut.start();
    topLeft.tweenOut.start();
    btmLeft.tweenOut.start();
    setTimeout(function(){
      imgClip.tweenOut.start().onComplete(function(){
        BATH.welcomeScreen.animatingOut = false;
          if(typeof callback === "function") callback();
      });
    },300);

  }
  this.show = function () {
    BATH.welcomeScreen.animatingIn = true;
    imgClip.tweenIn.start();
    setTimeout(function(){
      topLeft.tweenIn.start();
      self.name.tweenIn.start();
      btmLeft.tweenIn.start().chain(self.instructions.tweenIn.onComplete(function () {
        BATH.welcomeScreen.animatingIn = false;
      }));
    },300);

  }
  this.stop = function(){
    self.instructions.tweenOut.stop();
    self.name.tweenOut.stop();
    topLeft.tweenOut.stop();
    btmLeft.tweenOut.stop();
    imgClip.tweenOut.stop();

    self.instructions.tweenIn.stop();
    self.name.tweenIn.stop();
    topLeft.tweenIn.stop();
    btmLeft.tweenIn.stop();
    imgClip.tweenIn.stop();
  }
}
/**
  * Create new Cat Object
  *
  */

BATH.catObject = new CatObject();
function CatObject(catObj){
  //public vars
  var self = this;
  self.obj = catObj === undefined? objTag["30006B3CC2A5"]  : catObj;
  self.animatingIn = false;
  self.animatingOut = false;
  //private vars
  var copy = self.obj.copy;
  var name = self.obj.name;
  var canvas = Snap(BATH.width, BATH.height).addClass("canvas").attr("id", "secondary");
  var className = "secondary";
  var container = $('section.secondary');
  var _middle_vertexs = BATH.height*.4;
  var diffY = BATH.height - _middle_vertexs ;
  var furniture = {};
  var furnitureG = canvas.group();
  var name = container.append('<h1 class="name '+className+'" style="opacity : 0">'+name+'</h1>').find("h1.name.secondary");
  var copy = container.append('<p class="copy '+className+'" style="opacity : 0">'+copy+'</p>').find("p.copy.secondary");
  $(canvas.node).prependTo(container);

  var  topLeft = {
    vars_to : {
      x1: 0,      y1: 0,
      x2: 0,      y2: BATH.width*.6,
      x3: BATH.width*.6,      y3: 0,
    },
    vars_from : {
      x1: 0, y1: 0, x2: 0, y2: 0, x3: 0, y3: 0,
    }
  };

  var btmLeft = {
    vars_to : {
      x1: 0,       y1: _middle_vertexs,
      x2: 0,       y2: BATH.height,
      x3: BATH.width*.5,       y3: BATH.height,
    }
  };

  var diffX = btmLeft.vars_to.x3;

  var imgClip = {
    vars_to : {
      x1: BATH.width*.2,   y1: 0,
      x2:  BATH.width*.2 +  BATH.width* 1.0,   y2: 0,
      x3: BATH.width*.2 + BATH.width*.4,   y3: 0 + ( (BATH.width*.4 )* Math.tan(Math.PI/4) ),
      width: 1500,
      height: 850,
    },
  };

  var rect = {
    vars_to: {
      x1: imgClip.vars_to.x1,       y1: _middle_vertexs,
      width: 2500 , height: 600, maskHeight: BATH.height,
    }
  };

  imgClip.vars_from = clone(imgClip.vars_to);
  imgClip.vars_from.height = 0;
  imgClip.vars_from.y3 = 0;
  imgClip.vars_from.x3 = imgClip.vars_to.x1;

  rect.vars_from = clone(rect.vars_to);
  rect.vars_from.height = 0;
  rect.vars_from.maskHeight= 0;
  // imgClip
  constructor.call(imgClip, {op:"op-5", t: 300}, self.obj )
  //topLeft
  constructor.call(topLeft)
  // rect
  constructor.call(rect)

  furnitureG.addClass("secondary instructions");
  Snap.load("images/furniture.svg", function (f){
    furniture =  digestAI(f, canvas);
    for (var layer in furniture) {
      if (furniture.hasOwnProperty(layer)) {
        furnitureG.add(furniture[layer]);
      }
    }
    var offsetX = BATH.width - furnitureG.getBBox().w +200;
    furnitureG.transform('translate('+offsetX+', 600) scale(0.6)');
    furnitureG.select("#object image").attr("opacity",1).addClass("img-show");

    var copy = container.append('<h4 class="secondary instructions">Try another object to find out more</h4>')
                .find("h4.instructions.secondary").css({
                  top: furnitureG.getBBox().cy -10 ,
                  left: furnitureG.getBBox().cx ,
                  width: "200px"
                });
  }, self);

  self.name = {};
  createTweens.call( self.name, {t: 50, selector: ".secondary.name",
                  to:{ opacity: 1},
                  from:{ opacity: 0}, });
  self.instructions = {};
  createTweens.call( self.instructions, {t: 100, selector: ".secondary.instructions",
                  to:{ opacity: 1},
                  from:{ opacity: 0}, });
  self.copy = {};
  createTweens.call( self.copy, {t: 100, selector: ".secondary.copy",
                  to:{ opacity: 1},
                  from:{ opacity: 0}, });
  //
  function constructor(obj, img){
    // caller vars
    var self = this;
    if(self.op === undefined) self.op = obj === undefined || obj.op === undefined? "op-5": obj.op;
    if(self.img === undefined) self.img = img ;
    if(self.vars_from === undefined) self.vars_from = clone(self.vars_to);
    self.t  = obj === undefined || obj.t  === undefined? 500: obj.t;

    self.format = Snap.format("M{x1} {y1}, L{x2} {y2}, L{x3} {y3}Z", self.vars_to);
    // Image with rectangle clipping mask
    if (typeof img === "object" && typeof img.imgUrl === "function") {
      self.elem  = canvas.path(Snap.format("M{x1} {y1}, L{x2} {y2}, L{x3} {y3}Z", self.vars_from))
                          .attr({"fill":"white"})
                          ;
      self.hypotenous = BATH.width - self.vars_to.x1;
      self.img = canvas.image(self.img.imgUrl(), self.vars_from.x1 + self.img.pos.x, 0 + self.img.pos.y, self.hypotenous * self.img.pos.scale, (self.hypotenous * (self.img.pos.h/self.img.pos.w))*self.img.pos.scale )
                        .attr({ mask: self.elem, preserveAspectRatio:"xMidYMid slice ",});

      self.viewbox = canvas.g(self.img);
      self.viewbox.attr({viewbox :self.vars_from.x1-100 +" 0 1920 1080" , "class": "img-container" });
      self.maskURL = self.img.attr("mask");
    }
    //x3 meas it is triangle
    else if(self.vars_from.x3 !== undefined){
      self.elem    = canvas.path(Snap.format("M{x1} {y1}, L{x2} {y2}, L{x3} {y3}Z", self.vars_from))
                          .attr({"class" : "geometry "+self.op,})
                          .addClass(className);
    }
    //self width means rectangle
    else if(self.vars_from.width !== undefined){
      self.elem = canvas.rect(self.vars_from.x1,0, self.vars_from.width, self.vars_from.height)
                          .transform("rotate('R45,"+self.vars_from.x1+" 0')"+ ", translate(-300, 0)")
                          .attr({"class" : "geometry op-7",});
    }
    createTweens.call(self);
  }

  function createTweens(obj) {
    var self = this
    if(obj !== undefined && typeof obj === "object"){
      self.t = obj.t !== undefined? obj.t : 100;
      self.vars_to = obj.to !== undefined? obj.to : obj;
      self.vars_from = obj.from !== undefined? obj.from : obj;
      self.selector = obj.selector !== undefined? obj.selector : ".main";
    }
    self.vars_toogle = clone(self.vars_from);

    self.tweenIn =  new TWEEN.Tween(self.vars_toogle)
              .to(self.vars_to,self.t).easing(TWEEN.Easing.Quadratic.In)
              .onUpdate(function(){
                  BATH.catObject.animatingIn = true;
                  if(obj !== undefined && typeof obj === "object"){
                    $(self.selector).css(this);
                  }else{
                    if( self.img !== undefined )
                      self.elem.attr({"d" : Snap.format("M{x1} {y1}, L{x2} {y2}, L{x3} {y3}Z", this) } );
                    else if (self.vars_to.x3 !== undefined)
                      self.elem.attr({"d" : Snap.format("M{x1} {y1}, L{x2} {y2}, L{x3} {y3}Z", this) } );
                    else if(self.vars_to.width !== undefined)
                      self.elem.attr({"height" : this.height});
                  }
              }).onComplete(function(){});

    self.tweenOut =  new TWEEN.Tween(self.vars_toogle)
              .to(self.vars_from, self.t).easing(TWEEN.Easing.Quadratic.In)
              .onUpdate(function(){
                BATH.catObject.animatingOut = true;
                if(obj !== undefined && typeof obj === "object"){
                  $(self.selector).css(this);
                }else{
                  if( self.img !== undefined )
                    self.elem.attr({"d" : Snap.format("M{x1} {y1}, L{x2} {y2}, L{x3} {y3}Z", this) } );
                  else if (self.vars_to.x3 !== undefined)
                    self.elem.attr({"d" : Snap.format("M{x1} {y1}, L{x2} {y2}, L{x3} {y3}Z", this) } );
                  else if(self.vars_to.width !== undefined)
                    self.elem.attr({"height" : this.height})
                }
              }).onComplete(function(){});
  }

  self.show = function(obj){
    // console.log("showing this obj ", obj);
    BATH.catObject.animatingIn = true;
    // append or display images
    var imgExist = false;
    var imagesPresent = $('#secondary image');
    imagesPresent.each(function(e){
      if( $(this).attr("href") === obj.imgUrl()){
        $(this).css({opacity: 1});
        imgExist= true;
      }
      else {$(this).css({opacity: 0});}
    });
    if(!imgExist) imgClip.viewbox.append( canvas.image(obj.imgUrl(), imgClip.vars_from.x1 + obj.pos.x, 0 + obj.pos.y, imgClip.hypotenous *obj.pos.scale, (imgClip.hypotenous * (obj.pos.w/obj.pos.h))*obj.pos.scale )
                     .attr({ mask:  imgClip.maskURL,
                       preserveAspectRatio:"xMidYMin meet ",
                     })
                   );
    // replace text instantly.
    name.html(obj.name);
    copy.html(obj.copy);

    topLeft.tweenIn.start();
    imgClip.tweenIn.start();
    rect.tweenIn.start().onComplete(function () {
      self.name.tweenIn.start();
      self.instructions.tweenIn.start();
      self.copy.tweenIn.start().onComplete(function(){BATH.catObject.animatingIn=false});
    });


  }
  self.hide = function(callback){
    BATH.catObject.animatingOut = true;
    self.name.tweenOut.start();
    self.instructions.tweenOut.start();
    self.copy.tweenOut.start().onComplete(function(){
      topLeft.tweenOut.start();
      imgClip.tweenOut.start();
      rect.tweenOut.start().onComplete(function(){

        BATH.catObject.animatingOut = false;
        if(typeof callback === "function") callback();
      });
    });
  };

  self.stop = function(){

    topLeft.tweenIn.stop().onStop(function(e){});
    imgClip.tweenIn.stop().onStop(function(e){});
    rect.tweenIn.stop().onStop(function(e){});
    self.name.tweenIn.stop().onStop(function(e){});
    self.instructions.tweenIn.stop().onStop(function(e){});
    self.copy.tweenIn.stop().onStop(function(e){});

    topLeft.tweenOut.stop().onStop(function(e){});
    imgClip.tweenOut.stop().onStop(function(e){});
    rect.tweenOut.stop().onStop(function(e){});
    self.name.tweenOut.stop().onStop(function(e){});
    self.instructions.tweenOut.stop().onStop(function(e){});
    self.copy.tweenOut.stop().onStop(function(e){});
  }
}





f = Snap.filter.blur(500, 100);
/**
	* Takes an SVG and imports only the layers.
	*
	* @method digestAI
	* @param  {SVG} Document fragment (the imported SVG).
  * @param  {SVG} Snap Canvas where the import will be placed.
  * @param  {Boolean} Determines if the hidden layers should be ignored.
	* @return {Object} Object containing the layers imported.
	*/

function digestAI(f, canvas, ignoreHidden){
  var layers = {};
  // console.log("Digesting SVG from illustrator svg: ", canvas);
  if(ignoreHidden){
    // console.log("DETETED HIDDEN LAYERS");
    canvas.group(f.selectAll('g[style="display:none;"]')).clear();
  }

  for (var layer in f.node.children[0].children) {
    if (f.node.children[0].children.hasOwnProperty(layer)) {
      var _id = $(f.node.children[0].children[layer]).attr("id");
      if(_id === layer ){
        layers[_id] = f.select("#"+_id);
        canvas.append(layers[_id] )
        layers[_id].transform(new Snap.Matrix().translate(0,0));
      }
    }
  }
  // canvas.attr("style", "width:"+canvas.getBBox().width *1.2+"px; height:"+canvas.getBBox().height *1.2+"px;");
  return layers;
}
function animate() {
    window.requestAnimationFrame(animate);
    TWEEN.update();
}
function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}
