const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  skills: [{ type: String }], // Skills the user teaches
  skillsToLearn: [{ type: String }], // Skills the user wants to learn
  bio: { type: String }, // User's biography
  isActive: { type: Boolean, default: false }, // User activation status
  activationToken: { type: String }, // Token for email activation
  connections: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // List of connected users
  language: [{ type: String }],
  location: { type: String },
  pronouns: { type: String },
  position: { type: String },
  age: { type: Number },
  workplace: { type: String },
  avatar: { type: String }
});

module.exports = mongoose.model("User", userSchema);
