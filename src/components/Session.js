import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Loading from "./Loading";

function Day({ weekday, date, showtimes, index }) {
    const showtimesArray = [...showtimes];

    return (
        <Block key={index}>
            <TextH3>{weekday} - {date}</TextH3>
            {showtimesArray.map((hour, indexH) =>
                <Link key={indexH} to={`/assentos/${hour.id}`}>
                    <Button key={indexH}>{hour.name}</Button>
                </Link>)}
        </Block>
    );
}

function Session({ setTurnBack, turnBack }) {

    if(!turnBack) setTurnBack(true);

    const { idFilme } = useParams();
    const [load, setLoad] = useState(true);
    const [movie, setMovie] = useState([]);
    const [sessions, setSessions] = useState([]);

    useEffect((() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilme}/showtimes`);

        promise.then(response => {
            setLoad(false);
            setMovie(response.data);
            setSessions([...response.data.days]);
        });
    }), [idFilme]);

    return (
        <Container>
            <TextH2>Selecione o horário</TextH2>
            {load ? <Loading /> :
                <> {sessions.map((session, index) => <Day key={index} index={index} weekday={session.weekday} date={session.date} showtimes={session.showtimes} />)}
                </>}
            <DivFooter>
                <img src={movie.posterURL} alt="" />
                <h4>{movie.title}</h4>
            </DivFooter>
        </Container>
    );
}

export default Session;

const Container = styled.div`
    margin-top: 107px;
    margin-bottom: 110px;
`;

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

const DivFooter = styled.div`
    background-color: #DFE6ED;
    border-top: 1px solid #9EADBA;
    
    width: 100%;
    height: 110px;

    position: fixed;
    bottom: 0;
    left: 0%;
    display: flex;
    align-items: center;

    img {
        background-color: #FFFFFF;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        border-radius: 2px;
        
        width: 56px;
        height: 80px;
        padding: 4px;
        margin: 0 10px;
    }

    h4 {
        font-size: 22px;
        color: #293845;
    }
`;