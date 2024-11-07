import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import * as THREE from 'three';

const DragControl = ({ children }) => {
    const { camera, gl } = useThree();
    const objectRef = useRef(null);  // Atualizando inicialização
    const isDragging = useRef(false);
    const initialPosition = useRef(new Vector3());
    const mouse = new Vector3();
    const targetPosition = new Vector3();

    useEffect(() => {
        const handleMouseDown = (event) => {
            event.preventDefault();
            const { clientX, clientY } = event;
            const x = (clientX / window.innerWidth) * 2 - 1;
            const y = -(clientY / window.innerHeight) * 2 + 1;
            mouse.set(x, y, 0);

            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(mouse, camera);

            // Certifique-se de que objectRef.current existe
            if (objectRef.current) {
                const intersects = raycaster.intersectObject(objectRef.current, true);
                console.log('Intersects:', intersects); // Depuração

                if (intersects.length > 0) {
                    isDragging.current = true;
                    initialPosition.current.copy(objectRef.current.position);
                }
            } else {
                console.warn('objectRef.current is not defined');
            }
        };

        const handleMouseUp = () => {
            isDragging.current = false;
        };

        const handleMouseMove = (event) => {
            if (!isDragging.current) return;

            const { clientX, clientY } = event;
            const x = (clientX / window.innerWidth) * 2 - 1;
            const y = -(clientY / window.innerHeight) * 2 + 1;
            mouse.set(x, y, 0);

            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(mouse, camera);
            const planeIntersect = new THREE.Plane(new Vector3(0, 0, 1), 0);
            const intersectPoint = raycaster.ray.intersectPlane(planeIntersect, new Vector3());
            if (intersectPoint) {
                targetPosition.copy(intersectPoint);
            }
        };

        gl.domElement.addEventListener('mousedown', handleMouseDown);
        gl.domElement.addEventListener('mouseup', handleMouseUp);
        gl.domElement.addEventListener('mousemove', handleMouseMove);

        return () => {
            gl.domElement.removeEventListener('mousedown', handleMouseDown);
            gl.domElement.removeEventListener('mouseup', handleMouseUp);
            gl.domElement.removeEventListener('mousemove', handleMouseMove);
        };
    }, [camera, gl]);

    useFrame(() => {
        if (!objectRef.current) return;

        if (isDragging.current) {
            // Move object smoothly towards target position while dragging
            objectRef.current.position.lerp(targetPosition, 0.2);
        } else {
            // Return to initial position when dragging stops
            objectRef.current.position.lerp(initialPosition.current, 0.1);
        }
    });

    return <group ref={objectRef}>{children}</group>;
};

export default DragControl;
