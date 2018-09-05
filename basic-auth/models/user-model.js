const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
userName: {type: String, required:true, unique:true, min: 1},
encryptedPassword: {type: String, required: true, unique: true, min: 1}
}, {
  timestamps: true,
});



const User = mongoose.model("User", userSchema);

module.exports = User;

