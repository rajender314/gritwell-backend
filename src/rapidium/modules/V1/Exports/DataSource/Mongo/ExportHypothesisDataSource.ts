import { DownloadGoal } from '@basePath/Exports/Commands/DownloadGoal';
import { DownloadDiagnosis } from '@basePath/Exports/Commands/DownloadDiagnosis';
import { DownloadRootCause } from '@basePath/Exports/Commands/DownloadRootCause';
import { DownloadCoreDysfunction }
    from '@basePath/Exports/Commands/DownloadCoreDysfunction';
import { GoalSchema }
    from '@basePath/Admin/DataSource/Models/Schema/Hypothesis/GoalSchema';
import { DiagnosisSchema }
    from '@basePath/Admin/DataSource/Models/Schema/Hypothesis/DiagnosisSchema';
import { RootCauseSchema }
    from '@basePath/Admin/DataSource/Models/Schema/Hypothesis/RootCauseSchema';
import { CoreDysfunctionSchema }
    from '@basePath/Admin/DataSource/Models/Schema/Hypothesis/CoreDysfunctionSchema';
import {
    IHypothesis
} from '@basePath/Exports/Interfaces/IExport';
/**
 * class ExportHypothesisDataSource
 */
export default class ExportHypothesisDataSource {
    /**
     * @param {data} data
     * @return {Object}
     */
    async downloadGoal(data: DownloadGoal) {
      
        const search = data.search;
        const goals: IHypothesis[] = [];
        return GoalSchema.aggregate([
            {
                $match: {
                    $or: [
                        {
                            name: {
                                $regex: search,
                                $options: 'i',
                            },
                        }
                    ],
                },
            },
            { $sort: { 'status': -1 } },
        ]).then((dbGoals: IHypothesis[]) => {
            if (dbGoals.length) {
                dbGoals.map((goal) => {
                    const status = goal.status ? 'ACTIVE' : 'INACTIVE';
                    goals.push({
                        name: goal.name,
                        status: status,
                        uuid: goal.uuid,
                    });
                });
            }
            return goals;
        });
    }

    /**
     * @param {data} data DownloadDiagnosis
     * @return {Object}
     */
    async downloadDiagnosis(data: DownloadDiagnosis) {
        const search = data.search;
        const diagnoses: IHypothesis[] = [];
        return DiagnosisSchema.aggregate([
            {
                $match: {
                    $or: [
                        {
                            name: {
                                $regex: search,
                                $options: 'i',
                            },
                        }
                    ],
                },
            },
            { $sort: { 'status': -1 } },
        ]).then((dbDiagnoses: IHypothesis[]) => {
            if (dbDiagnoses.length) {
                dbDiagnoses.map((diagnosis) => {
                    const status = diagnosis.status ? 'ACTIVE' : 'INACTIVE';
                    diagnoses.push({
                        name: diagnosis.name,
                        status: status,
                        uuid: diagnosis.uuid,
                    });
                });
            }
            return diagnoses;
        });
    }

    /**
     * @param {data} data DownloadRootCause
     * @return {Object}
     */
    async downloadRootCause(data: DownloadRootCause) {
        const search = data.search;
        const rootCauses: IHypothesis[] = [];
        return RootCauseSchema.aggregate([
            {
                $match: {
                    $or: [
                        {
                            name: {
                                $regex: search,
                                $options: 'i',
                            },
                        }
                    ],
                },
            },
            { $sort: { 'status': -1 } },
        ]).then((dbRootCauses: IHypothesis[]) => {
            if (dbRootCauses.length) {
                dbRootCauses.map((rootCause) => {
                    const status = rootCause.status ? 'ACTIVE' : 'INACTIVE';
                    rootCauses.push({
                        name: rootCause.name,
                        status: status,
                        uuid: rootCause.uuid,
                    });
                });
            }
            return rootCauses;
        });
    }

    /**
     * @param {data} data DownloadCoreDysfunction
     * @return {Object}
     */
    async downloadCoreDysfunction(data: DownloadCoreDysfunction) {
        const search = data.search;
        const coreDysfunctions: IHypothesis[] = [];
        return CoreDysfunctionSchema.aggregate([
            {
                $match: {
                    $or: [
                        {
                            name: {
                                $regex: search,
                                $options: 'i',
                            },
                        }
                    ],
                },
            },
            { $sort: { 'status': -1 } },
        ]).then((dbCoreDysfunctions: IHypothesis[]) => {
            if (dbCoreDysfunctions.length) {
                dbCoreDysfunctions.map((coreDysfunction) => {
                    const status = coreDysfunction.status ? 'ACTIVE' : 'INACTIVE';
                    coreDysfunctions.push({
                        name: coreDysfunction.name,
                        status: status,
                        uuid: coreDysfunction.uuid,
                    });
                });
            }
            return coreDysfunctions;
        });
    }
}
