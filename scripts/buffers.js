function initDoorBuffers(){

    doorVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, doorVertexPositionBuffer);
    
    var vertices = [
        // Front face
        -0.4,  1.0,  0.05,
         0.4,  1.0,  0.05,
         0.4,  0.0,  0.05,
        -0.4,  0.0,  0.05,
    
        // Back face
        -0.4,  0.0, -0.05,
        -0.4,  1.0, -0.05,
         0.4,  1.0, -0.05,
         0.4,  0.0, -0.05,
    
        // Top face
        -0.4,  1.0, -0.05,
        -0.4,  1.0,  0.05,
         0.4,  1.0,  0.05,
         0.4,  1.0, -0.05,
    
        // Bottom face
        -0.4,  0.0, -0.05,
         0.4,  0.0, -0.05,
         0.4,  0.0,  0.05,
        -0.4,  0.0,  0.05,
    
        // Right face
         0.4,  0.0, -0.05,
         0.4,  1.0, -0.05,
         0.4,  1.0,  0.05,
         0.4,  0.0,  0.05,
    
        // Left face
        -0.4,  0.0, -0.05,
        -0.4,  0.0,  0.05,
        -0.4,  1.0,  0.05,
        -0.4,  1.0, -0.05,
      ];
    
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    doorVertexPositionBuffer.itemSize = 3;
    doorVertexPositionBuffer.numItems = 24;

    doorVertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, doorVertexNormalBuffer);
    
    // Now create an array of vertex normals for the cube.
    var vertexNormals = [
      // Front face
       0.0,  0.0,  1.0,
       0.0,  0.0,  1.0,
       0.0,  0.0,  1.0,
       0.0,  0.0,  1.0,
  
      // Back face
       0.0,  0.0, -1.0,
       0.0,  0.0, -1.0,
       0.0,  0.0, -1.0,
       0.0,  0.0, -1.0,
  
      // Top face
       0.0,  1.0,  0.0,
       0.0,  1.0,  0.0,
       0.0,  1.0,  0.0,
       0.0,  1.0,  0.0,
  
      // Bottom face
       0.0, -1.0,  0.0,
       0.0, -1.0,  0.0,
       0.0, -1.0,  0.0,
       0.0, -1.0,  0.0,
  
      // Right face
       1.0,  0.0,  0.0,
       1.0,  0.0,  0.0,
       1.0,  0.0,  0.0,
       1.0,  0.0,  0.0,
  
      // Left face
      -1.0,  0.0,  0.0,
      -1.0,  0.0,  0.0,
      -1.0,  0.0,  0.0,
      -1.0,  0.0,  0.0
    ];
  
    // Pass the normals into WebGL
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals), gl.STATIC_DRAW);
    doorVertexNormalBuffer.itemSize = 3;
    doorVertexNormalBuffer.numItems = 24;

    doorVertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, doorVertexTextureCoordBuffer);

    var textureCoordinates = [
        // Front
        0.0,  0.0,
        1.0,  0.0,
        1.0,  -1.0,
        0.0,  -1.0,
        // Back
        0.0,  0.0,
        0.0,  1.0,
        1.0,  1.0,
        1.0,  0.0,
        // Top
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0,
        // Bottom
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0,
        // Right
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0,
        // Left
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0
      ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);
    doorVertexTextureCoordBuffer.itemSize = 2;
    doorVertexTextureCoordBuffer.numItems = 24;

    doorVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, doorVertexIndexBuffer);
    
    var doorVertexIndices = [
        0,  1,  2,      0,  2,  3,    // front
        4,  5,  6,      4,  6,  7,    // back
        8,  9,  10,     8,  10, 11,   // top
        12, 13, 14,     12, 14, 15,   // bottom
        16, 17, 18,     16, 18, 19,   // right
        20, 21, 22,     20, 22, 23    // left
    ];
    
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(doorVertexIndices), gl.STATIC_DRAW);
    doorVertexIndexBuffer.itemSize = 1;
    doorVertexIndexBuffer.numItems = 36;
}

