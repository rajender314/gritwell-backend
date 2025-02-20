import { CreateDiagnosis }
    from '@basePath/HealthProfile/Commands/CreateDiagnosis';
import { ClientDiagnosisSchema }
    from
    '@basePath/HealthProfile/DataSource/Models/Schema/ClientDiagnosisSchema';
import { DiagnosisSchema }
    from
    '@basePath/Admin/DataSource/Models/Schema/Hypothesis/DiagnosisSchema';
import { ResourceNotFound } from '@basePath/Exceptions/ResourceNotFound';
import { ObjectId } from '@rapCore/src/Mongodb/Types';
/**
* class ClientDiagnosisDataSource
*/
export default class ClientDiagnosisDataSource {

    /**
     * @param {data} data CreateDiagnosis
     * @return {Object}
     */
    async create(data: CreateDiagnosis) {
        if (data.diagnosis.length) {
            const diagnosisPayload = data.diagnosis.map((s) => ObjectId(s));
            const diagnoses = await DiagnosisSchema.find({ '_id': { $in: diagnosisPayload } });
            const dbDiagnosis = diagnoses.map((diagnosis) => String(diagnosis._id));
            let difference = data.diagnosis.filter(x => !dbDiagnosis.includes(x));
            if (difference.length) {
                throw new ResourceNotFound('Not a valid data for diagnosis', '');
            }
            await ClientDiagnosisSchema.deleteMany({ client_id: ObjectId(data.client_id) });
            const diagnosisInsertData: any = [];
            if (data.diagnosis) {
                data.diagnosis.map(d => {
                    diagnosisInsertData.push({
                        client_id: ObjectId(data.client_id),
                        diagnosis_id: d,
                        created_by: data.created_by,
                        created_date: data.created_date,
                        last_modified_by: data.last_modified_by,
                        last_modified_date: data.last_modified_date
                    });
                });
            }
            return ClientDiagnosisSchema.create(diagnosisInsertData);
        } else {
            throw new ResourceNotFound('Please send diagnosis', '');
        }
    }

}
