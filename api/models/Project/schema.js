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
    required: true,
    lowercase: true,
    trim: true
  },
  repository: {
    type: String,
    required: true
  },
  relatedSkills: [
    {
      type: Schema.Types.ObjectId,
      ref: "Skill"
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

const Project = mongoose.model("Project", schema);

export default Project;
