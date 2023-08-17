import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Searcher from "./pages/Searcher";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import Loader from "./components/Loader";
import VerifyCode from "./components/VerifyCode";
import { useSelector, useDispatch } from "react-redux";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useEffect } from "react";
import { setloggedUser } from "./store/slices/loggedUser.slice";

function App() {
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.isLoading);
    ///guardar informacion del usuario logueado si se recarga la pagina
    useEffect(() => {
        // Verificar si hay información de usuario logueado en localStorage
        const storedLoggedUser = localStorage.getItem("loggedUser");
        if (storedLoggedUser) {
            const parsedLoggedUser = JSON.parse(storedLoggedUser);
            dispatch(setloggedUser(parsedLoggedUser));
        }
    }, [dispatch]);
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
