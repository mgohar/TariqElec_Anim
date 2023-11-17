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
  map: new THREE.TextureLoader().load("/tariq_texture.png"),
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

const sparkTexture = new THREE.TextureLoader().load("./kenney_particle-pack/transparent/spark_06.png");

let sparkGeo1 = new THREE.BoxGeometry(0.01,0.01,1);
let sparkMat1= new THREE.MeshBasicMaterial({map:sparkTexture,transparent:false});
let spark1= new THREE.Mesh(sparkGeo1,sparkMat1);
spark1.position.x=-0.6934780919619608
spark1.position.y=-0.2
spark1.position.z=-105
spark1.rotation.set(-0.00009686608850151691, 0.053745427253361434, 0.0014434275160815147)

let sparkGeo2 = new THREE.BoxGeometry(0.01,0.01,1);
let sparkMat2= new THREE.MeshBasicMaterial({map:sparkTexture,transparent:false});
let spark2= new THREE.Mesh(sparkGeo2,sparkMat2);
spark2.position.x=0.8974731940287006
spark2.position.y=-0.2
spark2.position.z=-105
spark2.rotation.set(-0.00009686608850151691, 0.053745427253361434, 0.0014434275160815147)

let sparkGeo3 = new THREE.BoxGeometry(0.01,0.01,1);
let sparkMat3= new THREE.MeshBasicMaterial({map:sparkTexture,transparent:false});
let spark3= new THREE.Mesh(sparkGeo3,sparkMat3);
spark3.position.x=-0.00164798674274641
spark3.position.y=0.3994003903464206
spark3.position.z=-105
spark3.rotation.set(-0.00009686608850151691, 0.053745427253361434, 0.0014434275160815147)

let sparkGeo4 = new THREE.BoxGeometry(0.01,0.01,1);
let sparkMat4= new THREE.MeshBasicMaterial({map:sparkTexture,transparent:false});
let spark4= new THREE.Mesh(sparkGeo4,sparkMat4);
spark4.position.x=-0.009661595268887713
spark4.position.y=-0.8429349452070565
spark4.position.z=-105
spark4.rotation.set(-0.00009686608850151691, 0.053745427253361434, 0.0014434275160815147)

scene.add(spark1,spark2,spark3,spark4)
// TControl(spark4)
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

const cityTextureDark = new THREE.TextureLoader().load("/dark_city.png");

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
city.position.z = 3;
city.position.y = -0.5;

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

const cityTextureLight = new THREE.TextureLoader().load("/light_city.png");

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
city1.position.z = 3;
city1.position.y = -0.5;
scene.add(tube,city, city1, Kiosk);

// const model1 = "/objects/hart.gltf";
// // IMPORT BOTTLE 1 MODEL
// gltfLoader.load(model1, (gltf) => {

//   tubeObject = gltf.scene;
//   tubeObject.scale.set(1,1,1)
//   tubeObject.position.set(0, -0.9994388899135012, -90.23312906124671)
//   // scene.add(gltf.scene);
//   const material = new THREE.MeshPhysicalMaterial({
//     roughness:0.3,
//     metalness:0,
//     transmission:1,
//     ior:2.33
//    });

//   tubeObject.traverse((child) => {
//     if (child.isMesh) {
//       child.material = material;
//     }
//   });
//   TControl(tubeObject)

// });

// const model1_ = "/objects/hart.gltf";
// // IMPORT BOTTLE 1 MODEL
// gltfLoader.load(model1_, (gltf) => {
//   tubeObject_ = gltf.scene;
//   tubeObject_.position.set(0, -1, -90.23312906124671);

//   scene.add(gltf.scene);
//   const matcapTexture = new THREE.TextureLoader().load("blue5.png");
//   const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });

//   tubeObject_.traverse((child) => {
//     if (child.isMesh) {
//       child.material = material;
//     }
//   });
  
// });

//===================================================== Create a point light in our scene
var light = new THREE.PointLight(new THREE.Color("white"), 10, 10);
var ambientLight = new THREE.AmbientLight("#ffffff",10); // The color of the light (gray in this case)

scene.add(ambientLight, light);

//===================================================== Animate
var exploid = false;

// gsap.to(camera.position,{z:-100,duration:3,delay:1,ease: "power1.inOut"})
// gsap.to(camera.position,{z:-1.5,duration:3, delay:3.7,ease: "power2.outIn"})
// gsap.to(spark1.position,{z:20,duration:5, delay:3.7,ease: "power2.outIn"})
// gsap.to(spark2.position,{z:20,duration:5, delay:3.7,ease: "power2.outIn"})
// gsap.to(spark3.position,{z:20,duration:5, delay:3.7,ease: "power2.outIn"})
// gsap.to(spark4.position,{z:20,duration:5, delay:3.7,ease: "power2.outIn"})

// gsap.to(city1.scale, {
//   x: 1.6,
//   y: 1.6,
//   delay: 7,
//   duration: 0.5, // Duration in seconds
//   ease: "power1.outIn",
// });

// gsap.to(city.material.uniforms.opacity, {
//   value: 0,
//   delay: 7,
//   duration: 0, // Duration in seconds
//   ease: "power1.outIn",
// });
// gsap.to(city1.material.uniforms.opacity, {
//   value: 1,
//   delay: 7,
//   duration: 0, // Duration in seconds
//   ease: "power1.outIn",
//   onUpdate: () => {
//     exploid = true;
//     // Render the scene on each update to see the animation
//     renderer.render(scene, camera);
//   },
// });

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
    type=="R"?
   ( console.log("New Rotation:", newRotate),tControl.setMode("rotate")):
    (console.log("New Position:", newPosition),tControl.setMode("translate"));
  });


}


