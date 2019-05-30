var canvas;
var gl;
var shaderProgram;

var worldVertexPositionBuffer = null;
var worldVertexNormalBuffer;
var worldVertexTextureCoordBuffer = null;
var worldVertexIndexBuffer;

var doorVertexPositionBuffer;
var doorVertexNormalBuffer;
var doorVertexTextureCoordBuffer;
var doorVertexIndexBuffer;

var leftDoorVertexPositionBuffer;
var leftDoorVertexNormalBuffer;
var leftDoorVertexTextureCoordBuffer;
var leftDoorVertexIndexBuffer;

var pictureVertexPositionBuffer;
var pictureVertexNormalBuffer;
var pictureVertexTextureCoordBuffer;
var pictureVertexIndexBuffer;

var crateVertexPositionBuffer;
var crateVertexNormalBuffer;
var crateVertexTextureCoordBuffer;
var crateVertexIndexBuffer;

var plateVertexPositionBuffer;
var plateVertexNormalBuffer;
var plateVertexTextureCoordBuffer;
var plateVertexIndexBuffer;

var ballVertexPositionBuffer;
var ballVertexNormalBuffer;
var ballVertexNormalBuffer;
var ballVertexIndexBuffer;

var targetVertexPositionBuffer;
var targetVertexNormalBuffer;
var targetVertexNormalBuffer;

var mvMatrixStack = [];
var mvMatrix = mat4.create();
var pMatrix = mat4.create();

var wallTexture;
var doorTexture;
var pictureTexture;
var crateTexture;
var plateTexture;
var targetTexture;

var crateStandingOn = null;
var cratePicked = null;
var ballPicked = null;
var numOfBalls = 0;

var numberOfTextures = 7;
var texturesLoaded = 0;

var target;

var currentlyPressedKeys = {};

var pitch = 0;
var pitchRate = 0;
var yaw = 0;
var yawRate = 0;
var roll = 0;
var rollRate = 1.0;

var xPosition = 0;
var yPosition = 0.4;
var zPosition = 0;
var speedForward = 0;
var speedSideways = 0;

var lightX = 0;
var lightY = 0.6;
var lightZ = 0;

var doorYaw = 0;
var doorYawRate = 0.2;

var leftDoorYaw = 0;
var leftDoorYawRate = 0.2;

var lastX = xPosition;
var lastY = yPosition;
var lastZ = zPosition;

var upAllowed = true;
var downAllowed = true;

var joggingAngle = 0;

var reticleVertexPositionBuffer;
var reticleVertexTextureCoordBuffer;
var reticleTexture;

var reticleX = xPosition + (0.2 * Math.sin(degToRad(yaw)));
var reticleY = yPosition + (0.2 * Math.sin(degToRad(pitch)));
var reticleZ = zPosition + (0.2 * Math.cos(degToRad(yaw)));

var invReticleX = xPosition + (0.5 * Math.sin(degToRad(yaw)));
var invReticleY = yPosition + (0.5 * Math.sin(degToRad(pitch)));
var invReticleZ = zPosition + (0.5 * Math.cos(degToRad(yaw)));

var doorX = 0.4;
var doorY = 0;
var doorZ = -3;

var r = 0;

var doorHealth = 4;

var crateX = -1;
var crateY = 0.15;
var crateZ = -2.5;

var crates = [];
var pictures = [];
var plates = [];
var balls = [];
var pictureNum = 0;

var currentLocation = "room1";

var doorLocked = true;
var leftDoorLocked = true;
var leftDoorBroken = false;

var lastTime = 0;

function mvPushMatrix() {
  var copy = mat4.create();
  mat4.set(mvMatrix, copy);
  mvMatrixStack.push(copy);
}

function mvPopMatrix() {
  if (mvMatrixStack.length == 0) {
    throw "Invalid popMatrix!";
  }
  mvMatrix = mvMatrixStack.pop();
}

function degToRad(degrees) {
  return degrees * Math.PI / 180;
}

function initGL(canvas) {
  var gl = null;
  try {
    // Try to grab the standard context. If it fails, fallback to experimental.
    gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;
  } catch(e) {}

  // If we don't have a GL context, give up now
  if (!gl) {
    alert("Unable to initialize WebGL. Your browser may not support it.");
  }
  return gl;
}

function initBuffers(){

  initReticleBuffers();
  initDoorBuffers();
  initLeftDoorBuffers();
  initCrateBuffers();
  initPictureBuffers();
  initPlateBuffers();
  initBallBuffers();
  initTargetBuffers();
}

function setMatrixUniforms() {
  gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
  gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);

  var normalMatrix = mat3.create();
  mat4.toInverseMat3(mvMatrix, normalMatrix);
  mat3.transpose(normalMatrix);
  gl.uniformMatrix3fv(shaderProgram.nMatrixUniform, false, normalMatrix);
}

function initTextures() {
  wallTexture = gl.createTexture();
  wallTexture.image = new Image();
  wallTexture.image.onload = function () {
    handleTextureLoaded(wallTexture)
  }
  wallTexture.image.src = "./assets/metal.jpg";

  reticleTexture = gl.createTexture();
  reticleTexture.image = new Image();
  reticleTexture.image.onload = function(){
    handleTextureLoaded(reticleTexture);
  }
  reticleTexture.image.src = "./assets/lgm.png";

  doorTexture = gl.createTexture();
  doorTexture.image = new Image();
  doorTexture.image.onload = function(){
    handleTextureLoaded(doorTexture);
  }
  doorTexture.image.src = "./assets/door.png";

  pictureTexture = gl.createTexture();
  pictureTexture.image = new Image();
  pictureTexture.image.onload = function(){
    handleTextureLoaded(pictureTexture);
  }
  pictureTexture.image.src = "./assets/sun.png";

  crateTexture = gl.createTexture();
  crateTexture.image = new Image();
  crateTexture.image.onload = function(){
    handleTextureLoaded(crateTexture);
  }
  crateTexture.image.src = "./assets/crate.png";

  plateTexture = gl.createTexture();
  plateTexture.image = new Image();
  plateTexture.image.onload = function(){
    handleTextureLoaded(plateTexture);
  }
  plateTexture.image.src = "./assets/plate.png";

  targetTexture = gl.createTexture();
  targetTexture.image = new Image();
  targetTexture.image.onload = function(){
    handleTextureLoaded(targetTexture);
  }
  targetTexture.image.src = "./assets/target.png";
}

function handleTextureLoaded(texture) {
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.generateMipmap(gl.TEXTURE_2D);

  gl.bindTexture(gl.TEXTURE_2D, null);

  texturesLoaded += 1;
}

function start() {
  canvas = document.getElementById("glcanvas");

  gl = initGL(canvas);

  if (gl) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    initShaders();
    initBuffers();
    initTextures();
    loadWorld();
    Crate.loadCrates();
    Picture.loadPictures();
    Plate.loadPlates();
    Ball.loadBalls();
    Target.loadTargets();

    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;
    
    setInterval(function() {
      if (texturesLoaded == numberOfTextures) {
        requestAnimationFrame(animate);
        handleKeys();
        drawScene();
      }
    }, 15);
  }
}