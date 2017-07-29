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
  description: { type: String, required: true, lowercase: true, trim: true },
  relatedSkills: [{ type: Schema.Types.ObjectId, ref: "Skill" }]
});

const Skill = mongoose.model("Skill", schema);

export default Skill;
