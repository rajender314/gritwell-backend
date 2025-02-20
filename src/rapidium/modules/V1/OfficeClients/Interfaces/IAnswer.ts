interface QuestionField {
    id: string,
    type: string,
    ref: string
}

export interface IAnswer {
    users_id: string,
    form_response_id: string,
    type_form_id: string,
    question_id: string,
    answer_value: any,
    type: string,
    question_field: QuestionField
}
