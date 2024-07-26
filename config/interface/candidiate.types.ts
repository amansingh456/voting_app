import mongoose from "mongoose";

export interface VoteI {
  userId: mongoose.Schema.Types.ObjectId;
  votedAt: Date;
}

export interface CandidateI extends Document {
  email: string;
  mobileNumber: string;
  name: string;
  age: number;
  party: string;
  votes: VoteI[];
  voteCount: Number;
  electedByWhom: string;
}
