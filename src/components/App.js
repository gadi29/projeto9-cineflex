import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./Header";
import Initial from "./Initial";
import Session from "./Session";
import Seats from "./Seats";
import Success from "./Success";

function App() {
  
  const [turnBack, setTurnBack] = useState(false);
  
  return (
    <BrowserRouter>
      <Header turnBack={turnBack} />
      <Routes>
        <Route path={"/"} element={<Initial turnBack={turnBack} setTurnBack={setTurnBack} />}/>
        <Route path={"/sessoes/:idFilme"} element={<Session turnBack={turnBack} setTurnBack={setTurnBack} />}/>
        <Route path={"/assentos/:idSessao"} element={<Seats turnBack={turnBack} setTurnBack={setTurnBack} />}/>
        <Route path={"/sucesso"} element={<Success turnBack={turnBack} setTurnBack={setTurnBack} />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;