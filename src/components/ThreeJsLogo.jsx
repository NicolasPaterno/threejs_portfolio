import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef, useState } from 'react';
import { Float, useGLTF, useTexture } from '@react-three/drei';

// Função de animação para reutilizar
const useRotationAnimation = (ref, hovered) => {
    useGSAP(() => {
        gsap
            .timeline({
                repeat: -1,
                repeatDelay: 0.25,
            })
            .to(ref.current.rotation, {
                y: hovered ? '+=2' : `+=${Math.PI * 2}`,
                x: hovered ? '+=2' : `-=${Math.PI * 2}`,
                duration: 2.5,
                stagger: {
                    each: 0.15,
                },
            });
    });
};

const ThreeJsLogo = (props) => {
    const { nodes } = useGLTF('/models/threejs.glb');
    const texture = useTexture('textures/cube.png');

    const logoRef = useRef();
    const [hovered, setHovered] = useState(false);

    // Chama a animação de rotação reutilizável
    useRotationAnimation(logoRef, hovered);

    return (
        <Float floatIntensity={2}>
            <group scale={0.03} position={[5, 0, 5]} {...props} dispose={null}>
                <mesh
                    ref={logoRef}
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_5.geometry}
                    rotation={[0, Math.PI / 0.56, 0]}
                    onPointerEnter={() => setHovered(true)}
                    onPointerLeave={() => setHovered(false)}
                ><meshMatcapMaterial matcap={texture} toneMapped={false} />
                </mesh>
            </group>
        </Float>
    );
};

useGLTF.preload('/models/threejs.glb');

export default ThreeJsLogo;
