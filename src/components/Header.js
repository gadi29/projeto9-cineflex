import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Header ({ turnBack }) {
    const navigate = useNavigate();

    return (
        <HeaderDiv>
            <Div>
                { turnBack ? <ion-icon onClick={() => navigate(-1)} name="arrow-back-outline"></ion-icon> : <></>}
                <div>
                    <h1>CINEFLEX</h1>
                </div>
            </Div>
        </HeaderDiv>
    );
}

const HeaderDiv = styled.div`
    width: 100%;
    
    position: fixed;
    top: 0;
    left: 0;
`;

const Div = styled.div`
    background-color: #C3CFD9;

    width: 100%;
    height: 67px;

    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    ion-icon {
        font-size: 22px;
        color: #E8833A;
        cursor: pointer;
        
        margin-left: 22px;
        
        position: absolute;
        left: 0;
    }

    div {
        display: flex;
        justify-content: center;

        h1 {
            color: #E8833A;
            font-size: 34px;
        }
    }
`;

export default Header;