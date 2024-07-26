import { Response } from "express";
import * as yup from "yup";
import { Candidate } from "../model/candidate.model";
import { printLog } from "../utils/loggers";
import APIResponse from "../utils/APIResponse";
import { handleValidationError } from "../utils/yupValidError";
import { candidateValidation } from "../config/validation/candidate.validation";

export const candidateSave = async (req: any, res: Response) => {
  try {
    const data = await candidateValidation.validate(req.body, {
      abortEarly: false,
    });
    const electedByWhom = req.user.id;

    const newCandidate = new Candidate({
      ...data,
      electedByWhom,
    });
    const response = await newCandidate.save();

    printLog("user saved succesfully", false, true, {
      mobileNumber: response.mobileNumber,
    });
    return res
      .status(200)
      .json(APIResponse.success({}, "candidate saved in DB"));
  } catch (error: any) {
    printLog("something went wrong, while saving candidate", error, false, {
      mobileNumber: req?.body?.mobileNUmber,
    });
    if (error instanceof yup.ValidationError) {
      return handleValidationError(res, error, 400);
    } else {
      res
        .status(500)
        .json(
          APIResponse.error(
            "something went wrong, while saving candidate",
            error.message
          )
        );
    }
  }
};

export const candidateUpdate = async (req: any, res: Response) => {
  try {
    const candidateID = req?.params?.candidateID;
    const updatedCandidateData = req?.body;

    const response = await Candidate.findByIdAndUpdate(
      candidateID,
      updatedCandidateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!response) {
      return res
        .status(404)
        .json(APIResponse.error("candidate not found", null));
    }
    printLog("candidate updated succesfully", false, true, {
      userName: response.name,
    });
    return res
      .status(200)
      .json(APIResponse.success({ response }, "candidate updated"));
  } catch (error: any) {
    printLog(
      "something went wrong, while updating candidate",
      error,
      false,
      null
    );
    if (error instanceof yup.ValidationError) {
      return handleValidationError(res, error, 400);
    } else {
      res
        .status(500)
        .json(
          APIResponse.error(
            "something went wrong, while updating candidate",
            error.message
          )
        );
    }
  }
};

export const deleteCandidate = async (req: any, res: Response) => {
  try {
    const candidateID = req.params.candidateID;

    const response = await Candidate.findByIdAndDelete(candidateID);

    if (!response) {
      return res
        .status(404)
        .json(APIResponse.error("candidate not found", null));
    }

    printLog("candidate deleted succesfully", false, true, {
      userName: response.name,
    });
    return res
      .status(200)
      .json(APIResponse.success({ response }, "candidate deleted"));
  } catch (error: any) {
    printLog(
      "something went wrong, while deleting candidate",
      error,
      false,
      null
    );
    if (error instanceof yup.ValidationError) {
      return handleValidationError(res, error, 400);
    } else {
      res
        .status(500)
        .json(
          APIResponse.error(
            "something went wrong, while deleting candidate",
            error.message
          )
        );
    }
  }
};

// export const startVoting = async (req: any, res: Response) => {
//   const candidateID = req.params.candidateID;
//   const userId = req.user.id;

//   try {
//     const candidate = await Candidate.findById(candidateID);
//     if (!candidate) {
//       return res
//         .status(404)
//         .json(APIResponse.error("candidate not found", null));
//     }

//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json(APIResponse.error("user not found", null));
//     }
//     if (user.role == "admin") {
//       return res
//         .status(404)
//         .json(APIResponse.error("admin is  not allowed", null));
//     }
//     if (user.isVoted) {
//       return res
//         .status(400)
//         .json(APIResponse.error("you have already voted", null));
//     }

//     // candidate.votes.push({});
//     // Update the Candidate document to record the vote
//     // candidate.votes.push({ user: userId });
//     // candidate.voteCount++;
//     // await candidate.save();

//     // update the user document
//     user.isVoted = true;
//     await user.save();

//     printLog("vote recorded succesfully", false, true, {
//       userName: user.name,
//     });
//     return res
//       .status(200)
//       .json(APIResponse.success({}, "vote recorded succesfully"));
//   } catch (error: any) {
//     printLog(
//       "something went wrong, while deleting candidate",
//       error,
//       false,
//       null
//     );
//     if (error instanceof yup.ValidationError) {
//       return handleValidationError(res, error, 400);
//     } else {
//       res
//         .status(500)
//         .json(
//           APIResponse.error(
//             "something went wrong, while deleting candidate",
//             error.message
//           )
//         );
//     }
//   }
// };
