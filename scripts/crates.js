class Crate{

    constructor(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
        this.rotation = 0;
        this.size = 0.15;
        this.picked = false;
        this.wasMoved = false;
    }

    draw(){
        mvPushMatrix();
        mat4.translate(mvMatrix, [this.x, this.y, this.z]);
        if(this.picked){
            mat4.rotate(mvMatrix, degToRad(yaw), [0, 1, 0]);
            mat4.rotate(mvMatrix, degToRad(pitch), [1, 0, 0]);
        } else{
            mat4.rotate(mvMatrix, degToRad(this.rotation), [0, 1, 0]);
        }
        
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, crateTexture);
        gl.uniform1i(shaderProgram.samplerUniform, 0);
        
        // Set the normals attribute for the vertices.
        gl.bindBuffer(gl.ARRAY_BUFFER, crateVertexNormalBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, crateVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, crateVertexTextureCoordBuffer);
        gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, crateVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, crateVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, crateVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
        
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, crateVertexIndexBuffer);
        setMatrixUniforms();
        gl.drawElements(gl.TRIANGLES, crateVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
        mvPopMatrix();
    }

    static loadCrates(){
        var xes = [-2.5, -2, -1.5, -1, 1, 1.5, 2, 2.5];
        for(var i in xes){
            crates.push(new Crate(xes[i], 0.15, -2.5));
        }
    }

    pickCrate(){
        
        var distance = Math.sqrt(Math.pow(this.x - invReticleX, 2) + Math.pow(this.y - invReticleY, 2) + Math.pow(this.z - invReticleZ, 2));
        if(distance <= 0.25){
            this.picked = true;
            this.wasMoved = true;
            cratePicked = this;
        }
    }

    standOnCrate(){
        var distance = Math.sqrt(Math.pow(this.x - invReticleX, 2) + Math.pow(this.y - invReticleY, 2) + Math.pow(this.z - invReticleZ, 2));
        if(distance <= 0.25){
            crateStandingOn = this;
            xPosition = this.x;
            yPosition = this.y + 0.15 + 0.6;
            zPosition = this.z;
        }
    }
}