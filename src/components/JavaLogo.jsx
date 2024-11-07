

import { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {useMediaQuery} from "react-responsive";

const JavaLogo = (props) => {
    const JavaLogoRef = useRef();
    const group = useRef()
    const { nodes, materials, animations } = useGLTF('/models/javaicone.glb')
    const { actions } = useAnimations(animations, group)

    const isSmall = useMediaQuery({ maxWidth: 440 });
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

    useGSAP(() => {
        gsap.to(JavaLogoRef.current.position, {
            y: JavaLogoRef.current.position.y + 0.5,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
        });
    });

    return (
        <group ref={group} {...props} dispose={null}>
            <group ref={JavaLogoRef}  name="Sketchfab_Scene" >
                <group scale={isSmall ? 0.5 : isMobile ? 0.6 : isTablet ? 0.7 : 0.8} position={[2.5,-6,0]} name="Sketchfab_model" rotation={[-Math.PI / 2.3, 0.1, 0.4]}>
                    <group name="Root">
                        <group name="Cube">
                            <mesh
                                name="Cube_0"
                                castShadw
                                receiveShadow
                                geometry={nodes.Cube_0.geometry}
                                material={materials.Material}
                            />
                        </group>
                        <group name="Plane" position={[0.79, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                            <mesh
                                name="Plane_0"
                                castShadow
                                receiveShadow
                                geometry={nodes.Plane_0.geometry}
                                material={materials.Material}
                            />
                        </group>
                        <group
                            name="Plane001"
                            position={[0, 0, 1.52]}
                            rotation={[Math.PI / 2, 0, 0]}
                            scale={1.22}>
                            <mesh
                                name="Plane001_0"
                                castShadow
                                receiveShadow
                                geometry={nodes.Plane001_0.geometry}
                                material={materials['Material.002']}
                                morphTargetDictionary={nodes.Plane001_0.morphTargetDictionary}
                                morphTargetInfluences={nodes.Plane001_0.morphTargetInfluences}
                            />
                        </group>
                        <group
                            name="Torus001"
                            position={[-0.14, -0.06, -0.77]}
                            rotation={[-0.14, -0.02, 0.1]}
                            scale={[0.47, 0.43, 0.43]}>
                            <mesh
                                name="Torus001_0"
                                castShadow
                                receiveShadow
                                geometry={nodes.Torus001_0.geometry}
                                material={materials.Material}
                            />
                        </group>
                        <group
                            name="Torus000"
                            position={[0.1, -0.03, -0.88]}
                            rotation={[-0.13, -0.05, 0.1]}
                            scale={[0.45, 0.42, 0.3]}>
                            <mesh
                                name="Torus000_0"
                                castShadow
                                receiveShadow
                                geometry={nodes.Torus000_0.geometry}
                                material={materials.Material}
                            />
                        </group>
                    </group>
                </group>
            </group>
        </group>
    )
}

useGLTF.preload('/models/javaicone.glb')

export default JavaLogo;