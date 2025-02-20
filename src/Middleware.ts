import { CommandFactory } from "../src/rapidium-core/src/Base/Commands/CommandFactory";
import * as jwt from "jsonwebtoken";
import { VerifyBeneficiary } from "../src/rapidium-core/src/Base/Commands/VerifyBeneficiary";


export const verifyCustomer = (req: any, res: any, next: any) => {
  return checkToken(req, res, next, 1);
};
export const verifyOrgUser = (req: any, res: any, next: any) => {
  return checkToken(req, res, next, 2);
};
export const verifyGuest = (req: any, res: any, next: any) => {
  return checkToken(req, res, next, 0);
};
export const verifyToken = (req: any, res: any, next: any) => {
  return checkToken(req, res, next, 1);
};
export const verifyAdmin = (req: any, res: any, next: any) => {
  return checkToken(req, res, next, 3);
};

export const generateToken = (user: any, expiryTime: any, reset = false) => {
  let secretKey: any = reset
    ? process.env["RESET_JWT_SECRET"]
    : process.env["JWT_SECRET"];
  return jwt.sign(user, secretKey, { expiresIn: expiryTime });
};
function checkToken(req: any, res: any, next: any, roleId: number) {
 
 
  let secret: any = req.body.resetPassword
    ? process.env["RESET_JWT_SECRET"]
    : process.env["JWT_SECRET"];

  const authorizationHeaader = req.headers.authorization;
  let result = {};
  if (authorizationHeaader) {
    try {
      jwt.verify(
        authorizationHeaader,
        secret,
        function (err: any, decoded: any) {
          if (err) {
            res.json({ status_code: 403, message: err.message });
          }

          if (decoded.role === roleId) {
            result = decoded;
            req.decoded = result;
            next();
          } else {
            //throw new Error("You are not authorised!");
            result = {
              error: `Authentication Token required.`,
              status_code: 401,
            };
            res.status(401).send(result);
          }
        }
      );
    } catch (err) {
      //throw new Error(err);
      result = {
        error: `Authentication Token required.`,
        status_code: 401,
      };
      res.status(401).send(result);
    }
  } else {
    result = {
      error: `Authentication Token required.`,
      status_code: 401,
    };
    res.status(401).send(result);
  }
}
export const verifyBeneficiary = async (req: any, res: any, next: any) => {
  var custId = "";
  var custBId = "";
  let result = {};
  try {
    if (
      typeof req.body.customers_beneficiaries_id == "string" ||
      typeof req.body.customer_beneficiary_id == "string" ||
      typeof req.query.customer_beneficiary_id == "string"
    ) {
      if (req.body.customers_beneficiaries_id) {
        custBId = req.body.customers_beneficiaries_id;
      } else if (req.body.customer_beneficiary_id) {
        custBId = req.body.customer_beneficiary_id;
      } else if (req.query.customer_beneficiary_id) {
        custBId = req.query.customer_beneficiary_id;
      }
      req.body.custBId = custBId;

      let secret: any = req.body.resetPassword
        ? process.env["RESET_JWT_SECRET"]
        : process.env["JWT_SECRET"];

      const authorizationHeaader = req.headers.authorization;
      if (authorizationHeaader) {
        try {
          jwt.verify(
            authorizationHeaader,
            secret,
            function (err: any, decoded: any) {
              if (decoded) {
                custId = decoded.customerId;
              }
            }
          );
        } catch (err) {}
      }

      req.body.custId = custId;

      if (custId) {
        const command = new VerifyBeneficiary(req);
        const cmndFactory = new CommandFactory();
        const finalResult = await cmndFactory.getCommand(
          command.path,
          true,
          command
        );

        if (finalResult) {
          next();
        } else {
          result = {
            error: `Not Authorised!!`,
            status_code: 401,
          };
          res.status(401).send(result);
        }
      } else {
        result = {
          error: `Not Authorised!!`,
          status_code: 401,
        };
        res.status(401).send(result);
      }
    } else {
      result = {
        error: `Invalid inputs`,
        status_code: 403,
      };
      res.status(401).send(result);
    }
  } catch (err) {
    result = {
      error: `Invalid inputs`,
      status_code: 403,
    };
    res.status(401).send(result);
  }
};
