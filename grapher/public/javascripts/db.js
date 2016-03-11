var getImg = function (){
  return "images/"+this.name.replace(/\ /g, "-").toLowerCase()+".jpg";
};

var objTag = {
  "30006B3CC2A5":{
    name: "Open topped litter box",
    imgUrl: getImg,
    copy:  "Litter box behavior is one of the most common topics discussed with veterinarians. It is also the number one reason why cats are surrendered to shelters. Keep your litter boxes in peaceful parts of the home, away from areas frequented by dogs or potentially frightening objects like a washing machine. An open-topped litter box allows cats to keep sightlines open when they are feeling vulnerable. An open top also allows for air circulation, allowing litter to dry faster and let odors dissipate. ",
    category: "good",
    pos: {x : -50, y: -100, w: 947, h:380, scale: 1.43,},
  },
  "12345678dfa90":{
    name: "Scratching Posts",
    imgUrl: getImg,
    copy:  "Scratching is in a cat’s nature, since it helps cats stretch their bodies and maintain their claws. A scratch surface can be made from corrugated cardboard, carpets or other natural rope fibers. Whatever the material, make sure it’s sturdy enough to accommodate the size of your cat. Sometimes cats can be apprehensive of the presence of a new scratcher, so give your cat some time to get acquainted and reinforce positive behavior with a treat. ",
    category: "good",
    pos: {x : -180, y: -220, w: 5616, h:3744, scale: 1.13,},
  },
  "2342hdf42":{
    name: "Multi-level shelves",
    imgUrl: getImg,
    copy:  "In the wild, cats often take to the trees to hide from predators and give them clear vantage points. Provide clear spaces for cats to perch and remember to include multiple levels so they have a safe path to access higher points.",
    category: "good",
    pos: {x : 0, y: -300, w: 2000, h:1333, scale: 1.2,},
  },
  "2342146h42":{
    name: "Rug",
    imgUrl: getImg,
    copy:  "Cats have difficulty stopping and can slip on slick surfaces, increasing their chance of injury. Adding a sisal rug to surfaces in your home can create a safe place to scratch, leave her scent and play. ",
    category: "good",
    pos: {x : 0, y: -150, w: 3722, h:2477, scale: 1,},
  },
  "asas24g":{
    name: "Cardboard Box",
    imgUrl: getImg,
    copy:  "Cats find comfort in places where they can see without being seen. Providing places where your cat can seek refuge doesn’t need to be fancy. Sometimes a simple cutout in the side of a box with a small blanket is enough for a cat to feel comfortable in her surroundings. ",
    category: "good",
    pos: {x : 0, y: -220, w: 2965, h:1973, scale: 1,},
  },
  "1200BBE26823":{
    name: "Short Food Dish",
    imgUrl: getImg,
    copy:  "Cats can feel quite vulnerable to predators while eating. That’s why they seek out locations where they feel protected from the back or flank, but can still keep a watchful eye on anything approaching as they eat.  Choose a location with good sightlines and clear avenues of escape. A counter or table can make your cat feel elevated and help put her at ease. ",
    category: "good",
    pos: {x : -380, y: -100, w: 947, h: 380, scale: 1.254,},
  },

  "1200BBFDB5E1":{
    name: "Covered Litter box",
    imgUrl: getImg,
    copy: "Covered litter boxes can make a cat feel cramped and anxious. Often covered litter boxes are far too small for a cat to comfortably stand and turn around. Help your cat feel safe by creating clear sightlines in their litter box, and get rid of the lid. ",
    category: "bad",
    pos: {x : 0, y: -200, w: 1280, h:853, scale: 1,},
  },
  "17002CF503CD":{
    name: "Plant",
    imgUrl: getImg,
    copy: "Cats love being close to nature, but many plants are potentially toxic to cats. Be especially careful with all lilies, as all parts of these plants (flowers, leaves and stems) are extremely toxic to cats. Daffodils, some ferns, aloe vera are a few plants which can also be harmful.",
    category: "bad",
    pos: {x : 0, y: -200, w:4256, h:2832, scale: 1,},
  },
  "12006853133A":{
    name: "Blinds",
    imgUrl: getImg,
    copy: "It’s important for a cat to stay in tune with natural surroundings, even if she is an indoor cat. Keep your blinds up so cats can bask in the sun’s rays and see the action outside.  ",
    category: "bad",
    pos: {x : 0, y: -576, w: 3312, h:3299, scale: 1,},
  },
  "17002CF5fer03CD":{
    name: "Yarn",
    imgUrl: getImg,
    copy: "Playtime helps your cat relieve stress and improve overall fitness, all while strengthening the bond you share. String toys can simulate the movement of prey, and can be a great way to play with your cat. Just make sure to put it away when you are done to avoid accidents.",
    category: "bad",
    pos: {x : 0, y: -200, w: 2560, h:1920, scale: 1,},
  },
  "asfdf4378332":{
    name: "Tall Feeding Bowl",
    imgUrl: getImg,
    copy: "Cats use their whiskers to navigate their environment by measuring the width of openings to determine if they’re wide enough to pass through. A feeding bowl with tall straight sides can cause a cat’s whiskers to rub up against the sides of the bowl, causing discomfort. Keep your feeding dish short and wide.",
    category: "bad",
    pos: {x : -380, y: -100, w: 1500, h:640, scale: 1.254,},
  },

}

//add duplicates
//plant
objTag["7B00938981E0"] = objTag["17002CF503CD"];
objTag["7E0054A1850E"] = objTag["17002CF503CD"];
//yarn
objTag["7E00549C289E"] = objTag["17002CF5fer03CD"];
objTag["7B009324E02C"] = objTag["17002CF5fer03CD"];
//tall feeding bowl
objTag["7B0093728D17"] = objTag["asfdf4378332"];
//short feeding bowl
objTag["7B0093411FB6"] = objTag["1200BBE26823"];
//scratching post
objTag["7B009377E57A"] = objTag["12345678dfa90"];
objTag["7B00937EB325"] = objTag["12345678dfa90"];
//blinds
objTag["7E0054B562FD"] = objTag["12006853133A"];
objTag["7B00934CAC08"] = objTag["12006853133A"];
//rug
objTag["7B00937055CD"] = objTag["2342146h42"];
objTag["7E00547F1F4A"] = objTag["2342146h42"];
//box
objTag["7B00934B43E0"] = objTag["asas24g"];
//shelves
objTag["7B00933EBA6C"] = objTag["2342hdf42"];
objTag["7E0054792E7D"] = objTag["2342hdf42"];
//open top litter
objTag["7E005470306A"] = objTag["30006B3CC2A5"];
objTag["7B00934B6DCE"] = objTag["30006B3CC2A5"];
objTag["7E0054B753CE"] = objTag["30006B3CC2A5"];
//covered litter box
objTag["7E0054B572ED"] = objTag["1200BBFDB5E1"];

objTag[""] = objTag[""];
objTag[""] = objTag[""];
objTag[""] = objTag[""];
objTag[""] = objTag[""];
objTag[""] = objTag[""];
objTag[""] = objTag[""];
