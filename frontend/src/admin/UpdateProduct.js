import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import {
    getCategories,
    getProduct,
    updateProduct
} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const UpdateProduct = ({ match }) => {
    const { user, token } = isAuthenticated();

    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        photo: "",
        categories: [],
        category: "",
        loading: false,
        error: "",
        updatedProduct: "",
        getaRedirect: false,
        formData: ""
    });

    const {
        name,
        description,
        price,
        stock,
        categories,
        category,
        loading,
        error,
        updatedProduct,
        getaRedirect,
        formData
    } = values;

    const preload = productId => {
        getProduct(productId).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                preloadCategories();
                setValues({
                    ...values,
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    category: data.category._id,
                    stock: data.stock,
                    formData: new FormData()
                });
            }
        });
    };

    const preloadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    categories: data,
                    formData: new FormData()
                });
            }
        });
    };

    useEffect(() => {
        preload(match.params.productId);
    }, []);

    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });

        updateProduct(match.params.productId, user._id, token, formData).then(
            data => {
                if (data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    setValues({
                        ...values,
                        name: "",
                        description: "",
                        price: "",
                        photo: "",
                        stock: "",
                        loading: false,
                        updatedProduct: data.name
                    });
                }
            }
        );
    };

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const successMessage = () => (
        <div
            className="alert alert-success mt-3"
            style={{ display: updatedProduct ? "" : "none" }}
        >
            <h4>{updatedProduct} updated successfully</h4>
        </div>
    );

    const errorMessage = () => (
        <div
            className="alert alert-danger mt-3"
            style={{ display: error ? "" : "none" }}
        >
            <h4>Failed to update product</h4>
        </div>
    );

    const updateProductForm = () => (
        <form>
            <Link to="/admin/dashboard" className="mt-3 mb-3 btn btn-sm btn-success rounded">
                Admin Home
            </Link>
            <div className="form-group">
                <label className="btn rounded btn-block btn-outline-success">
                    <input
                        onChange={handleChange("photo")}
                        type="file"
                        name="photo"
                        accept="image"
                        placeholder="choose a file"
                    />
                </label>
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange("name")}
                    name="photo"
                    className="form-control"
                    placeholder="Name"
                    value={name}
                />
            </div>
            <div className="form-group">
                <textarea
                    onChange={handleChange("description")}
                    name="photo"
                    className="form-control"
                    placeholder="Description"
                    value={description}
                />
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange("price")}
                    type="number"
                    className="form-control"
                    placeholder="Price"
                    value={price}
                />
            </div>
            <div className="form-group">
                <select
                    onChange={handleChange("category")}
                    className="form-control"
                    placeholder="Category"
                >
                    <option>Select</option>
                    {categories &&
                        categories.map((cate, index) => (
                            <option key={index} value={cate._id}>
                                {cate.name}
                            </option>
                        ))}
                </select>
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange("stock")}
                    type="number"
                    className="form-control"
                    placeholder="Stock"
                    value={stock}
                />
            </div>

            <button
                type="submit"
                onClick={onSubmit}
                className="btn rounded btn-outline-success mb-3"
            >
                Update Product
            </button>
        </form>
    );

    return (
        <Base
            title="Update products here"
            description="Update existing products"
            className="container bg-info p-4"
        >

            <div className="row bg-white rounded rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {errorMessage()}
                    {updateProductForm()}
                </div>
            </div>
        </Base>
    );
};

export default UpdateProduct;
