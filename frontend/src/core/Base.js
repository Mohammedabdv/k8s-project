import React from "react";
import Menu from "./Menu";

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
            <div class="col-md-3 col-sm-3 col-xs-6">&nbsp;</div>
            <footer className="footer bg-dark mt-auto">
                <div className="container-fluid bg-success text-white text-center py-3">
                    <h4>If you got any questions, feel free to reach out!</h4>
                    <button className="btn btn-warning rounded btn-lg">Contact Us</button>
                </div>
                <div className="container">
                </div>
                <div className="container d-flex justify-content-center">
                    <span className="text-muted ">Created @ 2022 by <span className="text-white">Udatta Mukherjee</span></span>
                </div>
            </footer>
        </div>
    </div>
);

// Export
export default Base;