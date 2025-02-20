import app from "./App";
import * as http from "http";
import { dbConnection } from "./Db";
const scheduledFunctions = require('./cron');
const PORT = process.env.PORT || 3001;
const server = http.createServer(app);
scheduledFunctions.initScheduledJobs();
server.listen(PORT);
server.on("listening", () => {
  console.log(`listening on port ${PORT}`);
  dbConnection();
});
process.on('uncaughtException', function (err) {
  console.log(13, err);
  process.exit(0);
})
process.on('unhandledRejection', (error, promise) => {
  console.log(17, error);
  process.exit(0);
});