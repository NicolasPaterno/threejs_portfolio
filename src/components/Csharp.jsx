import { Float, useGLTF } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import {useMediaQuery} from "react-responsive";
import {calculateSizes} from "../constants/index.js";

const Csharp = (props) => {
    const { nodes, materials } = useGLTF('/models/cSharp.glb');
    const CsharpRef = useRef();
    const [hover, setHover] = useState(false);

    const isSmall = useMediaQuery({ maxWidth: 440 });
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });


    useEffect(() => {
        const rotationTimeline = gsap.timeline({
            repeat: -1,
            repeatDelay: 1.5,
        });

        rotationTimeline.to(CsharpRef.current.rotation, {

            x: hover ? '+=12' : `-=${Math.PI * 2}`,
            duration: 1.5,
            stagger: {
                each: 0.15,
            },
        });

        return () => {
            rotationTimeline.kill(); // Clean up the timeline on component unmount
        };
    }, [hover]);

    return (
        <Float floatIntensity={1}>
            <group rotation={[0, Math.PI / 5, 0]} {...props} dispose={null}>
                <group scale={isSmall ? 0.00025 : isMobile ? 0.0002 : isTablet ? 0.00025 : 0.0006}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes['C#_C#_0'].geometry}
                        material={materials.material}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={100}
                        ref={CsharpRef}
                        onPointerOver={() => setHover(true)}
                        onPointerOut={() => setHover(false)}
                    />
                </group>
            </group>
        </Float>
    );
};

useGLTF.preload('/models/cSharp.glb');

export default Csharp;
