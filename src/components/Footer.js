import styled from "styled-components";

function Footer({ movie }) {
    return(
        <DivFooter>
            <img src={movie.posterURL} alt="" />
            <h4>{movie.title}</h4>
        </DivFooter>
    );
}

export default Footer;

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