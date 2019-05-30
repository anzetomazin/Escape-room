class Plate{

    constructor(x, y, z, id){
        this.x = x;
        this.y = y;
        this.z = z;
        this.id = id;
        this.activated = false;
        this.wrongCrate = false;
    }

    isInBounds(id){
        return crates[id].x >= this.x - 0.15 && crates[id].x <= this.x + 0.15 && crates[id].z >= this.z - 0.15 && crates[id].z <= this.z + 0.15;
    }

    activate(){
        for(var i in plates){

            if(this.isInBounds(i)){
                if(i == this.id){
                    this.activated = true;
                    this.wrongCrate = false;
                } else{
                    this.wrongCrate = true;
                    this.activated = false;
                }
                break;
            } else{
                this.wrongCrate = false;
                this.activated = false;
            }
        }
    }

    draw(){
        mvPushMatrix();
        mat4.translate(mvMatrix, [this.x, this.y, this.z]);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, plateTexture);
        gl.uniform1i(shaderProgram.samplerUniform, 0);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, plateVertexNormalBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, plateVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, plateVertexTextureCoordBuffer);
        gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, plateVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, plateVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, plateVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
        
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, plateVertexIndexBuffer);
        setMatrixUniforms();
        gl.drawElements(gl.TRIANGLES, plateVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
        mvPopMatrix();
    }

    static loadPlates(){
        var xes = [-2.5, -2, -1.5, -1, 1, 1.5, 2, 2.5];
        var indexes = [1, 6, 3, 7, 4, 2, 5, 0];

        for(var i in xes){
            plates.push(new Plate(xes[i], 0.0, 2.5, indexes[i]));
        }
    }

    static activatePictures(){
        for(var i in plates){
            if(plates[i].activated){
                pictures[plates[i].id].rollRate = 1.0;
            } else if(plates[i].wrongCrate){
                pictures[plates[i].id].rollRate = -1.0;
            } else if(!plates[i].wrongCrate && !plates[i].activated){
                pictures[plates[i].id].rollRate = 0.0;
            }
        }
    }

    static allOK(){
        var ok = 0;
        for(var i in pictures){
            if(pictures[i].rollRate == 1.0){
                ok += 1
            }
        }
        return ok == 8;
    }
}