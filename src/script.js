import * as THREE from './three.module.js';

class BuildScene {
    constructor() {
        this.initialize();
    }

    initialize() {
        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.shadowMap.enabled = true; // Enable shadow mapping
        renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Set shadow map type
        renderer.setSize(window.innerWidth, window.innerHeight); // Set renderer size
        document.body.appendChild(renderer.domElement); // Append renderer to the document body

        // Camera setup
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5; // Set camera position

        // Scene setup
        const scene = new THREE.Scene(); // Create a new scene

        // Ambient light setup
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.1); // Create ambient light (color, intensity)
        scene.add(ambientLight); // Add ambient light to the scene

        // Directional light setup
        const directionalLight = new THREE.DirectionalLight(0xffffff, 3); // Create directional light (color, intensity)
        directionalLight.position.set(3, 5, 3); // Set light position
        directionalLight.castShadow = true; // Enable shadow casting for the light
        scene.add(directionalLight); // Add directional light to the scene

        // Object setup: Smile, Eyes, and Coin
        const torusGeometry = new THREE.TorusGeometry(0.5, 0.05, 16, 100, Math.PI); // Create torus geometry for smile
        const blackMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 }); // Create black material for smile, eyes, and coin
        const smile = new THREE.Mesh(torusGeometry, blackMaterial); // Create smile mesh
        smile.castShadow = true; // Enable shadow casting for smile
        smile.position.set(0, 0, 0.11); // Set smile position
        smile.rotation.z = Math.PI; // Rotate smile

        const eyeGeometry = new THREE.SphereGeometry(0.1, 32, 32); // Create sphere geometry for eyes
        const leftEye = new THREE.Mesh(eyeGeometry, blackMaterial); // Create left eye mesh
        const rightEye = new THREE.Mesh(eyeGeometry, blackMaterial); // Create right eye mesh
        leftEye.castShadow = true; // Enable shadow casting for left eye
        rightEye.castShadow = true; // Enable shadow casting for right eye
        leftEye.position.set(-0.3, 0.3, 0.11); // Set left eye position
        rightEye.position.set(0.3, 0.3, 0.11); // Set right eye position

        const coinGeometry = new THREE.CylinderGeometry(1, 1, 0.2, 32, 1); // Create cylinder geometry for coin
        const textureCoin = new THREE.TextureLoader().load('src/texture.jpeg'); // Load texture for coin
        const coinMaterial = new THREE.MeshStandardMaterial({ map: textureCoin }); // Create material for coin with texture
        coinMaterial.color.setRGB(0.5, 0.5, 0.5); // Set color for coin material
        const coin = new THREE.Mesh(coinGeometry, coinMaterial); // Create coin mesh
        coin.castShadow = true; // Enable shadow casting for coin
        coin.receiveShadow = true; // Enable shadow receiving for coin
        coin.rotation.x = Math.PI / 2; // Rotate coin

        // Group setup: Coin and face group
        const coinAndFaceGroup = new THREE.Group(); // Create group to hold coin, smile, and eyes
        coinAndFaceGroup.add(coin); // Add coin to group
        coinAndFaceGroup.add(smile); // Add smile to group
        coinAndFaceGroup.add(leftEye); // Add left eye to group
        coinAndFaceGroup.add(rightEye); // Add right eye to group
        scene.add(coinAndFaceGroup); // Add coin and face group to scene

        // Event listener for window resize
        const onWindowResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight; // Set camera aspect ratio
            camera.updateProjectionMatrix(); // Update camera projection matrix
            renderer.setSize(window.innerWidth, window.innerHeight); // Update renderer size
        };

        // RequestAnimationFrame for rendering loop
        const raf = () => {
            requestAnimationFrame(() => {
                renderer.render(scene, camera); // Render scene with camera
                coinAndFaceGroup.rotation.y += 0.01; // Rotate coin and face group
                raf(); // Request next animation frame
            });
        };

        // Add event listener for window resize
        window.addEventListener('resize', onWindowResize, false);
        
        // Start rendering loop
        raf();
    }
}

let APP = null;

window.addEventListener('DOMContentLoaded', () => {
    APP = new BuildScene();
});
