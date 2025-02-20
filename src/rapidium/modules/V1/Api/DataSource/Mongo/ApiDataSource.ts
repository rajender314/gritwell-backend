import { FormsSchema } from "@basePath/Api/DataSource/Models/Schema/FormsSchema";
import { QuestionsSchema } from "@basePath/Documents/DataSource/Models/Schema/QuestionsSchema";
import { QuestionOptionsSchema } from "@basePath/Documents/DataSource/Models/Schema/QuestionOptionsSchema";
import { ClientAnswersSchema } from "@basePath/Documents/DataSource/Models/Schema/ClientAnswersSchema";
import { FormResponseSchema } from "@basePath/Api/DataSource/Models/Schema/FormResponseSchema";
import { AppointmentSchema }
    from
    '@basePath/Appointments/DataSource/Models/Schema/AppointmentSchema';
import Forms from "@basePath/Api/DataSource/Models/Forms";
import Questions from "@basePath/Api/DataSource/Models/Questions";
import FormResponse from "@basePath/Api/DataSource/Models/FormResponse";
import ClientAnswers from "@basePath/Api/DataSource/Models/ClientAnswers";
import { CommandFactory } from "@rapCoreBase/Commands/CommandFactory";
import { AddCustomer } from "@basePath/Customer/Commands/AddCustomer";
import { ObjectId } from "@rapCore/src/Mongodb/Types";
import BaseHelper from '@rapCoreHelpers/BaseHelper';
const axios = require('axios');
const typFormAuthtoken = 'Bearer ' + process.env.TYPE_FORMS_AUTH_TOKEN;
const typFormApiUrl = 'https://api.typeform.com/forms';
let environment = process.env;
const typeFormInTake: string = environment.TYPE_FORM_INTAKE || '';
const typeFormSymptomAnalysis: string = environment.TYPE_FORM_SYMPTOM_ANALYSIS || '';
const typeFormHealthAssessment: string = environment.TYPE_FORM_HEALTH_ASSESSMENT || '';
const typeFormPreAppointment: string = environment.TYPE_FORM_PRE_APPOINTMENT || '';
const typeFormPostAppointment: string = environment.TYPE_FORM_POST_APPOINTMENT || '';
const typeFormClientHappiness: string = environment.TYPE_FORM_CLIENT_HAPPINESS || '';
// const typeFormIds = [typeFormSymptomAnalysis, typeFormInTake, typeFormHealthAssessment, typeFormPreAppointment, typeFormPostAppointment, typeFormClientHappiness];

const typeFormIds = [
    { "key": "health_assessment", "value": typeFormHealthAssessment, "name": "Health Assessment" },
    { "key": "symptom_analysis", "value": typeFormSymptomAnalysis, "name": "Symptom Analysis" },
    { "key": "intake", "value": typeFormInTake, "name": "Intake Form" },
    { "key": "pre_session", "value": typeFormPreAppointment, "name": "Pre-session check in" },
    { "key": "post_session", "value": typeFormPostAppointment, "name": "Post-session feedback" },
    { "key": "client_happiness", "value": typeFormClientHappiness, "name": "Client Happiness Form" }
];

const healthIntakeForms = [typeFormSymptomAnalysis, typeFormInTake, typeFormHealthAssessment];
const feedbackForms = [typeFormPreAppointment, typeFormPostAppointment, typeFormClientHappiness];

export default class ApiDataSource {
    public existingQuestions = [];
    public existingQuestionOptions = new Array();
    public existingForms = [];

