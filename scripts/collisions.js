function collisions(elapsed){

    if(speedForward != 0){

        var leftDoor1 = xPosition <= -2.75 && zPosition >= -0.4 && zPosition <= 0.4 && !leftDoorLocked;
        var leftDoor2 = xPosition >= -3.25 && zPosition >= -0.4 && zPosition <= 0.4 && !leftDoorLocked;

        var frontDoor = zPosition <= -2.75 && xPosition >= -0.4 && xPosition <= 0.4 && !doorLocked;

        if(currentLocation == "room1"){
            if(xPosition >= -2.75 && xPosition <= 2.75 && zPosition >= -2.75 && zPosition <= 2.75 || leftDoor1 || frontDoor){

                lastZ = zPosition;
                zPosition -= Math.cos(degToRad(yaw)) * speedForward * elapsed;

                lastX = xPosition;
                xPosition -= Math.sin(degToRad(yaw)) * speedForward * elapsed;

            } else{
                xPosition = lastX;
                zPosition = lastZ;
            }
        } else if(currentLocation == "room2"){
            if(xPosition >= -6.75 && xPosition <= -3.25 && zPosition >= -2.75 && zPosition <= 2.75 || leftDoor2){

                lastZ = zPosition;
                zPosition -= Math.cos(degToRad(yaw)) * speedForward * elapsed;

                lastX = xPosition;
                xPosition -= Math.sin(degToRad(yaw)) * speedForward * elapsed;

            } else{
                xPosition = lastX;
                zPosition = lastZ;
            }
        }

        joggingAngle += elapsed * 0.6;
        yPosition = Math.sin(degToRad(joggingAngle)) / 20 + 0.5
    }

    if(speedSideways != 0){

        var leftDoor1 = xPosition <= -2.75 && zPosition >= -0.4 && zPosition <= 0.4 && !leftDoorLocked;
        var leftDoor2 = xPosition >= -3.25 && zPosition >= -0.4 && zPosition <= 0.4 && !leftDoorLocked;

        var frontDoor = zPosition <= -3.25 && xPosition >= -0.4 && xPosition <= 0.4 && !doorLocked;

        if(currentLocation == "room1"){
            if(xPosition >= -2.75 && xPosition <= 2.75 && zPosition >= -2.75 && zPosition <= 2.75 || leftDoor1 || frontDoor){

                lastZ = zPosition;
                zPosition -= Math.sin(degToRad(-yaw)) * speedSideways * elapsed;

                lastX = xPosition;
                xPosition -= Math.cos(degToRad(-yaw)) * speedSideways * elapsed;

            } else{
                xPosition = lastX;
                zPosition = lastZ;
            }
        } else if(currentLocation == "room2"){
            if(xPosition >= -6.75 && xPosition <= -3.25 && zPosition >= -2.75 && zPosition <= 2.75 || leftDoor2){

                lastZ = zPosition;
                zPosition -= Math.sin(degToRad(-yaw)) * speedSideways * elapsed;

                lastX = xPosition;
                xPosition -= Math.cos(degToRad(-yaw)) * speedSideways * elapsed;

            } else{
                xPosition = lastX;
                zPosition = lastZ;
            }
        }
        joggingAngle += elapsed * 0.6; // 0.6 "fiddle factor" - makes it feel more realistic :-)
        yPosition = Math.sin(degToRad(joggingAngle)) / 20 + 0.5
    }
}

const checkLocation = async () =>{

    if(xPosition >= -3 && xPosition <= 3 && zPosition >= -3 && zPosition <= 3){
        currentLocation = "room1";
        if(ballPicked != null) ballPicked.location = "room1";
    } else if(xPosition >= -7 && xPosition < -3 && zPosition >= -3 && zPosition <= 3){
        currentLocation = "room2";
        if(ballPicked != null) ballPicked.location = "room2";
    } else if(zPosition <= -5){
        window.location = "./gameover.html";
    }
}