function initReticleBuffers(){

    reticleVertexPositionBuffer = gl.createBuffer();
    
    gl.bindBuffer(gl.ARRAY_BUFFER, reticleVertexPositionBuffer);
    
    var vertices = [
        0.0010,  0.0010,  0.0,
        -0.0010,  0.0010,  0.0,
        0.0010, -0.0010,  0.0,
        -0.0010, -0.0010,  0.0
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    reticleVertexPositionBuffer.itemSize = 3;
    reticleVertexPositionBuffer.numItems = 4;

    reticleVertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, reticleVertexNormalBuffer);
    
    // Now create an array of vertex normals for the cube.
    var vertexNormals = [
        // Front face
        0.0,  0.0,  1.0,
        0.0,  0.0,  1.0,
        0.0,  0.0,  1.0,
        0.0,  0.0,  1.0,
    ];

    // Pass the normals into WebGL
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals), gl.STATIC_DRAW);
    reticleVertexNormalBuffer.itemSize = 3;
    reticleVertexNormalBuffer.numItems = 24;

    reticleVertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, reticleVertexTextureCoordBuffer);

    var textureCoordinates = [
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);
    reticleVertexTextureCoordBuffer.itemSize = 2;
    reticleVertexTextureCoordBuffer.numItems = 4;
}

function initCrateBuffers(){

    crateVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, crateVertexPositionBuffer);

    var vertices = [
        // Front face
        -0.15,  0.15,  0.15,
         0.15,  0.15,  0.15,
         0.15,  -0.15,  0.15,
        -0.15,  -0.15,  0.15,
    
        // Back face
        -0.15,  -0.15, -0.15,
        -0.15,  0.15, -0.15,
         0.15,  0.15, -0.15,
         0.15,  -0.15, -0.15,
    
        // Top face
        -0.15,  0.15, -0.15,
        -0.15,  0.15,  0.15,
         0.15,  0.15,  0.15,
         0.15,  0.15, -0.15,
    
        // Bottom face
        -0.15,  -0.15, -0.15,
         0.15,  -0.15, -0.15,
         0.15,  -0.15,  0.15,
        -0.15,  -0.15,  0.15,
    
        // Right face
         0.15,  -0.15, -0.15,
         0.15,  0.15, -0.15,
         0.15,  0.15,  0.15,
         0.15,  -0.15,  0.15,
    
        // Left face
        -0.15,  -0.15, -0.15,
        -0.15,  -0.15,  0.15,
        -0.15,  0.15,  0.15,
        -0.15,  0.15, -0.15,
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    crateVertexPositionBuffer.itemSize = 3;
    crateVertexPositionBuffer.numItems = 24;

    crateVertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, crateVertexNormalBuffer);
    
    // Now create an array of vertex normals for the cube.
    var vertexNormals = [
        // Front face
        0.0,  0.0,  1.0,
        0.0,  0.0,  1.0,
        0.0,  0.0,  1.0,
        0.0,  0.0,  1.0,

        // Back face
        0.0,  0.0, -1.0,
        0.0,  0.0, -1.0,
        0.0,  0.0, -1.0,
        0.0,  0.0, -1.0,

        // Top face
        0.0,  1.0,  0.0,
        0.0,  1.0,  0.0,
        0.0,  1.0,  0.0,
        0.0,  1.0,  0.0,

        // Bottom face
        0.0, -1.0,  0.0,
        0.0, -1.0,  0.0,
        0.0, -1.0,  0.0,
        0.0, -1.0,  0.0,

        // Right face
        1.0,  0.0,  0.0,
        1.0,  0.0,  0.0,
        1.0,  0.0,  0.0,
        1.0,  0.0,  0.0,

        // Left face
        -1.0,  0.0,  0.0,
        -1.0,  0.0,  0.0,
        -1.0,  0.0,  0.0,
        -1.0,  0.0,  0.0
    ];

    // Pass the normals into WebGL
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals), gl.STATIC_DRAW);
    crateVertexNormalBuffer.itemSize = 3;
    crateVertexNormalBuffer.numItems = 24;

    crateVertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, crateVertexTextureCoordBuffer);

    var textureCoordinates = [
        // Front
        0.0,  0.0,
        1.0,  0.0,
        1.0,  -1.0,
        0.0,  -1.0,
        // Back
        0.0,  0.0,
        0.0,  1.0,
        1.0,  1.0,
        1.0,  0.0,
        // Top
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0,
        // Bottom
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0,
        // Right
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0,
        // Left
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0
      ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);
    crateVertexTextureCoordBuffer.itemSize = 2;
    crateVertexTextureCoordBuffer.numItems = 24;

    crateVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, crateVertexIndexBuffer);
    
    var crateVertexIndices = [
        0,  1,  2,      0,  2,  3,    // front
        4,  5,  6,      4,  6,  7,    // back
        8,  9,  10,     8,  10, 11,   // top
        12, 13, 14,     12, 14, 15,   // bottom
        16, 17, 18,     16, 18, 19,   // right
        20, 21, 22,     20, 22, 23    // left
    ];

    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(crateVertexIndices), gl.STATIC_DRAW);
    crateVertexIndexBuffer.itemSize = 1;
    crateVertexIndexBuffer.numItems = 36;
}

