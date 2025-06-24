import React, { useState } from 'react';  
import { PiNumberCircleEight, PiNumberCircleFive, PiNumberCircleFour, PiNumberCircleNine, PiNumberCircleOne, PiNumberCircleSeven, PiNumberCircleSix, PiNumberCircleThree, PiNumberCircleTwo, PiNumberCircleZero, PiPokerChip, PiPokerChipBold } from 'react-icons/pi';
 

function Casino() {
    // todos las letras a sortear

    const state = [{
    number: 1, icon: <PiNumberCircleOne size={48} weight="fill" />, isPoker: false}, {
    number: 2, icon: <PiNumberCircleTwo size={48} weight="fill" />, isPoker: false},  {
    number: 3, icon: <PiNumberCircleThree size={48} weight="fill" />, isPoker: false},{
    number: 4, icon: <PiNumberCircleFour size={48} weight="fill" />, isPoker: false}, {
    number: 5, icon: <PiNumberCircleFive size={48} weight="fill" />, isPoker: false}, {
    number: 6, icon: <PiNumberCircleSix size={48} weight="fill" />, isPoker: false}, {
    number: 7, icon: <PiNumberCircleSeven size={48} weight="fill" />, isPoker: false}, {
    number: 8, icon: <PiNumberCircleEight size={48} weight="fill" />, isPoker: false}, {
    number: 9, icon: <PiNumberCircleNine size={48} weight="fill" />, isPoker: false}, {
    number: 10, icon: <PiNumberCircleZero size={48} weight="fill" />, isPoker: false}, {
    number: 11, icon: <PiPokerChip size={48} weight="fill" />, isPoker: true}]

    const [allReel, setAllReels]= useState(state);
    // letras ganadoras
   const [reels, setReels] = useState([{
    number: 1, icon: <PiNumberCircleOne size={48} weight="fill" />, isPoker: false}, {
    number: 2, icon: <PiNumberCircleTwo size={48} weight="fill" />, isPoker: false},  {
    number: 3, icon: <PiNumberCircleThree size={48} weight="fill" />, isPoker: false},]);
    // mensaje de la consola
   const [message, setMessage] = useState(''); 
    // mi cantidad de dinero 
   const [dinero, setDinero] = useState(100);
    // cantidad a apostar por vez
   const  [apuesta, setApuesta] =  useState(10);


    function slotSpin () {
        // cambio el estado con valores al azar.   
        let reel1 = randomReel();
        let reel2 = randomReel();
        let reel3 = randomReel(); 
        let newReel = [reel1,reel2,reel3];  
        setReels(newReel) 
        // funcion para determinar si ganamos o perdemos
        winOrLose( newReel); 
    }

    function randomReel () {
        
        // eligo un numero al azar basado en el largo de mi array 
        let randNumberFromReel = Math.floor(Math.random()*allReel.length )

        // eligo el elemento al azar de mi arreglo 
        let selectedReel = allReel[randNumberFromReel]

        console.log("selectedReel", selectedReel); 
        // devuelvo el valor 
        return selectedReel
    }
    function winOrLose(newReel) {
        let multiplyPoker = 1
        const isPokerMatch = newReel.filter(items =>  items.isPoker === true ).length
        if (isPokerMatch == 2) {
            multiplyPoker = 5
        }
        if (isPokerMatch === 3) {
            multiplyPoker = 10000000
        }
        console.log( "multipoker", (apuesta * 2 * multiplyPoker) )
        
        if(newReel[0] === newReel[1]){
            if(newReel[1] === newReel[2]){
                setMessage("jackpot")
                moneyUpdate(dinero + (apuesta * 5 * multiplyPoker));9
            }else{
                setMessage("par");
                moneyUpdate(dinero + (apuesta * 2 * multiplyPoker));
            }
        }else if(newReel[0] === newReel[2]){
            setMessage("par v2");
            moneyUpdate(dinero + (apuesta * 2 * multiplyPoker));

        }else if(newReel[1] === newReel[2]){
            setMessage("par v3");
            moneyUpdate(dinero + (apuesta * 2 * multiplyPoker));

        }else{
            setMessage("perdiste");
            moneyUpdate(dinero-apuesta);
        }

       
        // else if(newReel[0].isPoker || newReel[1].isPoker || newReel[2].isPoker){
        //     setMessage("BIG PRIZE")
        //     moneyUpdate(dinero + (apuesta * 100));
        // }
       
        




        // if(!newReel[0].isPoker || !newReel[1].isPoker || !newReel[2].isPoker){
        //     if(newReel[0].isPoker === newReel[1].isPoker ){
        //         if(newReel[1].isPoker === newReel[2].isPoker){
        //             setMessage("jackpot")
        //             moneyUpdate(ispoker ? dinero + (apuesta * 400)  : dinero + (apuesta * 20) );
        //         }else{
        //             setMessage("par");
        //             moneyUpdate(dinero + (apuesta * 20 ));
        //         }
        //     }
        // }else if(newReel[0] === newReel[2]){
        //         setMessage("par v2");
        //         moneyUpdate(dinero + (apuesta * 2));

        //     }else if(newReel[1] === newReel[2]){
        //         setMessage("par v3");
        //         moneyUpdate(dinero + (apuesta * 2));
        //     }
        //     else{
        //     setMessage("perdiste");
        //     moneyUpdate(dinero-apuesta);
        //     }
    }

    function moneyUpdate(valor) {

        setDinero(valor);
        if (dinero === 0 ) {
            alert("Game Over")
            setDinero(100); 
        }

    }

  return (
    <>
    <p>{message}</p>
    <div className="casino">
        <p>Dinero: {dinero}</p>  {/* en vez de dinero poner fichas y un icono a lado de ficha */}
        {/* podrias poner las reglas abajo
        Reglas: 
        Par (2 iguales): numero x 5
        Trio (3 iguales): numero x 10 */}
        {/* podrias agregar cuanto cuesta la apuesta  */}
        <div className="slot-container">
          <h2 className="slot">{reels[0].icon} </h2>
          <h2 className="slot">{reels[1].icon} </h2>
          <h2 className="slot">{reels[2].icon} </h2>
        </div>
        <button className="spin" onClick={slotSpin}>SPIN</button>
    </div>
    
    </>   
  );
}

export default Casino;
