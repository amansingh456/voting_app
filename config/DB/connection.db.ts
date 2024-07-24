import mongoose from "mongoose";
import { printLog } from "../../utils/loggers";
import { mongoUrl } from "../../utils/globalVars";

const connectionMongo = async (): Promise<void | string> => {
  if (!mongoUrl) {
    printLog("not able to found mongo url", null, false, null);
  }
  try {
    await mongoose.connect(mongoUrl);
    printLog("successfully connected to mongoDB...!", null, true, null);
  } catch (error: any) {
    printLog("failed to connect DB", error, false, null);
    throw error;
  }
};

export default connectionMongo;
