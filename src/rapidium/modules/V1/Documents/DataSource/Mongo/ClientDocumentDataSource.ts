import { ClientDocument }
    from '@basePath/Documents/Commands/ClientDocument';
import { ValidateClient }
    from
    '@basePath/OfficeClients/DataSource/Mongo/ValidateClient';
import { QuestionsSchema } from "@basePath/Documents/DataSource/Models/Schema/QuestionsSchema";
import { QuestionOptionsSchema }
    from '@basePath/Documents/DataSource/Models/Schema/QuestionOptionsSchema';
import { ClientAnswersSchema }
    from '@basePath/Documents/DataSource/Models/Schema/ClientAnswersSchema';
import { FormsSchema } from "@basePath/Api/DataSource/Models/Schema/FormsSchema";
import { FormResponseSchema } from "@basePath/Api/DataSource/Models/Schema/FormResponseSchema";
import { ColorCodesSchema } from '@basePath/OfficeClients/DataSource/Models/Schema/ColorCodesSchema';
import { ResourceNotFound } from '@basePath/Exceptions/ResourceNotFound';
import { ObjectId } from '@rapCore/src/Mongodb/Types';
/**
* class ClientDocumentDataSource
*/
export default class ClientDocumentDataSource {
    /**
     * @param {data} data ClientDocument
     * @return {Object}
     */
    async get(data: ClientDocument) {
        try {
            const colorCodes = await this.getColorCodes();
            await new ValidateClient(data.client_id).validate();
            const answers = await ClientAnswersSchema.find({
                type_form_id: data.type_form_id,
                users_id: data.client_id,
                form_response_id: data.form_response_id
            });
            if (!answers.length) {
                throw new ResourceNotFound('No data found', '');
            }
            const questions = await QuestionsSchema.aggregate([
                {
                    $match: {
                        type_form_id: data.type_form_id,
                        type: { "$ne": 'statement' },
                        typeform_question_parent_id: null
                    }
                },
                {
                    $lookup: {
                        from: 'questions',
                        let: { tqid: '$typeform_question_id' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: { $eq: ['$typeform_question_parent_id', '$$tqid'] },
                                }
                            },
                            { $project: { typeform_question_id: 1, typeform_question_parent_id: 1, title: 1 } }
                        ],
                        as: 'children',
                    },
                },
                // {
                //     $match: {
                //         typeform_question_parent_id: null
                //     }
                // },
                {
                    $project: {
                        typeform_question_id: 1,
                        typeform_question_parent_id: 1,
                        type: 1,
                        title: 1,
                        children: 1,
                    }
                }
            ]);

