import React from 'react'
import { useEffect, useState } from 'react'
import Main from './Main'
import Battleground from './Battleground';

let chosenCityName = "NONE"
const cities = [];

export default function WorldMap(data) {
    const [isBattleStarted,setIsBattleStarted] = useState(false);
    const [isOnClicked, setIsOnClicked] = useState(null);
    const [mainMenuList, setMainMenuList] = useState(false);
    const menuClickSFX = new Audio(process.env.PUBLIC_URL + "/music/clickSFX.mp3");
    menuClickSFX.loop = false;
    menuClickSFX.volume = 1;
    let chosenCityNameImg;
    chosenCityNameImg = isOnClicked ? isOnClicked.substring(0, isOnClicked.length - 1) : undefined

    useEffect(() => {
        if(isOnClicked === "ice") {
            chosenCityName = cities[15]
            setIsOnClicked("ice_")
        } else if(isOnClicked === "beach") {
            chosenCityName = cities[3]
            setIsOnClicked("beach_")
        } else if(isOnClicked === "lava") {
            chosenCityName = cities[19]
            setIsOnClicked("lava_")
        } else if(isOnClicked === "forest") {
            chosenCityName = cities[7]
            setIsOnClicked("forest_")
        } else if(isOnClicked === "desert") {
            chosenCityName = cities[10]
            setIsOnClicked("desert_")
        }
    } , [isOnClicked]);

    useEffect(
        () => {
            const battlegrounds = async() => {
                await fetch('https://pokeapi.co/api/v2/location/')
                .then(res => res.json())
                .then(data => {
                    data.results.map(city => 
                        cities.push(city.name)
                    );
                })
                .catch(err => console.log(err))
            }
           battlegrounds();
        }       
    , []);

    const backToMainMenu = () => {
        menuClickSFX.play();
        setMainMenuList(true);
    }

    const startBattle = () => {
        if (isOnClicked) {setIsBattleStarted(true)}      
    }

    return (
        <>   
        <div 
            className='worldmap_img' style={{
                zIndex: '12'
            }}
        >
            <div className="worldmapLeftSide">
                <img src="./backgrounds/worldmap.png"  alt="World Map" />

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0.882 0.873 10.139 2.077" className="iceLand"  alt="Ice Land" title="Ice Land" onClick={() => setIsOnClicked("ice")}>
                    <path className="landHover" fill="rgba(0, 0, 0, 0)" d="M 0.951 3.022 L 0.882 2.24 L 3.347 1.296 L 4.58 1.616 L 6.34 0.96 T 7.931 0.873 L 10.021 2.721 L 8.68 5.2 L 6.064 4.665 L 4.771 3.8 L 3.731 3.741 L 1.981 3.139 M 7.601 6.95" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="1.202 5.3 7.711 4.364" className="beachLand"  alt="Beach Land" title="Beach Land" onClick={() => setIsOnClicked("beach")}>
                    <path className="landHover" fill="rgba(0, 0, 0, 0)" d="M 5.012 9.664 L 2.247 9.316 L 1.202 8.073 L 2.944 6.667 L 3.874 5.668 L 5.555 5.3 L 8.181 5.73 L 8.913 6.798 L 7.356 7.414 L 6.418 9.548 M 7.601 6.95" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-1.871 9.30 8.472 3.324" className="desertLand"  alt="Desert Land" title="Desert Land" onClick={() => setIsOnClicked("desert")}>
                    <path className="landHover" fill="rgba(0, 0, 0, 0)" d="M -1.438 11.709 L -1.871 9.708 L -1.278 9.018 L -0.355 8.872 L 0.695 8.989 L 2.455 9.027 L 4.327 11.349 L 3.326 13.274 L 1.586 12.953 L -1.156 13.128 M 7.601 6.95" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="7.601 6.525 9.887 5.609" className="forestLand"  alt="Forest Land" title="Forest Land" onClick={() => setIsOnClicked("forest")}>
                    <path className="landHover" fill="rgba(0, 0, 0, 0)" d="M 13.319 10.414 L 10.48 9.5 L 9.07 6.525 L 10.849 6.584 L 12.113 6.836 L 13.62 6.584 L 15.681 8.703 L 16.488 10.025 L 15.088 11.134 L 14.048 10.968 M 7.601 6.95" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="5.738 8.95 6.738 6.246" className="lavaLand"  alt="Lava Land" title="Lava Land" onClick={() => setIsOnClicked("lava")}>
                    <path className="landHover" fill="rgba(0, 0, 0, 0)" d="M 6.951 10.706 L 6.338 9.597 L 7.748 8.985 L 8.691 9.675 L 9.663 9.529 L 11.112 9.539 L 13.076 10.57 L 11.433 14.196 L 7.797 12.864 L 7.077 11.474 M 7.601 6.95" />
                </svg>
            </div>

            <div className="worldmapSide">
                <button className="backToMainMenu" onClick={backToMainMenu}>«« Back to Main Menu</button>
                <div className="chosenCityLabelBox">
                    {isOnClicked ? 
                        <>
                            <span className="chosenCityLabel"> Selected Location</span><br />
                            <span className="chosenCityName">{chosenCityName}</span>
                            </>
                    : 
                        <>
                            <span className="chosenCityLabel"> Select a Location</span><br />
                            <span className="chosenCityName"></span>
                        </>
                    }
                </div>
                <div className="chosenCityBox" style={
                    isOnClicked ?
                    {backgroundImage: 'url(./backgrounds/battlegrounds/'+chosenCityNameImg+'.jpg)'
                    } : undefined
                }>  
                </div>
                <div className="startFight" style={{backgroundImage: 'url(./fightBtn.png)'}} onClick={startBattle}></div>
                
            </div>
        </div>
        {
            mainMenuList ? <Main refText="mainMenu"/> : undefined
        }
        {
            (isBattleStarted && isOnClicked) ? <Battleground img={chosenCityNameImg} audioModifier={data.audioModifier} /> : undefined
        }
        </>
    )
}
