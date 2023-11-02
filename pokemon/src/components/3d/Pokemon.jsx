import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useState, useEffect } from 'react'

const Pokemon = (data) => {
    const [pokemonData, setPokemonData] = useState(["TEST"]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModelLoading, setIsModelLoading] = useState(true);
    const [model, setModel] = useState(null);
    const pokemonProps = data;

    useEffect(() => {
        const fetchPokemonData = async () => {
          // Fetch Pokemon Data
        };
    
        fetchPokemonData();
    }, [pokemonProps]);

    useEffect(() => {
      // Load Pokemon 3D Object
      const loader = new GLTFLoader();
      loader.load(
        `./pokemons/${pokemonProps.name}/scene.gltf`,
        function (gltf) {
          setModel(gltf.scene);
          setIsModelLoading(false);
        },
        undefined,
        (error) => {
          console.error('Error loading 3D model:', error);
          setIsModelLoading(false);
        }
      );
    }, [pokemonProps]);
    
    if (isLoading || isModelLoading) {
      // Loading Screen
      return undefined;
    }
    
    if (!pokemonData) {
      // No Pokemon Data Found
      return undefined;
    }

    return (
      // Pokemon 3D Model
        <mesh>
            <hemisphereLight
                intensity = { 0.15 }
                groundColor = "black"
            />
            <pointLight
                intensity = { 1 } />
            <primitive
                object = { model }
                scale = { pokemonProps.scale }
                position = { pokemonProps.position }
                rotation = {[0, 0, 0]}
            />
        </mesh>
    )
}

export default Pokemon