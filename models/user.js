import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

const passwordValidOptions = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
};

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: [true, 'Account already exists.'],
    validate: [validator.isEmail, 'Please enter a valid email.'],
  },
  password: {
    type: String,
    required: [true, 'Please enter your email.'],
    validate: {
      validator: (value) =>
        validator.isStrongPassword(value, passwordValidOptions),
      message:
        'Password must contains at least one lowercase, uppercase, number and special character.',
    },
    select: false, //dont send back password after request
  },
  role: {
    type: String,
    default: 'user',
    enum: {
      values: ['user', 'admin'],
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// ENCRYPTION
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.models.User || mongoose.model('User', userSchema);
