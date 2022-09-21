import React from "react";
import { API } from "../../backend";

const ImageHelper = ({ product }) => {
    const imageurl = product
        ? `${API}/product/photo/${product._id}`
        : `https://i.stack.imgur.com/6M513.png`;
    return (
        <div className="rounded border border-light p-2">
            <img
                src={imageurl}
                alt="photo"
                style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "cover" }}
                className="mb-3 rounded"
            />
        </div>
    );
};

export default ImageHelper;