function initPictureBuffers(){

    pictureVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pictureVertexPositionBuffer);

    var vertices = [
        // Front face
        -0.15,  0.15,  0.025,
        -0.15, -0.15,  0.025,
         0.15, -0.15,  0.025,
         0.15,  0.15,  0.025,
    
        // Back face
        -0.15,  0.15,  0.0,
        -0.15, -0.15,  0.0,
         0.15, -0.15,  0.0,
         0.15,  0.15,  0.0,
    
        // Top face
        -0.15,  0.15,  0.0,
        -0.15,  0.15,  0.025,
         0.15,  0.15,  0.025,
         0.15,  0.15,  0.0,
    
        // Bottom face
        -0.15, -0.15,  0.0,
         0.15, -0.15,  0.0,
         0.15, -0.15,  0.025,
        -0.15, -0.15,  0.025,
    
        // Right face
         0.15, -0.15,  0.0,
         0.15,  0.15,  0.0,
         0.15,  0.15,  0.025,
         0.15, -0.15,  0.025,
    
        // Left face
        -0.15, -0.15,  0.0,
        -0.15, -0.15,  0.025,
        -0.15,  0.15,  0.025,
        -0.15,  0.15,  0.0,
      ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    pictureVertexPositionBuffer.itemSize = 3;
    pictureVertexPositionBuffer.numItems = 24;

    pictureVertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pictureVertexNormalBuffer);
    
    // Now create an array of vertex normals for the cube.
    var vertexNormals = [
        // Front face
        0.0,  0.0,  1.0,
        0.0,  0.0,  1.0,
        0.0,  0.0,  1.0,
        0.0,  0.0,  1.0,

        // Back face
        0.0,  0.0, -1.0,
        0.0,  0.0, -1.0,
        0.0,  0.0, -1.0,
        0.0,  0.0, -1.0,

        // Top face
        0.0,  1.0,  0.0,
        0.0,  1.0,  0.0,
        0.0,  1.0,  0.0,
        0.0,  1.0,  0.0,

        // Bottom face
        0.0, -1.0,  0.0,
        0.0, -1.0,  0.0,
        0.0, -1.0,  0.0,
        0.0, -1.0,  0.0,

        // Right face
        1.0,  0.0,  0.0,
        1.0,  0.0,  0.0,
        1.0,  0.0,  0.0,
        1.0,  0.0,  0.0,

        // Left face
        -1.0,  0.0,  0.0,
        -1.0,  0.0,  0.0,
        -1.0,  0.0,  0.0,
        -1.0,  0.0,  0.0
    ];

    // Pass the normals into WebGL
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals), gl.STATIC_DRAW);
    pictureVertexNormalBuffer.itemSize = 3;
    pictureVertexNormalBuffer.numItems = 24;

    pictureVertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pictureVertexTextureCoordBuffer);

    var textureCoordinates = [
        // Front
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0,
        // Back
        0.0,  0.0,
        0.0,  0.0,
        0.0,  0.0,
        0.0,  0.0,
        // Top
        0.0,  0.0,
        0.0,  0.0,
        0.0,  0.0,
        0.0,  0.0,
        // Bottom
        0.0,  0.0,
        0.0,  0.0,
        0.0,  0.0,
        0.0,  0.0,
        // Right
        0.0,  0.0,
        0.0,  0.0,
        0.0,  0.0,
        0.0,  0.0,
        // Left
        0.0,  0.0,
        0.0,  0.0,
        0.0,  0.0,
        0.0,  0.0
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);
    pictureVertexTextureCoordBuffer.itemSize = 2;
    pictureVertexTextureCoordBuffer.numItems = 24;

    pictureVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, pictureVertexIndexBuffer);
    
    var pictureVertexIndices = [
        0,  1,  2,      0,  2,  3,    // front
        4,  5,  6,      4,  6,  7,    // back
        8,  9,  10,     8,  10, 11,   // top
        12, 13, 14,     12, 14, 15,   // bottom
        16, 17, 18,     16, 18, 19,   // right
        20, 21, 22,     20, 22, 23    // left
    ];

    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(pictureVertexIndices), gl.STATIC_DRAW);
    pictureVertexIndexBuffer.itemSize = 1;
    pictureVertexIndexBuffer.numItems = 36;
}

