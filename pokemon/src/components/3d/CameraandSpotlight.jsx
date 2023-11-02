import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

function CameraAndSpotlight() {
    const { camera, scene } = useThree();
    const spotlightRef = useRef();
  
    useFrame(() => {
      if (spotlightRef.current) {
        spotlightRef.current.position.copy(camera.position).add(new THREE.Vector3(16, 10, 0));
      }
    });
  
    return (
      <>
        <spotLight
          ref={spotlightRef}
          angle={0.08}
          penumbra={1}
          intensity={1}
          castShadow
          shadow-mapSize={1024}
        />
        <primitive object={camera} />
        <SpotlightTarget />
      </>
    );
}

function SpotlightTarget() {
    const { scene, camera } = useThree();
    const targetRef = useRef();
  
    useEffect(() => {
      if (targetRef.current && scene) {
        scene.add(targetRef.current);
      }
      return () => {
        if (targetRef.current && scene) {
          scene.remove(targetRef.current);
        }
      };
    }, [scene]);
  
    useFrame(() => {
      if (targetRef.current) {
        targetRef.current.position.set(0, 0, -1);
        targetRef.current.position.applyQuaternion(camera.quaternion);
        targetRef.current.position.add(camera.position);
      }
    });
  
    return <object3D ref={targetRef} />;
  }

export default CameraAndSpotlight
