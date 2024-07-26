import { Router } from "express";
import {
  candidateSave,
  candidateUpdate,
  deleteCandidate,
} from "../controllers/candidate.controller";
import { authJwtMiddleware } from "../middleware/jwt.token.middleware";
import { adminCheckMiddleware } from "../middleware/admin.check.middleware";

const CandidateRouter: Router = Router();

CandidateRouter.post(
  "/",
  authJwtMiddleware,
  adminCheckMiddleware,
  candidateSave
);
CandidateRouter.put(
  "/:candidateID",
  authJwtMiddleware,
  adminCheckMiddleware,
  candidateUpdate
);
CandidateRouter.delete(
  "/:candidateID",
  authJwtMiddleware,
  adminCheckMiddleware,
  deleteCandidate
);

export default CandidateRouter;