function initPlateBuffers(){

    plateVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, plateVertexPositionBuffer);

    var vertices = [
        // Top face
        -0.25,  0.01, -0.25,
        -0.25,  0.01,  0.25,
         0.25,  0.01,  0.25,
         0.25,  0.01, -0.25,
      ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    plateVertexPositionBuffer.itemSize = 3;
    plateVertexPositionBuffer.numItems = 4;

    plateVertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, plateVertexNormalBuffer);
    
    // Now create an array of vertex normals for the cube.
    var vertexNormals = [
        // Top face
        0.0,  1.0,  0.0,
        0.0,  1.0,  0.0,
        0.0,  1.0,  0.0,
        0.0,  1.0,  0.0,
    ];

    // Pass the normals into WebGL
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals), gl.STATIC_DRAW);
    plateVertexNormalBuffer.itemSize = 3;
    plateVertexNormalBuffer.numItems = 4;

    plateVertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, plateVertexTextureCoordBuffer);

    var textureCoordinates = [
        // Top
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0,
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);
    plateVertexTextureCoordBuffer.itemSize = 2;
    plateVertexTextureCoordBuffer.numItems = 4;

    plateVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, plateVertexIndexBuffer);
    
    var vertexIndices = [
        0,  1,  2,      0,  2,  3,
        //4,  5,  6,      4,  6,  7,
        //8,  9,  10,     8,  10, 11,
    ];

    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertexIndices), gl.STATIC_DRAW);
    plateVertexIndexBuffer.itemSize = 1;
    plateVertexIndexBuffer.numItems = 6;
}