    /**
     * Fetch type form api
     * @param params
     * @returns
     */
    async getTypeFormsApi(params: any) {
        return axios({
            method: params.method,
            url: params.apiUrl,
            data: params.payload,
            headers: {
                'Authorization': typFormAuthtoken
            },
        })
            .then((res: any) => {
                const response = res.data ? res.data : [];
                return response;
            })
            .catch((err: any) => {
                console.log(err, "Error");
            });
    }
    /**
     * sync type form responses from webhook post call api from typeforms
     * @param data
     */
    async syncTypeFormResonse(data: any) {
        const response = data.response;
        const appointment_id = data.appointment_id ? data.appointment_id : null;
        let sessionName: string = '';
        if (appointment_id != null) {
            const appointment = await AppointmentSchema.findById(appointment_id);
            if (appointment != null) {
                sessionName = appointment.name
            }
        }
        const obj_form_response = await new FormResponse(FormResponseSchema).create(
            {
                appointment_id,
                session_name: sessionName,
                response: response,
                type_form_id: data.type_form_id,
                created_date: data.created_date,
                last_modified_date: data.last_modified_date
            }
        );
        const answers = response.form_response.answers;
        const type_form_id = data.type_form_id;
        const userFields = data.userProfileFields;
        let clientObject = {
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            state: '',
            dob: '',
            address: '',
            ethnicity: '',
            gender: '',
            height: '',
            weight: '',
            status: false,
        }

        let insertData = new Array();
        await answers.map(item => {
            let type = item.type;
            Object.entries(userFields).forEach(([key, value]) => {
                if (item.field.id == value) {
                    if (type !== 'choice') {
                        clientObject[key] = item[type];
                    } else {
                        clientObject[key] = item[type].label;
                    }
                }
            });

            let form_data: any = {
                form_response_id: obj_form_response._id,
                appointment_id: appointment_id,
                type_form_id: type_form_id,
                question_id: item.field.id,
                answer_value: { value: item[type] },
                type: item.type,
                question_field: item.field
            }
            insertData.push(form_data);
        });

        if (insertData.length > 0) {
            await new ClientAnswers(ClientAnswersSchema).create(insertData);
        }
        try {
            if (type_form_id === typeFormHealthAssessment) {
                clientObject.status = false;
            }
            if (type_form_id === typeFormPreAppointment || type_form_id === typeFormPostAppointment || type_form_id === typeFormClientHappiness) {
                clientObject = Object.assign(clientObject, data.userProfileFields);
                clientObject.status = true;
            }
            if (type_form_id === typeFormInTake || type_form_id === typeFormSymptomAnalysis) {
                clientObject = Object.assign(clientObject, data.userData);
                clientObject.status = true;
            }
            console.log('clientObject', clientObject);
            const command = new AddCustomer({ body: clientObject });
            let user = await new CommandFactory().getCommand(command.path, true, command);
            console.log(user);
            if (user) {
                const date = new BaseHelper().Date();
                await new ClientAnswers(ClientAnswersSchema).updateData(
                    { form_response_id: ObjectId(obj_form_response._id) },
                    {
                        users_id: user._id,
                        last_modified_by: user._id,
                        created_by: user._id,
                        created_date: date,
                        last_modified_date: date
                    }
                );

                await FormResponseSchema.findByIdAndUpdate(
                    obj_form_response._id,
                    {
                        users_id: user._id,
                        created_by: user._id,
                        last_modified_by: user._id
                    }
                );
            }
            return { user, submitted: true };
        } catch (e: any) {
            console.log(e)
        }
    }

    /**
     * Sync type forms in to master data
     * @param data
     */
    async synTypeForms(data: any) {
        this.existingForms = await new Forms(FormsSchema).getForms(data);
        this.existingQuestions = await new Questions(QuestionsSchema).getQuestions();
        let formsData = new Array();
        if (typeFormIds.length > 0) {
            await new Forms(FormsSchema).updateTempStatus();
            await new Questions(QuestionsSchema).updateTempStatus();
            await this.createOrUpdateForms(typeFormIds, async (typeForm) => {
                await this.formatTypeForms(typeForm);
                await this.syncQuestions(typeForm);
            });
            await new Forms(FormsSchema).updateStatus();
            await new Questions(QuestionsSchema).updateStatus();
            return true;
        }
    }

