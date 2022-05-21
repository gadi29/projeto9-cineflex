import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

function Day({ weekday, date, showtimes }) {
    const showtimesArray = [...showtimes];
    
    return (
        <Block>
            <TextH3>{weekday} - {date}</TextH3>
            {showtimesArray.map(hour => 
            <Link to={`/assentos/${hour.id}`}>
                <Button>{hour.name}</Button>
            </Link>)}
        </Block>
    );
}

function Session() {
    
    const { idFilme } = useParams();
    const [movie, setMovie] = useState([]);
    const [sessions, setSessions] = useState([]);

    useEffect((() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilme}/showtimes`);

        promise.then(response => {
            setMovie(response.data);
            setSessions([...response.data.days]);
        });
    }), []);
    
    return(
        <>
            <TextH2>Selecione o horário</TextH2>
            {sessions.map(session => <Day weekday={session.weekday} date={session.date} showtimes={session.showtimes}/>)}
        </>
    );
}

export default Session;

const TextH2 = styled.h2`
    font-size: 24px;
    color: #293845;
    letter-spacing: 0.04em;

    margin: 40px 0;

    text-align: center;
`;

const Block = styled.div`
    margin-left: 24px;
`;

const TextH3 = styled.h3`
    font-size: 20px;
    color: #293845;
`;

const Button = styled.button`
    border: none;
    border-radius: 3px;
    background-color: #E8833A;
    cursor: pointer;

    padding: 13px 18px;
    margin-top: 20px;
    margin-bottom: 25px;

    color: #FFFFFF;
    font-size: 18px;

    &:last-of-type {
        margin-left: 9px;
    }
`;