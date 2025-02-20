import { Request, Response } from 'express';
import BaseController from '@rapCoreBase/Http/BaseController';
import { ImportHypothesis }
    from '@basePath/Imports/Commands/ImportHypothesis';
import { GoalSchema }
    from '@basePath/Admin/DataSource/Models/Schema/Hypothesis/GoalSchema';
import { DiagnosisSchema }
    from '@basePath/Admin/DataSource/Models/Schema/Hypothesis/DiagnosisSchema';
import { RootCauseSchema }
    from '@basePath/Admin/DataSource/Models/Schema/Hypothesis/RootCauseSchema';
import { CoreDysfunctionSchema }
    from '@basePath/Admin/DataSource/Models/Schema/Hypothesis/CoreDysfunctionSchema';

import multer from 'multer';
import path from 'path';


const uploadpath = 'uploads/hypothesis/';
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
}).single('hypothesis');
/**
 * class ImportHypothesisController
 */
export default class ImportHypothesisController extends BaseController {
    /**
     * @param {req} req
     * @param {res} res
     * @param {next} next
     * @return {Object}
     */
    async uploadGoal(req: Request, res: Response, next) {
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
                    req.body.sheetName = 'Goal';
                    req.body.schema = GoalSchema;
                    req.body.abbr = 'GLS';
                    const schema = {
                        'Name': {
                            prop: 'name',
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

                   
                    
                    const addCommand = new ImportHypothesis(req);
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
    uploadDiagnosis(req: Request, res: Response, next) {
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
                    req.body.sheetName = 'Diagnosis';
                    req.body.schema = DiagnosisSchema;
                    req.body.abbr = 'DIA';
                    const schema = {
                        'Name': {
                            prop: 'name',
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
                    const addCommand = new ImportHypothesis(req);
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
    uploadRootCause(req: Request, res: Response, next) {
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
                    req.body.sheetName = 'RootCause';
                    req.body.schema = RootCauseSchema;
                    req.body.abbr = 'ROC';
                    const schema = {
                        'Name': {
                            prop: 'name',
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
                    const addCommand = new ImportHypothesis(req);
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
    uploadCoreDysfunction(req: Request, res: Response, next) {
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
                    req.body.sheetName = 'Imbalance';
                    req.body.schema = CoreDysfunctionSchema;
                    req.body.abbr = 'DYS';
                    const schema = {
                        'Name': {
                            prop: 'name',
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

                    

                    const addCommand = new ImportHypothesis(req);
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
