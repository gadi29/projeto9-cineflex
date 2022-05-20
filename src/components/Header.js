import styled from "styled-components";

function Header () {
    return (
        <HeaderDiv>
            <h1>CINEFLEX</h1>
        </HeaderDiv>
    );
}

const HeaderDiv = styled.div`
    background-color: #C3CFD9;

    width: 100%;
    height: 67px;

    display: flex;
    align-items: center;
    justify-content: center;

    h1 {
        color: #E8833A;
        font-size: 34px;
    }
`;

export default Header;