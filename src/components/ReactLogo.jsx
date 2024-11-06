import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { Trail, Float, Line, Sphere, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import PropTypes from 'prop-types';
import {useFrame} from "@react-three/fiber";

export default function ReactLogo(props) {
    return (
        <group {...props}>
            <color attach="background" args={['black']} />
            <Float speed={4} rotationIntensity={1} floatIntensity={3}>
                <Atom />
            </Float>
            <Stars saturation={1} count={700} speed={3} />
            <EffectComposer>
                <Bloom mipmapBlur luminanceThreshold={0.5} radius={0.7} />
            </EffectComposer>
        </group>
    );
}

function Atom(props) {
    const points = useMemo(() => new THREE.EllipseCurve(0, 0, 3, 1.1, 0, 2 * Math.PI, false, 0).getPoints(100), [   ]);
    return (
        <group scale={0.45} {...props}>
            <Line worldUnits points={points} color="turquoise" lineWidth={0.1} />
            <Line worldUnits points={points} color="turquoise" lineWidth={0.1} rotation={[0, 0, 1]} />
            <Line worldUnits points={points} color="turquoise" lineWidth={0.1} rotation={[0, 0, -1]} />
            <Electron position={[0, 0, 0.5]} speed={6} />
            <Electron position={[0, 0, 0.5]} rotation={[0, 0, Math.PI / 3]} speed={6.5} />
            <Electron position={[0, 0, 0.5]} rotation={[0, 0, -Math.PI / 3]} speed={7} />
            <Sphere args={[0.4, 32, 32]}>
                <meshBasicMaterial color={[6, 0.5, 2]} toneMapped={false} />
            </Sphere>
        </group>
    );
}

function Electron({ radius = 2.75, speed = 6, ...props }) {
    const ref = useRef();
    useFrame((state) => {
        const t = state.clock.getElapsedTime() * speed;
        ref.current.position.set(Math.sin(t) * radius, (Math.cos(t) * radius * Math.atan(t)) / Math.PI / 1.25, 0);
    });
    return (
        <group {...props}>
            <Trail local={false} width={5} length={6} color={new THREE.Color(2, 1, 10)} attenuation={(t) => t * t}>
                <mesh ref={ref}>
                    <sphereGeometry args={[0.30]} />
                    <meshBasicMaterial color={[10, 1, 10]} toneMapped={false} />
                </mesh>
            </Trail>
        </group>
    );
}


