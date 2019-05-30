function drawScene() {

    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
    if (worldVertexTextureCoordBuffer == null || worldVertexPositionBuffer == null) {
      return;
    }
    
    mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);

    gl.uniform1i(shaderProgram.useLightingUniform, true);

    gl.uniform3f(
        shaderProgram.ambientColorUniform,
        parseFloat(0.0),
        parseFloat(0.0),
        parseFloat(0.0)
        );
      
        gl.uniform3f(
        shaderProgram.pointLightingLocationUniform,
        parseFloat(0),
        parseFloat(0.4),
        parseFloat(0)
        );
      
        gl.uniform3f(
        shaderProgram.pointLightingColorUniform,
        parseFloat(0.8),
        parseFloat(0.8),
        parseFloat(0.8)
    );
    

    gl.uniform1i(shaderProgram.useTexturesUniform, true);

    mat4.identity(mvMatrix);
    mvPushMatrix();

    drawWorld();
    drawDoor();
    drawLeftDoor();
    drawCrates();
    drawPictures();
    drawPlates();
    drawBalls();
    if(!target.destroyed) target.draw();
    drawReticle();

    mat4.translate(mvMatrix, [0, 0, 0]);
    mvPushMatrix();
}

function drawReticle(){

    mat4.translate(mvMatrix, [reticleX, reticleY, reticleZ]);
    mvPushMatrix();
    mat4.rotate(mvMatrix, degToRad(yaw), [0, 1, 0]);
    mat4.rotate(mvMatrix, degToRad(pitch), [1, 0, 0]);
  
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, reticleTexture);
    gl.uniform1i(shaderProgram.samplerUniform, 0);
  
    gl.bindBuffer(gl.ARRAY_BUFFER, reticleVertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, reticleVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
    setMatrixUniforms();
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, reticleVertexPositionBuffer.numItems);
    mvPopMatrix();
}

function drawPictures(){
    for(var i in pictures){
        pictures[i].draw();
    }
}

function drawCrates(){
    for(var i in crates){
        crates[i].draw();
    }
}

function drawPlates(){
    for(var i in plates){
        plates[i].draw();
    }
}

function drawDoor(){

    mvPushMatrix();
    mat4.translate(mvMatrix, [doorX, doorY, doorZ]);
    mat4.rotate(mvMatrix, degToRad(doorYaw), [0, 1, 0]);
    mat4.translate(mvMatrix, [-0.4, 0, 0]);
    
    gl.activeTexture(gl.TEXTURE0);

    gl.bindTexture(gl.TEXTURE_2D, doorTexture);
    gl.uniform1i(shaderProgram.samplerUniform, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, doorVertexTextureCoordBuffer);
    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, doorVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, doorVertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, doorVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, doorVertexNormalBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, doorVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, doorVertexIndexBuffer);
    setMatrixUniforms();
    gl.drawElements(gl.TRIANGLES, doorVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    mvPopMatrix();
}

function drawLeftDoor(){
    mvPushMatrix();
    if(!leftDoorBroken){
        mat4.translate(mvMatrix, [-3, 0, 0.4]);
        mat4.rotate(mvMatrix, degToRad(leftDoorYaw), [0, 1, 0]);
        mat4.translate(mvMatrix, [0, 0, -0.4]);
    }else{
        mat4.translate(mvMatrix, [-15, 0, 15]);
    }

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, doorTexture);
    gl.uniform1i(shaderProgram.samplerUniform, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, leftDoorVertexTextureCoordBuffer);
    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, leftDoorVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, leftDoorVertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, leftDoorVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, leftDoorVertexNormalBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, leftDoorVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, leftDoorVertexIndexBuffer);
    setMatrixUniforms();
    gl.drawElements(gl.TRIANGLES, leftDoorVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    mvPopMatrix();
}

function drawWorld(){

    mvPushMatrix();
    mat4.translate(mvMatrix, [0, 0, 0]);
    mat4.rotate(mvMatrix, degToRad(-pitch), [1, 0, 0]);
    mat4.rotate(mvMatrix, degToRad(-yaw), [0, 1, 0]);
    mat4.translate(mvMatrix, [-xPosition, -yPosition, -zPosition]);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, wallTexture);
    gl.uniform1i(shaderProgram.samplerUniform, 0);
  
    gl.bindBuffer(gl.ARRAY_BUFFER, worldVertexTextureCoordBuffer);
    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, worldVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, worldVertexNormalBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, worldVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, worldVertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, worldVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    setMatrixUniforms();
    gl.drawArrays(gl.TRIANGLES, 0, worldVertexPositionBuffer.numItems);
    //gl.drawElements(gl.TRIANGLES, worldVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    //mvPopMatrix();
}

function drawBalls(){
    for(var i in balls){
        balls[i].draw();
    }
}