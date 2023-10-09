import "./App.css";
import { useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Searcher from "./pages/Searcher";
import Login from "./pages/Login";
import VerifyCode from "./pages/VerifyCode";
import PasswordRecoveryStep1 from "./pages/PasswordRecoveryStep1";
import PasswordRecoveryStep2 from "./pages/PasswordRecoveryStep2";
import Orders from "./pages/Orders";
import NavBar from "./components/NavBar";
import Loader from "./components/Loader";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Container from "react-bootstrap/Container";
import { useSelector, useDispatch } from "react-redux";
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

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/verify_email/:code"
                        element={<VerifyCode />}
                    />
                    <Route
                        path="/password_recovery"
                        element={<PasswordRecoveryStep1 />}
                    />
                    <Route
                        path="/reset_password/:code"
                        element={<PasswordRecoveryStep2 />}
                    />
                    <Route element={<ProtectedRoutes />}>
                        <Route path="/searcher" element={<Searcher />} />
                        <Route path="/orders" element={<Orders />} />
                    </Route>
                </Routes>
            </div>
        </HashRouter>
    );
}

export default App;

//className="my-5"
