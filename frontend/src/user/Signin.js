import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth/helper";

//Signin Logic
const Signin = () => {

    // State variables
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        didRedirect: false
    });

    //Desctructuring the values from state
    const { email, password, error, loading, didRedirect } = values;

    //Destructuring the user and token from isAuthenticated
    const { user } = isAuthenticated();

    // Higher order function
    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    // OnSubmit function
    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false });
                } else {
                    authenticate(data, () => {
                        setValues({
                            ...values,
                            didRedirect: true
                        });
                    });
                }
            })
            .catch(() => {
                console.log("Signin request failed");
            });
    };

    //Perform Redirect
    const performRedirect = () => {
        if (didRedirect) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />;
            } else {
                return <Redirect to="/user/dashboard" />;
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />
        }
    };

    //Signin Form
    const signInForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input onChange={handleChange("email")}
                                vakue={email} className="form-control" type="email" placeholder="elliotalderson@protonmail.ch" />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input onChange={handleChange("password")}
                                value={password} className="form-control" type="password" placeholder="********" />
                        </div>
                        <button onClick={onSubmit} className="btn btn-success rounded btn-block">Submit</button>
                    </form>
                </div>
            </div>
        );
    };
    // Loading Message
    const loadingMessage = () => {
        return (
            loading && (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
            )
        );
    };

    // Error Message
    const errorMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-danger" style={{
                        display: error ? "" : "none"
                    }}>
                        {error}
                    </div>
                </div>
            </div>
        )
    };

    //Return
    return (
        <Base title="Sign in" description="A page for user to sign in!">
            {loadingMessage()}
            {errorMessage()}
            {signInForm()}
            {performRedirect()}
        </Base>
    )
};

export default Signin;