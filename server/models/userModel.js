const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
mongoose.promise = Promise;

const userSchema = new Schema(
  {
    username: { type: String, unique: true, trim: true },
    password: { type: String, unique: false, minlength: 7 },
    userEmail: { type: String, unique: true },
  },
  {
    timestamps: true,
  }
);

// Define schema methods
userSchema.methods = {
  checkPassword: function (inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
  },
  // it hashes the password
  hashPassword: (plainTextPassword) => {
    // the second parameter is the salt length to generate
    return bcrypt.hashSync(plainTextPassword, 10);
  },
};

// Define hooks for pre-saving
userSchema.pre('save', function (next) {
  if (!this.password) {
    console.log('models/user.js =======NO PASSWORD PROVIDED=======');
    next();
  } else {
    console.log('models/user.js hashPassword in pre save');

    this.password = this.hashPassword(this.password);
    // so the next() function is needed to move on to the next middleware method
    next();
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
