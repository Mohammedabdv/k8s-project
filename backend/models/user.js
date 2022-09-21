const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv4 = require('uuid/v4');

//----Documentation----
// https://mongoosejs.com/docs/guide.html
// https://www.npmjs.com/package/crypto
// https://www.npmjs.com/package/uuid

//----Schema----
let userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 32
        },
        lastName: {
            type: String,
            trim: true,
            maxlength: 32
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        userInfo: {
            type: String,
            trim: true,
        },
        encryptedPassword: {
            type: String,
            required: true,
        },
        salt: String,
        role: {
            type: Number,
            trim: true,
            default: 0
        },
        purchases: {
            type: Array,
            default: [],
        },
    },
    {
        timestamps: true
    }
);

//----Virtual Fields----

//Virtual field for password
userSchema.virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = uuidv4();
        this.encryptedPassword = this.securePassword(password);
    })
    .get(function () {
        return this._password;
    });

//----Methods----
userSchema.methods = {
    //Authenticate user
    authenticate: function (plainPassword) {
        return this.securePassword(plainPassword) === this.encryptedPassword;
    },
    //Encrypt password
    securePassword: function (plainPassword) {
        if (!plainPassword) return '';
        try {
            return crypto.createHmac('sha256', this.salt)
                .update(plainPassword)
                .digest('hex');
        } catch (err) {
            return '';
        }
    }
}

//----Export----
module.exports = mongoose.model('User', userSchema);