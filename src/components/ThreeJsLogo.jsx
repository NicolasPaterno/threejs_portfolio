import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef, useState } from 'react';
import { Float, useGLTF, useTexture } from '@react-three/drei';
import {useMediaQuery} from "react-responsive";
import {calculateSizes} from "../constants/index.js";

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

const ThreeJsLogo = (props ) => {
    const { nodes } = useGLTF('/models/threejs.glb');
    const texture = useTexture('textures/cube.png');

    const logoRef = useRef();
    const [hovered, setHovered] = useState(false);

    const isSmall = useMediaQuery({ maxWidth: 440 });
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });


    useRotationAnimation(logoRef, hovered);

    return (
        <Float floatIntensity={2}>
            <group scale={isSmall ? 0.017 : isMobile ? 0.02 : 0.03} position={[5, 0, 5]} {...props} dispose={null}>
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