function initLeftDoorBuffers(){
    leftDoorVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, leftDoorVertexPositionBuffer);
    
    var vertices = [
        // Front face
         0.05,  1.0, -0.4,
         0.05,  1.0,  0.4,
         0.05,  0.0,  0.4,
         0.05,  0.0, -0.4,
    
        // Back face
        -0.05,  0.0, -0.4,
        -0.05,  1.0, -0.4,
        -0.05,  1.0,  0.4,
        -0.05,  0.0,  0.4,
    
        // Top face
        -0.05,  1.0, -0.4,
         0.05,  1.0,  0.4,
         0.05,  1.0,  0.4,
        -0.05,  1.0, -0.4,
    
        // Bottom face
        -0.05,  0.0, -0.4,
        -0.05,  0.0, -0.4,
         0.05,  0.0,  0.4,
         0.05,  0.0,  0.4,
    
        // Left face
        -0.05,  0.0,  0.4,
        -0.05,  1.0,  0.4,
         0.05,  1.0,  0.4,
         0.05,  0.0,  0.4,
    
        // Right face
        -0.05,  0.0, -0.4,
         0.05,  0.0, -0.4,
         0.05,  1.0, -0.4,
        -0.05,  1.0, -0.4,
      ];
    
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    leftDoorVertexPositionBuffer.itemSize = 3;
    leftDoorVertexPositionBuffer.numItems = 24;

    leftDoorVertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, leftDoorVertexNormalBuffer);
    
    // Now create an array of vertex normals for the cube.
    var vertexNormals = [
      // Front face
       1.0,  0.0,  0.0,
       1.0,  0.0,  0.0,
       1.0,  0.0,  0.0,
       1.0,  0.0,  0.0,
  
      // Back face
       -1.0,  0.0, 0.0,
       -1.0,  0.0, 0.0,
       -1.0,  0.0, 0.0,
       -1.0,  0.0, 0.0,
  
      // Top face
       0.0,  1.0,  0.0,
       0.0,  1.0,  0.0,
       0.0,  1.0,  0.0,
       0.0,  1.0,  0.0,
  
      // Bottom face
       0.0, -1.0,  0.0,
       0.0, -1.0,  0.0,
       0.0, -1.0,  0.0,
       0.0, -1.0,  0.0,
  
      // Left face
       1.0,  0.0,  0.0,
       1.0,  0.0,  0.0,
       1.0,  0.0,  0.0,
       1.0,  0.0,  0.0,
  
      // Right face
       1.0,  0.0,  0.0,
       1.0,  0.0,  0.0,
       1.0,  0.0,  0.0,
       1.0,  0.0,  0.0
    ];
  
    // Pass the normals into WebGL
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals), gl.STATIC_DRAW);
    leftDoorVertexNormalBuffer.itemSize = 3;
    leftDoorVertexNormalBuffer.numItems = 24;

    leftDoorVertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, leftDoorVertexTextureCoordBuffer);

    var textureCoordinates = [
        // Front
        0.0,  0.0,
        1.0,  0.0,
        1.0,  -1.0,
        0.0,  -1.0,
        // Back
        0.0,  0.0,
        0.0,  1.0,
        1.0,  1.0,
        1.0,  0.0,
        // Top
        0.0,  0.0,
        1.0,  0.0,
        1.0,  -1.0,
        0.0,  -1.0,
        // Bottom
        0.0,  0.0,
        1.0,  0.0,
        1.0,  -1.0,
        0.0,  -1.0,
        // Right
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0,
        // Left
        0.0,  0.0,
        0.0,  1.0,
        1.0,  1.0,
        1.0,  0.0
      ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);
    leftDoorVertexTextureCoordBuffer.itemSize = 2;
    leftDoorVertexTextureCoordBuffer.numItems = 24;

    leftDoorVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, leftDoorVertexIndexBuffer);
    
    var doorVertexIndices = [
        0,  1,  2,      0,  2,  3,    // front
        4,  5,  6,      4,  6,  7,    // back
        8,  9,  10,     8,  10, 11,   // top
        12, 13, 14,     12, 14, 15,   // bottom
        16, 17, 18,     16, 18, 19,   // right
        20, 21, 22,     20, 22, 23    // left
    ];
    
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(doorVertexIndices), gl.STATIC_DRAW);
    leftDoorVertexIndexBuffer.itemSize = 1;
    leftDoorVertexIndexBuffer.numItems = 36;
}

