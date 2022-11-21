import React from 'react';
import Footer from '../../components/Footer';
import Game from '../../components/Game';
import Search from '../../components/Search';
import './style.scss';



const Home = () => {

    return (
        <div className="container">
            <Game />
            <Search />
            <Footer />
        </div>
    )
}

export default Home;