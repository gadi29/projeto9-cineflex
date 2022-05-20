import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Initial from "./Initial";
import Session from "./Session";
import Seats from "./Seats";
import Success from "./Success";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={"/"} element={<Initial />}/>
        <Route path={"/sessoes/:idFilme"} element={<Session />}/>
        <Route path={"/assentos/:idSessao"} element={<Seats />}/>
        <Route path={"/sucesso"} element={<Success />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;