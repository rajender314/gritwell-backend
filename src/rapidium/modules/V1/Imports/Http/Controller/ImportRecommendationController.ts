import { Request, Response } from 'express';
import BaseController from '@rapCoreBase/Http/BaseController';
import { ImportRecommendation }
  from '@basePath/Imports/Commands/ImportRecommendation';
import { NutritionSchema }
  from '@basePath/Admin/DataSource/Models/Schema/NutritionSchema';
import { LifeStyleSchema }
  from '@basePath/Admin/DataSource/Models/Schema/LifeStyleSchema';
import { SupplementSchema }
  from '@basePath/Admin/DataSource/Models/Schema/SupplementSchema';
import { TestSchema } from '@basePath/Admin/DataSource/Models/Schema/TestSchema';
import multer from 'multer';
import path from 'path';


const uploadpath = 'uploads/recommendations/';
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadpath);
  },
  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    const routeName = req.route.path.replace('/upload', '');
    cb(
      null,
      routeName + '-' + Date.now() + path.extname(file.originalname),
    );
  },
});

const fileFilter = function (req, file, cb) {
  // Accept excels only
  if (!file.originalname.match(/\.(xls|xlsx)$/)) {
    req.fileValidationError = 'Only xls or xlsx files are allowed!';
    return cb(new Error('Only xls files are allowed!'), false);
  }
  cb(null, true);
};
const maxSize = 50 * 1024 * 1024;
const upload = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: fileFilter,
}).single('recommendatation');
/**
 * class ImportRecommendationController
 */
