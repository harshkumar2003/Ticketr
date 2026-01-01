import React from "react";
import Navbar from "../component/Navbar.jsx";
import Hero from "../component/Hero.jsx";

function Home()
{
    return(
        <>
            <Navbar/>
            <div className="z-0">
                <Hero/>
            </div>

        </>
    )
}
export default Home;