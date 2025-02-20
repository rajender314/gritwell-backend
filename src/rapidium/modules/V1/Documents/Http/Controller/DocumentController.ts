import { Request, Response } from 'express';
import BaseController from '@rapCoreBase/Http/BaseController';
import { ListDocuments } from '@basePath/Documents/Commands/ListDocuments';
import { ClientDocument } from '@basePath/Documents/Commands/ClientDocument';

/**
 * class DocumentController
 */
export default class DocumentController extends BaseController {
    /**
     * @param {req} req
     * @param {res} res
     * @param {next} next
     */
    async listDocuments(req: Request, res: Response, next: any) {
        const getCommand = new ListDocuments(req);
        await new BaseController().run(
            getCommand.path,
            getCommand,
            res,
            true,
            false,
            next,
            req,
        );
    }

    /**
     * @param {req} req
     * @param {res} res
     * @param {next} next
     */
    async getDocument(req: Request, res: Response, next: any) {
        const getCommand = new ClientDocument(req);
        await new BaseController().run(
            getCommand.path,
            getCommand,
            res,
            true,
            false,
            next,
            req,
        );
    }

}
