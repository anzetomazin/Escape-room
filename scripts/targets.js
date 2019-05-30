class Target{

    constructor(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
        this.destroyed = false;
    }

    draw(){
        mvPushMatrix();
        mat4.translate(mvMatrix, [this.x, this.y, this.z]);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, targetTexture);
        gl.uniform1i(shaderProgram.samplerUniform, 0);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, targetVertexNormalBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, targetVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, targetVertexTextureCoordBuffer);
        gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, targetVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, targetVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, targetVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
        
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, targetVertexIndexBuffer);
        setMatrixUniforms();
        gl.drawElements(gl.TRIANGLES, targetVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
        mvPopMatrix();
    }

    static loadTargets(){
        target = new Target(-7, 0.5, 0);
    }
}