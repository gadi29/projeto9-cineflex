import styled from "styled-components";
import loading from "../assets/images/loading-gif.gif";

function Loading() {
    return(
        <Load><img src={loading} alt="" /></Load>
    );
}

export default Loading;

const Load = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    margin-top: 80px;

    img {
        width: 80%;
    }
`;