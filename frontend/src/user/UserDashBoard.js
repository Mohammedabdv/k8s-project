import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";

const UserDashBoard = () => {

    const {
        user: { name, email }
    } = isAuthenticated();

    const userDetails = () => {
        return (
            <div className="card col-8 offset-2 text-center mb-4">
                <h4 className="card-header bg-dark text-white">User Information</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <span className="badge badge-success mr-2">Name:</span> {name}
                    </li>
                    <li className="list-group-item">
                        <span className="badge badge-success mr-2">Email:</span> {email}
                    </li>
                    <li className="list-group-item">
                        <span className="badge badge-danger">User Area</span>
                    </li>
                </ul>
            </div>
        );
    };

    return (
        <Base title="Welcome to the user area" description="This is where all the magic happens!" className="container bg-success p-4 rounded">
            <div className="row">
                {userDetails()}
            </div>
        </Base>
    );
}

export default UserDashBoard;