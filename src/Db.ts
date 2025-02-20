import  mongoose from "mongoose";
import  dotenv from "dotenv";
dotenv.config();

const MONGO_URI:any = process.env["MONGO_LOCAL_CONN_URL"];

const dbConnection = () => {
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  mongoose.connection.on("open", () => {
    console.log("connected to mongo");
  });
  mongoose.connection.on("error", (err: any) => {
    console.log(err);
  });
};

export { dbConnection };
