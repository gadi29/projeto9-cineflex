import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Loading from "./Loading";

function Initial({ setTurnBack }) {

    const [movies, setMovies] = useState([]);
    const [load, setLoad] = useState(true);

    setTurnBack(false);

    useEffect((() => {
        const promise = axios.get('https://mock-api.driven.com.br/api/v5/cineflex/movies');

        promise.then(response => {setMovies([...response.data]); setLoad(false)});
    }), []);

    return (
        <>
            <Text>Selecione o filme</Text>
            {load ? <Loading /> : 
            <UL>
                {movies.map((movie, index) =>
                    <Link key={index} to={`/sessoes/${movie.id}`}>
                        <LI key={index}><img src={movie.posterURL} alt="" /></LI>
                    </Link>
                )}
            </UL>}
        </>

    );
}

export default Initial;

const Text = styled.h2`
    font-size: 24px;
    color: #293845;
    letter-spacing: 0.04em;

    margin-top: 107px;
    margin-bottom: 40px;

    text-align: center;
`;

const UL = styled.ul`
    width: 100%;
    
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
`;

const LI = styled.li`
    background-color: #FFFFFF;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    cursor: pointer;
    
    width: 145px;
    height: 210px;
    margin: 0 10px;
    margin-bottom: 15px;
    padding: 8px;

    img {
        width: 129px;
        height: 193px;
    }
`;