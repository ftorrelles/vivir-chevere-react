import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Searcher from "./pages/Searcher";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import Loader from "./components/Loader";
import VerifyCode from "./components/VerifyCode";
import { useSelector } from "react-redux";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
    const isLoading = useSelector((state) => state.isLoading);
    return (
        <HashRouter>
            <div className="App">
                <NavBar />
                {isLoading && <Loader />}
                <Container className="my-5">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/verify_email/:code"
                            element={<VerifyCode />}
                        />
                        <Route element={<ProtectedRoutes />}>
                            <Route path="/searcher" element={<Searcher />} />
                        </Route>
                    </Routes>
                </Container>
            </div>
        </HashRouter>
    );
}

export default App;
