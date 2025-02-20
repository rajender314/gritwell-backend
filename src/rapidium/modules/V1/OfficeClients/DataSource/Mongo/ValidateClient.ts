import { UserSchema } from '@basePath/Admin/DataSource/Models/Schema/UserSchema';
import { ResourceNotFound } from '@basePath/Exceptions/ResourceNotFound';
import { ObjectId } from '@rapCore/src/Mongodb/Types';
/**
* class ValidateClient
*/
export class ValidateClient {
    public id: string;
    constructor(id) {
        this.id = id;
    }
    async validate() {
        const user = await UserSchema.findOne(
            { _id: ObjectId(this.id), status: true },
        );
        if (!user) {
            throw new ResourceNotFound('Not a valid client', '');
        }
    }
}