            const formResponse = await FormResponseSchema.aggregate([
                {
                    $match: {
                        _id: ObjectId(data.form_response_id)
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'users_id',
                        foreignField: '_id',
                        as: 'users_data',
                    },
                },
                {
                    $unwind: {
                        path: '$users_data',
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $project: {
                        created_date: 1,
                        client_info: {
                            name: { $concat: ['$users_data.first_name', " ", '$users_data.last_name'] }
                        },
                    }
                }
            ]).then(async (response: any) => {
                if (response && response[0]) {
                    const form = await FormsSchema.findOne({ "type_form_id": data.type_form_id });
                    if (form != null) {
                        response[0].code = form.code;
                        response[0].name = form.name;
                        response[0].questions = questions.length;
                        response[0].score = 0;
                        return response[0]
                    }
                }
            });


            const questionOptions = await QuestionOptionsSchema.find({
                type_form_id: data.type_form_id,
            });
            const optionsData = [];
            if (questionOptions.length) {
                questionOptions.map((option) => {
                    const typeformQuestionId = String(option.typeform_question_id);
                    const label = String(option.label);
                    optionsData[typeformQuestionId] =
                        optionsData[typeformQuestionId] || {};
                    optionsData[typeformQuestionId][label] = option.score;
                });
            }


            let clientAnswers: any = [];
            if (answers.length) {
                answers.map((clientAnswer: any) => {
                    const { answer, scoreValue } = this.getAnswerAndScore(
                        clientAnswer,
                        optionsData,
                    );
                    const { colorCode } = this.getColorBasedOnScore(colorCodes, scoreValue);
                    clientAnswers[clientAnswer.question_id] = { answer, scoreValue, colorCode };
                })
            }
            const typeformData: any = [];
            let totalScore = 0;
            let score = 0;
            if (questions.length) {
                questions.map(question => {
                    let totalParentScore = 0;
                    const typeformChildrenData: any = [];
                    if (question.type === 'group') {
                        if (question.children) {

                            question.children.map(child => {
                                const childQa: any = {
                                    question: child.title,
                                    answer: clientAnswers[child.typeform_question_id] && clientAnswers[child.typeform_question_id].answer ? clientAnswers[child.typeform_question_id].answer : '',
                                    score: clientAnswers[child.typeform_question_id] && clientAnswers[child.typeform_question_id].scoreValue ? clientAnswers[child.typeform_question_id].scoreValue : 0,
                                    color: clientAnswers[child.typeform_question_id] && clientAnswers[child.typeform_question_id].colorCode ? clientAnswers[child.typeform_question_id].colorCode : "#dF5F7F7",
                                };
                                if (childQa.score) {
                                    totalParentScore += Number(childQa.score);
                                }
                                typeformChildrenData.push(childQa);
                            });
                        }
                    }
                    if (typeformChildrenData.length) {
                        score = totalParentScore;
                    } else {
                        score = clientAnswers[question.typeform_question_id] && clientAnswers[question.typeform_question_id].scoreValue ? clientAnswers[question.typeform_question_id].scoreValue : 0;
                    }
                    const qa: any = {
                        question: question.title,
                        answer: clientAnswers[question.typeform_question_id] && clientAnswers[question.typeform_question_id].answer ? clientAnswers[question.typeform_question_id].answer : '',
                        score: score,
                        color: '#F5F7F7',
                        children: typeformChildrenData
                    };
                    if (qa.score) {
                        totalScore += Number(qa.score);
                    }
                    typeformData.push(qa);
                });
            }
            formResponse.score = totalScore;
            return { client: formResponse, typeform: typeformData };
        } catch (err: any) {
            throw new ResourceNotFound(err.message, '');
        }
    }

    /**
   * @param {answers} answers
    * @param {optionsData} optionsData
    * @return {Object} answer and score
    */
    getAnswerAndScore(answers, optionsData) {
        let answer: string = '';
        let scoreValue: number = 0;
        const type: string = answers.type;
        if (type === 'choices') {
            //answer = answers.answer_value.value.labels.join();
            answer = answers.answer_value.value.labels.join(', ');
            let choiceScore = 0;
            answers.answer_value.value.labels.map((label) => {
                choiceScore +=
                    optionsData[answers.question_id] &&
                        optionsData[answers.question_id][label] ?
                        Number(optionsData[answers.question_id][label]) :
                        0;
            });
            scoreValue = choiceScore;
        } else if (type === 'choice') {
            answer = answers.answer_value.value.label;
            scoreValue +=
                optionsData[answers.question_id] &&
                    optionsData[answers.question_id][answer] ?
                    Number(optionsData[answers.question_id][answer]) :
                    0;
        } else if (type === 'boolean') {
            answer = answers.answer_value.value ? 'Yes' : 'No';
            scoreValue = 0;
        } else {
            answer = answers.answer_value.value;
            scoreValue = 0;
        }
        return { answer, scoreValue };
    }

    /**
     * @return {Object} color codes with min and max range
     */
    async getColorCodes() {
        const color_codes = await ColorCodesSchema.find({});
        const color_codes_data: {
            [key: string]: { 'min': number, 'max': number }
        } = {};
        if (color_codes) {
            color_codes.map((color_code) => {
                const { min, max } = color_code;
                color_codes_data[color_code.color] = { min, max };
            });
            return color_codes_data;
        }
    }

    /**
     * @param {colorCodes} colorCodes
    * @param {scoreValue} scoreValue
    * @return {Object} return color code based on score
    */
    getColorBasedOnScore(colorCodes, scoreValue) {
        const scores: any = Object.values(colorCodes);
        const score: number = scoreValue;
        let colorCode: string = '#F5F7F7';

        scores.map((score_range: any, index) => {
            if (score >= score_range.min && score <= score_range.max) {
                colorCode = Object.keys(colorCodes)[index];
            }
        });
        return { colorCode };
    }
}
