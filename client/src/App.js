import "./App.css";
import HomePage from "./pages/home.page";
import LoginPage from "./pages/login.page";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RoleProvider } from "./context";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterLuxon";
import { useState } from "react";

function App() {
    const chickenmuttonfn = (num) => {
      console.log('chickenmuttonfn'+num)
    }
    const [c, setC] = useState('')
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <RoleProvider>
                <div className="App">
                    <BrowserRouter>
                        <Routes>
                            <Route path="/login" element={<LoginPage setC={setC}/>} />
                            <Route path="/" element={<HomePage chickenmutton={chickenmuttonfn} setC={setC} c={c}/>} />
                        </Routes>
                    </BrowserRouter>
                </div>
            </RoleProvider>
        </LocalizationProvider>
    );
}

export default App;
