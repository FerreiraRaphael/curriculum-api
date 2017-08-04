import mongoose, { Schema } from "mongoose";

mongoose.Promise = global.Promise;

const schema = Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  }
});

const Tag = mongoose.model("Tag", schema);

export default Tag;
