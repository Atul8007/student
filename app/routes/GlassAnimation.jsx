// GlassAnimation.tsx
import { Canvas } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { OrbitControls } from '@react-three/drei';

const Glass = () => {
    const meshRef = useRef(null);

    // Update the position of the glass based on mouse movement
    const handleMouseMove = (event) => {
        if (meshRef.current) {
            const x = (event.clientX / window.innerWidth) * 2 - 1;
            const y = -(event.clientY / window.innerHeight) * 2 + 1;
            meshRef.current.position.x = x * 2; // Adjust scale as needed
            meshRef.current.position.y = y * 2; // Adjust scale as needed
        }
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <mesh ref={meshRef} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
            <boxGeometry args={[1, 1, 0.1]} />
            <meshStandardMaterial color="lightblue" transparent opacity={0.5} />
        </mesh>
    );
};

const DottedGridBackground = () => {
    return (
        <gridHelper args={[10, 10]} position={[0, -0.1, 0]} />
    );
};

const GlassAnimation = () => {
    return (
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Glass />
            <DottedGridBackground />
            <OrbitControls />
        </Canvas>
    );
};

export default GlassAnimation;
