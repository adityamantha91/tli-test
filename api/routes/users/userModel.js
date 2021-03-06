'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const userSchema = exports.schema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        index: true,
        unique: true,
        required: true,
    },
    username: {
        type: String,
        index: true,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
    },
    firstSignIn: {
        type: Boolean,
        required: true,
    },
});

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified || user.isNew) {
        try {
            const hash = await bcrypt.hash(user.password, 10);
            user.password = hash;
            return next();
        } catch (e) {
            return next(e);
        }
    } else {
        return next();
    }
});

userSchema.method('comparePassword', function (password) {
    return bcrypt.compare(password, this.password);
});

exports.model = mongoose.model('Users', userSchema);