import * as THREE from './three.module.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create cube texture for environment mapping (you may replace this with your own textures)
const cubeTextureLoader = new THREE.CubeTextureLoader();
const texture = cubeTextureLoader.load([
    'src/White_square_50_transparency.svg', 'src/White_square_50_transparency.svg',
    'src/White_square_50_transparency.svg', 'src/White_square_50_transparency.svg',
    'src/White_square_50_transparency.svg', 'src/White_square_50_transparency.svg',
]);
//scene.background = texture;

const redMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const yellowMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const blackMaterial = new THREE.MeshStandardMaterial({ color: 0x000000, metalness: 1, envMap: texture }); // Use MeshStandardMaterial for reflection

// Create a directional light in front of the face
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(2, 10, 1); // Adjusted position of the light
directionalLight.castShadow = true;
scene.add(directionalLight);


// Create a spotlight in front of the face
// const spotLight = new THREE.SpotLight(0xff00ff);
// spotLight.intensity = 2;
// spotLight.position.set(0, 0, 5); // Adjusted position of the light
// spotLight.target.position.set(0, 0, 5); // Target the light to the center of the scene
// spotLight.angle = Math.PI / 6; // Narrow spotlight cone angle
// scene.add(spotLight);

// Add a helper to visualize the spotlight
const spotLightHelper = new THREE.DirectionalLightHelper(directionalLight);
// spotLight.position.set(0, 0, 3); // Adjusted position of the light
scene.add(spotLightHelper);


const torusGeometry = new THREE.TorusGeometry(0.5, 0.05, 16, 100, Math.PI); // Create torus for the mouth
const smile = new THREE.Mesh(torusGeometry, blackMaterial);
smile.position.set(0, 0, 0.11); // Adjusted position of the mouth
smile.rotation.z = Math.PI;

const eyeGeometry = new THREE.SphereGeometry(0.1, 32, 32);
const leftEye = new THREE.Mesh(eyeGeometry, blackMaterial);
const rightEye = new THREE.Mesh(eyeGeometry, blackMaterial);
leftEye.position.set(-0.3, 0.3, 0.11); // Adjusted position of the left eye
rightEye.position.set(0.3, 0.3, 0.11); // Adjusted position of the right eye

const coinGeometry = new THREE.CylinderGeometry(1, 1, 0.2, 32, 1);
const textureCoin = new THREE.TextureLoader().load('src/texture.jpeg'); // Load the JPG texture
const coinMaterial = new THREE.MeshBasicMaterial({ map: textureCoin }); // Use the texture for the coin material
coinMaterial.color.setRGB(0.5, 0.5, 0.5);
const coin = new THREE.Mesh(coinGeometry, coinMaterial);
coin.rotation.x = Math.PI / 2; // Rotate coin to make it vertical
smile.rotation.y = Math.PI;

// Create a group to hold both the coin and the face
const coinAndFaceGroup = new THREE.Group();
coinAndFaceGroup.add(coin);
coinAndFaceGroup.add(smile);
coinAndFaceGroup.add(leftEye);
coinAndFaceGroup.add(rightEye);

scene.add(coinAndFaceGroup);

function animate() {
    requestAnimationFrame(animate);

    // Rotate the group containing both the coin and the face
    coinAndFaceGroup.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();
