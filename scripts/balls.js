class Ball{

    constructor(x, y, z, rotation, id){
        this.x = x;
        this.y = y;
        this.z = z;
        this.rotation = rotation;
        this.id = id;
        this.xRoll = 0;
        this.zRoll = 0;
        this.location = "room2";
        this.hasSuperpowers = false;
        this.used = false;
        this.speed = 0.05;
    }

    draw(){
        mvPushMatrix();
        mat4.translate(mvMatrix, [this.x, this.y, this.z]);
        mat4.rotate(mvMatrix, degToRad(this.rotation), [this.xRoll, 0, this.zRoll]);
        // Activate textures
        gl.activeTexture(gl.TEXTURE0);
        if(!this.hasSuperpowers) gl.bindTexture(gl.TEXTURE_2D, plateTexture);
        else  gl.bindTexture(gl.TEXTURE_2D, targetTexture);
        gl.uniform1i(shaderProgram.colorMapSamplerUniform, 0);

        // Set the vertex positions attribute for the teapot vertices.
        gl.bindBuffer(gl.ARRAY_BUFFER, ballVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, ballVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

        // Set the texture coordinates attribute for the vertices.
        gl.bindBuffer(gl.ARRAY_BUFFER, ballVertexTextureCoordBuffer);
        gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, ballVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, ballVertexNormalBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, ballVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

        // Set the index for the vertices.
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ballVertexIndexBuffer);
        setMatrixUniforms();

        // Draw the earth
        gl.drawElements(gl.TRIANGLES, ballVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
        mvPopMatrix();
    }

    static loadBalls(){

        var zs = [0, 0.5, 1.0, -0.5, -1.0];
        for(var i = 0; i < 5; i += 1){
            var x = -5
            var y = 0.15;
            var z = zs[i];
            balls.push(new Ball(x, y, z, 0, i));
        }
    }

    pickBall(){
        
        var distance = Math.sqrt(Math.pow(this.x - invReticleX, 2) + Math.pow(this.y - invReticleY, 2) + Math.pow(this.z - invReticleZ, 2));
        if(distance <= 0.25){
            this.picked = true;
            this.wasMoved = true;
            ballPicked = this;
            numOfBalls += 1;
            ballPicked.location = currentLocation;
        }
    }

    shootPictures(z){
        if(z > 0 && this.hasSuperpowers){
            for(var i in pictures){
                var p = pictures[i];
                if(this.x >= p.x - 0.15 && this.x <= p.x + 0.15 && this.y >= p.y - 0.15 && this.y <= p.y + 0.15 && this.z <= p.z + 0.25){
                    console.log("HIT");
                    p.destroyed = true;
                    p.fall();
                }
            }
        }
    }

    shootDoor(){
        if(!this.hasSuperpowers && Picture.allDestroyed() && !this.used) {
            if(this.z <= -2.75 && this.x >= -0.4 && this.x <= 0.4){
                doorHealth -= 1;
                this.used = true;
                if(doorHealth == 0){
                    doorLocked = false;
                    animateDoor();
                }
            }
        }
    }

    shootTarget(){
        if(this.location == "room2"){
            if(this.x <= -6.75 && this.z >= target.z-0.25 && this.z <= target.z+0.25 && this.y >= target.y-0.25 && this.y <= target.y + 0.75){
                target.destroyed = true;
                target.x = -10;
                target.y = -10;
                this.hasSuperpowers = true;
            }
        }
    }
}

function randomInRange(min, max) {
    return Math.random() * (max-min) + min;
  }