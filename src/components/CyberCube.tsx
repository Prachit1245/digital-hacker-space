
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
    
    // Outer particle system
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 500;
    
    const posArray = new Float32Array(particleCount * 3);
    
    for(let i = 0; i < particleCount * 3; i++) {
      // Create a cube of particles around the main cube
      posArray[i] = (Math.random() - 0.5) * 6;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x0ea5e9,
      transparent: true,
      opacity: 0.7
    });
    
    const particleSystem = new THREE.Points(particlesGeometry, particleMaterial);
    scene.add(particleSystem);
    
    // Second cube with different color
    const geometry2 = new THREE.BoxGeometry(3, 3, 3);
    const edges2 = new THREE.EdgesGeometry(geometry2);
    const lineMaterial2 = new THREE.LineBasicMaterial({ 
      color: 0xd946ef, 
      linewidth: 1,
      transparent: true,
      opacity: 0.4
    });
    
    const outerCube = new THREE.LineSegments(edges2, lineMaterial2);
    scene.add(outerCube);

    // Position camera
    camera.position.z = 4;

    // Animation with time-based effects
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;
      
      // Cube rotations
      cube.rotation.x += 0.005;
      cube.rotation.y += 0.01;
      innerCube.rotation.x += 0.005;
      innerCube.rotation.y += 0.01;
      
      // Outer cube counter-rotation
      outerCube.rotation.x -= 0.003;
      outerCube.rotation.y -= 0.007;
      outerCube.rotation.z += 0.002;
      
      // Pulsing opacity for glow effect
      innerMaterial.opacity = 0.1 + Math.sin(time) * 0.05;
      outerCube.material.opacity = 0.3 + Math.sin(time * 1.5) * 0.1;
      
      // Particle system rotation
      particleSystem.rotation.x += 0.001;
      particleSystem.rotation.y += 0.002;
      
      // Particle breathing effect
      for(let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const x = particlesGeometry.attributes.position.array[i3];
        const y = particlesGeometry.attributes.position.array[i3 + 1];
        const z = particlesGeometry.attributes.position.array[i3 + 2];
        
        // Distance-based pulsing
        const distance = Math.sqrt(x*x + y*y + z*z);
        const normalizedDist = distance / 3;
        const pulseFactor = 0.02 * Math.sin(time * 2 + normalizedDist * 5);
        
        particlesGeometry.attributes.position.array[i3] = x * (1 + pulseFactor);
        particlesGeometry.attributes.position.array[i3 + 1] = y * (1 + pulseFactor);
        particlesGeometry.attributes.position.array[i3 + 2] = z * (1 + pulseFactor);
      }
      
      particlesGeometry.attributes.position.needsUpdate = true;
      
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
      scene.remove(outerCube);
      scene.remove(particleSystem);
      geometry.dispose();
      edges.dispose();
      innerGeometry.dispose();
      geometry2.dispose();
      edges2.dispose();
      particlesGeometry.dispose();
      lineMaterial.dispose();
      innerMaterial.dispose();
      lineMaterial2.dispose();
      particleMaterial.dispose();
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
