import "./style.css";
import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Texture
const textures = new THREE.TextureLoader();
const mainTexture = textures.load("/textures/2k_mars.jpg");
const bumpTexture = textures.load("/textures/2k_mars_topo.jpg");
const crrosTexture = textures.load("/textures/unnamed.png");
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
const marsSphere = new THREE.SphereGeometry(0.8, 32, 32);

// Mars Materials
const marsMaterial = new THREE.MeshPhongMaterial({
  map: mainTexture,
  bumpMap: bumpTexture,
  bumpScale: 0.007,
});

// Particle
const particles = new THREE.BufferGeometry();
const particlesCount = 7000;
const posArray = new Float32Array(particlesCount * 3);
for (let i = 0; i < particlesCount * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * (Math.random() * 5);
}

particles.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
const particlesMaterial = new THREE.PointsMaterial({
  size: 0.0019,
  map: crrosTexture,
  transparent: true,
  color: "white",
});

// Materials
const material = new THREE.MeshBasicMaterial();
material.color = new THREE.Color(0xffffff);

// Mesh
const particlesSphere = new THREE.Points(particles, particlesMaterial);
const mars = new THREE.Mesh(marsSphere, marsMaterial);
scene.add(mars, particlesSphere);

// Lights
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.1);
directionalLight.position.set(50, 50, 30);

const hemLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 1);
hemLight.position.set(50, -10, -10);

scene.add(directionalLight, hemLight);
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight * 2,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight * 2;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  85,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  mars.rotation.y += 0.002;
  particlesSphere.rotation.y = -0.05 * elapsedTime;
  // Update Orbital Controls
  // controls.update()
  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
