import axios from "axios";

const getVerificationStatus = (code) => {
    return axios.get(`http://localhost:3000/api/v1/customers/verify/${code}`);
};

export default getVerificationStatus;
