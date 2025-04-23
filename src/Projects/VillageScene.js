import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three-stdlib";

function VillageScene() {
  const mountRef = useRef();

  useEffect(() => {
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xaadfff);

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
    camera.position.set(10, 6, 12);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x888888));

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(30, 30),
      new THREE.MeshStandardMaterial({ color: 0x88cc88 })
    );
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    const makeChurch = (x, z) => {
      const group = new THREE.Group();
      const body = new THREE.Mesh(new THREE.BoxGeometry(2, 2.5, 2), new THREE.MeshStandardMaterial({ color: 0xffffff }));
      body.position.y = 1.25;
      group.add(body);
      const roof = new THREE.Mesh(new THREE.ConeGeometry(1.5, 1, 4), new THREE.MeshStandardMaterial({ color: 0x8888ff }));
      roof.rotation.y = Math.PI / 4;
      roof.position.y = 3;
      group.add(roof);
      const cross = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1, 0.1), new THREE.MeshStandardMaterial({ color: 0x000000 }));
      cross.position.set(0, 4, 0);
      group.add(cross);
      const crossBar = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.1, 0.1), new THREE.MeshStandardMaterial({ color: 0x000000 }));
      crossBar.position.set(0, 4.2, 0);
      group.add(crossBar);
      group.position.set(x, 0, z);
      scene.add(group);
    };

    const makeHouse = (x, z) => {
      const group = new THREE.Group();
      const floor1 = new THREE.Mesh(new THREE.BoxGeometry(2, 1.2, 2), new THREE.MeshStandardMaterial({ color: 0xffccaa }));
      floor1.position.y = 0.6;
      group.add(floor1);
      const floor2 = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.2, 1.8), new THREE.MeshStandardMaterial({ color: 0xffaaff }));
      floor2.position.y = 2;
      group.add(floor2);
      const roof = new THREE.Mesh(new THREE.ConeGeometry(1.5, 0.7, 4), new THREE.MeshStandardMaterial({ color: 0xaa4444 }));
      roof.rotation.y = Math.PI / 4;
      roof.position.y = 3.4;
      group.add(roof);
      group.position.set(x, 0, z);
      scene.add(group);
    };

    const makeRestaurant = (x, z) => {
      const group = new THREE.Group();
      const base = new THREE.Mesh(new THREE.BoxGeometry(2, 1.5, 2), new THREE.MeshStandardMaterial({ color: 0xff4444 }));
      base.position.y = 0.75;
      group.add(base);
      const sign = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.4, 0.1), new THREE.MeshStandardMaterial({ color: 0xffff00 }));
      sign.position.set(0, 1.5, 1.05);
      group.add(sign);
      group.position.set(x, 0, z);
      scene.add(group);
    };

    makeChurch(-5, 0);
    makeHouse(0, 0);
    makeRestaurant(5, 0);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
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

  return <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />;
}

export default VillageScene;