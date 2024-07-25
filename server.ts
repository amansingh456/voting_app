import express, { Application, Request, Response } from "express";
import { portNumber } from "./utils/globalVars";
import bodyParser from "body-parser";
import { printLog } from "./utils/loggers";
import AuthRouter from "./routes/user.routes";
import APIResponse from "./utils/APIResponse";
import connectionMongo from "./config/DB/connection.db";
import CandidateRouter from "./routes/candidate.routes";

const App: Application = express();
App.use(bodyParser.json());

App.get("/", (req: Request, res: Response) => {
  res.status(200).json(APIResponse.success({}, "hello from voting app..! ❤️"));
});
App.use("/api/user", AuthRouter);
App.use("/api/candidate", CandidateRouter);

const startServer = async (portNumber: number) => {
  try {
    await connectionMongo();
    App.listen(portNumber, () => {
      printLog(`server started on port ${portNumber}`, null, true, null);
    });
  } catch (error: unknown) {
    printLog("error while listing server", error, false, null);
    process.exit(1);
  }
};
startServer(portNumber);
