
if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });


  Tracker.autorun(function () {
      Meteor.subscribe("dataToGraph", function (argument) {
        console.log("dfata ");
      });
    });
  socket.on("data-event", function (data) {
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

};
