import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls.js";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
gsap.registerPlugin(MotionPathPlugin);

//===================================================== Variables
let canvas,
  tubeObject,
  tubeObject_,
  keyboardState = {};
canvas = document.querySelector("canvas");
const gltfLoader = new GLTFLoader();

//===================================================== Create a WebGL renderer
var renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  powerPreference: "high-performance",
  alpha: true,
  antialias: true,
  stencil: false,
  depth: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
//===================================================== Create an empty scene
var scene = new THREE.Scene();
// scene.background=new THREE.TextureLoader().load("/city_bg.jpg");
//===================================================== Create a perpsective camera
var camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.001,
  1000
);
camera.position.z = -104;
// camera.position.z = 30;

//===================================================== Orbit Controls
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;
//===================================================== resize
window.addEventListener("resize", function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

//===================================================== Array of points
var points = [new THREE.Vector3(0, 0, -100), new THREE.Vector3(0, 0, 0)];

//===================================================== Create a path from the points
var path = new THREE.CatmullRomCurve3(points);
//===================================================== Create the tube geometry from the path
var sides = 30;
var geometry = new THREE.TubeGeometry(path, 300, 1, sides, true);

//===================================================== Basic material
var material = new THREE.MeshBasicMaterial({
  side: THREE.BackSide,
  map: new THREE.TextureLoader().load("/assets/images/bg_texture.png"),
});
material.map.wrapS = THREE.RepeatWrapping;
material.map.wrapT = THREE.RepeatWrapping;
material.map.repeat.set(1, 1);
//===================================================== Create a mesh
var tube = new THREE.Mesh(geometry, material);
tube.matrixAutoUpdate = true; //wont be moving so no need to update


//===================================================== Create a mesh

const vertexShaderKioks = `
varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShaderKioks = `
  uniform sampler2D cityTexture;
  varying vec2 vUv;
  uniform float opacity;

  void main() {
    vec4 color = texture2D(cityTexture, vUv);
    color.a *= opacity;
    gl_FragColor = color;
  }
`;

const KioksBg = new THREE.TextureLoader().load("/kiosk_.png");

const cityGeometryKioks = new THREE.BoxGeometry(4.1, 3, 0.1);
const cityMaterialKioks = new THREE.ShaderMaterial({
  uniforms: {
    cityTexture: { value: KioksBg },
    opacity: { value: 1 },
  },
  vertexShader: vertexShaderKioks,
  fragmentShader: fragmentShaderKioks,
  transparent: true,
});
const Kiosk = new THREE.Mesh(cityGeometryKioks, cityMaterialKioks);
Kiosk.position.z = -100;

const sparkTexture = new THREE.TextureLoader().load("/static.png");

// spark4.rotation.set(-0.00009659012301032997, -0.006280995261029449, 0.0014376246587767436)
let sparkGroup=new THREE.Group();
for (let i = 0; i < 100; i++) {
  let sparkGeo1 = new THREE.BoxGeometry(0.005,0.005,1);
  let sparkMat1= new THREE.MeshBasicMaterial({map:sparkTexture,transparent:false});
  let spark1= new THREE.Mesh(sparkGeo1,sparkMat1);
  spark1.position.x= Math.random() * (0.6297152794826579 - (-0.6934780919619608)) +( -0.6934780919619608);
  spark1.position.y=Math.random() * (0.3772087694566467 - (-0.3990420461252948)) + (-0.3990420461252948);
  spark1.position.z=Math.random() * ((-109) - (-130)) + (-130);
  sparkGroup.add(spark1)
}
scene.add(sparkGroup);
// TControl(sparkGroup,"P")
// scene.add(spark1,spark2,spark3,spark4)
  // spark5,spark6,spark7,spark8)
// TControl(spark2,"P")
// TControl(spark3,"P")
// TControl(spark4,"P")
// Kiosk.position.y = -0.2;

const vertexShader0 = `
varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader0 = `
  uniform sampler2D cityTexture;
  varying vec2 vUv;
  uniform float opacity;

  void main() {
    vec4 color = texture2D(cityTexture, vUv);
    color.a *= opacity;
    gl_FragColor = color;
  }
`;

const cityTextureDark = new THREE.TextureLoader().load("/assets/images/model/frame00.png");

const cityGeometry0 = new THREE.BoxGeometry(3, 3, 0.1);
const cityMaterial0 = new THREE.ShaderMaterial({
  uniforms: {
    cityTexture: { value: cityTextureDark },
    opacity: { value: 1 },
  },
  vertexShader: vertexShader0,
  fragmentShader: fragmentShader0,
  transparent: true,
});
const city = new THREE.Mesh(cityGeometry0, cityMaterial0);
city.position.set(0, 0, 8)
city.scale.set(2.020,1.211)


const vertexShader = `
varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D cityTexture;
  varying vec2 vUv;
  uniform float opacity;

  void main() {
    vec4 color = texture2D(cityTexture, vUv);
    color.a *= opacity;
    gl_FragColor = color;
  }
`;

const cityTextureLight = new THREE.TextureLoader().load("/assets/images/model/frame0.png");

const cityGeometry1 = new THREE.BoxGeometry(3, 3, 0.1);
const cityMaterial1 = new THREE.ShaderMaterial({
  uniforms: {
    cityTexture: { value: cityTextureLight },
    opacity: { value: 0 },
  },
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  transparent: true,
});

const city1 = new THREE.Mesh(cityGeometry1, cityMaterial1);
city1.position.set(0, 0, 8)
city1.scale.set(2.020,1.211)

// CITY GLOW FRAMES

const cityFrameTexture1 = new THREE.TextureLoader().load("/assets/images/model/frame1.png");
const cityFrameGeo1 = new THREE.BoxGeometry(3, 3, 0.1);
const cityFrameMaterial1 = new THREE.ShaderMaterial({
  uniforms: {
    cityTexture: { value: cityFrameTexture1 },
    opacity: { value: 0 },
  },
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  transparent: true,
});
const cityFrame1 = new THREE.Mesh(cityFrameGeo1, cityFrameMaterial1);
cityFrame1.position.set(0, 0, 8)
cityFrame1.scale.set(2.020,1.211)

const cityFrameTexture2 = new THREE.TextureLoader().load("/assets/images/model/frame2.png");
const cityFrameGeo2 = new THREE.BoxGeometry(3, 3, 0.1);
const cityFrameMaterial2 = new THREE.ShaderMaterial({
  uniforms: {
    cityTexture: { value: cityFrameTexture2 },
    opacity: { value: 0 },
  },
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  transparent: true,
});
const cityFrame2 = new THREE.Mesh(cityFrameGeo2, cityFrameMaterial2);
cityFrame2.position.set(0, 0, 8)
cityFrame2.scale.set(2.020,1.211)

const cityFrameTexture3 = new THREE.TextureLoader().load("/assets/images/model/frame3.png");
const cityFrameGeo3 = new THREE.BoxGeometry(3, 3, 0.1);
const cityFrameMaterial3 = new THREE.ShaderMaterial({
  uniforms: {
    cityTexture: { value: cityFrameTexture3 },
    opacity: { value: 0 },
  },
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  transparent: true,
});
const cityFrame3 = new THREE.Mesh(cityFrameGeo3, cityFrameMaterial3);
cityFrame3.position.set(0, 0, 8)
cityFrame3.scale.set(2.020,1.211)


const cityFrameTexture4 = new THREE.TextureLoader().load("/assets/images/model/frame4.png");
const cityFrameGeo4 = new THREE.BoxGeometry(3, 3, 0.1);
const cityFrameMaterial4 = new THREE.ShaderMaterial({
  uniforms: {
    cityTexture: { value: cityFrameTexture4 },
    opacity: { value: 0 },
  },
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  transparent: true,
});
const cityFrame4 = new THREE.Mesh(cityFrameGeo4, cityFrameMaterial4);
cityFrame4.position.set(0, 0, 8)
cityFrame4.scale.set(2.020,1.211)


const cityFrameTexture5 = new THREE.TextureLoader().load("/assets/images/model/frame5.png");
const cityFrameGeo5 = new THREE.BoxGeometry(3, 3, 0.1);
const cityFrameMaterial5 = new THREE.ShaderMaterial({
  uniforms: {
    cityTexture: { value: cityFrameTexture5 },
    opacity: { value: 0 },
  },
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  transparent: true,
});
const cityFrame5 = new THREE.Mesh(cityFrameGeo5, cityFrameMaterial5);
cityFrame5.position.set(0, 0, 8)
cityFrame5.scale.set(2.020,1.211)


const cityFrameTexture6 = new THREE.TextureLoader().load("/assets/images/model/frame6.png");
const cityFrameGeo6 = new THREE.BoxGeometry(3, 3, 0.1);
const cityFrameMaterial6 = new THREE.ShaderMaterial({
  uniforms: {
    cityTexture: { value: cityFrameTexture6 },
    opacity: { value: 0 },
  },
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  transparent: true,
});
const cityFrame6 = new THREE.Mesh(cityFrameGeo6, cityFrameMaterial6);
cityFrame6.position.set(0, 0, 8)
cityFrame6.scale.set(2.020,1.211)


const cityFrameTexture7 = new THREE.TextureLoader().load("/assets/images/model/frame7.png");
const cityFrameGeo7 = new THREE.BoxGeometry(3, 3, 0.1);
const cityFrameMaterial7 = new THREE.ShaderMaterial({
  uniforms: {
    cityTexture: { value: cityFrameTexture7 },
    opacity: { value: 0 },
  },
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  transparent: true,
});
const cityFrame7 = new THREE.Mesh(cityFrameGeo7, cityFrameMaterial7);
cityFrame7.position.set(0, 0, 8)
cityFrame7.scale.set(2.020,1.211)


scene.add(tube,city, city1, Kiosk,cityFrame1,cityFrame2,cityFrame3,cityFrame4,cityFrame5,cityFrame6,cityFrame7);

//===================================================== Create a point light in our scene
var light = new THREE.PointLight(new THREE.Color("white"), 10, 10);
var ambientLight = new THREE.AmbientLight("#ffffff",10); // The color of the light (gray in this case)

scene.add(ambientLight, light);

//===================================================== Animate
let z1=5;
let z2=3;

console.log("window.innerWidth",window.innerWidth);
// if(window.innerWidth>1024){
//   z1=5;
//   z2=3;
// }else if(window.innerWidth>=992){
//   z1=3;
//   z2=1;
// }else if(window.innerWidth>=768){
//   z1=2;
//   z2=-2;
// }else if(window.innerWidth>=576){
//   z1=2;
//   z2=-2;
// }else if(window.innerWidth>=480){
//   z1=2;
//   z2=-4;
// }else if(window.innerWidth>=200){
  z1=1.8;
  z2=-6;
// }



var exploid = false;
var tl = gsap.timeline();
tl.to(camera.position,{z:-105,duration:3,delay:1,ease: "power1.inOut"})
.to(camera.position,{z:z1,y:-0.6,duration:6,ease: "power3.inOut",onStart:()=>{WhooshAudio()}})
.to(camera.position,{z:z2,y:0,duration:1,ease: "power3.inOut"})
gsap.to(sparkGroup.position,{z:180,y:-0.7,duration:6, delay:7,ease: "power2.outIn"})

tl.to(city.material.uniforms.opacity, {value: 0,duration: 0.4,ease: "power1.outIn",},"+=1")
.to(city1.material.uniforms.opacity, {value: 1,duration: 0.8,ease: "power1.outIn",onComplete:()=>{LightAudio()}},"-=2")
.to(cityFrame1.material.uniforms.opacity, {value: 1,duration: 0.4 ,ease: "power1.outIn",onStart:()=>{LightAudio()}},"-=0.5")
.to(cityFrame2.material.uniforms.opacity, {value: 1,duration: 0.4 ,ease: "power1.outIn",onStart:()=>{LightAudio()}})
.to(cityFrame3.material.uniforms.opacity, {value: 1,duration: 0.4 ,ease: "power1.outIn",onStart:()=>{LightAudio()}})
.to(cityFrame4.material.uniforms.opacity, {value: 1,duration: 0.4 ,ease: "power1.outIn",onStart:()=>{LightAudio()}})
.to(cityFrame5.material.uniforms.opacity, {value: 1,duration: 0.4 ,ease: "power1.outIn",onStart:()=>{LightAudio()}})
.to(cityFrame6.material.uniforms.opacity, {value: 1,duration: 0.4 ,ease: "power1.outIn",onStart:()=>{LightAudio()}})
.to(cityFrame7.material.uniforms.opacity, {value: 1,duration: 0.4 ,ease: "power1.outIn",onStart:()=>{LightAudio()}});




const clock = new THREE.Clock();

function animate() {
  const elapsedTime = clock.getElapsedTime();
  updateCameraPosition();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

const axesHelper = new THREE.AxesHelper(1000); // Adjust the size as needed
// scene.add(axesHelper);

// Add event listeners for keypress events
document.addEventListener("keydown", (event) => {
  keyboardState[event.key] = true;
});

document.addEventListener("keyup", (event) => {
  keyboardState[event.key] = false;
});

// Function to update the camera's position based on user input
function updateCameraPosition() {
  const cameraSpeed = 0.1; // Adjust the speed as needed

  if (keyboardState["ArrowUp"]) {
    camera.position.z -= cameraSpeed;
  }
  if (keyboardState["ArrowDown"]) {
    camera.position.z += cameraSpeed;
  }
  if (keyboardState["ArrowLeft"]) {
    camera.position.y -= cameraSpeed;
  }
  if (keyboardState["ArrowRight"]) {
    camera.position.y += cameraSpeed;
  }
  if (keyboardState["w"]) {
    camera.rotation.x += cameraSpeed * 0.02;
  }

  if (keyboardState["s"]) {
    camera.rotation.x -= cameraSpeed * 0.02;
  }

  // You can add more controls for other directions or actions as needed
}

// TransformControls

function TControl(name,type="P") {
  let tControl = new TransformControls(camera, renderer.domElement);
  tControl.addEventListener("dragging-changed", (event) => {
    orbitControls.enabled = !event.value;
  });
  tControl.attach(name);
  scene.add(tControl);
  
  tControl.addEventListener("change", () => {
    // The object's position has changed
    const newPosition = name.position;
    const newRotate = name.rotation;
    const newScale = name.scale;

    if(type=="R"){
      tControl.setMode("rotate")
      console.log("New Rotation:", newRotate)
    }else if(type=="S"){
      tControl.setMode("scale")
      console.log("New Scale:", newScale)
    }else{
      tControl.setMode("translate")
      console.log("New Position:", newPosition)
    }
  
  });


}


function LightAudio() {
  var audio = document.getElementById("LightAudio");
  audio.play();
}

function WhooshAudio() {
  var audio = document.getElementById("WhooshAudio");
  setTimeout(() => {
    audio.play();
  }, 1500);
}
