import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import checkmark from "./../assets/checkmark.jpg";
import timesmark from "../assets/timesmark.png";

import { useSelector, useDispatch } from "react-redux";

import { verifyEmailCodeThunk } from "../store/slices/statusEmailCode.slice";

const VerifyCode = () => {
    const { code } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(verifyEmailCodeThunk(code)); // Pasar el código al thunk
    }, [dispatch, code]);

    const verificationStatus = useSelector((state) => state.statusEmailCode);
    // console.log(verificationStatus);
    return (
        <div>
            {verificationStatus === "Success" ? (
                <div>
                    <img
                        src={checkmark}
                        alt=""
                        style={{
                            width: 200,
                            display: "block",
                            margin: "0 auto",
                        }}
                    />
                    <h4 className="my-4">
                        Tu email fue verificado exitosamente!!! ahora puedes
                        iniciar sesión en tu tienda virtual
                    </h4>
                    <p>
                        Ir al <Link to="/login"> Inicio de sesión</Link>
                    </p>
                </div>
            ) : (
                <div>
                    <img
                        src={timesmark}
                        alt=""
                        style={{
                            width: 200,
                            display: "block",
                            margin: "0 auto",
                        }}
                    />
                    <h4 className="my-4">Codigo no encontrado o ya usado :(</h4>
                </div>
            )}
        </div>
    );
};

export default VerifyCode;
