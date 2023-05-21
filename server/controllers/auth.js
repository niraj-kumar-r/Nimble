import bcrypt from "bcrypt";
// to encrypt passwords

import jwt from "jsonwebtoken";
// to give web token for authorisation
// authentication -> verifying the identity of a user or entity
// authorization -> it determines what a user is allowed to do after their identity has been authenticated

import User from "../models/User.js";

export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 1000),
            impressions: Math.floor(Math.random() * 1000),
            // we are using Math.random() to generate random numbers
            // for the above two fields because we are
            // not implementing thier functionality in this project as of now
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
