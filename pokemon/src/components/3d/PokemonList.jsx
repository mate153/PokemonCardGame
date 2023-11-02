import React, { useEffect, useState } from 'react'
import Pokemon from './Pokemon'
import PokemonCanvas from './PokemonCanvas'
import Main from '../Main'

const PokemonList = (data) => {
    const pokemonList = getPokemonProps()
    const [selectedPokemonProps, setSelectedPokemonProps] = useState(null);
    const [mainMenuList, setMainMenuList] = useState(false);
    const [pokemonStats, setPokemonStats] = useState(null);
    const menuClickSFX = new Audio(process.env.PUBLIC_URL + "/music/clickSFX.mp3");
    menuClickSFX.loop = false;
    menuClickSFX.volume = 1;

    let pokemonProps

    const showPokemon = (event) => {
        pokemonProps = pokemonList.find(x => x.name === event.target.value)
        setSelectedPokemonProps(pokemonProps);
    }

    const backToMenu = ()=> {
        menuClickSFX.play();
        setMainMenuList(true);
    }

    useEffect(() => {
        const fetchPokemonData = async () => {
            const pokemon = selectedPokemonProps.name;
            await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
                .then(res => res.json())
                .then(data => {
                    setPokemonStats(data.stats);
                })
                .catch(err => console.log(err))
        };
    
        fetchPokemonData();
    }, [selectedPokemonProps]);
    

    return (
        <> 
            <button onClick={backToMenu} className='backToMenuBtn'><i className="fa-solid fa-arrow-left fa-2xl"></i></button>
            <select onChange={showPokemon} className='selectPokemonList'>
                {
                    pokemonList.map((elem, index) => (
                        <option key = {index} value = {elem.name} className='selectPokemonListOption' >{elem.label}</option> 
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
                    <div className='statNameBox'>
                        <span className='statName'>{selectedPokemonProps.label} </span>
                    </div>
                    {
                    (pokemonStats) ?
                        <>
                            <div className='statLeftSideBox'>
                                <span>HP: <span>{pokemonStats[0].base_stat}</span></span><br/><br/>
                                <span>Speed: <span>{pokemonStats[5].base_stat}</span></span><br/>
                            </div>
                            <div className='statRightSideBox'>
                                <span>Attack: <span>{pokemonStats[1].base_stat}</span></span><br/>
                                <span>Special Attack: <span>{pokemonStats[3].base_stat}</span></span><br/><br/>
                                <span>Defense: <span>{pokemonStats[2].base_stat}</span></span><br/>
                                <span>Special Defense: <span>{pokemonStats[4].base_stat}</span></span><br/>
                            </div>
                        </> : undefined
                    }             
                </>
            }
            {
                mainMenuList ? <Main refText="mainMenu" audioModifier={data.audioModifier}/> : undefined
            }
        </>
    )
}

const getPokemonProps = () => {
    return [
        {                   
            id: 1,
            name: "abra",
            label: "Abra",
            scale: 1.0,
            position: [0, -1.25, 0]
        },
        {          
            id: 2,
            name: "aerodactyl",
            label: "Aerodactyl",
            scale: 0.6,
            position: [0, -1.25, 0]
        },
        {         
            id: 3,                                          
            name: "alakazam",
            label: "Alakazam",
            scale: 1.0,
            position: [0, -1.25, 0]
        },
        {         
            id: 4,                                          
            name: "arbok",
            label: "Arbok",
            scale: 0.6,
            position: [0, 1.0, 0]
        },
        {           
            id: 5,                                        
            name: "arcanine",
            label: "Arcanine",
            scale: 1.0,
            position: [0, -2.25, 0]
        },
        {             
            id: 6,                                      
            name: "articuno",
            label: "Articuno",
            scale: 0.7,
            position: [0, -1.25, 0]
        },
        {           
            id: 7,                                        
            name: "beedrill",
            label: "Beedrill",
            scale: 1.0,
            position: [0, -0.25, 0]
        },
        {               
            id: 8,                                    
            name: "bellsprout",
            label: "Bellsprout",
            scale: 2.0,
            position: [0, -1.25, 0]
        },
        {               
            id: 9,                                    
            name: "blastoise",
            label: "Blastoise",
            scale: 0.03,
            position: [0, -1.25, 0]
        },
        {               
            id: 10,                                    
            name: "bulbasaur",
            label: "Bulbasaur",
            scale: 300,
            position: [0, -0.25, 0]
        },
        {             
            id: 11,                                      
            name: "butterfree",
            label: "Butterfree",
            scale: 1.0,
            position: [0, -0.25, 0]
        },
        {            
            id: 12,                                       
            name: "caterpie",
            label: "Caterpie",
            scale: 5.0,
            position: [0, 0.25, 0]
        },
        {           
            id: 13,                                        
            name: "chansey",
            label: "Chansey",
            scale: 0.03,
            position: [0, -1.25, 0]
        },
        {              
            id: 14,                                     
            name: "charizard",
            label: "Charizard",
            scale: 0.2,
            position: [0, -1.25, 0]
        },
        {            
            id: 15,                                       
            name: "charmander",
            label: "Charmander",
            scale: 2.3,
            position: [0, -1.25, 0]
        },
        {            
            id: 16,                                       
            name: "charmeleon",
            label: "Charmeleon",
            scale: 1.3,
            position: [0, -1.25, 0]
        },
        {            
            id: 17,                                       
            name: "clefable",
            label: "Clefable",
            scale: 1.3,
            position: [0, -1.5, 0]
        },
        {            
            id: 18,                                       
            name: "clefairy",
            label: "Clefairy",
            scale: 0.05,
            position: [0, -1.25, 0]
        },
        {            
            id: 19,                                       
            name: "cloyster",
            label: "Cloyster",
            scale: 1.5,
            position: [0, -0.5, 0]
        },
        {            
            id: 20,                                       
            name: "cubone",
            label: "Cubone",
            scale: 3.0,
            position: [0, -0.5, 0]
        },
        {            
            id: 21,                                       
            name: "dewgong",
            label: "Dewgong",
            scale: 1.3,
            position: [0, -0.5, 0]
        },
        {            
            id: 22,                                       
            name: "diglett",
            label: "Diglett",
            scale: 3.3,
            position: [0, -0.5, 0]
        },
        {            
            id: 23,                                       
            name: "ditto",
            label: "Ditto",
            scale: 5.3,
            position: [0, 0, 0]
        },
        {            
            id: 24,                                       
            name: "dodrio",
            label: "Dodrio",
            scale: 1.0,
            position: [0, -2.0, 0]
        },
        {            
            id: 25,                                       
            name: "doduo",
            label: "Doduo",
            scale: 1.3,
            position: [0, -1.5, 0]
        },
        {            
            id: 26,                                       
            name: "dragonair",
            label: "Dragonair",
            scale: 1.0,
            position: [0, -1.5, 0]
        },
        {            
            id: 27,                                       
            name: "dragonite",
            label: "Dragonite",
            scale: 0.02,
            position: [0, -3.25, 0]
        },
        {            
            id: 28,                                       
            name: "dratini",
            label: "Dratini",
            scale: 0.4,
            position: [0, -1.5, 0]
        },
        {            
            id: 29,                                       
            name: "drowzee",
            label: "Drowzee",
            scale: 0.04,
            position: [0, -1.25, 0]
        },
        {            
            id: 30,                                       
            name: "dugtrio",
            label: "Dugtrio",
            scale: 1.4,
            position: [0, -1.0, 0]
        },
        {            
            id: 31,                                       
            name: "eevee",
            label: "Eevee",
            scale: 0.1,
            position: [0, -1.5, 0]
        },
        {            
            id: 32,                                       
            name: "ekans",
            label: "Ekans",
            scale: 0.4,
            position: [0, -1.5, 0]
        },
        {            
            id: 33,                                       
            name: "electrode",
            label: "Electrode",
            scale: 0.03,
            position: [0, -1.5, 0]
        },
        {            
            id: 34,                                       
            name: "espeon",
            label: "Espeon",
            scale: 1.7,
            position: [0, -1.25, 0]
        },
        {            
            id: 35,                                       
            name: "exeggcute",
            label: "Exeggcute",
            scale: 0.04,
            position: [0, -0.25, 0]
        },
        {            
            id: 36,                                       
            name: "exeggutor",
            label: "Exeggutor",
            scale: 0.025,
            position: [0, -1.25, 0]
        },
        {            
            id: 37,                                       
            name: "fearow",
            label: "Fearow",
            scale: 1.2,
            position: [0, -0.25, 0]
        },
        {            
            id: 38,                                       
            name: "flareon",
            label: "Flareon",
            scale: 1.4,
            position: [0, -0.25, 0]
        },
        {            
            id: 39,                                       
            name: "gastly",
            label: "Gastly",
            scale: 0.01,
            position: [0, 0.5, 0]
        },
        {            
            id: 40,                                       
            name: "gengar",
            label: "Gengar",
            scale: 1,
            position: [0, -1.25, 0]
        },
        {            
            id: 41,                                       
            name: "geodude",
            label: "Geodude",
            scale: 1.3,
            position: [0, -0.25, 0]
        },
        {            
            id: 42,                                       
            name: "giratina",
            label: "Giratina",
            scale: 0.35,
            position: [0, -0.5, 0]
        },
        {            
            id: 43,                                       
            name: "glaceon",
            label: "Glaceon",
            scale: 1.6,
            position: [0, -0.5, 0]
        },
        {            
            id: 44,                                       
            name: "gloom",
            label: "Gloom",
            scale: 1.3,
            position: [0, -0.25, 0]
        },
        {            
            id: 45,                                       
            name: "golbat",
            label: "Golbat",
            scale: 0.2,
            position: [0, -0.5, 0]
        },
        {            
            id: 46,                                       
            name: "goldeen",
            label: "Goldeen",
            scale: 0.1,
            position: [0, -0.25, 0]
        },
        {            
            id: 47,                                       
            name: "golduck",
            label: "Golduck",
            scale: 1,
            position: [0, -0.75, 0]
        },
        {            
            id: 48,                                       
            name: "golem",
            label: "Golem",
            scale: 1,
            position: [0, -0.5, 0]
        },
        {            
            id: 49,                                       
            name: "graveler",
            label: "Graveler",
            scale: 1,
            position: [0, -0.25, 0]
        },
        {            
            id: 50,                                       
            name: "growlithe",
            label: "Growlithe",
            scale: 1.5,
            position: [0, -0.25, 0]
        },
        {            
            id: 51,                                       
            name: "gyarados",
            label: "Gyarados",
            scale: 0.5,
            position: [0, -0.5, 0]
        },
        {            
            id: 52,                                       
            name: "haunter",
            label: "Haunter",
            scale: 0.2,
            position: [0, 0.75, 0]
        },
        {            
            id: 53,                                       
            name: "hitmonchan",
            label: "Hitmonchan",
            scale: 1.5,
            position: [0, -1.25, 0]
        },
        {            
            id: 54,                                       
            name: "hitmonlee",
            label: "Hitmonlee",
            scale: 0.03,
            position: [0, -1.5, 0]
        },
        {            
            id: 55,                                       
            name: "horsea",
            label: "Horsea",
            scale: 0.1,
            position: [0, -1.25, 0]
        },
        {            
            id: 56,                                       
            name: "hypno",
            label: "Hypno",
            scale: 0.025,
            position: [0, -1.0, 0]
        },
        {            
            id: 57,                                       
            name: "ivysaur",
            label: "Ivysaur",
            scale: 1,
            position: [0, -0.25, 0]
        },
        {            
            id: 58,                                       
            name: "jigglypuff",
            label: "Jigglypuff",
            scale: 2,
            position: [0, -0.25, 0]
        },
        {            
            id: 59,                                       
            name: "jolteon",
            label: "Jolteon",
            scale: 4.7,
            position: [0, -0.5, 0]
        },
        {            
            id: 60,                                       
            name: "jynx",
            label: "Jynx",
            scale: 0.03,
            position: [0, -1.25, 0]
        },
        {            
            id: 61,                                       
            name: "kabuto",
            label: "Kabuto",
            scale: 0.08,
            position: [0, -0.25, 0]
        },
        {            
            id: 62,                                       
            name: "kabutops",
            label: "Kabutops",
            scale: 0.04,
            position: [0, -1.0, 0]
        },
        {            
            id: 63,                                       
            name: "kadabra",
            label: "Kadabra",
            scale: 1.2,
            position: [0, -1.0, 0]
        },
        {            
            id: 64,                                       
            name: "kakuna",
            label: "Kakuna",
            scale: 2.5,
            position: [0, -0.75, 0]
        },
        {            
            id: 65,                                       
            name: "kingler",
            label: "Kingler",
            scale: 0.025,
            position: [0, -0.75, 0]
        },
        {            
            id: 66,                                       
            name: "koffing",
            label: "Koffing",
            scale: 1.2,
            position: [0, -1.0, 0]
        },
        {            
            id: 67,                                       
            name: "krabby",
            label: "Krabby",
            scale: 0.06,
            position: [0, -1.0, 0]
        },
        {            
            id: 68,                                       
            name: "lapras",
            label: "Lapras",
            scale: 0.02,
            position: [0, -1.25, 0]
        },
        {            
            id: 69,                                       
            name: "leafeon",
            label: "Leafeon",
            scale: 2,
            position: [0, -1.25, 0]
        },
        {            
            id: 70,                                       
            name: "lickilicky",
            label: "Lickilicky",
            scale: 2.5,
            position: [0, -1.25, 0]
        },
        {            
            id: 71,                                       
            name: "lickitung",
            label: "Lickitung",
            scale: 0.03,
            position: [0, -1.25, 0]
        },
        {            
            id: 72,                                       
            name: "lugia",
            label: "Lugia",
            scale: 1.2,
            position: [0, 1.25, 0]
        },
        {            
            id: 73,                                       
            name: "machamp",
            label: "Machamp",
            scale: 1.2,
            position: [0, -1.25, 0]
        },
        {            
            id: 74,                                       
            name: "machoke",
            label: "Machoke",
            scale: 1.2,
            position: [0, -1.25, 0]
        },
        {            
            id: 75,                                       
            name: "machop",
            label: "Machop",
            scale: 2,
            position: [0, -1.25, 0]
        },
        {            
            id: 76,                                       
            name: "magikarp",
            label: "Magikarp",
            scale: 1.5,
            position: [0, -0.25, 0]
        },
        {            
            id: 77,                                       
            name: "magnemite",
            label: "Magnemite",
            scale: 8,
            position: [0, -0.25, 0]
        },
        {            
            id: 78,                                       
            name: "magneton",
            label: "Magneton",
            scale: 5,
            position: [0, -1.0, 0]
        },
        {            
            id: 79,                                       
            name: "mankey",
            label: "Mankey",
            scale: 2.2,
            position: [0, -0.25, 0]
        },
        {            
            id: 80,                                       
            name: "marowak",
            label: "Marowak",
            scale: 1.5,
            position: [0, -0.75, 0]
        },
        {            
            id: 81,                                       
            name: "metapod",
            label: "Metapod",
            scale: 0.06,
            position: [0, -0.25, 0]
        },
        {            
            id: 82,                                       
            name: "mew",
            label: "Mew",
            scale: 0.013,
            position: [0, -1.0, 0]
        },
        {            
            id: 83,                                       
            name: "mewtwo",
            label: "Mewtwo",
            scale: 2.2,
            position: [0, -1.25, 0]
        },
        {            
            id: 84,                                       
            name: "mr-mime",
            label: "Mr-Mime",
            scale: 1.4,
            position: [0, -1.25, 0]
        },
        {            
            id: 85,                                       
            name: "nidoking",
            label: "Nidoking",
            scale: 1,
            position: [0, -1.25, 0]
        },
        {            
            id: 86,                                       
            name: "nidoqueen",
            label: "Nidoqueen",
            scale: 1.2,
            position: [0, -1.25, 0]
        },
        {            
            id: 87,                                       
            name: "nidoran-f",
            label: "Nidoran (female)",
            scale: 3,
            position: [0, -0.25, 0]
        },
        {            
            id: 88,                                       
            name: "nidoran-m",
            label: "Nidoran (male)",
            scale: 3,
            position: [0, -0.25, 0]
        },
        {            
            id: 89,                                       
            name: "nidorina",
            label: "Nidorina",
            scale: 2.3,
            position: [0, -0.25, 0]
        },
        {            
            id: 90,                                       
            name: "nidorino",
            label: "Nidorino",
            scale: 2,
            position: [0, -0.75, 0]
        },
        {            
            id: 91,                                       
            name: "ninetales",
            label: "Ninetales",
            scale: 14,
            position: [0, -0.25, 0]
        },
        {            
            id: 92,                                       
            name: "oddish",
            label: "Oddish",
            scale: 4,
            position: [0, -0.75, 0]
        },
        {            
            id: 93,                                       
            name: "omanyte",
            label: "Omanyte",
            scale: 3,
            position: [0, -0.25, 0]
        },
        {            
            id: 94,                                       
            name: "omastar",
            label: "Omastar",
            scale: 1.5,
            position: [0, -0.25, 0]
        },
        {            
            id: 95,                                       
            name: "onix",
            label: "Onix",
            scale: 0.4,
            position: [0, -1.0, 0]
        },
        {            
            id: 96,                                       
            name: "paras",
            label: "Paras",
            scale: 4,
            position: [0, -0.25, 0]
        },
        {            
            id: 97,                                       
            name: "parasect",
            label: "Parasect",
            scale: 1.5,
            position: [0, -0.25, 0]
        },
        {            
            id: 98,                                       
            name: "persian",
            label: "Persian",
            scale: 1.3,
            position: [0, -0.25, 0]
        },
        {            
            id: 99,                                       
            name: "pidgeot",
            label: "Pidgeot",
            scale: 1,
            position: [0, -0.25, 0]
        },
        {            
            id: 100,                                       
            name: "pidgeotto",
            label: "Pidgeotto",
            scale: 1.5,
            position: [0, -0.5, 0]
        },
        {            
            id: 101,                                       
            name: "pidgey",
            label: "Pidgey",
            scale: 5,
            position: [0, -0.5, 0]
        },
        {            
            id: 102,                                       
            name: "pikachu",
            label: "Pikachu",
            scale: 0.1,
            position: [0, -0.5, 0]
        },
        {            
            id: 103,                                       
            name: "pinsir",
            label: "Pinsir",
            scale: 1.4,
            position: [0, -0.5, 0]
        },
        {            
            id: 104,                                       
            name: "poliwag",
            label: "Poliwag",
            scale: 0.07,
            position: [0, -0.5, 0]
        },
        {            
            id: 105,                                       
            name: "poliwhirl",
            label: "Poliwhirl",
            scale: 1.6,
            position: [0, -0.5, 0]
        },
        {            
            id: 106,                                       
            name: "poliwrath",
            label: "Poliwrath",
            scale: 1,
            position: [0, -0.5, 0]
        },
        {            
            id: 107,                                       
            name: "ponyta",
            label: "Ponyta",
            scale: 0.025,
            position: [0, -0.5, 0]
        },
        {            
            id: 108,                                       
            name: "porygon",
            label: "Porygon",
            scale: 2,
            position: [0, -0.5, 0]
        },
        {            
            id: 109,                                       
            name: "primeape",
            label: "Primeape",
            scale: 1.4,
            position: [0, -0.5, 0]
        },
        {            
            id: 110,                                       
            name: "psyduck",
            label: "Psyduck",
            scale: 1.6,
            position: [0, -0.5, 0]
        },
        {            
            id: 111,                                       
            name: "raichu",
            label: "Raichu",
            scale: 4,
            position: [0, -0.5, 0]
        },
        {            
            id: 112,                                       
            name: "rapidash",
            label: "Rapidash",
            scale: 0.8,
            position: [0, -1.0, 0]
        },
        {            
            id: 113,                                       
            name: "raticate",
            label: "Raticate",
            scale: 2,
            position: [0, -0.5, 0]
        },
        {            
            id: 114,                                       
            name: "rattata",
            label: "Rattata",
            scale: 0.1,
            position: [0, -0.5, 0]
        },
        {            
            id: 115,                                       
            name: "rhydon",
            label: "Rhydon",
            scale: 1,
            position: [0, -0.5, 0]
        },
        {            
            id: 116,                                       
            name: "rhyhorn",
            label: "Rhyhorn",
            scale: 0.04,
            position: [0, -0.5, 0]
        },
        {            
            id: 117,                                       
            name: "sandshrew",
            label: "Sandshrew",
            scale: 3,
            position: [0, -0.5, 0]
        },
        {            
            id: 118,                                       
            name: "sandslash",
            label: "Sandslash",
            scale: 1.8,
            position: [0, -0.5, 0]
        },
        {            
            id: 119,                                       
            name: "scyther",
            label: "Scyther",
            scale: 2.2,
            position: [0, -0.5, 0]
        },
        {            
            id: 120,                                       
            name: "seadra",
            label: "Seadra",
            scale: 0.04,
            position: [0, -0.5, 0]
        },
        {            
            id: 121,                                       
            name: "seaking",
            label: "Seaking",
            scale: 0.04,
            position: [0, 0.5, 0]
        },
        {            
            id: 122,                                       
            name: "seel",
            label: "Seel",
            scale: 2.2,
            position: [0, 0.5, 0]
        },
        {            
            id: 123,                                       
            name: "shellder",
            label: "Shellder",
            scale: 0.08,
            position: [0, 0.5, 0]
        },
        {            
            id: 124,                                       
            name: "slowbro",
            label: "Slowbro",
            scale: 1,
            position: [0, -0.5, 0]
        },
        {            
            id: 125,                                       
            name: "slowpoke",
            label: "Slowpoke",
            scale: 1.2,
            position: [0, 0.5, 0]
        },
        {            
            id: 126,                                       
            name: "snorlax",
            label: "Snorlax",
            scale: 1.7,
            position: [0, -0.5, 0]
        },
        {            
            id: 127,                                       
            name: "spearow",
            label: "Spearow",
            scale: 5,
            position: [0, -0.5, 0]
        },
        {            
            id: 128,                                       
            name: "squirtle",
            label: "Squirtle",
            scale: 0.1,
            position: [0, -0.5, 0]
        },
        {            
            id: 129,                                       
            name: "starmie",
            label: "Starmie",
            scale: 4,
            position: [0, -0.5, 0]
        },
        {            
            id: 130,                                       
            name: "tangela",
            label: "Tangela",
            scale: 0.04,
            position: [0, -0.5, 0]
        },
        {            
            id: 131,                                       
            name: "tentacool",
            label: "Tentacool",
            scale: 2.5,
            position: [0, -1.5, 0]
        },
        {            
            id: 132,                                       
            name: "tentacruel",
            label: "Tentacruel",
            scale: 1.3,
            position: [0, -1.5, 0]
        },
        {            
            id: 133,                                       
            name: "umbreon",
            label: "Umbreon",
            scale: 2,
            position: [0, -0.5, 0]
        },
        {            
            id: 134,                                       
            name: "vaporeon",
            label: "Vaporeon",
            scale: 2,
            position: [0, -0.5, 0]
        },
        {            
            id: 135,                                       
            name: "venomoth",
            label: "Venomoth",
            scale: 1.2,
            position: [0, -0.5, 0]
        },
        {            
            id: 136,                                       
            name: "venonat",
            label: "Venonat",
            scale: 1.3,
            position: [0, -0.5, 0]
        },
        {            
            id: 137,                                       
            name: "venusaur",
            label: "Venusaur",
            scale: 0.02,
            position: [0, -0.5, 0]
        },
        {            
            id: 138,                                       
            name: "victreebel",
            label: "Victreebel",
            scale: 0.7,
            position: [0, 1, 0]
        },
        {            
            id: 139,                                       
            name: "vileplume",
            label: "Vileplume",
            scale: 0.3,
            position: [0, -0.5, 0]
        },
        {            
            id: 140,                                       
            name: "voltorb",
            label: "Voltorb",
            scale: 6,
            position: [0, 0.5, 0]
        },
        {            
            id: 141,                                       
            name: "vulpix",
            label: "Vulpix",
            scale: 3,
            position: [0, -0.5, 0]
        },
        {            
            id: 142,                                       
            name: "wartortle",
            label: "Wartortle",
            scale: 0.04,
            position: [0, -0.5, 0]
        },
        {            
            id: 143,                                       
            name: "weedle",
            label: "Weedle",
            scale: 0.2,
            position: [0, 0.5, 0]
        },
        {            
            id: 144,                                       
            name: "weepinbell",
            label: "Weepinbell",
            scale: 1.7,
            position: [0, -0.5, 0]
        },
        {            
            id: 145,                                       
            name: "wigglytuff",
            label: "Wigglytuff",
            scale: 1.6,
            position: [0, -1.0, 0]
        },
        {            
            id: 146,                                       
            name: "zapdos",
            label: "Zapdos",
            scale: 1,
            position: [0, -0.5, 0]
        },
        {            
            id: 147,                                       
            name: "zubat",
            label: "Zubat",
            scale: 0.5,
            position: [0, -5.75, 0]
        },
    ]
}

export default PokemonList