    createOrUpdateForms = async (array, callback) => {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    };
    /**
     * Formating the type form data
     * @param typeForm
     */
    async formatTypeForms(typeForm: any) {
        const type_forms_id = typeForm.value
        let params = {
            method: 'GET',
            payload: {},
            apiUrl: typFormApiUrl + '/' + type_forms_id
        };
        let form = await this.getTypeFormsApi(params);
        let insertData = new Array();
        let existData: any = this.existingForms;
        let id = (existData[form.id] && existData[form.id]._id) ? existData[form.id]._id : '';
        let type = '';
        if (form.id) {
            if (healthIntakeForms.includes(form.id)) {
                type = 'health';
            }
            else if (feedbackForms.includes(form.id)) {
                type = 'feedback';
            }
        }
        let form_data: any = {
            id: id,
            type_form_id: form.id,
            title: form.title,
            type,
            code: typeForm.key,
            name: typeForm.name,
            theme_url: form.theme.href,
            status: true,
            temp_status: true
        }
        if (id != '') {
            await new Forms(FormsSchema).update(form_data);
        } else {
            insertData.push(form_data);
        }
        if (insertData.length > 0) {
            await new Forms(FormsSchema).create(insertData);
        }
    }
    /**
     * Sync type form questions in to master data
     * @param data
     */
    async synTypeFormsQuestions(data: any) {
        let params = {
            method: 'GET',
            payload: {},
            apiUrl: typFormApiUrl
        };
        const response = await this.getTypeFormsApi(params);
        if (response.items) {
            response.items.map(item => {
                //let form_id = item.id;
                this.syncQuestions(item.id);
            });
        }
    }
    /**
     * sync type form questions form wise.
     * @param typeForm
     */
    async syncQuestions(typeForm: any) {
        const type_forms_id = typeForm.value
        let params = {
            method: 'GET',
            payload: {},
            apiUrl: typFormApiUrl + '/' + type_forms_id
        };
        const response = await this.getTypeFormsApi(params);
        this.existingQuestions = await new Questions(QuestionsSchema).getQuestions();
        if (response.fields) {
            await this.formatTypeQuestions(response);
        }
    }
    /**
     * formating the type form questions.
     * @param data
     */
    async formatTypeQuestions(data: any) {
        let self = this;
        let existData: any = this.existingQuestions;
        let scoreData = {};
        if (data.logic) {
            await data.logic.forEach(function (item: any) {
                let choiceScore = {};
                item.actions.map(action => {
                    let condition = (action.condition) ? action.condition.vars : [];
                    condition.map(val => {
                        if (val.type == 'choice') {
                            choiceScore[val.value] = (action.details && action.details.value) ? action.details.value.value : '';
                        }
                    });
                });
                scoreData[item.ref] = choiceScore;
            });
        }
        let options_data = new Array();
        let insertQuestionData = new Array();
        let insertGroupQuestionData = new Array();
        await this.createOrUpdateQuestions(data.fields, async (form) => {
            let id = (existData[form.id] && existData[form.id]._id) ? existData[form.id]._id : '';
            let score = (scoreData[form.ref]) ? scoreData[form.ref] : {};
            if (form.type === 'multiple_choice') {
                if (form.properties.choices) {
                    form.properties.choices.map((choice: any, index) => {
                        choice.score = score[choice.ref] ? score[choice.ref] : 0;
                        form.properties.choices[index] = choice
                    })
                    options_data[form.id] = form.properties.choices
                }
            }

            if (form.type === 'group') {
                await this.createOrUpdateGroupQuestions(form.properties.fields, async (groupForm) => {
                    let id = (existData[groupForm.id] && existData[groupForm.id]._id) ? existData[groupForm.id]._id : '';
                    let score = (scoreData[groupForm.ref]) ? scoreData[groupForm.ref] : {};
                    if (groupForm.type === 'multiple_choice') {
                        if (groupForm.properties.choices) {
                            groupForm.properties.choices.map((choice: any, index) => {
                                choice.score = score[choice.ref] ? score[choice.ref] : 0;
                                groupForm.properties.choices[index] = choice
                            })
                            options_data[groupForm.id] = groupForm.properties.choices
                        }
                    }

                    let groupFormData: any = {
                        id: id,
                        type_form_id: data.id,
                        typeform_question_id: groupForm.id,
                        typeform_question_parent_id: form.id,
                        title: groupForm.title,
                        // properties: groupForm.properties,
                        validations: form.validations,
                        type: groupForm.type,
                        typeform_question_ref_id: groupForm.ref,
                        status: true,
                        last_modified_by: 1,
                        created_by: 1,
                        temp_status: true
                    }
                    if (id != '') {
                        await QuestionsSchema.findByIdAndUpdate(id, groupFormData, { new: true })
                    }
                    else {
                        insertGroupQuestionData.push(groupFormData);
                    }
                });
            }

            let form_data: any = {
                id: id,
                type_form_id: data.id,
                typeform_question_id: form.id,
                title: form.title,
                // properties: form.properties,
                validations: form.validations,
                type: form.type,
                typeform_question_ref_id: form.ref,
                status: true,
                last_modified_by: 1,
                created_by: 1,
                temp_status: true
            }
            if (id != '') {
                await QuestionsSchema.findByIdAndUpdate(id, form_data, { new: true })
            }
            else {
                insertQuestionData.push(form_data);
            }
        })
        console.log(insertQuestionData);
        if (insertQuestionData.length) {
            await QuestionsSchema.create(insertQuestionData);
        }
        if (insertGroupQuestionData.length) {
            await QuestionsSchema.create(insertGroupQuestionData);
        }
        self.existingQuestionOptions = options_data
        await this.syncQuestionOptions();
    }

    createOrUpdateQuestions = async (array, callback) => {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    };
    createOrUpdateGroupQuestions = async (array, callback) => {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    };

    async syncQuestionOptions() {

        let db_question_options = await QuestionOptionsSchema.find({}); // get db question options key choice_id and value _id
        let db_question_options_data: any = [];
        if (db_question_options.length) {
            db_question_options.map((question_option: any) => {
                db_question_options_data[question_option.choice_id] = question_option._id
            })
        }

        let db_questions = await QuestionsSchema.find({});
        let db_questions_data: any = [];
        if (db_questions.length) {
            db_questions.map((question: any) => {
                db_questions_data[question.typeform_question_id] = { 'question_id': question._id, 'type_form_id': question.type_form_id }
            })
        }

        let existing_question_options = this.existingQuestionOptions;
        let insertData = new Array();
        Object.entries(existing_question_options).forEach(([question_id, question_options]) => {
            question_options.map((option: any) => {
                let id = (db_question_options_data[option.id] ? db_question_options_data[option.id] : '');
                let options_data: any = {}
                options_data = {
                    label: option.label,
                    score: option.score,
                    choice_id: option.id,
                    choice_ref_id: option.ref,
                    typeform_question_id: question_id,
                    question_id: db_questions_data[question_id].question_id,
                    type_form_id: db_questions_data[question_id].type_form_id,
                    id: id
                }

                if (id != '') {
                    //need to add await
                    QuestionOptionsSchema.findByIdAndUpdate(id, options_data, { new: true });
                }
                else {
                    insertData.push(options_data);
                }
            })
        });
        if (insertData.length) {
            await QuestionOptionsSchema.create(insertData);
        }
    }
}