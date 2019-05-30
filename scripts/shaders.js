function getShader(gl, id) {
    var shaderScript = document.getElementById(id);
  
    if (!shaderScript) {
      return null;
    }
    
    var shaderSource = "";
    var currentChild = shaderScript.firstChild;
    while (currentChild) {
      if (currentChild.nodeType == 3) {
          shaderSource += currentChild.textContent;
      }
      currentChild = currentChild.nextSibling;
    }
    
    var shader;
    if (shaderScript.type == "x-shader/x-fragment") {
      shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (shaderScript.type == "x-shader/x-vertex") {
      shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
      return null;
    }
  
    gl.shaderSource(shader, shaderSource);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert(gl.getShaderInfoLog(shader));
      return null;
    }
  
    return shader;
}
  
function initShaders() {
  var fragmentShader = getShader(gl, "shader-fs");
  var vertexShader = getShader(gl, "shader-vs");
  
  // Create the shader program
  shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  
  // If creating the shader program failed, alert
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert("Unable to initialize the shader program.");
  }

  // start using shading program for rendering
  gl.useProgram(shaderProgram);

  // store location of aVertexPosition variable defined in shader
  shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");

  // turn on vertex position attribute at specified position
  gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

  // store location of texture coordinate variable defined in shader
  shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");

  // turn on texture coordinate attribute at specified position
  gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);

  // store location of vertex normals variable defined in shader
  shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");

  // turn on vertex normals attribute at specified position
  gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);

  // store location of uPMatrix variable defined in shader - projection matrix 
  shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
  // store location of uMVMatrix variable defined in shader - model-view matrix 
  shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
  // store location of uNMatrix variable defined in shader - normal matrix 
  shaderProgram.nMatrixUniform = gl.getUniformLocation(shaderProgram, "uNMatrix");
  // store location of uSampler variable defined in shader
  shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
  shaderProgram.useTexturesUniform = gl.getUniformLocation(shaderProgram, "uUseTextures");
  // store location of uUseLighting variable defined in shader
  shaderProgram.useLightingUniform = gl.getUniformLocation(shaderProgram, "uUseLighting");
  // store location of uAmbientColor variable defined in shader
  shaderProgram.ambientColorUniform = gl.getUniformLocation(shaderProgram, "uAmbientColor");
  // store location of uLightingDirection variable defined in shader
  shaderProgram.pointLightingLocationUniform = gl.getUniformLocation(shaderProgram, "uPointLightingLocation");
  // store location of uDirectionalColor variable defined in shader
  shaderProgram.pointLightingColorUniform = gl.getUniformLocation(shaderProgram, "uPointLightingColor");
}