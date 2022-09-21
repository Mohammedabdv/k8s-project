import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";

const currentTab = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#2ecc72" }
    }
    else {
        return { color: "#fff" }
    }
}

const Menu = ({ history }) => (
    <div>
        <ul className="nav nav-tabs bg-#343a40">
            <li className="nav-item">
                <Link style={currentTab(history, "/")} className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link style={currentTab(history, "/cart")} className="nav-link" to="/cart">Cart</Link>
            </li>
            {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li className="nav-item">
                    <Link className="nav-link" style={currentTab(history, "/user/dashboard")} to="/user/dashboard">Dashboard</Link>
                </li>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className="nav-item">
                    <Link className="nav-link" style={currentTab(history, "/admin/dashboard")} to="/admin/dashboard">Dashboard</Link>
                </li>
            )}

            {!isAuthenticated() && (
                <Fragment>
                    <li className="nav-item">
                        <Link className="nav-link" style={currentTab(history, "/signup")} to="/signup">Sign up</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={currentTab(history, "/signin")} to="/signin">Sign in</Link>
                    </li>
                </Fragment>
            )}
            {isAuthenticated() && (
                <li className="nav-item">
                    <span className="nav-link text-warning" onClick=
                        {
                            () => {
                                signout(() => {
                                    history.push("/")
                                });
                            }
                        }>Sign out</span>
                </li>
            )}
        </ul>
    </div>
);


export default withRouter(Menu);