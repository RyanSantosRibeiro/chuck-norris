import React , { useEffect, useState } from 'react';
import $ from 'jquery';

import shareIcon from '../../assets/images/share.png'

import './style.scss';

const Search = () => {
    const parse = require('html-react-parser');
    const [facts,setFacts] = useState(null);
    const [randomFact,setRandomFact] = useState(null);
    const [page,setPage] = useState(0);
    

    // Aux
    const formatData = (data,perPage) => {
        // const perPage = 10;
        let aux = [];
        let auxPerPage = [];
        const pages = Math.ceil(data.length / perPage)
        
        for(let i=0;i<pages;i++){
            auxPerPage = [];
            for(let x=0;x<perPage;x++) {
                if(data[i * perPage + x] !== "" && data[i * perPage + x]) {
                    auxPerPage[x] = data[i * perPage + x];
                }
            }
            aux[i] = auxPerPage;
        }
        return aux;
    }

    const searchButton = (e) => {
        e.preventDefault();

        let value = $('#search-input').val();

        if(!value && value === "") {
            $('#search-input').trigger("focus");
            return;
        } else {
            loadFacts(value);
        }
    }

    // Loads
    const loadRandomFact = async () => {

        try {
            const response = await fetch('https://api.chucknorris.io/jokes/random');
            const data = await response.json();
            setRandomFact(data);

        } catch (error) {
            setFacts({
                error: "400 - Error searching random fact!"
            });
        }
    }

    const loadFacts = async (query) => {

        try {
            const response = await fetch(`https://api.chucknorris.io/jokes/search?query=${query}`);
            const data = await response.json();
            let formatedData = formatData(data.result,10);
            setFacts(formatedData);
            
        } catch (error) {
            setFacts({
                error: "400 - Error searching facts!"
            });
        }
    }

    // Render
    const renderRandomFact = () => {
        if(!randomFact) return "Wait..";

        return (
            <p className=''>
                <span>You know...</span>
                {randomFact.value}
                </p>
        )
    }

    const renderResult = () => {
        if(!facts || facts === "") {
            return <></>;
        }

        if(facts.error) {
            return <p className='result__error'>{facts.error}</p>;
        }

        if(facts.length === 0) {
            return <p className='result__error'>No results containing all your search terms were found.</p>;
        }

        let value = $('#search-input').val();

        return (
            <div className='result__list'>
                {
                    facts[page].map((el,id)=>{
                        if(!el) return <></>;

                        let newStr = value.bold()
                        let newValue = el.value.replaceAll(value,newStr)
                        return (
                            <div key={id} className='result__item'>
                                <div className='result__item__header'>
                                <p className='result__item__text'>{parse(newValue)}</p>
                                    <a  className='result__item__link' href={el.url} target="_blank" rel='noreferrer'>
                                        <img alt='chucknorris.io' src={shareIcon}/>
                                    </a>
                                </div>
                                {el.categories.length > 0 ? 
                                    <p className='result__item__category'>{el.categories.map((categorie,key) => <span key={key}>{categorie}</span>)}</p>
                                :
                                    <></>
                                }
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    const renderButtons = () => {
        if(!facts || facts === "" || facts.length === 0 || facts.error) {
            return <></>;
        }
        
        return (
            <>
                <button id="page-prev" className={`result__buttons__prev ${page === 0?"disable":""}`} onClick={prevPage}>prev</button>
                <p>{page}</p>
                <button id="page-next" className={`result__buttons__next ${page === facts.length - 1?"disable":""}`} onClick={nextPage}>next</button>
            </>
        )
    }

    // Action Buttons
    const nextPage = (el) => {
        let next = page + 1;
        if(next < facts.length) {
            setPage(next)
        }
    }

    const prevPage = (el) => {
        let prev = page - 1;
        if(prev >= 0) {
            setPage(prev)
        }
    }
    
    useEffect(() => {
        if(randomFact === null) {
            loadRandomFact();
        }
    }, [facts,page,randomFact]);

    return (
        <div className="search">
            <div className='search__highlight '>
                {renderRandomFact()}
            </div>
            <div className='search__container'>
                <form className='search__container__input'>
                    <input id='search-input' onSubmit={searchButton} />
                    <button type='submit' id='search-button' onClick={searchButton}>Search</button>
                </form>
                <div className='search__container__result'>
                    <div className='result__container'>
                        {renderResult()}
                    </div>
                    <div className='result__buttons'>
                        {renderButtons()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search;