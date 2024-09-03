import React, { useEffect, useRef } from 'react';
// Import the THREE.js library
import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
// To allow for the camera to move around the scene
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';
// To allow for importing the .gltf file
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
/* 
done from github - https://github.com/gjmolter/web-3dmodel-threejs */
const Animation = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Create a Three.JS Scene
    const scene = new THREE.Scene();
    // Create a new camera with positions and angles
    const camera = new THREE.PerspectiveCamera(105, window.innerWidth / window.innerHeight, 1, 1000);

    // Keep track of the mouse position, so we can make the eye move
    let mouseX = window.innerWidth / 3;
    let mouseY = window.innerHeight / 3;

    // Keep the 3D object on a global variable so we can access it later
    let object;

    // OrbitControls allow the camera to move around the scene
    let controls;

    // Set which object to render
    let objToRender = 'shirt2';

    // Instantiate a loader for the .gltf file
    const loader = new GLTFLoader();

    // Load the file
    loader.load(
      `/models/${objToRender}/scene.gltf`,
      function (gltf) {
        // If the file is loaded, add it to the scene
        object = gltf.scene;
        scene.add(object);
      },
      function (xhr) {
        // While it is loading, log the progress
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      function (error) {
        // If there is an error, log it
        console.error(error);
      }
    );

    // Instantiate a new renderer and set its size
    const renderer = new THREE.WebGLRenderer({ alpha: true }); // Alpha: true allows for the transparent background
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Add the renderer to the DOM
    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
    }

    // Set how far the camera will be from the 3D model
    camera.position.z = objToRender === 'shirt2' ? 50 : 100;

    // Add lights to the scene, so we can actually see the 3D model
    const topLight = new THREE.DirectionalLight(0xffffff, 1); // (color, intensity)
    topLight.position.set(500, 500, 500); // top-left-ish
    topLight.castShadow = true;
    scene.add(topLight);

    const ambientLight = new THREE.AmbientLight(0x333333, objToRender === 'shirt2' ? 5 : 1);
    scene.add(ambientLight);

    // This adds controls to the camera, so we can rotate / zoom it with the mouse
    if (objToRender === "shirt2") {
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableZoom = false; // Disable zooming
    }

    // Render the scene
    function animate() {
      requestAnimationFrame(animate);
      
      // Make the object rotate continuously in the x-direction
      if (object && objToRender === 'shirt2') {
        object.rotation.y += 0.01;
      }
      
      renderer.render(scene, camera);
    }

    // Add a listener to the window, so we can resize the window and the camera
    window.addEventListener('resize', function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Add mouse position listener, so we can make the eye move
    containerRef.current.onmousemove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    console.log('working...');
    // Start the 3D rendering
    animate();

    // Cleanup function to remove event listeners and renderer
    return () => {
      window.removeEventListener('resize', () => {});
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div id="container3D" ref={containerRef} ></div>;
};

export default Animation;
