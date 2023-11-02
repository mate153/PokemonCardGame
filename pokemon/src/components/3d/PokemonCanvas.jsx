import React, { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload} from '@react-three/drei'
import CanvasLoader from '../Loader'
import Pokemon from './Pokemon'
import CameraAndSpotlight from './CameraandSpotlight'

const PokemonCanvas = (data) => {
    return (
        <Canvas
            frameLoop = "demand"
            shadows
            camera = {{position: [20, 10, 5], fov: 25}}
            gl = {{preserveDrawingBuffer: true}}
            style = {{width: '100%', height: '70vh',top: '200px'}}
        >
            <Suspense fallback = {<CanvasLoader />}>
                <OrbitControls
                    enableZoom = {true}
                    maxPolarAngle = {Math.PI / 2}
                    minPolarAngle = {Math.PI / 2}
                />
                <Pokemon
                    name = {data.name}
                    scale = {data.scale}
                    position = {data.position}
                />
            </Suspense>
            <Preload all />
            <CameraAndSpotlight />
        </Canvas>
    )
}

export default PokemonCanvas