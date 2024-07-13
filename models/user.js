const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');
const bcrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salt: { type: String },
  otp: String,
  otpExpiration: Date,
 // name: String,
  //bio: String,
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    this.salt = salt;
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
