import { BaseCommand } from '@rapCoreBase/Commands/BaseCommand';
import { UserProvider } from '@basePath/Web/Interfaces/UserProvider';
/**
 * class UserPermissions
 */
export class UserPermissions extends BaseCommand {
    public userData: UserProvider;
    public path = __dirname.replace(process.cwd(), '.') + '/UserPermissions.ts';
    /**
     * constructor
     * @param {data} data
     */
    constructor(data: any) {
        super(data);
        this.userData = data.decoded ? data.decoded : {};
    }
}
