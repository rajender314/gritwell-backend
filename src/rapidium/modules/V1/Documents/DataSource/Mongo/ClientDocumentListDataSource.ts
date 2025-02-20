import { ListDocuments }
    from '@basePath/Documents/Commands/ListDocuments';
import { ValidateClient }
    from
    '@basePath/OfficeClients/DataSource/Mongo/ValidateClient';
import { FormsSchema } from "@basePath/Api/DataSource/Models/Schema/FormsSchema";

import { ResourceNotFound } from '@basePath/Exceptions/ResourceNotFound';
import { ObjectId } from '@rapCore/src/Mongodb/Types';
/**
* class ClientDocumentListDataSource
*/
export default class ClientDocumentListDataSource {
    /**
     * @param {data} data ClientDocuments
     * @return {Object}
     */
    async get(data: ListDocuments) {
        try {
            await new ValidateClient(data.client_id).validate();
            const forms = await FormsSchema.aggregate([
                {
                    $lookup: {
                        from: 'form_responses',
                        let: { frid: '$type_form_id' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ['$type_form_id', '$$frid'] },
                                            { $eq: ['$users_id', ObjectId(data.client_id)] }
                                        ]
                                    },
                                }
                            },
                            { $project: { created_date: 1, session_name: 1, status: 1 } }
                        ],
                        as: 'form_responses',
                    },
                },
                {
                    $project: {
                        type: 1,
                        type_form_id: 1,
                        code: 1,
                        name: 1,
                        form_responses: 1
                    }
                }
            ]);
            let health: any = [];
            let feedback: any = [];
            if (forms.length) {
                health = forms.filter(form => {
                    return form.type === 'health'
                })
                feedback = forms.filter(form => {
                    return form.type === 'feedback'
                })
            }
            return { health, feedback };
        } catch (err: any) {
            throw new ResourceNotFound(err.message, '');
        }
    }
}
