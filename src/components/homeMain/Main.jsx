import React, { useEffect, useState } from 'react'

import "./main.css"
import Games from '../games/Games'

function Main() {


    return (
        <div className="main-container mx-auto text-center">
            <section className="banner">
                <h1><strong>Welcome to SP GameSPot</strong></h1>

            </section>  
            <Games />
        </div>
    )
}

export default Main
