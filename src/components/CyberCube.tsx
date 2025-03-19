
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CyberCube = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    
    renderer.setSize(300, 300);
    containerRef.current.appendChild(renderer.domElement);

    // Create wireframe cube
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const edges = new THREE.EdgesGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0x0ea5e9, 
      linewidth: 2,
      transparent: true,
      opacity: 0.8
    });
    
    const cube = new THREE.LineSegments(edges, lineMaterial);
    scene.add(cube);
    
    // Inner glow cube
    const innerGeometry = new THREE.BoxGeometry(1.8, 1.8, 1.8);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0x0ea5e9,
      transparent: true,
      opacity: 0.1
    });
    
    const innerCube = new THREE.Mesh(innerGeometry, innerMaterial);
    scene.add(innerCube);

    // Position camera
    camera.position.z = 4;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      cube.rotation.x += 0.005;
      cube.rotation.y += 0.01;
      innerCube.rotation.x += 0.005;
      innerCube.rotation.y += 0.01;
      
      renderer.render(scene, camera);
    };
    
    animate();

    // Handle cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      scene.remove(cube);
      scene.remove(innerCube);
      geometry.dispose();
      edges.dispose();
      innerGeometry.dispose();
      lineMaterial.dispose();
      innerMaterial.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute w-[300px] h-[300px] opacity-80 z-0"
      style={{ 
        right: '-50px',
        top: '50%',
        transform: 'translateY(-50%)'
      }}
    />
  );
};

export default CyberCube;
