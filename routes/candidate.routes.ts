import { Router } from "express";
import {
  candidateSave,
  candidateUpdate,
  deleteCandidate,
} from "../controllers/candidate.controller";
import { authJwtMiddleware } from "../middleware/jwt.token.middleware";

const CandidateRouter: Router = Router();

CandidateRouter.post("/", authJwtMiddleware, candidateSave);
CandidateRouter.put("/:candidateID", authJwtMiddleware, candidateUpdate);
CandidateRouter.delete("/:candidateID", authJwtMiddleware, deleteCandidate);

export default CandidateRouter;
