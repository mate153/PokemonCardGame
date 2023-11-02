import React, { useState } from 'react'
import Pokemon from './3d/Pokemon'
import PokemonCanvas from './3d/PokemonCanvas'
import Main from './Main'

export default function Pokedex(data) {
  const pokemonList = getPokemonProps();
  const [selectedPokemonProps, setSelectedPokemonProps] = useState(null);
  const [mainMenuList, setMainMenuList] = useState(false);
  const menuClickSFX = new Audio(process.env.PUBLIC_URL + "/music/clickSFX.mp3");
  menuClickSFX.loop = false;
  menuClickSFX.volume = 1;
  let pokemonProps;

  const showPokemon = (event) => {
      pokemonProps = pokemonList.find(x => x.name === event.target.value)
      setSelectedPokemonProps(pokemonProps);
  }

  const backToMenu = ()=> {
    menuClickSFX.play();
    setMainMenuList(true);
  } 

  return (
    <> 
      <button onClick={backToMenu} className='backToMenuBtn'><i className="fa-solid fa-arrow-left fa-2xl"></i></button>
      <select onChange={showPokemon} className='selectPokemonList'>
        {
            pokemonList.map((elem, index) => (
                <option key = {index} value = {elem.name} className='selectPokemonListOptionBp'>{elem.label}</option> 
            ))
        }
      </select>
      {
          selectedPokemonProps &&
          <>
              <Pokemon
                  name = {selectedPokemonProps.name}
                  scale = {selectedPokemonProps.scale}
                  position = {selectedPokemonProps.position}
              />
              <PokemonCanvas
                  name = {selectedPokemonProps.name}
                  scale = {selectedPokemonProps.scale}
                  position = {selectedPokemonProps.position}
              />
          </>
      }
      {
          mainMenuList ? <Main refText="mainMenu" audioModifier={data.audioModifier}/> : undefined
      }
      <div className='backpackImgBp'></div>
    </>
  )
}

const getPokemonProps = () => {
  return [
    {            
        id: 1,                                       
        name: "pikachu",
        label: "Pikachu",
        scale: 0.1,
        position: [0, -0.5, 0]
    },
    {            
        id: 2,                                       
        name: "ponyta",
        label: "Ponyta",
        scale: 0.025,
        position: [0, -0.5, 0]
    },
    {               
        id: 3,                                    
        name: "bulbasaur",
        label: "Bulbasaur",
        scale: 300,
        position: [0, -0.25, 0]
    },
    {            
        id: 4,                                       
        name: "onix",
        label: "Onix",
        scale: 0.4,
        position: [0, -1.0, 0]
    },
    {            
        id: 5,                                       
        name: "gastly",
        label: "Gastly",
        scale: 0.01,
        position: [0, 0.5, 0]
    },
    {            
        id: 6,                                       
        name: "eevee",
        label: "Eevee",
        scale: 0.1,
        position: [0, -1.5, 0]
    },
    {            
        id: 7,                                       
        name: "venusaur",
        label: "Venusaur",
        scale: 0.02,
        position: [0, -0.5, 0]
    },
    {            
        id: 8,                                       
        name: "voltorb",
        label: "Voltorb",
        scale: 6,
        position: [0, 0.5, 0]
    },
    {            
        id: 9,                                       
        name: "starmie",
        label: "Starmie",
        scale: 4,
        position: [0, -0.5, 0]
    },
    {            
        id: 10,                                       
        name: "ditto",
        label: "Ditto",
        scale: 5.3,
        position: [0, 0, 0]
    },
    {            
        id: 11,                                       
        name: "gyarados",
        label: "Gyarados",
        scale: 0.5,
        position: [0, -0.5, 0]
    },
    {            
        id: 12,                                       
        name: "psyduck",
        label: "Psyduck",
        scale: 1.6,
        position: [0, -0.5, 0]
    },
  ]
}