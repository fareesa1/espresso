var db_value = "Karak";
var stove, esp, teapot, water, tea_leaves, choc_powder, milk, frothedmilk, sugar;
var score = 0;
let voicePlayed = false;

function setup() {
  createCanvas(400, 600);
  talkingGirl = createSprite(300,40);
  // backgroundMusic = loadSound('your-background-music.mp3');

  let frames = [];
  for (let i = 1; i <= 8; i++) {
    let imageName = `talk${i}.png`;
    frames.push(loadImage(imageName));
  }
  talkingGirl.addAnimation('talking', girl_talking);
  talkingGirl.addAnimation('upset', girl_talking_upset);
  talkingGirl.animation.frameDelay = 15; // Set the frame delay
  talkingGirl.scale = 0.4
  createSprites();
  backgroundMusic.setVolume(0.5)
  backgroundMusic.play()
}

function preload(){

  backgroundMusic = loadSound('bg.mp3');
  talk = loadSound('voice.mp3');
  happyVoice = loadSound('happy.mp3');

  // angryVoice = loadSound('happyVoice.mp3');
  // sadVoice = loadSound('voice.mp3');

  for (let i = 1; i <= 8; i++) {
    let imageName = `talk${i}.png`;
    loadImage(imageName);
  }
  girl_talking = loadAnimation("char1.png","char2.png","char3.png","char1.png","char2.png","char3.png")
  girl_talking_upset = loadAnimation("char1.png","upset.png","char1.png","upset.png","char1.png")
  
  bg_image = loadImage("background.png")
  esp_image = loadImage("espresso.png")
  es_img = loadImage("es.png")
  esp_final_animation = loadAnimation("esp1.png","esp2.png","esp3.png","esp4.png")
  stove_image = loadImage("Stove.png")
  st_img = loadImage("st.png")
  teapot_image= loadImage("Pan.png")
  t_img= loadImage("P.png")
  
  sugar_image= loadImage("sugar.png")
  coco_image= loadImage("coco_powder.png")
  water_image= loadImage("water.png")
  tea_image= loadImage("tea_leaves.png")
  milk_image= loadImage("milk.png")
  frothedmilk_image= loadImage("frothed_milk.png")
  
  }

function createSprites() {
  stove = createSpriteAndAddImage(35, 120, 0.16, stove_image);
  esp = createSpriteAndAddImage(35, 200, 0.16, esp_image);
  teapot = createSpriteAndAddImage(35, 280, 0.16, teapot_image);
  water = createSpriteAndAddImage(310, 120, 0.15, water_image);
  tea_leaves = createSpriteAndAddImage(310, 200, 0.15, tea_image);
  choc_powder = createSpriteAndAddImage(310, 280, 0.15, coco_image);
  milk = createSpriteAndAddImage(260, 240, 0.15, milk_image);
  frothedmilk = createSpriteAndAddImage(200, 200, 0.15, frothedmilk_image);
  sugar = createSpriteAndAddImage(260, 160, 0.15, sugar_image);
}

function createSpriteAndAddImage(x, y, scale, image) {
  var sprite = createSprite(x, y, 50, 50);
  sprite.addImage(image);
  sprite.scale = scale;
  return sprite;
}

function draw() {
  background("#ffeecc")
  // girl_talking.changeAnimation("talking")
  image(bg_image, 0, 0);
  textSize(30);
  text(score, 50, 50);

  if (esp.scale == 0.1) {
    image(es_img,  65, 170, 130, 130);
    textSize(14);
    textFont("Comic Sans MS");
    // Set a different text color (e.g., blue)
    fill(0, 0, 255);
    
    // Make the text bold
    textStyle(BOLD);// Set the text color (in this case, blue)
    text("Espresso added", 100, 80);
    
    if (frothedmilk.scale == 0.1) {
      // image(frothedmilk, 110, 220, 60, 40);
      text("frothedmilk added", 100, 100);
    }
    if (choc_powder.scale == 0.1) {
      
      text("Chocolate Powder added", 100, 140);
    }
    if (sugar.scale == 0.1) {
      text("Sugar added", 100, 160);
    }
    if (milk.scale == 0.1) {
      
      text("Milk added", 100, 120);
    }
  } else if (stove.scale == 0.1) {
    image(st_img, 65, 170, 130, 130);
  }
  generateScore(db_value);
  drawSprites();
  detectTouches();

  if (score === 0) {
    // Play the happy voice if it hasn't been played yet
    if (!voicePlayed) {
      talk.play();
      voicePlayed = true; // Set the flag to true to indicate the voice has been played
    }
  } 
  if (score === 100) {
    // Play the happy voice if it hasn't been played yet
    if (!voicePlayed) {
      happyVoice.play();
      voicePlayed = true; // Set the flag to true to indicate the voice has been played
    }
  }

  
  if (score >= 100) {
    // Remove all sprites if the score reaches 100 or more
    stove.remove();
    esp.remove();
    teapot.remove();
    water.remove();
    tea_leaves.remove();
    choc_powder.remove();
    milk.remove();
    frothedmilk.remove();
    sugar.remove();

    // Additional logic or messages when the score is 100
    noStroke()
    fill("#FF4646")
ellipse(180,180,250,140,80,80)
fill("white")
text("CONGRATULATIONS's🎊",90,160)
text("YOU DID IT",130,180)
text("CAPPUCCINO'S READY ☕",110,200)
girl_talking.addAnimation("upset", girl_talking_upset)
  } else if(score == 90 || score == 80 || score == 70){
    noStroke()
    fill("#FF4646")
ellipse(180,180,250,140,80,80)
fill("white")
text("OPP'S😐",150,160)
text("PLEASE CLICK ON THE RELOAD ",70,180)
text("AND TRY AGAIN",120,200)
girl_talking.addAnimation("upset", girl_talking_upset)
  }
  
  else {
    // Normal gameplay logic for sprites
    if (stove.scale == 0.1) {
      // Your existing code for sprite interactions
    }
  }
}

