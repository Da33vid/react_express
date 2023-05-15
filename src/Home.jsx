import React, { useState, useEffect } from 'react';

function Home(){
    return (
        <div>
            <h1>Home</h1>
            <h2>Links</h2>
            <button onClick={() => window.location.href = '/Tamagotchi'}>Tamagotchi</button>
            <button onClick={() => window.location.href = '/Game'}>Piedra, Papel o Tijera</button>

            
        </div>
    );
}
export default Home;