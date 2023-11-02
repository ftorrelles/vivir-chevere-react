import React from "react";
import ContentHome from "../components/ContentHome";
import AboutText from "../components/AboutText";
import SocialInnovation from "../components/SocialInnovation";
import PhotoGallery from "../components/PhotoGallery";
import Gift from "../components/Gift";
import Footer from "../components/Footer";

const Home = () => {
    return (
        <>
            <ContentHome></ContentHome>
            <AboutText></AboutText>
            <SocialInnovation></SocialInnovation>
            <PhotoGallery></PhotoGallery>
            <Gift></Gift>
            <Footer></Footer>
        </>
    );
};

export default Home;
