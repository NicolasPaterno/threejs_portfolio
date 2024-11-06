// Features/DraggableObject.jsx
import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

const DraggableObject = ({ children, initialPosition }) => {
    const ref = useRef();
    const [position, setPosition] = useState(initialPosition);
    const [isDragging, setIsDragging] = useState(false);

    const handlePointerDown = (event) => {
        event.stopPropagation(); // Prevent event from bubbling up
        setIsDragging(true);
        // Set the initial position when dragging starts
        setPosition([ref.current.position.x, ref.current.position.y, ref.current.position.z]);
    };

    const handlePointerUp = () => {
        setIsDragging(false);
        // Reset to initial position when released
        ref.current.position.set(initialPosition[0], initialPosition[1], initialPosition[2]);
    };

    useFrame(() => {
        if (isDragging) {
            // Update position based on mouse movement
            const { x, y, z } = ref.current.position;
            ref.current.position.set(x, y, z); // Maintain the current z position
        }
    });

    return (
        <mesh
            ref={ref}
            position={position}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerOut={handlePointerUp} // Reset on pointer out as well
            onPointerMove={(event) => {
                if (isDragging) {
                    // Update position based on the mouse point in the world
                    const newPosition = event.point.clone(); // Clone the point to avoid mutation
                    ref.current.position.set(newPosition.x, newPosition.y, newPosition.z);
                }
            }}
        >
            {children}
        </mesh>
    );
};

export default DraggableObject;