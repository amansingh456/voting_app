import express, { Application, Request, Response } from "express";
import { portNumber } from "./utils/globalVars";
import bodyParser from "body-parser";
import { printLog } from "./utils/loggers";

const App: Application = express();
App.use(bodyParser.json());

const startServer = async (portNumber: number) => {
  try {
    App.listen(portNumber, () => {
      printLog(`server started on port ${portNumber}`, null, true, null);
    });
  } catch (error: unknown) {
    printLog("error while listing server", error, false, null);
    process.exit(1);
  }
};

startServer(portNumber);
