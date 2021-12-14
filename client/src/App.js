import "./App.css";
import HomePage from "./pages/home.page";
import LoginPage from "./pages/login.page";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RoleProvider } from "./context";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterLuxon";
import HelpPage from "./pages/help.page";

function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <RoleProvider>
                <div className="App">
                    <BrowserRouter>
                        <Routes>
                            <Route path="/login" element={<LoginPage/>} />
                            <Route path="/" element={<HomePage/>} />
                            <Route path='/help' element={<HelpPage />}></Route>
                        </Routes>
                    </BrowserRouter>
                </div>
            </RoleProvider>
        </LocalizationProvider>
    );
}

export default App;
