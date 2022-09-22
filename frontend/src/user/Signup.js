import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

//Signup Logic
const Signup = () => {

    // State variables
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    });

    // Destructuring the values from state
    const { name, email, password, error, success } = values;

    // Higher order function
    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    // OnSubmit function
    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false });
                } else {
                    setValues({
                        ...values,
                        name: "",
                        email: "",
                        password: "",
                        error: "",
                        success: true
                    });
                }
            })
            .catch(() => {
                console.log("Signup request failed");
            });
    };

    //Signup Form
    const signUpForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input className="form-control rounded-1" type="text" placeholder="Elliot Alderson" onChange={handleChange("name")} value={name} />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input className="form-control rounded-1" type="email" placeholder=" elliotalderson@protonmail.ch" onChange={handleChange("email")} value={email} />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input className="form-control rounded-1" type="password" placeholder="********" onChange={handleChange("password")} value={password} />
                        </div>

                        <button onClick={onSubmit} className="btn btn-success btn-block rounded">Submit</button>
                    </form>
                </div>
            </div>

        );
    };

    // Success Message
    const successMessage = () => {
        if (success) {
            return (
                <div className="col-md-6 offset-sm-3  btn-lg mt-5 text-left">
                    <div
                        className="alert alert-success"
                    >New account was created successfully.
                        Please<Link to="/signin">Login Here</Link>
                    </div>
                </div>
            );
        }
    };

    // Error Message
    const errorMessage = () => {
        if (error) {
            return (
                <div className="col-md-6 mt-5 btn-lg offset-sm-3 text-left">
                    <div className="alert alert-danger">
                        {error}
                    </div>
                </div>
            )
        }
    };

    // Return
    return (
        <Base title="Sign up" description="A page for user to sign up!">
            {signUpForm()}
            {successMessage()}
            {errorMessage()}
        </Base>
    )
};

// Export
export default Signup;