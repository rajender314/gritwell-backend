import express from "express";
import * as bodyParser from "body-parser";
import { requestLoggerMiddleware } from "./request.logger.middleware";
import { RestRouter } from "@basePath/RestRouter";
import cors from "cors";
var useragent = require('express-useragent');
import { Logger } from "@src/rapidium-core/src/Helpers/Logger";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
   // this.app.use(cors({ credentials: true, origin: 'https://www.stage-web.grit-well.com' }));
   var allowedOrigins = ['https://www.stage-web.grit-well.com',
    'https://www.staging-app.grit-well.com','https://www.staging-provider.grit-well.com'];
    this.app.use(cors({credentials: true,
      origin: function (origin, callback) {
        // allow requests with no origin 
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
          var msg = 'The CORS policy for this site does not ' +
            'allow access from the specified Origin.';
          return callback(new Error(msg), false);
        }
        return callback(null, true);
      }
    }));
    this.app.disable("x-powered-by");
    this.app.use(useragent.express());
    this.app.use(bodyParser.urlencoded({ extended: false }));

    this.app.use(
      express.json({
        verify: this.verify,
      })
    );
    this.app.use(bodyParser.json({ limit: "10mb" }));
    this.app.use(express.static('uploads'));
    this.app.use('/uploads/logos', express.static('uploads/logos'));
    this.app.use('/uploads/profiles', express.static('uploads/profiles'));
    this.app.use('/uploads/recommendations', express.static('uploads/recommendations'));
    this.app.use('/uploads/faqs', express.static('uploads/faqs'));
    this.app.use('/uploads/pdfs', express.static('uploads/pdfs'));
    this.app.use(requestLoggerMiddleware);
    this.app.use("/", RestRouter);
    this.app.use("/" + process.env.imagepath, express.static("profileimages"));
    this.app.disable("x-powered-by");
    //res.setHeader("X-Powered-By", "Gritwell");
  }

  public verify(req, res, buf, encoding) {
    req.rawBody = buf.toString();
    //console.log(typeof buf.toString());
    try {
      JSON.parse(buf.toString());
    } catch (e: any) {
      e.ipAddress = req.connection.remoteAddress
        ? req.connection.remoteAddress
        : "127.0.0.1";
      Logger.saveLog(e);
      if (e instanceof SyntaxError) {
        res.send({ error: "Syntax Error", status_code: "404" });
      } else {
        res.send({ error: "Invalid Inputs", status_code: "404" });
      }
    }
  }

  public customHeaders(req: any, res: any, next: any) {
    // Switch off the default 'X-Powered-By: Express' header
    this.app.disable("x-powered-by");

    // OR set your own header here

    next();
  }
}
export default new App().app;

