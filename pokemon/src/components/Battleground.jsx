import React from 'react'
import { useState, useEffect, useRef } from 'react';
import Loader from './Loader';
import WorldMap from './WorldMap';

const enemyDataObj = {svg: null, stats : {attack: null, defense: null, hp: null}, type: null, name: null};
const ownDataObj = {svg: null, stats : {attack: null, defense: null, hp: null}, type: null, name: null};
let origEnemyHP = 0;
let origOwnHP = 0;
let enemyHPModifier = 0;
let ownHPModifier = 0;
let counter = 0;

export default function Battleground(img) {
    const [loader, setLoader] = useState(true);
    const [isPokemonSelected, setIsPokemonSelected] = useState(null);
    const [isRefresh, setIsRefresh] = useState(true);
    const [isOwnTurn, setIsOwnTurn] = useState(null);
    const ownPokemons = getPokemonProps();
    const [theWinner, setTheWinner] = useState(null);
    const [mainMenuList, setMainMenuList] = useState(false);
    const battleMusic = useRef(new Audio(process.env.PUBLIC_URL + "/music/battleMusic.mp3"));
    const attackSFX = new Audio(process.env.PUBLIC_URL + "/music/attackSFX.mp3");
    attackSFX.loop = false;
    attackSFX.volume = 0.5;
    battleMusic.current.loop = true;
    battleMusic.current.volume = 0.4;

        useEffect(() => 
            {
                setTimeout(() => {
                    setLoader(false);
                    img.audioModifier(false);
                    battleMusic.current.play();
                }, 5000);
    
                const getPokemonData = async (randomPokemon) => 
                    {
                        await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemon}`)
                            .then(res => res.json())
                            .then(data => {
                                enemyDataObj.svg = data.sprites.other.dream_world.front_default;
                                enemyDataObj.stats.attack = data.stats[1].base_stat;
                                enemyDataObj.stats.defense = data.stats[2].base_stat;
                                enemyDataObj.stats.hp = data.stats[0].base_stat;
                                enemyDataObj.type = data.types[0].type.name;
                                enemyDataObj.name = randomPokemon;
                                origEnemyHP = data.stats[0].base_stat;
                            })
                            .catch(err => console.log(err))
                    }

                const getPokemon = async () => 
                {
                    await fetch('https://pokeapi.co/api/v2/generation/1/')
                        .then(res => res.json())
                        .then(pokData => {                
                            getPokemonData(pokData.pokemon_species[Math.floor(Math.random() * 151)].name);
                        })
                        .catch(err => console.log(err))
                }
                getPokemon();           
            }
        , []);

        useEffect(()=> {
            const getPokemonDataBp = async () => 
            {
                await fetch(`https://pokeapi.co/api/v2/pokemon/${isPokemonSelected}`)
                    .then(res => res.json())
                    .then(data => {
                        ownDataObj.svg = data.sprites.other.dream_world.front_default;
                        ownDataObj.stats.attack = data.stats[1].base_stat;
                        ownDataObj.stats.defense = data.stats[2].base_stat;
                        ownDataObj.stats.hp = data.stats[0].base_stat;
                        ownDataObj.type = data.types[0].type.name;
                        ownDataObj.name = isPokemonSelected;
                        origOwnHP = data.stats[0].base_stat;
                        setIsRefresh(false)
                    })
                    .catch(err => console.log(err))
            }
            getPokemonDataBp();
        }, [isPokemonSelected])

        const handlePokemonChoose = (event) => {
            setIsPokemonSelected(event.target.getAttribute('data-value'));
        }

        const handleExitFight = () => {
            battleMusic.current.pause();
            img.audioModifier(true);
            enemyHPModifier = 0;
            ownHPModifier = 0;
            counter = 0;
            setMainMenuList(true);
        }
        
        const handleTurn = () => {
            if(enemyDataObj.stats.hp > 0 && ownDataObj.stats.hp > 0) {
                counter += 1;
                if( counter % 2 !== 0 && enemyDataObj.stats.hp > 0){
                    attackSFX.play();
                    setIsOwnTurn(false)
                    let B = ownDataObj.stats.attack;
                    let D = enemyDataObj.stats.defense;
                    let Z = Math.floor(Math.random() * (255 - 217 + 1)) + 217;
                    let result = enemyDataObj.stats.hp - (((((2/5+2)*B*60/D)/50)+2)*Z/255).toFixed(0);
                    enemyHPModifier += 100 / (origEnemyHP / (((((2/5+2)*B*60/D)/50)+2)*Z/255));

                    if(result <= 0) {
                        isRefresh === false ? setIsRefresh(true) : setIsRefresh(false);
                        enemyDataObj.stats.hp = 0;
                        setTheWinner(true);
                    }
                    if(result > 0){
                        enemyDataObj.stats.hp = result;
                    }
                                      
                } else {
                    attackSFX.play();
                    setIsOwnTurn(true)
                    let B = enemyDataObj.stats.attack;
                    let D = ownDataObj.stats.defense;
                    let Z = Math.floor(Math.random() * (255 - 217 + 1)) + 217;
                    let result = ownDataObj.stats.hp - (((((2/5+2)*B*60/D)/50)+2)*Z/255).toFixed(0);
                    ownHPModifier += 100 / (origOwnHP / (((((2/5+2)*B*60/D)/50)+2)*Z/255));
                    
                    if(result <= 0) {
                        isRefresh === false ? setIsRefresh(true) : setIsRefresh(false);
                        ownDataObj.stats.hp = 0;
                        setTheWinner(false);
                    }
                    if(result > 0) {
                        ownDataObj.stats.hp = result;
                    }
                }
            }
        }

        return (
            <>
            <div className='battleContainer' style={{ 
                backgroundImage: `url(./backgrounds/battlegrounds/${img.img}.jpg)`, zIndex: '12'}}>
                {
                    (loader === true) ? <Loader/> : 
                    (isPokemonSelected === null) ? 
                        <>
                            <div className='enemyFounded'>Founded Enemy</div>
                            <div className="enemyPokemonSVG" style={{
                                backgroundImage: `url(${enemyDataObj.svg})`
                            }}/>
                            <div className='choosePokemon'>Choose your Pokemon</div>
                            <div className='backpack'>
                                {
                                    ownPokemons.map((pokemon, index) => {
                                    return <div style={{backgroundImage: `url(./backpack/${pokemon.name}.png`}} 
                                                    key={'pok_' + index} 
                                                    onClick={handlePokemonChoose}
                                                    data-value={pokemon.name}
                                                ></div>
                                    })
                                }
                            </div>
                        </>
                        : undefined
                        
                }
                {isPokemonSelected ?
                    <>
                        <div className='mainBattleContainer'>
                            <div className={isOwnTurn === true ? 'ownCardZizzy' : 'ownCard'}
                            style={{
                                backgroundImage: `url(./cards/${ownDataObj.type}.png)`
                            }}>
                                {
                                    theWinner === true ? <div className='winnerDiv'></div> :
                                    theWinner === false ? <div className='looserDiv'></div> : undefined
                                }
                                <span className='ownCardPokemonLabel'>{ownDataObj.name}</span>
                                <div className='ownCardSVG' style={{
                                    backgroundImage: `url(${ownDataObj.svg})`
                                }} />
                                <div className='ownCardStats'>
                                    <span className='ownCardStatsHPLabel'>HP: <span className='ownCardStatsHP'>{parseInt(ownDataObj.stats.hp)}</span></span>
                                    <div className='ownCardStatsHPBox'>
                                        <div className='ownCardStatsHPProgressbar' style={{
                                            width: `calc(100% - ${ownHPModifier}%)`
                                        }}></div>
                                    </div>
                                    <div className='ownCardStatsMore'>
                                        <span>Attack: {ownDataObj.stats.attack}</span><br />
                                        <span>Defense: {ownDataObj.stats.defense}</span>
                                    </div>
                                </div>
                            </div>
                            <div className={isOwnTurn === false ? 'enemyCardZizzy' : 'enemyCard'}
                                style={{
                                    backgroundImage: `url(./cards/${enemyDataObj.type}.png)`
                                }}
                            >
                                {
                                    theWinner === true ? <div className='looserDiv'></div> :
                                    theWinner === false ? <div className='winnerDiv'></div> : undefined
                                }
                                <span className='ownCardPokemonLabel'>{enemyDataObj.name}</span>
                                <div className='ownCardSVG' style={{
                                    backgroundImage: `url(${enemyDataObj.svg})`
                                }} />
                                <div className='ownCardStats'>
                                    <span className='ownCardStatsHPLabel'>HP: <span className='ownCardStatsHP'>{parseInt(enemyDataObj.stats.hp)}</span></span>
                                    <div className='ownCardStatsHPBox'>
                                        <div className='ownCardStatsHPProgressbar' style={{
                                            width: `calc(100% - ${enemyHPModifier}%)`
                                        }}></div>
                                    </div>
                                    <div className='ownCardStatsMore'>
                                        <span>Attack: {enemyDataObj.stats.attack}</span><br />
                                        <span>Defense: {enemyDataObj.stats.defense}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mainBattleNavbar'>
                            <div className='nextTurn' onClick={handleTurn} />
                            <div className='ownField'>
                                {
                                    theWinner !== null ? 
                                    <button className='handleExitFight' onClick={handleExitFight}><i className="fa-solid fa-arrow-left"> Exit</i></button> :
                                    undefined
                                }
                            </div>
                            <div className='enemyField'></div>
                        </div>
                    </>
                    : undefined
                }  
            </div>
            {
                mainMenuList === true ? <WorldMap audioModifier={img.audioModifier}/> : undefined
            }
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
