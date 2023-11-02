import React, { useEffect, useState } from 'react';
import WorldMap from './WorldMap';
import Pokedex from '../components/Pokedex';
import PokemonList from './3d/PokemonList';

export default function Main(props) {
    const [selectedMenu, setSelectedMenu] = useState("mainMenu");
    const [bgChange, setBgChange] = useState("./backgrounds/background.jpg");
    const refText = props.refText;
    const menuClickSFX = new Audio(process.env.PUBLIC_URL + "/music/clickSFX.mp3");
    menuClickSFX.loop = false;
    menuClickSFX.volume = 1;

    const showArena = (event) => {
        menuClickSFX.play();
        setSelectedMenu(event.target.value);
    };

    const showBackPack = (event) => {
        menuClickSFX.play();
        setSelectedMenu(event.target.value)
        setBgChange("./backgrounds/pokedex_bg.png");
    };

    const showPokedex = (event) => {
        menuClickSFX.play();
        setSelectedMenu(event.target.value);
        setBgChange("./black.png");
    };

    useEffect(() => {
        if(refText){
            setSelectedMenu(refText);
        }
    }, []);

    return (
        <>
            <div className='mainContainer' style={{ 
                backgroundImage: `url(${bgChange})`,
                zIndex: '12'
            }}>  
                {
                selectedMenu === "mainMenu" ?
                    <div className='navbarDiv'>
                        <>
                            <button className='mainBtn' value="worldmap" onClick={showArena}>Worldmap</button>
                            <button className='mainBtn' value="backpack" onClick={showBackPack}>Pokedex</button>
                            <button className='mainBtn' value="pokedex" onClick={showPokedex}>Backpack</button>
                        </> 
                    </div>
                : undefined
                }
                <div className="dataContainer">
                    {(selectedMenu === "worldmap") ?
                        <WorldMap audioModifier={props.audioModifier}/> :
                    (selectedMenu === "backpack") ?
                    <>
                        <div className="pokedexAnimation" style={{backgroundImage: 'url(./backgrounds/pokedex_bg_animation.png)'}}></div>
                        <PokemonList audioModifier={props.audioModifier} />
                    </>
                        : 
                    (selectedMenu === "pokedex") ?
                        <>
                            <div className="pokedexAnimation" style={{backgroundImage: 'url(./ball.png)'}}></div>
                            <Pokedex audioModifier={props.audioModifier} />
                        </>
                        : undefined
                    }   
                </div>                                        
            </div>  
        </>
    )
}
