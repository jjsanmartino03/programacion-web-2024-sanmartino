// mongoose model for User
// fields: email, photo (nullable), password

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
});

export {UserSchema}