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
  actual: {
    type: Boolean,
    required: true
  },
  relatedSkills: [{ type: Schema.Types.ObjectId, ref: "Skill" }],
  user: { type: Schema.Types.ObjectId, ref: "User" }
});

const Work = mongoose.model("Work", schema);

export default Work;
