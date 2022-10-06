import React from "react";
import { API } from "../../backend";

const ImageHelper = ({ product }) => {
    const imageurl = product
        ? `${API}/product/photo/${product._id}`
        : `https://i.stack.imgur.com/6M513.png`;
    return (
        <div className="rounded border border-light pt-2">
            <img
                src={imageurl}
                style={{ maxHeight: "70%", maxWidth: "70%", objectFit: "cover" }}
                className="mb-3 rounded"
            />
        </div>
    );
};

export default ImageHelper;