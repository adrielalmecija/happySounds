import * as THREE from './three.module.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const redMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
const yellowMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const blackMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });


const torusGeometry = new THREE.TorusGeometry(0.5, 0.05, 16, 100, Math.PI); // Create torus for the mouth
const smile = new THREE.Mesh(torusGeometry, redMaterial);
smile.position.set(0, 0, 0.11); // Adjusted position of the mouth
smile.rotation.z = Math.PI;

const eyeGeometry = new THREE.SphereGeometry(0.1, 32, 32);
const leftEye = new THREE.Mesh(eyeGeometry, blackMaterial);
const rightEye = new THREE.Mesh(eyeGeometry, blackMaterial);
leftEye.position.set(-0.3, 0.3, 0.11); // Adjusted position of the left eye
rightEye.position.set(0.3, 0.3, 0.11); // Adjusted position of the right eye

const coinGeometry = new THREE.CylinderGeometry(1, 1, 0.2, 32, 1);
const coin = new THREE.Mesh(coinGeometry, yellowMaterial);
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
