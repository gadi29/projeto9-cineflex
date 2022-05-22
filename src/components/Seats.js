import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Footer from "./Footer";

function Seat({ seatName, setSeatName, seat, setSelectedSeats, selectedSeats, index }) {
    const [selecionado, setSelecionado] = useState(false);

    return (
        <>
            <LI key={index} livre={seat.isAvailable} selecionado={selecionado} onClick={() => {
                if(!seat.isAvailable) alert('Esse assento não está disponível!');
                else if (seat.isAvailable && !selecionado) {
                    setSelecionado(true);
                    setSelectedSeats([...selectedSeats, seat.id]);
                    setSeatName([...seatName, seat.name]);
                } else if (selecionado) {
                    setSelecionado(false);
                    const filterSeats = selectedSeats.filter(seatFilter => seatFilter !== seat.id);
                    setSelectedSeats([...filterSeats]);
                    const filterName = seatName.filter(nameFilter => nameFilter !== seat.name);
                    setSeatName([...filterName]);
                }
            }}>{seat.name}</LI>
        </>
    );
}

function Seats({ setTurnBack, turnBack }) {

    if(!turnBack) setTurnBack(true);

    const { idSessao } = useParams();
    const navigate = useNavigate();
    const [load, setLoad] = useState(true);
    const [seats, setSeats] = useState([]);
    const [day, setDay] = useState({});
    const [movie, setMovie] = useState({});
    const [hour, setHour] = useState('');
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [seatName, setSeatName] = useState([]);

    useEffect((() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`);

        promise.then(response => {
            setLoad(false);
            setDay(response.data.day);
            setMovie(response.data.movie);
            setHour(response.data.name);
            setSeats([...response.data.seats]);
        });
    }), []);

    function data(event){
        event.preventDefault();

        let CPF = cpf.split(/[.-]+/);
        CPF = CPF.join('');
        const ids = [...selectedSeats];

        const body = {
            ids,
            name,
            CPF
        }

        const promise = axios.post('https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many', body);
    
        promise.then(() => {
            navigate('/sucesso', { state: { movie: movie.title, day: day.weekday, hour: hour, seats:[...seatName], name: name, cpf: cpf } });
        });
    }

    return (
        <Container>
            <TextH2>Selecione o(s) assento(s)</TextH2>
            {load ? <Loading /> : 
            <UL>
                {seats.map((seat, index) => <Seat key={index} seatName={seatName} setSeatName={setSeatName} index={index} selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} seat={seat} />)}
            </UL>}
            <ULlegenda>
                <DivLegenda>
                    <LIlegenda livre={true} selecionado={true}></LIlegenda >
                    <TextH3>Selecionado</TextH3>
                </DivLegenda>
                <DivLegenda>
                    <LIlegenda livre={true} selecionado={false}></LIlegenda>
                    <TextH3>Disponível</TextH3>
                </DivLegenda>
                <DivLegenda>
                    <LIlegenda livre={false} selecionado={false}></LIlegenda>
                    <TextH3>Indisponível</TextH3>
                </DivLegenda>
            </ULlegenda>
            <form onSubmit={data}>
                <label htmlFor="comprador">Nome do comprador:</label>
                <input id="comprador" value={name} type="text" maxLength={'30'} minLength={'3'} onChange={(event) => setName(event.target.value)} placeholder="Digite seu nome..." required/>
                <label htmlFor="cpf">CPF do comprador:</label>
                <input id="cpf" value={cpf} type="text" pattern="\d{3}\.?\d{3}\.?\d{3}-?\d{2}" onChange={(event) => setCpf(event.target.value)} placeholder="Digite seu CPF..." required/>
                <DivButton>
                    <button type="submit">Reservar assento(s)</button>
                </DivButton>
            </form>
            <Footer day={day} movie={movie} hour={hour} />
        </Container>
    );
}

export default Seats;

const TextH2 = styled.h2`
    font-size: 24px;
    color: #293845;
    letter-spacing: 0.04em;

    margin-top: 107px;
    margin-bottom: 18px;

    text-align: center;
`;

const TextH3 = styled.h3`
    font-size: 13px;
    color: #4E5A65;
    letter-spacing: -0.013em;
`;

const UL = styled.ul`
    margin: 0 24px;

    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;

const LI = styled.li`
    background-color: ${props => {
        if (props.livre && !props.selecionado) return '#C3CFD9';
        else if (props.selecionado) return '#8DD7CF';
        else if (!props.selecionado && !props.livre) return '#FBE192'
    }};
    border: 1px solid ${props => {
        if (props.livre && !props.selecionado) return '#808F9D';
        else if (props.selecionado) return '#1AAE9E';
        else if (!props.selecionado && !props.livre) return '#F7C52B'
    }};
    border-radius: 12px;
    cursor: pointer;
    
    width: 26px;
    height: 26px;
    margin: 10px 4px;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 11px;
    color: #000000;
`;

const ULlegenda = styled(UL)`
    justify-content: center;
`;

const DivLegenda = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const LIlegenda = styled(LI)`
    cursor: none;
    margin: 10px 40px;
`;

const Container = styled.div`
    form {
        margin: 0 24px;
        margin-top: 38px;
        margin-bottom: 150px;

        display: flex;
        flex-direction: column;

        label {
            font-size: 18px;
            color: #293845;
        }

        input {
            background-color: #FFFFFF;
            outline: none;
            border: 1px solid #D5D5D5;
            border-radius: 3px;

            height: 50px;
            padding: 0 13px;
            margin-top: 4px;
            margin-bottom: 18px;

            font-size: 18px;
            
            &::placeholder {
                color: #AFAFAF;
                font-style: italic;
            }
        }

        button {
            background-color: #E8833A;
            border-radius: 3px;
            border: none;
            cursor: pointer;
            
            width: 225px;
            height: 42px;
            margin-top: 10px;

            font-size: 18px;
            color: #FFFFFF;
        }
    }
`;

const DivButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;