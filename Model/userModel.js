import mongoose from "mongoose";

const animeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
    required: true,
  }
});

// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  animes: {
    type: [animeSchema],
    required: false,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
