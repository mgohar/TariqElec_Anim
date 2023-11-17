import * as THREE from "three";

import { GUI } from "three/addons/libs/lil-gui.module.min.js";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";

const BLOOM_SCENE = 1;

const bloomLayer = new THREE.Layers();
bloomLayer.set(BLOOM_SCENE);

const params = {
  threshold: 0,
  strength: 1,
  radius: 0.5,
  exposure: 1,
};


let canvas = document.querySelector(".canvas");
let draw = document.querySelector(".draw");
const renderer = new THREE.WebGLRenderer({ antialias: true,canvas:canvas,alpha:true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ReinhardToneMapping;

// RENDERER 2
const renderer2 = new THREE.WebGLRenderer({ antialias: true ,canvas:draw,alpha:true});
renderer2.setPixelRatio(window.devicePixelRatio);
renderer2.setSize(window.innerWidth, window.innerHeight);
renderer2.toneMapping = THREE.ReinhardToneMapping;

// document.body.appendChild(renderer2.domElement);

const scene = new THREE.Scene();
const WBscene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  1,
  200
);
camera.position.set(0, 0, 20);
camera.lookAt(0, 0, 0);

const controls = new OrbitControls(camera, renderer.domElement);
controls.maxPolarAngle = Math.PI * 0.5;
controls.minDistance = 1;
controls.maxDistance = 100;
controls.addEventListener("change", render);

const renderScene = new RenderPass(scene, camera);

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5,
  0.4,
  0.85
);
bloomPass.threshold = params.threshold;
bloomPass.strength = params.strength;
bloomPass.radius = params.radius;

const bloomComposer = new EffectComposer(renderer);
bloomComposer.renderToScreen = false;
bloomComposer.addPass(renderScene);
bloomComposer.addPass(bloomPass);

const mixPass = new ShaderPass(
  new THREE.ShaderMaterial({
    uniforms: {
      baseTexture: { value: null },
      bloomTexture: { value: bloomComposer.renderTarget2.texture },
    },
    vertexShader: document.getElementById("vertexshader").textContent,
    fragmentShader: document.getElementById("fragmentshader").textContent,
    defines: {},
  }),
  "baseTexture"
);
mixPass.needsSwap = true;

const outputPass = new OutputPass();

const finalComposer = new EffectComposer(renderer);
finalComposer.addPass(renderScene);
finalComposer.addPass(mixPass);
finalComposer.addPass(outputPass);

const raycaster = new THREE.Raycaster();

const mouse = new THREE.Vector2();

const gui = new GUI();

const bloomFolder = gui.addFolder("bloom");

bloomFolder.add(params, "threshold", 0.0, 1.0).onChange(function (value) {
  bloomPass.threshold = Number(value);
  render();
});

bloomFolder.add(params, "strength", 0.0, 3).onChange(function (value) {
  bloomPass.strength = Number(value);
  render();
});

bloomFolder
  .add(params, "radius", 0.0, 1.0)
  .step(0.01)
  .onChange(function (value) {
    bloomPass.radius = Number(value);
    render();
  });

const toneMappingFolder = gui.addFolder("tone mapping");

toneMappingFolder.add(params, "exposure", 0.1, 2).onChange(function (value) {
  renderer.toneMappingExposure = Math.pow(value, 4.0);
  render();
});

const cityTextureLight = new THREE.TextureLoader().load("./tube_texture.png");

let boxGeo = new THREE.BoxGeometry(1, 1, 1);
let boxMet = new THREE.MeshBasicMaterial({ map: cityTextureLight });
let box = new THREE.Mesh(boxGeo, boxMet);
let boxGeo1 = new THREE.BoxGeometry(1, 1, 1);
let boxMet1 = new THREE.MeshBasicMaterial({ map: cityTextureLight });
let box1 = new THREE.Mesh(boxGeo1, boxMet1);
box1.position.set(1, 1);
scene.add(box, box1);
WBscene.add(box1);

function render() {
  bloomComposer.render();
  finalComposer.render();
  renderer2.render(WBscene, camera);
  requestAnimationFrame(render);
}
render();
