// Pages/widget/charwid.js
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three-stdlib";
import "./glass.css";

function CharWid() {
  const mountRef = useRef();

  useEffect(() => {
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
    camera.position.set(0, 2, 5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;

    const light = new THREE.HemisphereLight(0xffffff, 0x000000, 1);
    scene.add(light);

    const data = [1.1, 1.5, 0.9, 1.8, 1.3];
    const colors = [0xff9999, 0x99ccff, 0x99ff99, 0xffcc66, 0xcc99ff];

    data.forEach((value, i) => {
      const bar = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, value, 0.5),
        new THREE.MeshStandardMaterial({ color: colors[i] })
      );
      bar.position.set(i - 2, value / 2, 0);
      scene.add(bar);
    });

    const animate = () => {
      requestAnimationFrame(animate);
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
      <h3 style={{ color: "white", marginBottom: "0.5rem" }}>환율 차트 💱</h3>
      <div ref={mountRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}

export default CharWid;