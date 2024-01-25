import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

export interface UserType {
  _id: string;
  email: string;
  password: string | undefined;
  passwordConfirm: string | undefined;
  firstName: string;
  avatar: string;
  lastName: string;
  role?: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: [validator.isEmail, "Please provide valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      min: 8,
      max: 60,
      select: false,
    },

    passwordConfirm: {
      type: String,
      required: [true, "Password Confirm is required"],
      select: false,
    },

    avatar: {
      type: String,
      default: "https://ca.slack-edge.com/T0266FRGM-U2Q173U05-g863c2a865d7-512",
    },
    firstName: {
      type: String,
      required: [true, "First Name is required"],
      min: 3,
      max: 60,
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
      min: 1,
      max: 60,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = await bcrypt.hash(this.passwordConfirm, 12);
  }
  next();
});

//Checking encrypted password and password from user login
userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model<UserType>("User", userSchema);

export default User;
