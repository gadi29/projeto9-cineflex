import { Link } from "react-router-dom";
import styled from 'styled-components';
import { useLocation } from "react-router-dom";
 
function Success({ setTurnBack, turnBack }) {

    if(!turnBack) setTurnBack(true);

    const { state } = useLocation();

    const seats = [...state.seats];
    const seats1 = seats.map(seat=>Number(seat));
    seats1.sort((x, y) => x - y);
    
    let CPF = state.cpf.split(/[.-]+/);
    CPF = CPF.join('');
    let CPFfinal = CPF.match(/.{1,3}/g).join(".").replace(/\.(?=[^.]*$)/,"-");

    return (
        <>
            <TextH2>Pedido feito com sucesso!</TextH2>
            <TextH3>Filme e sessão</TextH3>
            <TextH4>{state.movie}</TextH4>
            <TextH4>{state.day} - {state.hour}</TextH4>
            <TextH3>Ingressos</TextH3>
            {seats1.map((seat, index)=> <TextH4 key={index}>Assento {seat}</TextH4>)}
            <TextH3>Comprador</TextH3>
            <TextH4>Nome: {state.name}</TextH4>
            <TextH4>CPF: {CPFfinal}</TextH4>
            <Div>
                <Link to={'/'}>
                    <button>Voltar para Home</button>
                </Link>
            </Div>
        </>
    );
}

export default Success;

const TextH2 = styled.h2`
    font-size: 24px;
    font-weight: 700;
    color: #247A6B;
    letter-spacing: 0.04em;

    margin: 0 100px;
    margin-top: 112px;

    text-align: center;
`;

const TextH3 = styled(TextH2)`
    color: #293845;

    margin: 0 30px;
    margin-top: 53px;
    margin-bottom: 8px;
    text-align: left;
`;

const TextH4 = styled.h4`
    font-size: 24px;
    color: #293845;
    letter-spacing: 0.04em;

    margin: 0 30px;
    margin-top: 5px;
`;

const Div = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    button {
        background-color: #E8833A;
        border-radius: 3px;
        border: none;
        cursor: pointer;
                
        width: 225px;
        height: 42px;
        margin-top: 65px;
        margin-bottom: 40px;

        font-size: 18px;
        color: #FFFFFF;
    }
`;