function initBallBuffers(){
    // SPHERE
  var latitudeBands = 30;
  var longitudeBands = 30;
  var radius = 0.125;

  var vertexPositionData = [];
  var normalData = [];
  var textureCoordData = [];
  for (var latNumber=0; latNumber <= latitudeBands; latNumber++) {
    var theta = latNumber * Math.PI / latitudeBands;
    var sinTheta = Math.sin(theta);
    var cosTheta = Math.cos(theta);

    for (var longNumber=0; longNumber <= longitudeBands; longNumber++) {
      var phi = longNumber * 2 * Math.PI / longitudeBands;
      var sinPhi = Math.sin(phi);
      var cosPhi = Math.cos(phi);

      var x = cosPhi * sinTheta;
      var y = cosTheta;
      var z = sinPhi * sinTheta;
      var u = 1 - (longNumber / longitudeBands);
      var v = 1 - (latNumber / latitudeBands);

      normalData.push(x);
      normalData.push(y);
      normalData.push(z);
      textureCoordData.push(u);
      textureCoordData.push(v);
      vertexPositionData.push(radius * x);
      vertexPositionData.push(radius * y);
      vertexPositionData.push(radius * z);
    }
  }

  var indexData = [];
  for (var latNumber=0; latNumber < latitudeBands; latNumber++) {
    for (var longNumber=0; longNumber < longitudeBands; longNumber++) {
      var first = (latNumber * (longitudeBands + 1)) + longNumber;
      var second = first + longitudeBands + 1;
      indexData.push(first);
      indexData.push(second);
      indexData.push(first + 1);

      indexData.push(second);
      indexData.push(second + 1);
      indexData.push(first + 1);
    }
  }

  // Pass the normals into WebGL
  ballVertexNormalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, ballVertexNormalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalData), gl.STATIC_DRAW);
  ballVertexNormalBuffer.itemSize = 3;
  ballVertexNormalBuffer.numItems = normalData.length / 3;

  // Pass the texture coordinates into WebGL
  ballVertexTextureCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, ballVertexTextureCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordData), gl.STATIC_DRAW);
  ballVertexTextureCoordBuffer.itemSize = 2;
  ballVertexTextureCoordBuffer.numItems = textureCoordData.length / 2;

  // Pass the vertex positions into WebGL
  ballVertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, ballVertexPositionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexPositionData), gl.STATIC_DRAW);
  ballVertexPositionBuffer.itemSize = 3;
  ballVertexPositionBuffer.numItems = vertexPositionData.length / 3;

  // Pass the indices into WebGL
  ballVertexIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ballVertexIndexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), gl.STREAM_DRAW);
  ballVertexIndexBuffer.itemSize = 1;
  ballVertexIndexBuffer.numItems = indexData.length;
}

function initTargetBuffers(){

    targetVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, targetVertexPositionBuffer);

    var vertices = [
        0.01,  -0.25, -0.25,
        0.01,  0.25,  -0.25,
        0.01,  0.25,  0.25,
        0.01,  -0.25, 0.25,
      ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    targetVertexPositionBuffer.itemSize = 3;
    targetVertexPositionBuffer.numItems = 4;

    targetVertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, targetVertexNormalBuffer);
    
    // Now create an array of vertex normals for the cube.
    var vertexNormals = [
        1.0,  0.0,  0.0,
        1.0,  0.0,  0.0,
        1.0,  0.0,  0.0,
        1.0,  0.0,  0.0,
    ];

    // Pass the normals into WebGL
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals), gl.STATIC_DRAW);
    targetVertexNormalBuffer.itemSize = 3;
    targetVertexNormalBuffer.numItems = 4;

    targetVertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, targetVertexTextureCoordBuffer);

    var textureCoordinates = [
        // Top
        0.0,  0.0,
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0,
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);
    targetVertexTextureCoordBuffer.itemSize = 2;
    targetVertexTextureCoordBuffer.numItems = 4;

    targetVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, targetVertexIndexBuffer);
    
    var vertexIndices = [
        0,  1,  2,      0,  2,  3,
        //4,  5,  6,      4,  6,  7,
        //8,  9,  10,     8,  10, 11,
    ];

    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertexIndices), gl.STATIC_DRAW);
    targetVertexIndexBuffer.itemSize = 1;
    targetVertexIndexBuffer.numItems = 6;
}