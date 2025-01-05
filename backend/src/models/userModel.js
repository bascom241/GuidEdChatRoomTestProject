import mongoose from "mongoose";

import validator from 'validator';
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return validator.isEmail(v)
            },
            message: function (props) {
                return `${props.value} is not a valid email address`;
            }
        },
        unique: true

    },
    password: {
        type: String,
        required: true,
        minLength: 5,
    },
    profile:{
        type:String,
        default:""
    },
    lastLogin:{
        type:Date,
        default:Date.now()
    }
})

const User = mongoose.model('User', userSchema);
export default User;