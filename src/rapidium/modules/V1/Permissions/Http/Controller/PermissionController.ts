import { Request, Response } from 'express';
import BaseController
    from '@rapCoreBase/Http/BaseController';
import { UserPermissions }
    from '@basePath/Permissions/Commands/UserPermissions';
/**
 * class PermissionController
 */
export default class PermissionController extends BaseController {
    /**
    * @param {req} req
    * @param {res} res
    * @param {next} next
    */
    async userPermissions(req: Request, res: Response, next: any) {
        const getCommand = new UserPermissions(req);
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
