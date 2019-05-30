function animate() {
    var timeNow = new Date().getTime();
    if (lastTime != 0) {
      var elapsed = timeNow - lastTime;

      collisions(elapsed);
      
    
      reticleX = xPosition + (0.2 * Math.sin(degToRad(-yaw)));
      reticleY = yPosition + (0.2 * Math.sin(degToRad(pitch)));
      reticleZ = zPosition + (0.2 * -Math.cos(degToRad(-yaw)));

      invReticleX = xPosition + (0.75 * Math.sin(degToRad(-yaw)));
      invReticleY = yPosition + (0.75 * Math.sin(degToRad(pitch)));
      invReticleZ = zPosition + (0.75 * -Math.cos(degToRad(-yaw)));

      if(cratePicked != null){
        cratePicked.x = xPosition + (-0.5 * Math.sin(degToRad(yaw)));
        cratePicked.y = yPosition + (0.5 * Math.sin(degToRad(pitch))) - 0.25;
        cratePicked.z = zPosition + (-0.5 * Math.cos(degToRad(yaw)));
        cratePicked.rotation = yaw;
      } else{
          crateY = 0.15;
      }

      if(ballPicked != null){
        ballPicked.x = xPosition + (-0.5 * Math.sin(degToRad(yaw)));
        ballPicked.y = yPosition + (0.5 * Math.sin(degToRad(pitch))) - 0.15;
        ballPicked.z = zPosition + (-0.5 * Math.cos(degToRad(yaw)));
        ballPicked.rotation = yaw;
      }
      yaw += yawRate * elapsed;
      pitch += pitchRate * elapsed;

      for(var i in pictures){
        pictures[i].roll += pictures[i].rollRate * elapsed / 10;
      }

      if(pitch >= 20){
        upAllowed = false;
      } else if(pitch <= -20){
        downAllowed = false;
      } else{
        upAllowed = true;
        downAllowed = true;
      }
    }
    checkLocation();
    lastTime = timeNow;
  }

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const animateDoor = async () => {

    if(!doorLocked){
        while(doorYaw <= 90){
            doorYaw += doorYawRate * 5;
            await sleep(5);
        }
    } else{
        while(doorYaw >= 0){
            doorYaw -= doorYawRate * 5;
            await sleep(5);
        }
    }
}

const animateLeftDoor = async () => {

    if(!leftDoorLocked){
        while(leftDoorYaw <= 90){
            leftDoorYaw += doorYawRate * 5;
            await sleep(5);
        }
    } else{
        while(leftDoorYaw >= 0){
            leftDoorYaw -= doorYawRate * 5;
            await sleep(5);
        }
    }
}

const animateBall = async (ball) => {
    var ballYaw = yaw % 360;
    var gravity = 1;
    var ballPitch = pitch;
    var z = zPosition;

    while(ball.speed > 0){

        if(ball.location == "room2"){

            ball.x = ball.x + (ball.speed * Math.sin(degToRad(-ballYaw)));
            ball.z = ball.z + (ball.speed * -Math.cos(degToRad(-ballYaw)));
            ball.y = ball.y + (ball.speed * Math.sin(degToRad(ballPitch)));
            if(ball.y >= 0.125){
                ball.y *= gravity;
                gravity -= Math.pow(ball.speed, 2) * 0.45;
                    
            } else{
                ball.y = 0.125;
            }

            ball.zRoll = Math.abs(ballYaw % 90 / 90);
            ball.xRoll = 1 - ball.zRoll;
            ball.rotation += ball.speed * 100;
            ball.speed -= Math.pow(0.0125, 2);

            if(ball.x >= -3.5 && ball.z >= -0.4 && ball.z <= 0.4){
                leftDoorBroken = true;
                leftDoorLocked = false;
                ball.location = "room1";
            }

            else if(ball.z >= 2.75 || ball.z <= -2.75 || ball.x <= -6.75 || ball.x >= -3.25 || ball.y >= 1.15) ball.speed = 0;
            ball.shootTarget();

            await sleep(10);
        } else{
            ball.x = ball.x + (ball.speed * Math.sin(degToRad(-ballYaw)));
            ball.z = ball.z + (ball.speed * -Math.cos(degToRad(-ballYaw)));
            ball.y = ball.y + (ball.speed * Math.sin(degToRad(ballPitch)));
            if(ball.y >= 0.125){
                ball.y *= gravity;
                gravity -= Math.pow(ball.speed, 2) * 0.45;
                    
            } else{
                ball.y = 0.125;
            }

            ball.zRoll = Math.abs(ballYaw % 90 / 90);
            ball.xRoll = 1 - ball.zRoll;
            ball.rotation += ball.speed * 100;
            ball.speed -= Math.pow(0.0125, 2);

            if(ball.x <= -2.5 && ball.z >= -0.4 && ball.z <= 0.4){
                ball.location = "room2";
            }

            else if(ball.z >= 2.75 || ball.z <= -2.75 || ball.x <= -2.75 || ball.x >= 2.75 || ball.y >= 1.15) ball.speed = 0;

            ball.shootPictures(z);
            ball.shootDoor();
            await sleep(10);
        }
        
    }
    while(ball.y >= 0.15){
        ball.y -= 0.025;
        await sleep(10);
    }

    ball.speed = 0.05;
}

const animateTarget = async () => {
    while(!target.destroyed){
        target.y = randomInRange(0.25, 1.0);
        target.z = randomInRange(-2.75, 2.75);
        await sleep(2000);
    }
}