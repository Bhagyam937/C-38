class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
      car1 = createSprite(200,displayHeight-300);
      car2 = createSprite(400,displayHeight-300);
      car3 = createSprite(600,displayHeight-300);
      car4 = createSprite(800,displayHeight-300);

      cars = [car1,car2,car3,car4];

    }
  }

  play(){
    form.hide();
    //textSize(30);
    //text("Game Start", 120, 100)
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      var y;
      var index = 0;
      for(var plr in allPlayers){
        cars[index].y = displayHeight- allPlayers[plr].distance;
        index = index+1;
      
    
        if(index == player.index){
          cars[index-1].shapeColor = "red";
          camera.position.y = cars[index-1].y;
          
        }
      }
    }
      
    
console.log(player.index);
    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
    drawSprites();
  }
}