export default class ImportRecommendationController extends BaseController {
  /**
   * @param {req} req
   * @param {res} res
   * @param {next} next
   * @return {Object}
   */
  async uploadNutrition(req: Request, res: Response, next) {
    try {
      upload(req, res, async function (err) {
        if (err) {
          if (err instanceof multer.MulterError) {
            if (err.code && err.code === 'LIMIT_FILE_SIZE') {
              res.json({
                status: false,
                message: 'Size must be less than 50mb',
              });
            }
          }
          res.json({
            status: false,
            message: 'The file format does not match the requirement. Please upload .xls or xlsx format only',
          });
        } else if (!req.file) {
          res.json({
            status: false,
            message: 'Please Upload Proper File',
          });
        } else if (err instanceof multer.MulterError) {
          res.json({
            status: false,
            message: err,
          });
        } else {
          //req.body.type = 'nutrition';
          req.body.sheetName = 'Nutrition';
          req.body.schema = NutritionSchema;
          //req.body.headers = ['name', 'description', 'uuid'];
          const schema = {
            'Name': {
              prop: 'name',
              type: String,
              required: true
            },
            'Description': {
              prop: 'description',
              type: String,
              required: true
            },
            'Status': {
              prop: 'status',
              type: String,
              oneOf: [
                'ACTIVE',
                'INACTIVE'
              ],
              required: true
            },
            'UUID': {
              prop: 'uuid',
              type: String,
            },
          }
          req.body.excelSchema = schema;
          req.body.abbr = 'NTR';
          const addCommand = new ImportRecommendation(req);
          await new BaseController().run(
            addCommand.path,
            addCommand,
            res,
            true,
            false,
            next,
            req,
          );
        }
      });
    } catch (error) {
      return error;
    }
  }
  /**
   * @param {req} req
   * @param {res} res
   * @param {next} next
   * @return {Object}
   */
  async uploadLifeSytle(req: Request, res: Response, next) {
    try {
      upload(req, res, async function (err) {
        if (err) {
          if (err instanceof multer.MulterError) {
            if (err.code && err.code === 'LIMIT_FILE_SIZE') {
              res.json({
                status: false,
                message: 'Size must be less than 50mb',
              });
            }
          }
          res.json({
            status: false,
            message: 'The file format does not match the requirement. Please upload .xls or xlsx format only',
          });
        } else if (!req.file) {
          res.json({
            status: false,
            message: 'Please Upload Proper File',
          });
        } else if (err instanceof multer.MulterError) {
          res.json({
            status: false,
            message: err,
          });
        } else {
          req.body.sheetName = 'Lifestyle';
          req.body.schema = LifeStyleSchema;
          const schema = {
            'Name': {
              prop: 'name',
              type: String,
              required: true
            },
            'Description': {
              prop: 'description',
              type: String,
              required: true
            },
            'Status': {
              prop: 'status',
              type: String,
              oneOf: [
                'ACTIVE',
                'INACTIVE'
              ],
              required: true
            },
            'UUID': {
              prop: 'uuid',
              type: String,
            },
          }
          req.body.excelSchema = schema;
          req.body.abbr = 'LFT';
          const addCommand = new ImportRecommendation(req);
          await new BaseController().run(
            addCommand.path,
            addCommand,
            res,
            true,
            false,
            next,
            req,
          );
        }
      });
    } catch (error) {
      return error;
    }
  }
  /**
   * @param {req} req
   * @param {res} res
   * @param {next} next
   * @return {Object}
   */
  async uploadSupplement(req: Request, res: Response, next) {
    try {
      upload(req, res, async function (err) {
        if (err) {
          if (err instanceof multer.MulterError) {
            if (err.code && err.code === 'LIMIT_FILE_SIZE') {
              res.json({
                status: false,
                message: 'Size must be less than 50mb',
              });
            }
          }
          res.json({
            status: false,
            message: 'The file format does not match the requirement. Please upload .xls or xlsx format only',
          });
        } else if (!req.file) {
          res.json({
            status: false,
            message: 'Please Upload Proper File',
          });
        } else if (err instanceof multer.MulterError) {
          res.json({
            status: false,
            message: err,
          });
        } else {
          req.body.sheetName = 'Supplement';
          req.body.schema = SupplementSchema;
          const schema = {
            'Name': {
              prop: 'name',
              type: String,
              required: true
            },
            'Description': {
              prop: 'description',
              type: String,
              required: true
            },
            'Brand': {
              prop: 'brand',
              type: String,
              required: true
            },
            'Dosage': {
              prop: 'dosage',
              type: String,
              required: true
            },
            'Price': {
              prop: 'price',
              type: Number,
              required: true
            },
            'Link': {
              prop: 'link',
              type: String,
              required: true
            },
            'Status': {
              prop: 'status',
              type: String,
              oneOf: [
                'ACTIVE',
                'INACTIVE'
              ],
              required: true
            },
            'UUID': {
              prop: 'uuid',
              type: String,
            },
          }
          req.body.excelSchema = schema;
          req.body.abbr = 'SUP';
          const addCommand = new ImportRecommendation(req);
          await new BaseController().run(
            addCommand.path,
            addCommand,
            res,
            true,
            false,
            next,
            req,
          );
        }
      });
    } catch (error) {
      return error;
    }
  }
  /**
   * @param {req} req
   * @param {res} res
   * @param {next} next
   * @return {Object}
   */
  async uploadTest(req: Request, res: Response, next) {
    try {
      upload(req, res, async function (err) {
        if (err) {
          if (err instanceof multer.MulterError) {
            if (err.code && err.code === 'LIMIT_FILE_SIZE') {
              res.json({
                status: false,
                message: 'Size must be less than 50mb',
              });
            }
          }
          res.json({
            status: false,
            message: 'The file format does not match the requirement. Please upload .xls or xlsx format only',
          });
        } else if (!req.file) {
          res.json({
            status: false,
            message: 'Please Upload Proper File',
          });
        } else if (err instanceof multer.MulterError) {
          res.json({
            status: false,
            message: err,
          });
        } else {
          req.body.sheetName = 'Test';
          req.body.schema = TestSchema;
          const schema = {
            'Name': {
              prop: 'name',
              type: String,
              required: true
            },
            'Description': {
              prop: 'description',
              type: String,
              required: true
            },
            'Brand': {
              prop: 'brand',
              type: String,
              required: true
            },
            'Price': {
              prop: 'price',
              type: Number,
              required: true
            },
            'Type': {
              prop: 'type',
              type: String,
              required: true
            },
            'Link': {
              prop: 'link',
              type: String,
              required: true
            },
            'Status': {
              prop: 'status',
              type: String,
              oneOf: [
                'ACTIVE',
                'INACTIVE'
              ],
              required: true
            },
            'UUID': {
              prop: 'uuid',
              type: String,
            },
          }
          req.body.excelSchema = schema;
           
          req.body.abbr = 'TST';
          const addCommand = new ImportRecommendation(req);
          await new BaseController().run(
            addCommand.path,
            addCommand,
            res,
            true,
            false,
            next,
            req,
          );
        }
      });
    } catch (error) {
      return error;
    }
  }
}
