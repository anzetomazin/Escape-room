function handleKeyDown(event) {
    currentlyPressedKeys[event.keyCode] = true;
}
  
function handleKeyUp(event) {
    currentlyPressedKeys[event.keyCode] = false;
}
var asd = true;
function handleKeys() {
  
    if (currentlyPressedKeys[33] && upAllowed) {
      // Page Up
      pitchRate = 0.1;
    } else if (currentlyPressedKeys[34] && downAllowed) {
      // Page Down
      pitchRate = -0.1;
    } else {
      pitchRate = 0;
    }
  
    if (currentlyPressedKeys[81]) {
      // Left cursor key or A
      yawRate = 0.125;
    } else if (currentlyPressedKeys[69]) {
      // Right cursor key or D
      yawRate = -0.125;
    } else {
      yawRate = 0;
    }
  
    if (currentlyPressedKeys[37] || currentlyPressedKeys[65]) {
      // Left cursor key or A
      speedSideways = 0.003;
    } else if (currentlyPressedKeys[39] || currentlyPressedKeys[68]) {
      // Right cursor key or D
      speedSideways = -0.003;
    } else {
      speedSideways = 0;
    }
  
    if (currentlyPressedKeys[38] || currentlyPressedKeys[87]) {
      // Up cursor key or W
      speedForward = 0.003;
      if(currentlyPressedKeys[16]){
          speedForward = 0.005;
      }
    } else if (currentlyPressedKeys[40] || currentlyPressedKeys[83]) {
      // Down cursor key
      speedForward = -0.003;
    } else {
      speedForward = 0;
    }

    if(currentlyPressedKeys[70]){
        currentlyPressedKeys[70] = false;
        if(cratePicked == null){
            for(var i in crates){
                if(ballPicked == null) {
                  crates[i].pickCrate();
                }
            }
        } else{
            cratePicked.y = 0.15;
            cratePicked.picked = false;
            cratePicked = null;
        }

        if(ballPicked == null){
            for(var i in balls){
              if(cratePicked == null){
                balls[i].pickBall();
              } 
            }

            if(numOfBalls == 1) {
              leftDoorLocked = true;
              animateLeftDoor();
              animateTarget();
            }
        } else{
          animateBall(ballPicked);
          ballPicked = null;
        }

        if(cratePicked == null && ballPicked == null){
          r = 0;
        } else r = 0.4;

        for(var i in plates){
          plates[i].activate();
        }
        Plate.activatePictures();
        if(asd){
          if(Plate.allOK()){
            leftDoorLocked = false;
            animateLeftDoor();
            asd = false;
          }
        }
    }

    if(currentlyPressedKeys[90]){
      currentlyPressedKeys[90] = false;
      leftDoorLocked = !leftDoorLocked;
      animateLeftDoor();
    }

    if(currentlyPressedKeys[32]){
      currentlyPressedKeys[32] = false;
      if(crateStandingOn == null){
        for(var i in crates){
            crates[i].standOnCrate();
        }
      } else{
          crateStandingOn = null;
      }
    }
}