import styled from "styled-components";

function Footer({ movie, day, hour }) {
    return(
        <Div>
            <img src={movie.posterURL} alt="" />
            <Texts>
                <h4>{movie.title}</h4>
                <h4>{day.weekday} - {hour}</h4>
            </Texts>
            
        </Div>
    );
}

export default Footer;

const Div = styled.div`
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
`;

const Texts = styled.div`
  display: flex;
  flex-direction: column;
  
  h4 {
        font-size: 22px;
        color: #293845;

        margin-top: 3px;
    }
`;