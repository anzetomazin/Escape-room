class Picture{

    constructor(x, y, z, id){
        this.x = x;
        this.y = y;
        this.z = z;
        this.id = id;
        this.roll = 0;
        this.rollRate = 0.0;
        this.destroyed = false;
    }

    draw(){
        mvPushMatrix();
        mat4.translate(mvMatrix, [this.x, this.y, this.z]);
        if(!this.destroyed) mat4.rotate(mvMatrix, degToRad(this.roll), [0, 0, 1]);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, pictureTexture);
        gl.uniform1i(shaderProgram.samplerUniform, 0);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, pictureVertexTextureCoordBuffer);
        gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, pictureVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, pictureVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, pictureVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
        
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, pictureVertexIndexBuffer);
        setMatrixUniforms();
        gl.drawElements(gl.TRIANGLES, pictureVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
        mvPopMatrix();
    }

    static loadPictures(){
        var xes = [-2.5, -2, -1.5, -1, 1, 1.5, 2, 2.5];
        for(var i in xes){
            pictures.push(new Picture(xes[i], 0.7, -3));
        }
    }

    async fall(){
        while(this.y > 0.15){
            this.y -= 0.02;
            await sleep(10);
        }
    }

    static allDestroyed(){
        var n = 0;
        for(var i in pictures){
            if(pictures[i].destroyed) n += 1;
        }
        return n == 8;
    }
}