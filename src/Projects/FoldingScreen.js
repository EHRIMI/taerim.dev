import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const WindowBlinds = () => {
  const mountRef = useRef(null);
  const rotationAngle = useRef(0); // Rotation (tilting)
  const raiseAmount = useRef(0); // Raising/Lowering amount
  const slats = useRef([]);
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    // ✅ Ensure only one instance of the scene is created
    mountRef.current.innerHTML = "";

    // 🎥 Setup Scene, Camera, Renderer (Fixed Front View)
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-2, 2, 2, -2, 0.1, 100);
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(400, 400);
    mountRef.current.appendChild(renderer.domElement);

    // 💡 Lighting
    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    // 🏗️ Create Slats (Paper-thin)
    slats.current = [];
    const slatMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });

    const slatWidth = 3;
    const slatHeight = 0.1; // **Thin slats**
    const slatThickness = 0.1; // **Paper-thin thickness**
    const slatSpacing = 0.01; // Tiny gap

    for (let i = 0; i < 15; i++) {
      const slatGeometry = new THREE.BoxGeometry(slatWidth, slatHeight, slatThickness);
      const slat = new THREE.Mesh(slatGeometry, slatMaterial);
      slat.position.set(0, 1.5 - i * (slatHeight + slatSpacing), 0);
      scene.add(slat);
      slats.current.push(slat);
    }

    // 🎛️ Handle (Stick + Box)
    const handleGroup = new THREE.Group();

    const handleStickGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.8, 16);
    const handleStickMaterial = new THREE.MeshStandardMaterial({ color: 0x444444 });
    const handleStick = new THREE.Mesh(handleStickGeometry, handleStickMaterial);
    handleStick.position.set(-1.6, 0, 0);
    handleGroup.add(handleStick);

    const handleBoxGeometry = new THREE.BoxGeometry(0.15, 0.15, 0.15);
    const handleBox = new THREE.Mesh(handleBoxGeometry, handleStickMaterial);
    handleBox.position.set(-1.6, -0.5, 0);
    handleGroup.add(handleBox);

    scene.add(handleGroup);

    // 🎥 Animation Loop (Now Updates Refs Dynamically)
    const animate = () => {
      requestAnimationFrame(animate);

      // 🔄 Apply tilt (rotation)
      slats.current.forEach((slat, index) => {
        slat.rotation.x = rotationAngle.current;
        slat.position.y = 1.5 - index * (slatHeight + slatSpacing) + index * raiseAmount.current; // Moves up/down
      });

      renderer.render(scene, camera);
    };
    animate();

    // 🎯 Mouse Drag Logic (Only X for Rotation, Y for Raising)
    const onMouseDown = (event) => {
      isDragging.current = true;
      lastMouse.current = { x: event.clientX, y: event.clientY };
    };

    const onMouseMove = (event) => {
      if (!isDragging.current) return;
      const deltaX = event.clientX - lastMouse.current.x;
      const deltaY = event.clientY - lastMouse.current.y;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // 🔄 Horizontal drag → Adjust rotation
        rotationAngle.current = Math.min(Math.max(rotationAngle.current + deltaX * 0.002, -Math.PI / 2), 0); // Limit rotation
      } else {
        // 🔼 Vertical drag → Adjust height
        raiseAmount.current = Math.max(Math.min(raiseAmount.current + deltaY * 0.001, 0), -0.6); // Limit raise
      }

      lastMouse.current = { x: event.clientX, y: event.clientY };
    };

    const onMouseUp = () => {
      isDragging.current = false;
    };

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // ❌ Cleanup
    return () => {
      if (mountRef.current) {
        mountRef.current.innerHTML = "";
      }
      renderer.dispose();
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return <div ref={mountRef} style={{ width: "400px", height: "400px", margin: "auto" }} />;
};

export default WindowBlinds;