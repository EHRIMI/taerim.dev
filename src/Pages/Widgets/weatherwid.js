// Pages/widget/weatherwid.js
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three-stdlib";
import "./glass.css";

function WeatherWid() {
  const mountRef = useRef();

  useEffect(() => {
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
    camera.position.set(0, 1.5, 5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;

    const light = new THREE.HemisphereLight(0xffffff, 0x000000, 1);
    scene.add(light);

    const sun = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 32, 32),
      new THREE.MeshStandardMaterial({ color: 0xffdd55, emissive: 0xffdd55 })
    );
    sun.position.set(-1, 1.5, 0);
    scene.add(sun);

    const cloudMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const cloud = new THREE.Group();
    cloud.add(
      new THREE.Mesh(new THREE.SphereGeometry(0.4, 16, 16), cloudMaterial),
      new THREE.Mesh(new THREE.SphereGeometry(0.35, 16, 16), cloudMaterial).position.set(0.5, 0.1, 0),
      new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 16), cloudMaterial).position.set(-0.5, 0.1, 0)
    );
    cloud.position.set(1.2, 1.4, 0);
    scene.add(cloud);

    const animate = () => {
      requestAnimationFrame(animate);
      cloud.rotation.y += 0.003;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="widget-glass" style={{ width: "300px", height: "200px", padding: "1rem" }}>
      <h3 style={{ color: "white", marginBottom: "0.5rem" }}>날씨 위젯 ☀️</h3>
      <div ref={mountRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}

export default WeatherWid;