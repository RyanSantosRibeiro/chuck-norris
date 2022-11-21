import React , {useEffect, useState } from 'react';
import $ from 'jquery'

import speaks from './speaks';

import imageChuck from '../../assets/images/chucknorris.png'
import './style.scss';

const Game = () => {
    const [phases,setPhases] = useState(0);

    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    const randomMessage = () => {
        if (phases === speaks.length) {
            return <></>;
        }
        let random = getRandomInt(0,speaks[phases].length);
        return speaks[phases][random];
    }

    const gameOver = () => {
        $('#game-image').animate({height:300},500);
        if($(".game__over").length === 0) {
            $('.container').after("<div class='game__over'><p>YOU DIE</p></div>")
            $('body').addClass('game-over');
            $('.game__over').on("click",function(){
                window.location.reload();
            });
        }
    }

    

    useEffect(() => {
        const updatePhases = () => {
            let newPhase = phases+1;
            if(newPhase < speaks.length) {
                setPhases(newPhase);
            } else if (newPhase === speaks.length) {
                setPhases(newPhase);
                gameOver();
            }
        }

        $( "#game-image" ).on("click",function() {
            updatePhases();
        });

        $("#game-message").animate(
            {opacity: 1}, 
            400,
            function(){
                setTimeout(function(){ 
                    $("#game-message").animate({opacity:0},300);
                 }, 3500);
            }
        )

        if(phases === 0) {
            $( "#game-image" ).on("mouseenter",function() {
                $("#game-message").animate(
                    {opacity: 1}, 
                    400,
                    function(){
                        setTimeout(function(){ 
                            $("#game-message").animate({opacity:0},300);
                         }, 3500);
                    }
                )
            });
        }
    }, [phases]);

    return (
        <div className="game">
            <div id="game-image" className='game__image'>
                <img alt='Chuck Norris!!' src={imageChuck} />
            </div>
            <div className='game__message'>
                <p id='game-message'>{randomMessage()}</p>
            </div>
        </div>
    )
}

export default Game;