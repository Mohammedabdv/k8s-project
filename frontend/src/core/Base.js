import React from "react";
import Menu from "./Menu";
import { AiFillGithub, AiFillLinkedin, AiFillTwitterCircle } from "react-icons/ai";

// Base Component
const Base = ({
    title = "My Title",
    description = "My description",
    className = "bg-dark text-white p-4",
    children
}) => (
    <div>
        <Menu />
        <div className="container-fluid">
            <div className="jumbotron text-white bg-dark text-center">
                <h2 className="display-4">{title}</h2>
                <p className="lead">{description}</p>
            </div>
            <div className={className}>{children}</div>
            <footer className="row footer bg-dark mt-5">
                <div className="container-fluid bg-success text-white text-center py-3">
                    <h4>If you got any questions, feel free to reach out!</h4>
                    <button className="btn btn-warning rounded btn-lg"><a href="mailto:udatta7980@gmail.com" className="text-white text-decoration-none">Contact Us</a></button>
                </div>
                <div className="container">
                </div>
                <div className="container-fluid text-center">
                    <span className="text-muted">Created @ 2022 by <span className="text-white mx-2">Udatta Mukherjee</span></span>
                    <a href="https://github.com/udattam" className="mx-2"><AiFillGithub color="white" /></a>
                    <a href="https://www.linkedin.com/in/udattam/" className="mx-2"><AiFillLinkedin color="white" /></a>
                    <a href="https://twitter.com/udattatweets" className="mx-2"><AiFillTwitterCircle color="white" /></a>
                </div>
            </footer>
        </div>
    </div>
);

// Export
export default Base;