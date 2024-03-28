import * as THREE from './three.module.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const yellowMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const blackMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
const redMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

// Custom function to create a flat cylinder
function createFlatCylinder(radiusTop, radiusBottom, height, radialSegments, heightSegments) {
    const cylinderGeometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments, heightSegments);
    const cylinder = new THREE.Mesh(cylinderGeometry, yellowMaterial);
    cylinder.rotation.x = Math.PI / 2; // Rotate the cylinder to make it vertical
    return cylinder;
}

const face = createFlatCylinder(1, 1, 0.2, 32, 1); // Create flat cylinder (coin)
scene.add(face);

const eyeGeometry = new THREE.SphereGeometry(0.05, 32, 32);
const leftEye = new THREE.Mesh(eyeGeometry, blackMaterial);
const rightEye = new THREE.Mesh(eyeGeometry, blackMaterial);

const eyesGroup = new THREE.Group();
eyesGroup.add(leftEye);
eyesGroup.add(rightEye);
eyesGroup.position.set(0, 0.1, 0.1); // Adjust eye positions on the flat cylinder
face.add(eyesGroup);

const smileGeometry = new THREE.TorusGeometry(0.5, 0.05, 16, 100, Math.PI);
const smile = new THREE.Mesh(smileGeometry, redMaterial);
smile.position.set(0, -0.1, 0.1); // Adjust smile position on the flat cylinder
face.add(smile);

function animate() {
    requestAnimationFrame(animate);

    // Rotate the coin horizontally
    face.rotation.z -= 0.01;

    renderer.render(scene, camera);
}

animate();
