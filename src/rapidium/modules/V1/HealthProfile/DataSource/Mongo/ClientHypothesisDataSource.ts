import { GetClientHypothesis }
    from '@basePath/HealthProfile/Commands/GetClientHypothesis';
import { CreateClientHypothesis }
    from '@basePath/HealthProfile/Commands/CreateClientHypothesis';
import { CreateCoreDysfunction }
    from '@basePath/HealthProfile/Commands/CreateCoreDysfunction';
import { CreateRootCause }
    from '@basePath/HealthProfile/Commands/CreateRootCause';
import { CreateDiagnosis }
    from '@basePath/HealthProfile/Commands/CreateDiagnosis';
import { ClientCoreDysfunctionSchema }
    from
    '@basePath/HealthProfile/DataSource/Models/Schema/ClientCoreDysfunctionSchema';
import { ClientRootCauseSchema }
    from
    '@basePath/HealthProfile/DataSource/Models/Schema/ClientRootCauseSchema';
import { ClientDiagnosisSchema }
    from
    '@basePath/HealthProfile/DataSource/Models/Schema/ClientDiagnosisSchema';
import { ValidateClient }
    from
    '@basePath/OfficeClients/DataSource/Mongo/ValidateClient';
import { CommandFactory } from '@rapCoreBase/Commands/CommandFactory';
import { ObjectId } from '@rapCore/src/Mongodb/Types';
/**
* class ClientHypothesisDataSource
*/
export default class ClientHypothesisDataSource {
    /**
     * @param {data} data GetDiagnosis
     * @return {Object}
     */
    async get(data: GetClientHypothesis) {
        //get imbalance
        const coredysfunctions = await ClientCoreDysfunctionSchema.find(
            {
                client_id: ObjectId(data.client_id)
            },
            {
                coredysfunction_id: 1
            }
        );
        const coredysfunctionsData: any = [];
        if (coredysfunctions.length) {
            coredysfunctions.map(coredysfunction => {
                coredysfunctionsData.push(coredysfunction.coredysfunction_id);
            });
        }

        //get rootcause
        const rootCauses = await ClientRootCauseSchema.find(
            {
                client_id: ObjectId(data.client_id)
            },
            {
                rootcause_id: 1
            }
        );
        const count = rootCauses.length;
        const rootCausesData: any = [];
        if (count) {
            rootCauses.map(rootcause => {
                rootCausesData.push(rootcause.rootcause_id);
            });
        }

        //get diagnoses
        const diagnoses = await ClientDiagnosisSchema.find(
            {
                client_id: ObjectId(data.client_id)
            },
            {
                diagnosis_id: 1
            }
        );
        const diagnosesData: any = [];
        if (diagnoses.length) {
            diagnoses.map(diagnosis => {
                diagnosesData.push(diagnosis.diagnosis_id);
            });
        }
        return { imbalance: coredysfunctionsData, rootcause: rootCausesData, diagnosis: diagnosesData };
    }

    async create(data: CreateClientHypothesis) {
        //validate client
        await new ValidateClient(data.client_id).validate(); 
        //create client imbalance
        if (data.imbalance.length) {
            const imbalanceCommand = new CreateCoreDysfunction({
                client_id: data.client_id,
                imbalance: data.imbalance
            });
            await new CommandFactory().getCommand(
                imbalanceCommand.path,
                true,
                imbalanceCommand,
            );
        }

        //create client rootcause
        if (data.rootcause.length) {
            const rootcauseCommand = new CreateRootCause({
                client_id: data.client_id,
                rootcause: data.rootcause
            });
            await new CommandFactory().getCommand(
                rootcauseCommand.path,
                true,
                rootcauseCommand,
            );
        }

        //create client diagnosis
        if (data.diagnosis.length) {
            const diagnosisCommand = new CreateDiagnosis({
                client_id: data.client_id,
                diagnosis: data.diagnosis
            });
            await new CommandFactory().getCommand(
                diagnosisCommand.path,
                true,
                diagnosisCommand,
            );
        }
        return 'Hypothesis changes have been updated sucessfully';
    }
}
