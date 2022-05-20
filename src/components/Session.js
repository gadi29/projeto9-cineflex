import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Day({ weekday, date, showtimes }) {
    const showtimesArray = [...showtimes];
    
    return (
        <>
            <h3>{weekday} - {date}</h3>
            {showtimesArray.map(hour => <button>{hour.name}</button>)}
        </>
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
            <h2>Selecione o horário</h2>
            {sessions.map(session => <Day weekday={session.weekday} date={session.date} showtimes={session.showtimes}/>)}
        </>
    );
}

export default Session;