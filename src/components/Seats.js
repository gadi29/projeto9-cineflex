import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Footer from "./Footer";

function Seat({ seat, setSelectedSeats, selectedSeats }) {
    const [selecionado, setSelecionado] = useState(false);

    return (
        <>
            <LI livre={seat.isAvailable} selecionado={selecionado} onClick={() => {
                if(!seat.isAvailable) alert('Esse assento não está disponível!');
                else if (seat.isAvailable && !selecionado) {
                    setSelecionado(true);
                    setSelectedSeats([...selectedSeats, seat.name]);
                } else if (selecionado) {
                    setSelecionado(false);
                    const filterSeats = selectedSeats.filter(seatFilter => seatFilter !== seat.name);
                    setSelectedSeats([...filterSeats]);
                }
            }}>{seat.name}</LI>
        </>
    );
}

function Seats() {

    const { idSessao } = useParams();
    const [seats, setSeats] = useState([]);
    const [day, setDay] = useState({});
    const [movie, setMovie] = useState({});
    const [hour, setHour] = useState('');
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [selectedSeats, setSelectedSeats] = useState([]);

    useEffect((() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`);

        promise.then(response => {
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

        axios.post('https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many', body);
    }

    return (
        <>
            <TextH2>Selecione o(s) assento(s)</TextH2>
            <UL>
                {seats.map(seat => <Seat selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} seat={seat} />)}
            </UL>
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
            <Form onSubmit={data}>
                <DivForms>
                    <Label htmlFor="comprador">Nome do comprador:</Label>
                    <Input id="comprador" value={name} type="text" onChange={(event) => setName(event.target.value)} placeholder="Digite seu nome..." required />
                </DivForms>
                <DivForms>
                    <Label htmlFor="cpf">CPF do comprador:</Label>
                    <Input id="cpf" value={cpf} type="text" pattern="\d{3}\.?\d{3}\.?\d{3}-?\d{2}" onChange={(event) => setCpf(event.target.value)} placeholder="Digite seu CPF..." required />
                </DivForms>
                <Link to={'/sucesso'}>
                    <Button type="submit">Reservar assento(s)</Button>
                </Link>
            </Form>
            <Footer day={day} movie={movie} hour={hour} />
        </>
    );
}

export default Seats;

const TextH2 = styled.h2`
    font-size: 24px;
    color: #293845;
    letter-spacing: 0.04em;

    margin-top: 40px;
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

const Form = styled.form`
    margin: 0 24px;
    margin-top: 38px;

    position: relative;
`;

const DivForms = styled.div`
    margin: 18px 0;
    
    display: flex;
    flex-direction: column;
`;

const Label = styled.label`
    font-size: 18px;
    color: #293845;
`;

const Input = styled.input`
    background-color: #FFFFFF;
    outline: none;
    border: 1px solid #D5D5D5;
    border-radius: 3px;

    height: 50px;
    padding: 0 13px;
    margin-top: 4px;

    font-size: 18px;
    
    &::placeholder {
        color: #AFAFAF;
        font-style: italic;
    }
`;

const Button = styled.button`
    background-color: #E8833A;
    border-radius: 3px;
    border: none;
    cursor: pointer;
    
    width: 225px;
    height: 42px;
    margin-top: 32px;

    position: absolute;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);

    font-size: 18px;
    color: #FFFFFF;
`;