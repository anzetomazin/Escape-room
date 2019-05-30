function handleLoadedWorld(data) {
    var lines = data.split("\n");
    var vertexCount = 0;
    var vertexPositions = [];
    var vertexTextureCoords = [];

    var vertexNormals = [
        // FLOOR
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,

        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        // CEILING
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,

        0, -1, 0, 
        0, -1, 0, 
        0, -1, 0,
        // RIGHT WALL
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,

        -1, 0, 0, 
        -1, 0, 0, 
        -1, 0, 0,
        // LEFT WALL left
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,

        1, 0, 0, 
        1, 0, 0, 
        1, 0, 0,
        // LEFT WALL middle
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,

        1, 0, 0, 
        1, 0, 0, 
        1, 0, 0,
        // LEFT WALL right
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,

        1, 0, 0, 
        1, 0, 0, 
        1, 0, 0,

        // FRONT WALL left
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,

        0, 0, 1, 
        0, 0, 1, 
        0, 0, 1,
        // FRONT WALL middle
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,

        0, 0, 1, 
        0, 0, 1, 
        0, 0, 1,
        // FRONT WALL right
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,

        0, 0, 1, 
        0, 0, 1, 
        0, 0, 1,

         // BACK WALL
         0, 0, -1,
         0, 0, -1,
         0, 0, -1,
 
         0, 0, -1, 
         0, 0, -1, 
         0, 0, -1,

         // HALLWAY floor
         0, 1, 0,
         0, 1, 0,
         0, 1, 0,
 
         0, 1, 0, 
         0, 1, 0, 
         0, 1, 0,

         // HALLWAY ceiling
         0, 1, 0,
         0, 1, 0,
         0, 1, 0,

         0, 1, 0, 
         0, 1, 0, 
         0, 1, 0,

         // HALLWAY left
         1, 0, 0,
         1, 0, 0,
         1, 0, 0,
 
         1, 0, 0, 
         1, 0, 0, 
         1, 0, 0,

         // HALLWAY right
         -1, 0, 0,
         -1, 0, 0,
         -1, 0, 0,
 
         -1, 0, 0, 
         -1, 0, 0, 
         -1, 0, 0,

          // ROOM2 floor
          0, 1, 0,
          0, 1, 0,
          0, 1, 0,
  
          0, 1, 0, 
          0, 1, 0, 
          0, 1, 0,

           // ROOM2 ceiling
           0, -1, 0,
           0, -1, 0,
           0, -1, 0,
   
           0, -1, 0, 
           0, -1, 0, 
           0, -1, 0,

           // ROOM2 left wall
           0, 0, -1,
           0, 0, -1,
           0, 0, -1,
   
           0, 0, -1, 
           0, 0, -1, 
           0, 0, -1,

          // ROOM2 right wall
          0, 0, 1,
          0, 0, 1,
          0, 0, 1,
  
          0, 0, 1, 
          0, 0, 1, 
          0, 0, 1,

           // ROOM2 front wall
           1, 0, 0,
           1, 0, 0,
           1, 0, 0,
   
           1, 0, 0, 
           1, 0, 0, 
           1, 0, 0,
          // ROOM2 back wall
          //
           -1, 0, 0,
           -1, 0, 0,
           -1, 0, 0,
   
           -1, 0, 0, 
           -1, 0, 0, 
           -1, 0, 0,
          //
           -1, 0, 0,
           -1, 0, 0,
           -1, 0, 0,
   
           -1, 0, 0, 
           -1, 0, 0, 
           -1, 0, 0,
          //
           -1, 0, 0,
           -1, 0, 0,
           -1, 0, 0,
   
           -1, 0, 0, 
           -1, 0, 0, 
           -1, 0, 0,
           
    ];

    var worldVertexIndices = [
      0, 1, 2,      0, 2, 3,    // Front face
      4, 5, 6,      4, 6, 7,    // Back face
      8, 9, 10,     8, 10, 11,  // Top face
      12, 13, 14,   12, 14, 15, // Bottom face
      16, 17, 18,   16, 18, 19, // Right face
      20, 21, 22,   20, 22, 23,
      24, 25, 26,   24, 26, 27,
      28, 29, 30,   28, 30, 31,
      32, 33, 34,   32, 34, 35,
      36, 37, 38,   36, 38, 39,
      40, 41, 42,   40, 42, 43,
      44, 45, 46,   44, 46, 47,
      48, 49, 50,   48, 50, 51,
      52, 53, 54,   52, 54, 55,
      56, 57, 58,   56, 58, 59,
      60, 61, 62,   60, 62, 63,
      64, 65, 66,   64, 66, 67,
      68, 69, 70,   68, 70, 71,
      72, 73, 74,   72, 74, 75, // Left face
    ];

    for (var i in lines) {
      var vals = lines[i].replace(/^\s+/, "").split(/\s+/);
      if (vals.length == 5 && vals[0] != "//") {

        vertexPositions.push(parseFloat(vals[0]));
        vertexPositions.push(parseFloat(vals[1]));
        vertexPositions.push(parseFloat(vals[2]));

        vertexTextureCoords.push(parseFloat(vals[3]));
        vertexTextureCoords.push(parseFloat(vals[4]));
  
        vertexCount += 1;
      }
    }
  
    worldVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, worldVertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexPositions), gl.STATIC_DRAW);
    worldVertexPositionBuffer.itemSize = 3;
    worldVertexPositionBuffer.numItems = 132;

    worldVertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, worldVertexNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals), gl.STATIC_DRAW);
    worldVertexNormalBuffer.itemSize = 3;
    worldVertexNormalBuffer.numItems = 132;
  
    worldVertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, worldVertexTextureCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexTextureCoords), gl.STATIC_DRAW);
    worldVertexTextureCoordBuffer.itemSize = 2;
    worldVertexTextureCoordBuffer.numItems = vertexCount;

    worldVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, worldVertexIndexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(worldVertexIndices), gl.STATIC_DRAW);
    worldVertexIndexBuffer.itemSize = 1;
    worldVertexIndexBuffer.numItems = 12;
  }
  
function loadWorld() {
    var request = new XMLHttpRequest();
    request.open("GET", "./assets/world.txt");
    request.onreadystatechange = function () {
      if (request.readyState == 4) {
        handleLoadedWorld(request.responseText);
      }
    }
    request.send();
}