function generateScore(db_value) {
  
  if (db_value === "Karak") {
    // Initialize the score to 0
    let updatedScore = 0;

    const allowedItems = [ "esp","frothedmilk",  "milk","choc_powder","sugar",];
    
    // Check if all allowed items are touched
    const allAllowedItemsPressed = allowedItems.every(item => window[item].scale === 0.1);

    if (allAllowedItemsPressed) {
      updatedScore = 100;
      // happyVoice.play() // All allowed items are touched, set the score to 100
    }

    // Penalize for extra touches on other items
    const itemsToPenalize = ["stove", "teapot","water", "tea_leaves"];
    itemsToPenalize.forEach((item) => {
      if (window[item].scale === 0.1) {
        updatedScore -= 10;
      }
    });

    // Update the score with the final value
    score = updatedScore;
  }
}



function detectTouches() {
  for (var i = 0; i < touches.length; i++) {
    var touchX = touches[i].x;
    var touchY = touches[i].y;
if(score <100){
    // Check if the stove sprite is touched
    if (stove.scale == 0.16 && dist(touchX, touchY, stove.position.x, stove.position.y) < 30) {
      stove.scale = 0.1;
      text("Stove Added", 100, 50);
    }

    // Check if the esp sprite is touched
    if (esp.scale == 0.16 && dist(touchX, touchY, esp.position.x, esp.position.y) < 30) {
      esp.scale = 0.1;
      text("Esp Added", 100, 50);
    }

    // Check if the teapot sprite is touched
    if (teapot.scale == 0.16 && dist(touchX, touchY, teapot.position.x, teapot.position.y) < 30) {
      teapot.scale = 0.1;
      text("Teapot Added", 100, 50);
    }

    // Check if the water sprite is touched
    if (water.scale == 0.15 && dist(touchX, touchY, water.position.x, water.position.y) < 30) {
      water.scale = 0.1;
      text("Water Added", 100, 50);
    }

    // Check if the tea_leaves sprite is touched
    if (tea_leaves.scale == 0.15 && dist(touchX, touchY, tea_leaves.position.x, tea_leaves.position.y) < 30) {
      tea_leaves.scale = 0.1;
      text("Tea Leaves Added", 100, 50);
    }

    // Check if the choc_powder sprite is touched
    if (choc_powder.scale == 0.15 && dist(touchX, touchY, choc_powder.position.x, choc_powder.position.y) < 30) {
      choc_powder.scale = 0.1;
      text("Choc Powder Added", 100, 50);
    }

    // Check if the milk sprite is touched
    if (milk.scale == 0.15 && dist(touchX, touchY, milk.position.x, milk.position.y) < 30) {
      milk.scale = 0.1;
      text("Milk Added", 100, 50);
    }

    // Check if the frothedmilk sprite is touched
    if (frothedmilk.scale == 0.15 && dist(touchX, touchY, frothedmilk.position.x, frothedmilk.position.y) < 30) {
      frothedmilk.scale = 0.1;
      text("Frothed Milk Added", 100, 50);
    }

    // Check if the sugar sprite is touched
    if (sugar.scale == 0.15 && dist(touchX, touchY, sugar.position.x, sugar.position.y) < 30) {
      sugar.scale = 0.1;
      text("Sugar Added", 100, 50);
    }
  }
}

}
