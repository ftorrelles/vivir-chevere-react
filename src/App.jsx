import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Purchases from "./pages/Purchases";
import ProductsDetail from "./pages/ProductsDetail";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import Loader from "./components/Loader";
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
                        <Route
                            path="/products/:id"
                            element={<ProductsDetail />}
                        />
                        <Route path="/login" element={<Login />} />
                        <Route element={<ProtectedRoutes />}>
                            <Route path="/purchases" element={<Purchases />} />
                        </Route>
                    </Routes>
                </Container>
            </div>
        </HashRouter>
    );
}

export default App;
