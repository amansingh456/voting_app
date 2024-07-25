import mongoose, { Schema } from "mongoose";
import { CandidateI, VoteI } from "../config/interface/candidiate.types";

const VotesSchema: Schema = new Schema<VoteI>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  votedAt: { type: Date, required: true, default: Date.now() },
});

const CandidateSchema: Schema = new Schema<CandidateI>({
  email: { type: String },
  mobileNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  party: { type: String, required: true },
  votes: [VotesSchema],
  voteCount: { type: Number, default: 0 },
});

export const Candidate = mongoose.model<CandidateI>(
  "Candidate",
  CandidateSchema
);
