import BaseModel from '@rapCoreBase/Models/BaseModel';
import {ObjectId} from '@rapCore/src/Mongodb/Types';
// import {now} from 'mongoose';
// import {FormResponseSchema} from './Schema/FormResponseSchema';
/**
 * class FormResponse
 */
export default class FormResponse extends BaseModel {
  private modelDs: any;
  /**
   * @param {ModelName} ModelName
   */
  constructor(ModelName: any) {
    super(ModelName);
    this.modelDs = ModelName;
  }
  /**
   * @param {data} data
   * @return {Object}
   */
  public async create(data: any) {
    const createData = await this.addUpdate(data);
    return createData;
  }
  /**
   * @param {data} data
   * @return {Object}
   */
  public async update(data: any) {
    const createData = await this.addUpdate(data);
    return createData;
  }
  /**
   * @param {data} data
   * @return {Object}
   */
  public async remove(data: any) {
    return this.deleteOne(data);
  }

  /**
   * @param {data} data
   * @return {Object}
   */
  public async getData(data: any) {
    // let paraaam = {'id': '6205fa4ba7729416d21cba6e'};
    return this.getOne(data);
    // return await this.modelDs.
    // find({id:ObjectId("6205fa4ba7729416d21cba6e")})
    // .then(async (doc: object) => {
    //   if (doc) {
    //     return doc;
    //   }else {
    //     return "No Records Found";
    //   }
    // });
  }
  /**
   * getSymptomAnalysisResonseJson
   * @return {Object}
   */
  public getSymptomAnalysisResonseJson() {
    return {
      _id: ObjectId('623d6c70fcd4e7190b84366e'),
      status: true,
      temp_status: true,
      response: {
        event_id: '01FYZYZ4B90PEZTCFV98RD7PVC',
        event_type: 'form_response',
        form_response: {
          form_id: 'H0Maw2Dx',
          token: 'nn5r3fquhhehuqyt23cnn5rel28pj8m3',
          landed_at: '2022-03-25T07:12:17Z',
          submitted_at: '2022-03-25T07:17:02Z',
          calculated: {
            score: 319,
          },
          variables: [
            {
              key: 'counter_3f09e197_9ba5_4b16_9f47_e6ce647127cd',
              type: 'number',
              number: 0,
            },
            {
              key: 'counter_a1234a1e_1b54_460e_8724_df1130d70234',
              type: 'number',
              number: 0,
            },
            {
              key: 'counter_b43d9751_4222_4dfe_9429_83834cbeba82',
              type: 'number',
              number: 0,
            },
            {
              key: 'score',
              type: 'number',
              number: 319,
            },
            {
              key: 'winning_outcome_id',
              type: 'outcome_id',
              outcome_id: 'x0jX5KeAWYD9',
            },
          ],
          outcome: {
            id: 'x0jX5KeAWYD9',
            title:
              'Thank you for your patience in completing the Symptom Severity Analysis!',
          },
          definition: {
            id: 'H0Maw2Dx',
            title: 'Symptom Analysis (GritWell core stage)',
            fields: [
              {
                id: 'YqKcoo9kEtWy',
                title: 'What\'s your first name?',
                type: 'short_text',
                ref: '01FGWQQ65ZD7RMDTMH4462HMVG',
              },
              {
                id: 'j3ALJdYXlHrR',
                title: 'What\'s your last name?',
                type: 'short_text',
                ref: '706e5bbf-73e1-4fa3-ac33-7c415357ed34',
              },
              {
                id: '1rX9ltEj23xm',
                title: 'What\'s your email address?',
                type: 'email',
                ref: '97c27211-2c97-4c82-b576-7e6e93009257',
              },
              {
                id: 'hSOKFuHIWKSf',
                title: 'What\'s your phone number?',
                type: 'phone_number',
                ref: '034d4045-591b-4b9b-9434-892ad8d3f0df',
              },
              {
                id: 'ILCCa3DQD8kt',
                title: 'What state do you live in?',
                type: 'short_text',
                ref: '741fb17c-9304-4b31-b15a-e8390edfeb63',
              },
              {
                id: 'eq931bEbcpmS',
                title: 'How old are you?',
                type: 'number',
                ref: '0e68452a-4084-4ec7-8c89-3af462c47629',
              },
              {
                id: 'xxxTXdktYsNf',
                title:
                  'Have you been diagnosed with any autoimmune conditions? (please include if applicable)',
                type: 'long_text',
                ref: '343c6289-b55c-4b42-9319-c228130f1193',
              },
              {
                id: 'Ije3Hz8UK1G3',
                title: 'What are your main symptom concerns?',
                type: 'long_text',
                ref: '620338f8-508f-49b2-94f0-29dbf619070d',
              },
              {
                id: 'Fd1WoylUhHbw',
                title:
                  'General -  which symptoms have you experienced in the last 6 months? ',
                type: 'multiple_choice',
                allow_multiple_selections: true,
                ref: '0c5767f1-0430-4ff5-9bb5-435f453dba90',
                choices: [
                  {
                    id: 'YUi2CO9iLXKL',
                    label: 'Cold hands and feet',
                  },
                  {
                    id: 'fVTJCePhDvtR',
                    label: 'Cold intolerance',
                  },
                  {
                    id: '0j61qoY6wCaf',
                    label: 'Heat intolerance',
                  },
                  {
                    id: 'HgQhKCV3187A',
                    label: 'Daytime sleepiness',
                  },
                  {
                    id: 'MrQFqzi4m23d',
                    label: 'Early waking',
                  },
                  {
                    id: 'XASNafEG6bgU',
                    label: 'Night waking',
                  },
                  {
                    id: 'XUyRpFwe2uXS',
                    label: 'Fever',
                  },
                  {
                    id: 'N81uy3Cb0vkq',
                    label: 'Nightmares',
                  },
                  {
                    id: '7eVGT8SMRXT3',
                    label: 'Low body temperature',
                  },
                  {
                    id: 'PzxFWPRCtUbb',
                    label: 'None',
                  },
                ],
              },
              {
                id: '2bQJDk2DgAEX',
                title:
                  'Which of the following have you experienced in the last 6 months? ',
                type: 'multiple_choice',
                allow_multiple_selections: true,
                ref: '5903b23b-843d-4aa6-8db3-40304a9f648e',
                choices: [
                  {
                    id: 'ftBg4D02sgkK',
                    label: 'Anal spasm',
                  },
                  {
                    id: '0i48VoVFi0Mz',
                    label: 'Dental issues',
                  },
                  {
                    id: 'SiYTDHIF6i8i',
                    label: 'Bleeding gums',
                  },
                  {
                    id: 'M4o8mSDEUTMQ',
                    label: 'Blood in stools',
                  },
                  {
                    id: 'Bxgs42cROa6E',
                    label: 'Cold sores',
                  },
                  {
                    id: 'Pl3B9FLSAuA8',
                    label: 'Fissures/cracking at corners of lips',
                  },
                  {
                    id: 'WDg6uC3Qww1N',
                    label: 'Difficulty swallowing',
                  },
                  {
                    id: 'KgSbIGqIUcBP',
                    label: 'Dry mouth',
                  },
                  {
                    id: 'eRezbcpNAHTS',
                    label: 'Foods "repeat" (reflux)',
                  },
                  {
                    id: 'ZU0bfC6Ini9h',
                    label: 'Hemorrhoids',
                  },
                  {
                    id: 'W8Opjk8Ja5EG',
                    label: 'Mucus in stools',
                  },
                  {
                    id: '5P2lSUROnuFP',
                    label: 'Sore tongue',
                  },
                  {
                    id: 'v2CAOwWtel7o',
                    label: 'Strong stool odor',
                  },
                  {
                    id: 'Lc95qErnwTHc',
                    label: 'Undigested food in stools',
                  },
                  {
                    id: 'wEDkAaTBvp0o',
                    label: 'None',
                  },
                ],
              },
              {
                id: 'CWOhOIA3d86z',
                title:
                  'How often do you have nausea - that is, a feeling like you could vomit?',
                type: 'multiple_choice',
                ref: '0db16e2d-aedc-4082-86c0-c79382d8f4cd',
                choices: [
                  {
                    id: 't0gds2EAYCNz',
                    label: 'Never',
                  },
                  {
                    id: 'feswJMQtNjdo',
                    label: 'Rarely',
                  },
                  {
                    id: 'emUcuqxDKSIX',
                    label: 'Sometimes',
                  },
                  {
                    id: 'b9rQOOsikRAS',
                    label: 'Often',
                  },
                  {
                    id: 'OFqNUcLrUFdY',
                    label: 'Always',
                  },
                ],
              },
              {
                id: 'Q0UNh6daHPIP',
                title:
                  'How often have you thrown up or vomited (in the past 7 days)?',
                type: 'multiple_choice',
                ref: '8b31fe1f-747e-45ec-9424-ad531b3bba67',
                choices: [
                  {
                    id: 'wJsyWhZOL8gx',
                    label: 'Never',
                  },
                  {
                    id: 'AiwrlVvJTJTe',
                    label: 'One day',
                  },
                  {
                    id: '2UvNNwyOBnWJ',
                    label: '2-6 days',
                  },
                  {
                    id: 'y4zFzwvKEFZU',
                    label: 'Once a day',
                  },
                  {
                    id: 'VF6mAkMnE0fS',
                    label: 'More than once a day',
                  },
                ],
              },
              {
                id: '6UlK5o0UP9im',
                title:
                  'How often have you had belly pain (in the past 7 days)?',
                type: 'multiple_choice',
                ref: '60d57423-9689-427f-9cad-7931cb7737e0',
                choices: [
                  {
                    id: 'REp5MZKLSrp6',
                    label: 'Never',
                  },
                  {
                    id: 'o7NZXXEzXgWL',
                    label: 'One day',
                  },
                  {
                    id: 'ZcXEGXVwTBsS',
                    label: '2-6 days',
                  },
                  {
                    id: 'Q40HqF8ykYrF',
                    label: 'Once a day',
                  },
                  {
                    id: '3Pn239f8CXj3',
                    label: 'More than once a day',
                  },
                ],
              },
              {
                id: 'fSzBfhri1oZ7',
                title:
                  'How often do you feel burning behind the breastbone/sternum (in the past 7 days)?',
                type: 'multiple_choice',
                ref: 'b11d4699-125e-4a12-a761-2fa65b00f2bd',
                choices: [
                  {
                    id: 'EN0pqjToJtbf',
                    label: 'Never',
                  },
                  {
                    id: '5Xdr5ayooSAK',
                    label: 'One day',
                  },
                  {
                    id: 'ywzNuxxx8Ber',
                    label: '2-6 days',
                  },
                  {
                    id: 'ozMF5F0a0TsO',
                    label: 'Once a day',
                  },
                  {
                    id: 'rWWhb1QMdjuF',
                    label: 'More than once a day',
                  },
                ],
              },
              {
                id: 'TPpcB5iBwD4m',
                title: 'How often do you feel burning in your throat?',
                type: 'multiple_choice',
                ref: '1605342b-bafa-4f74-b20e-4dac60ac4a5c',
                choices: [
                  {
                    id: 'zhyE3D4CCbXh',
                    label: 'Never',
                  },
                  {
                    id: 'yZ1JcAmYaHny',
                    label: 'Rarely',
                  },
                  {
                    id: 'qg7dTjiiZeg2',
                    label: 'Sometimes',
                  },
                  {
                    id: 'X6vXP5Qys4v8',
                    label: 'Often',
                  },
                  {
                    id: 'R9cqqv90KB4s',
                    label: 'Always',
                  },
                ],
              },
              {
                id: '8CB7JX5zHUpC',
                title: 'How often do you burp?',
                type: 'multiple_choice',
                ref: 'b9d0de4d-9f12-4af1-a649-5cff39cec6aa',
                choices: [
                  {
                    id: 'CC6VNc3xUCVm',
                    label: 'Never',
                  },
                  {
                    id: 'EDfizHI8LUA2',
                    label: 'One day',
                  },
                  {
                    id: 'hdalYlPNzsMh',
                    label: '2-6 days',
                  },
                  {
                    id: 'c4Vh4LjhRuR9',
                    label: 'Once a day',
                  },
                  {
                    id: '9w3ki8RpQGIF',
                    label: 'More than once a day',
                  },
                ],
              },
              {
                id: 'wTzWzqn0fP3G',
                title: 'How often do you feel bloated?',
                type: 'multiple_choice',
                ref: 'f5a9063d-8403-4c1f-9868-ecd9cfafdf53',
                choices: [
                  {
                    id: 'YhFYbWQ8F27t',
                    label: 'Never',
                  },
                  {
                    id: 'Y8rnIZk2FUIn',
                    label: 'Rarely',
                  },
                  {
                    id: '9jUZrnNO16On',
                    label: 'Sometimes',
                  },
                  {
                    id: 'l99gm7x0FA0Q',
                    label: 'Often',
                  },
                  {
                    id: 'gbDo76OfVmal',
                    label: 'Always',
                  },
                ],
              },
              {
                id: 'RnE1YziQycpF',
                title: 'In general, how severe was your bloating',
                type: 'multiple_choice',
                ref: '0b765603-f378-43d7-a916-c261f40ae27f',
                choices: [
                  {
                    id: 'SuRVsI8NQ7uK',
                    label: 'Not at all',
                  },
                  {
                    id: '15jUi0JpwzrH',
                    label: 'A little bit',
                  },
                  {
                    id: 'Iu078T36kudv',
                    label: 'Somewhat',
                  },
                  {
                    id: 'jwUqfKMjfqJ2',
                    label: 'Quite a bit',
                  },
                  {
                    id: 'wsHRFyfbBD9j',
                    label: 'Very much',
                  },
                ],
              },
              {
                id: 'omlvJlDqO3nk',
                title: 'How often do you pass gas?',
                type: 'multiple_choice',
                ref: '2741ed5f-033c-4b92-b007-f64978310ba2',
                choices: [
                  {
                    id: 'cOvX3zLcO8hX',
                    label: 'Never',
                  },
                  {
                    id: 'eRM8B1gDZN1H',
                    label: 'Only once or twice a day',
                  },
                  {
                    id: 'S6RNYxmvouAY',
                    label: 'About every 3-4 hours',
                  },
                  {
                    id: '34Tm7wjAZhkx',
                    label: 'About every 2 hours',
                  },
                  {
                    id: 'YAVAGo4T50QQ',
                    label: 'About every hour',
                  },
                ],
              },
              {
                id: '4Y7XFXPabsln',
                title: 'How often do you pass very hard or lumpy stools?',
                type: 'multiple_choice',
                ref: '57de29f6-450b-46bb-b640-4a8b8b6718ba',
                choices: [
                  {
                    id: '1nq16AYlmbtZ',
                    label: 'Never',
                  },
                  {
                    id: 'fcuQY1snEGqD',
                    label: 'One day',
                  },
                  {
                    id: 'SqFyxmxexPHA',
                    label: '2-6 days',
                  },
                  {
                    id: 'W7rW8jamTVoX',
                    label: 'Once a day',
                  },
                  {
                    id: 'RpLrhQfUvG1W',
                    label: 'More than once a day',
                  },
                ],
              },
              {
                id: 'zGvxOVVJ2eay',
                title:
                  'How often do you strain while trying to have bowel movements? ',
                type: 'multiple_choice',
                ref: 'babf0f97-31a2-47e6-a0ea-0aff5962f6ba',
                choices: [
                  {
                    id: 'jrCNjh7DaEGu',
                    label: 'Never',
                  },
                  {
                    id: 'Da8kcyXSKvw9',
                    label: 'Rarely',
                  },
                  {
                    id: 'nY0GvwyAVCdf',
                    label: 'Sometimes',
                  },
                  {
                    id: 'gBUEroFODgki',
                    label: 'Often',
                  },
                  {
                    id: 'wMuuxvbvGz2r',
                    label: 'Always',
                  },
                ],
              },
              {
                id: '3EJB9PDi1KoC',
                title:
                  'In a week, how many days do you have loose or watery stools?',
                type: 'multiple_choice',
                ref: '53088e70-b13a-4556-93fd-e9e50f46899f',
                choices: [
                  {
                    id: 'iTnIGdToW492',
                    label: 'No days',
                  },
                  {
                    id: 'AM4FTJvjLSDr',
                    label: '1 day',
                  },
                  {
                    id: 'RC1aDY2tJIpb',
                    label: '2 days',
                  },
                  {
                    id: 'VoTgehsFeOyU',
                    label: '3-5 days',
                  },
                  {
                    id: 'm5JgnfV3eIOY',
                    label: '6-7 days',
                  },
                ],
              },
              {
                id: 'rMH27kHegiKH',
                title:
                  'In a week, how often do you feel like you needed to empty your bowels right away or else you would have an accident? ',
                type: 'multiple_choice',
                ref: 'ac511438-697d-4ac7-aa60-e2b5ab7b1741',
                choices: [
                  {
                    id: 'kBHXrm3jEBFc',
                    label: 'Never',
                  },
                  {
                    id: '164tIsR3Qjhi',
                    label: 'One time during the past 7 days',
                  },
                  {
                    id: 'UvlfnrLNzFzS',
                    label: '2-6 times during the past 7 days',
                  },
                  {
                    id: '8WylEcR5IGOX',
                    label: 'Often once a day',
                  },
                  {
                    id: '73axK9qXJHq8',
                    label: 'More than once a day',
                  },
                ],
              },
              {
                id: 'areLpCEyuJrg',
                title:
                  'Which of the following have you experienced in the last 6 months? ',
                type: 'multiple_choice',
                allow_multiple_selections: true,
                ref: '489f31eb-face-4851-bae5-b5a433b09c23',
                choices: [
                  {
                    id: 'yo4BZv965k6Y',
                    label: 'Bad breath',
                  },
                  {
                    id: 'x5Llijc7RPuz',
                    label: 'Bad odor in the nose',
                  },
                  {
                    id: 'ch9QURkcW2ov',
                    label: 'Nose bleeds',
                  },
                  {
                    id: 'vQZkTwH3dPBf',
                    label: 'Post nasal drip',
                  },
                  {
                    id: 'aSgh0gmIw9Ye',
                    label: 'Snoring',
                  },
                  {
                    id: 'Jw8uyGSQehIT',
                    label: 'Wheezing',
                  },
                  {
                    id: 'M7pNo1lRnPtd',
                    label: 'None',
                  },
                ],
              },
              {
                id: 'rL7Rsbb9indY',
                title: 'I have difficulty breathing...',
                type: 'multiple_choice',
                ref: '8381b56f-abf2-49a4-8a9c-6703b4ea44bd',
                choices: [
                  {
                    id: '6eMvDts7mVYn',
                    label: 'Not at all',
                  },
                  {
                    id: 'xubONn0zWW31',
                    label: 'A little bit',
                  },
                  {
                    id: '5l77lzhbRqbd',
                    label: 'Somewhat',
                  },
                  {
                    id: '5jqMlJ9KbU8j',
                    label: 'Quite a bit',
                  },
                  {
                    id: 'zBbljBRz8ekO',
                    label: 'Very much',
                  },
                ],
              },
              {
                id: 'GmLE58zXmcHJ',
                title: 'I experience chest congestion',
                type: 'multiple_choice',
                ref: '1413c104-79b0-4820-a8ea-f320cda324a2',
                choices: [
                  {
                    id: 'MKDs0Ru3Nmvn',
                    label: 'Never',
                  },
                  {
                    id: 'TDOi3zvq5cQ2',
                    label: 'Rarely',
                  },
                  {
                    id: 'XGSea5K6MpEk',
                    label: 'Sometimes',
                  },
                  {
                    id: 'dSjPT3lN3vxg',
                    label: 'Often',
                  },
                  {
                    id: 'fu1mjg1ZRlx1',
                    label: 'Always',
                  },
                ],
              },
              {
                id: 'HiddsvT2fH5o',
                title: 'I experience asthma or bronchitis',
                type: 'multiple_choice',
                ref: '350cc9e8-a106-45e2-beaa-786ed6aa56c4',
                choices: [
                  {
                    id: 'yUv9xEr5vGSF',
                    label: 'Never',
                  },
                  {
                    id: 'r3CvI9VinhGV',
                    label: 'Rarely',
                  },
                  {
                    id: 'TfMSAAfEgUq8',
                    label: 'Sometimes',
                  },
                  {
                    id: 'u4Vp31tnshaW',
                    label: 'Often',
                  },
                  {
                    id: '6QMlSfJza2A9',
                    label: 'Always',
                  },
                ],
              },
              {
                id: 'oFcDRlb5OIXV',
                title:
                  'Which of the following have you experienced in the last 6 months? ',
                type: 'multiple_choice',
                allow_multiple_selections: true,
                ref: 'd611a339-b294-47d3-ac9c-3a04dd90ef7c',
                choices: [
                  {
                    id: 'w9m7KxENqqIp',
                    label: 'Agoraphobia',
                  },
                  {
                    id: 'jsQu0K6Ix9xf',
                    label: 'Auditory hallucinations',
                  },
                  {
                    id: 'fUNDcYA6S5nb',
                    label: 'Fainting',
                  },
                  {
                    id: '5o7Q9RZVR5B8',
                    label: 'Fearfulness',
                  },
                  {
                    id: 'HU7KniUXP3rT',
                    label: 'Panic attacks',
                  },
                  {
                    id: 'udfyBlyOlm9f',
                    label: 'Tremor/trembling',
                  },
                  {
                    id: 'kDXHg3yNJPRn',
                    label: 'None',
                  },
                ],
              },
              {
                id: '1WmN2vozw9U0',
                title: 'I feel fatigued',
                type: 'multiple_choice',
                ref: '53da3c0c-8591-48f0-b0c9-0cae7721c1b7',
                choices: [
                  {
                    id: '3wWqJbluDsv5',
                    label: 'Not at all',
                  },
                  {
                    id: 'rMoeKWWyWXlC',
                    label: 'A little bit',
                  },
                  {
                    id: 'SmBYTqAzBWjB',
                    label: 'Somewhat',
                  },
                  {
                    id: 'Y7DY3Sooz2mz',
                    label: 'Quite a bit',
                  },
                  {
                    id: 'jSsX3v88IqCD',
                    label: 'Very much',
                  },
                ],
              },
              {
                id: 'NiXxtvN7upbQ',
                title: 'I have trouble concentrating...',
                type: 'multiple_choice',
                ref: '5427110e-6da6-4e11-b40f-08747b1acc34',
                choices: [
                  {
                    id: 'e60pOmv3OA9b',
                    label: 'Never',
                  },
                  {
                    id: 'LrI0cwynUjCF',
                    label: 'Rarely (once)',
                  },
                  {
                    id: 'hpCxpXQn09Es',
                    label: 'Sometimes (2-3 times)',
                  },
                  {
                    id: 'oVi0IUsQQj49',
                    label: 'Often (once a day)',
                  },
                  {
                    id: 'g6AkvSwa60cI',
                    label: 'Very often (several times a day)',
                  },
                ],
              },
              {
                id: '2Qals9TmONhX',
                title:
                  'I have to work really hard to pay attention or I would make a mistake...',
                type: 'multiple_choice',
                ref: 'c914242c-c558-4398-b448-0e74bcde2d38',
                choices: [
                  {
                    id: 'Xlu224CWVbdF',
                    label: 'Never',
                  },
                  {
                    id: 'cGkfdBZSXyF2',
                    label: 'Rarely (once)',
                  },
                  {
                    id: 'UG05h26YaAf9',
                    label: 'Sometimes (2-3 times)',
                  },
                  {
                    id: 'L20zn4Gw98ew',
                    label: 'Often (once a day)',
                  },
                  {
                    id: 'umxHEmwCYpjz',
                    label: 'Very often (several times a day)',
                  },
                ],
              },
              {
                id: 'QohrFKWmXcvf',
                title:
                  'I have been able to remember things as easily as usual without extra effort...',
                type: 'multiple_choice',
                ref: '0854a0d5-3ca8-4a48-a7d9-cbc2ab1b5303',
                choices: [
                  {
                    id: 'rBAjcHl6R8dl',
                    label: 'Not at all',
                  },
                  {
                    id: 'JzLfWzeCkx0X',
                    label: 'A little bit',
                  },
                  {
                    id: '0vRV4zMLVT2y',
                    label: 'Somewhat',
                  },
                  {
                    id: 'laeRYVsjjEtg',
                    label: 'Quite a bit',
                  },
                  {
                    id: 'f19VtxpFprCd',
                    label: 'Very much',
                  },
                ],
              },
              {
                id: 'E1xNljbl2YMR',
                title:
                  'I have been able to bring to mind words that I wanted to use while talking to someone...',
                type: 'multiple_choice',
                ref: 'c2647099-ca25-451d-91e2-ca559f6a4155',
                choices: [
                  {
                    id: 'TRS3ACSJzHoL',
                    label: 'Not at all',
                  },
                  {
                    id: 'k5qKBvp19WEX',
                    label: 'A little bit',
                  },
                  {
                    id: 'KU4GJnpcn9Ex',
                    label: 'Somewhat',
                  },
                  {
                    id: '1ZRZboIiH6Cw',
                    label: 'Quite a bit',
                  },
                  {
                    id: '1d7U959NqEsy',
                    label: 'Very much',
                  },
                ],
              },
              {
                id: 'Mso73Y6Hf7so',
                title: 'How often did you slur your words when you spoke?',
                type: 'multiple_choice',
                ref: '3046899e-1f3f-4809-be8e-1d6440e17589',
                choices: [
                  {
                    id: 'ZoIVV2J0Ida3',
                    label: 'Never',
                  },
                  {
                    id: 'I2OpAXNFRj33',
                    label: 'Rarely',
                  },
                  {
                    id: 'sma77oiQKWTm',
                    label: 'Sometimes',
                  },
                  {
                    id: 'HqduKdPANmZ1',
                    label: 'Often',
                  },
                  {
                    id: 'SgnBfrg18Jhx',
                    label: 'Always',
                  },
                ],
              },
              {
                id: 'NUYtu8FydRv4',
                title:
                  'How often has poor coordination impacted your ability to participate in daily activities? ',
                type: 'multiple_choice',
                ref: 'a2425280-050b-41e5-82b3-d56744db4c3b',
                choices: [
                  {
                    id: 'Iq88pdIoxUyU',
                    label: 'Never',
                  },
                  {
                    id: 'CrgBoxe27MF9',
                    label: 'Rarely',
                  },
                  {
                    id: 'GYZvRjZzvNUz',
                    label: 'Sometimes',
                  },
                  {
                    id: 'tmMaKrp972Ru',
                    label: 'Often',
                  },
                  {
                    id: 'AJHdwx0bViCs',
                    label: 'Always',
                  },
                ],
              },
              {
                id: 'PLln1q1DbvZH',
                title:
                  'How often in your life have you had a headache or migraine?',
                type: 'multiple_choice',
                ref: 'e599738a-87c8-451c-8c48-ba71522d17c0',
                choices: [
                  {
                    id: 'dESbTXxyfBF3',
                    label: 'Never',
                  },
                  {
                    id: 'GQTF4SGZBc3i',
                    label: 'Infrequent',
                  },
                  {
                    id: 'x6R0B4w0QYc1',
                    label: 'Frequent',
                  },
                  {
                    id: 'nNwESQnlgISi',
                    label: 'Chronic',
                  },
                ],
              },
              {
                id: 'T9oWBTESPK5M',
                title:
                  'How often in your life have you experienced light-headedness or swimming sensation in the head?',
                type: 'multiple_choice',
                ref: '832fc74d-5ff4-453e-8458-d879636f5187',
                choices: [
                  {
                    id: 's5A2GxtbsD5O',
                    label: 'Never',
                  },
                  {
                    id: 'BReyw7ELYcE8',
                    label: 'Infrequent',
                  },
                  {
                    id: 'SGX3NNlE0C26',
                    label: 'Frequent',
                  },
                  {
                    id: 'bEaRCCI9m09e',
                    label: 'Chronic',
                  },
                ],
              },
              {
                id: 'KmlWFn65eSaz',
                title:
                  'Which symptoms have you experienced in the last 6 months? ',
                type: 'multiple_choice',
                allow_multiple_selections: true,
                ref: 'b31f954f-ddcc-4b06-9a0c-c553a1d90da1',
                choices: [
                  {
                    id: 'BrUQtOWnPeB0',
                    label: 'Conjunctivitis',
                  },
                  {
                    id: '2b5QOJoXnVLD',
                    label: 'Distorted sense of smell',
                  },
                  {
                    id: 'zweYehroCaBX',
                    label: 'Distorted taste',
                  },
                  {
                    id: 'QB6oOhQjjseV',
                    label: 'Eye crusting',
                  },
                  {
                    id: 'SHyXPscekJmm',
                    label: 'Sensitivity to loud noises',
                  },
                  {
                    id: 'Sc6uyPF1p3wM',
                    label: 'None',
                  },
                ],
              },
              {
                id: 'WxrEN36oX500',
                title:
                  'How often have you experienced double or blurred vision?',
                type: 'multiple_choice',
                ref: '172a5057-4b0b-409b-b3a9-62aceb9028b6',
                choices: [
                  {
                    id: 'Ez3qvVZ7qb9J',
                    label: 'Never',
                  },
                  {
                    id: 'uVat6Htm787v',
                    label: 'Infrequent',
                  },
                  {
                    id: 'CR2mRVM1XDCe',
                    label: 'Frequent',
                  },
                  {
                    id: 'vLGG1HB71CXG',
                    label: 'Chronic',
                  },
                ],
              },
              {
                id: 'k54gRKrCl95P',
                title: 'How often do you experience difficulty in hearing?',
                type: 'multiple_choice',
                ref: 'f9d29b4a-8b4a-4ff8-bcdf-ac4508675f53',
                choices: [
                  {
                    id: '57gmLrDYXCZ4',
                    label: 'Never',
                  },
                  {
                    id: 'LXw5HToeEWtg',
                    label: 'Infrequent',
                  },
                  {
                    id: 'FOOEr215TJbx',
                    label: 'Frequent',
                  },
                  {
                    id: 'U345kwxUUS8a',
                    label: 'Chronic',
                  },
                ],
              },
              {
                id: 'JFj8hvrSCuZ9',
                title:
                  'How often do you experience noise or ringing from your ears?',
                type: 'multiple_choice',
                ref: 'ef3e4c2a-d923-424e-99d6-c64d165de623',
                choices: [
                  {
                    id: 'SpprIKnmlfV4',
                    label: 'Never',
                  },
                  {
                    id: 'aASeB06cvXaO',
                    label: 'Infrequent',
                  },
                  {
                    id: 'QXqBXa8xC8jP',
                    label: 'Frequent',
                  },
                  {
                    id: 'yZtdcP5EQ5Pl',
                    label: 'Chronic',
                  },
                ],
              },
              {
                id: 'rq1ZYXXILWCg',
                title: 'How often do you experience pain in your ears?',
                type: 'multiple_choice',
                ref: '87d22ce0-2af7-4136-9c9c-ea559ed9cfff',
                choices: [
                  {
                    id: 'Kqkz41iKCbyS',
                    label: 'Never',
                  },
                  {
                    id: 'StVALhAUQal2',
                    label: 'Infrequent',
                  },
                  {
                    id: 'JoGlLw9w2YNS',
                    label: 'Frequent',
                  },
                  {
                    id: 'uDVrYLuMKQjX',
                    label: 'Chronic',
                  },
                ],
              },
              {
                id: 'sc5gmnvCc7XS',
                title:
                  'How often do you experience in fullness or stuffiness your ears?',
                type: 'multiple_choice',
                ref: '8e6f8c44-bf56-46ca-b61c-5727bf9151e5',
                choices: [
                  {
                    id: 'DptaCBYSkiqv',
                    label: 'Never',
                  },
                  {
                    id: 'DHnjsK5LquTe',
                    label: 'Infrequent',
                  },
                  {
                    id: 'qkTy8tbIpBhB',
                    label: 'Frequent',
                  },
                  {
                    id: 'GwwkOX6uyFut',
                    label: 'Chronic',
                  },
                ],
              },
              {
                id: 'd0mRSxYt0Su7',
                title: 'How often do you experience discharge from your ears?',
                type: 'multiple_choice',
                ref: '726f772f-fd32-4c4d-b32d-cc0b67e3b845',
                choices: [
                  {
                    id: 'ZktgZAwhgeMB',
                    label: 'Never',
                  },
                  {
                    id: 'B51OHP7c4IbI',
                    label: 'Infrequent',
                  },
                  {
                    id: 'arciLUnvLVDA',
                    label: 'Frequent',
                  },
                  {
                    id: 'UF69GHp6RlJb',
                    label: 'Chronic',
                  },
                ],
              },
              {
                id: 'ZYRsLsOPhTOs',
                title: 'How often do you experience itchiness from your ears?',
                type: 'multiple_choice',
                ref: '1657dd66-9dcb-4fae-a9d8-97bef90a9298',
                choices: [
                  {
                    id: 'CepaoDLXQubG',
                    label: 'Never',
                  },
                  {
                    id: 'keghdg51V5nJ',
                    label: 'Infrequent',
                  },
                  {
                    id: '7olchjkFzEZg',
                    label: 'Frequent',
                  },
                  {
                    id: 'N0Zvb9FL0jMT',
                    label: 'Chronic',
                  },
                ],
              },
              {
                id: 'H7Lpfm5OZl9H',
                title:
                  'In the past month, how often did your eyes feel discomfort (itchiness, pain, etc)?',
                type: 'multiple_choice',
                ref: 'e0edef73-2eb9-484a-8f67-3b36f8db80fa',
                choices: [
                  {
                    id: 'eectLBoeWXtQ',
                    label: 'Never',
                  },
                  {
                    id: '1n4k7iUgfxUF',
                    label: 'Rarely',
                  },
                  {
                    id: 'IDGEgRwRz3Ws',
                    label: 'Somtimes',
                  },
                  {
                    id: '2yL6012YAm5C',
                    label: 'Frequently',
                  },
                  {
                    id: 'Sl0RUtvzcRl9',
                    label: 'Constantly',
                  },
                ],
              },
              {
                id: 'qU20dLnZIFoH',
                title:
                  'In the past month, how often did your eyes look or feel excessively watery?',
                type: 'multiple_choice',
                ref: 'be0d3212-6d8d-46a3-8bf1-ee716e6eab16',
                choices: [
                  {
                    id: 'BRhwud82n074',
                    label: 'Never',
                  },
                  {
                    id: 'aFQ133wdoYfy',
                    label: 'Rarely',
                  },
                  {
                    id: 'NP9iagBLvOJt',
                    label: 'Somtimes',
                  },
                  {
                    id: 'oQ3TfPuf0pQc',
                    label: 'Frequently',
                  },
                  {
                    id: 'cFgG9INI4bAt',
                    label: 'Constantly',
                  },
                ],
              },
              {
                id: 'FOrSbkQlVUl5',
                title:
                  'How often do you experience swollen, reddened, or sticky eyelids?',
                type: 'multiple_choice',
                ref: 'e68bde20-b384-4b33-838b-a06669a4e035',
                choices: [
                  {
                    id: '0lbOe3jwncVZ',
                    label: 'Never',
                  },
                  {
                    id: '0ChLWi4R8bx7',
                    label: 'Rarely',
                  },
                  {
                    id: 'YFkbP1r3xPoF',
                    label: 'Somtimes',
                  },
                  {
                    id: 'Juf1ga0Qfcpz',
                    label: 'Frequently',
                  },
                  {
                    id: 'csOvOxjhPGw2',
                    label: 'Constantly',
                  },
                ],
              },
              {
                id: 'BvD1dcKCo9NI',
                title:
                  'How often do you notice dark circles or bags under your eyes?',
                type: 'multiple_choice',
                ref: 'f7128bc2-5711-4f35-8ce6-577c2f92e903',
                choices: [
                  {
                    id: 'YgI55Zhxw11r',
                    label: 'Never',
                  },
                  {
                    id: 'ToRUqXIve29a',
                    label: 'Rarely',
                  },
                  {
                    id: 'fYOrveoYw6li',
                    label: 'Somtimes',
                  },
                  {
                    id: '47aDOduvHHK2',
                    label: 'Frequently',
                  },
                  {
                    id: 'L75H9xwGjcCu',
                    label: 'Constantly',
                  },
                ],
              },
              {
                id: 'jCFtI5cTVKyr',
                title:
                  'Which of the following have you experienced in the last 6 months? ',
                type: 'multiple_choice',
                allow_multiple_selections: true,
                ref: '6dba393c-4bfe-42c5-b4d1-246d8f67b930',
                choices: [
                  {
                    id: 'a3mM4SN9wDSe',
                    label: 'Bed wetting',
                  },
                  {
                    id: '724zdkYtszCC',
                    label: 'Urinary hesitancy',
                  },
                  {
                    id: 'Qe2F9PM7Hniu',
                    label: 'UTI',
                  },
                  {
                    id: 'yz8znHIANIKD',
                    label: 'Kidney disease',
                  },
                  {
                    id: 'J0VojEQUwzwe',
                    label: 'Kidney stone',
                  },
                  {
                    id: 'rATDE1QOQ6G5',
                    label: 'Incontinence/Leaking',
                  },
                  {
                    id: 'zBmyBC0YynZn',
                    label: 'None',
                  },
                ],
              },
              {
                id: 'jlx32ZcJMwQV',
                title:
                  'Which of the following have you experienced in the last 6 months? ',
                type: 'multiple_choice',
                allow_multiple_selections: true,
                ref: 'b3de3ade-a651-40d1-a9b5-fdf8b28d83fc',
                choices: [
                  {
                    id: 'C3OCN5mkxZXZ',
                    label: 'Change in sex drive',
                  },
                  {
                    id: 'FM3W4RaaMQZB',
                    label: 'Difficulty obtaining/maintaining an erection',
                  },
                  {
                    id: '36gltXMpm8wZ',
                    label: 'Ejaculation problems',
                  },
                  {
                    id: 'AK5uAqa3KUxQ',
                    label: 'Impotence',
                  },
                  {
                    id: 'qNTQg48i9XlD',
                    label: 'Infection',
                  },
                  {
                    id: 'klrZuE2yeSIm',
                    label: 'Lump in testicles',
                  },
                  {
                    id: 'Eradi4k8csRe',
                    label: 'Premature ejaculation',
                  },
                  {
                    id: 'XxAEbACuSiVO',
                    label: 'Prostate enlargement / infection',
                  },
                  {
                    id: 'U2I0pTFHwIEm',
                    label: 'Testicular mass/pain',
                  },
                  {
                    id: 'yfl8sAkYIa1s',
                    label: 'Unusual discharge from penis',
                  },
                  {
                    id: 'bda9bq7EbpAi',
                    label: 'None/Not relevant to my gender',
                  },
                ],
              },
              {
                id: 'yJoWwPJTCcYu',
                title:
                  'Which of the following have you experienced in the last 6 months? ',
                type: 'multiple_choice',
                allow_multiple_selections: true,
                ref: '3c4de0f7-5bf9-47b7-b52a-6e4ccb6b9927',
                choices: [
                  {
                    id: 'YmFmW29pR7Yh',
                    label: 'Breast cysts, lumps, tenderness',
                  },
                  {
                    id: 'u5yyhg3foHy0',
                    label: 'Endometriosis',
                  },
                  {
                    id: 'LkQXOziK5CIa',
                    label: 'Infertility',
                  },
                  {
                    id: '0a4WPsOa0T3w',
                    label: 'Fibroids',
                  },
                  {
                    id: '2HlKNQHv96vI',
                    label: 'Ovarian cysts',
                  },
                  {
                    id: 'XGKFyw4Uw4MH',
                    label: 'PCOS',
                  },
                  {
                    id: 'bm6siQa3i3I6',
                    label: 'Pelvic inflammatory disease',
                  },
                  {
                    id: 'RHsQvACE0bOQ',
                    label: 'Poor libido',
                  },
                  {
                    id: 'Zk44DNIKJaq8',
                    label: 'Vaginal dryness',
                  },
                  {
                    id: 'zkOcBRaHFJaV',
                    label: 'Vaginal infection',
                  },
                  {
                    id: 'Z0Pk2Lx76IJ0',
                    label: 'None/Not relevant to my gender',
                  },
                ],
              },
              {
                id: 'GNVNjUeE02zG',
                title:
                  'How often do you experience frequent, painful, or urgent urination?',
                type: 'multiple_choice',
                ref: 'ae6ac64b-2e56-417c-a4fe-73ddd8e779ba',
                choices: [
                  {
                    id: 'IesU72EEfUt8',
                    label: 'Never',
                  },
                  {
                    id: 'eU4JrkiD1lOi',
                    label: 'Rarely',
                  },
                  {
                    id: 'QlcSCgtO3DNG',
                    label: 'Sometimes',
                  },
                  {
                    id: '7a44d2h7GYJb',
                    label: 'Often',
                  },
                  {
                    id: '8KVDdlDaXKcJ',
                    label: 'Always',
                  },
                ],
              },
              {
                id: 'nJktDgMvTPGw',
                title:
                  'How often do you experience genital itch or abnormal discharge?',
                type: 'multiple_choice',
                ref: '838899f2-64ec-4f65-85f9-45bc27b45ca8',
                choices: [
                  {
                    id: 'DnVwGGf3tABF',
                    label: 'Never',
                  },
                  {
                    id: 'pCEfu5luVjW6',
                    label: 'Rarely',
                  },
                  {
                    id: 'fnPISpHAV28Z',
                    label: 'Sometimes',
                  },
                  {
                    id: 'yPBrTb6OsmD5',
                    label: 'Often',
                  },
                  {
                    id: 'g5bhIi17mwdM',
                    label: 'Always',
                  },
                ],
              },
              {
                id: '8Sm3QeZ2lyfj',
                title:
                  'Which of the following have you experienced with your nails in the last 6 months? ',
                type: 'multiple_choice',
                allow_multiple_selections: true,
                ref: 'e703b833-9ae8-4d52-a539-3e7101aeeb37',
                choices: [
                  {
                    id: 'ZEtgmw8bWp6V',
                    label: 'Brittle',
                  },
                  {
                    id: 'rt7qZiGxvMmO',
                    label: 'Curved up',
                  },
                  {
                    id: 'zykGwQ6Brltl',
                    label: 'Frayed',
                  },
                  {
                    id: 'VmKDcZn8KcNm',
                    label: 'Fungus',
                  },
                  {
                    id: 'CPuNkZNhg3Gv',
                    label: 'Pitting',
                  },
                  {
                    id: 'mOKG1jDxBjaI',
                    label: 'Ragged cuticles',
                  },
                  {
                    id: 'hB7eTMLWifDZ',
                    label: 'Ridges',
                  },
                  {
                    id: 'J32wIlWbVD8f',
                    label: 'Softness',
                  },
                  {
                    id: 'CGiOQoPVGRDH',
                    label: 'White spots/lines',
                  },
                  {
                    id: 'KyrLOyV8lG82',
                    label: 'None',
                  },
                ],
              },
              {
                id: '0NSE8KmcCy8Q',
                title: 'In the past 6 months have you had dryness of...',
                type: 'multiple_choice',
                allow_multiple_selections: true,
                ref: 'fca46497-4ccd-4d47-ad77-bcb867b65c2b',
                choices: [
                  {
                    id: '2DtRkcyM5YVx',
                    label: 'Eyes',
                  },
                  {
                    id: '292NmcRjbthd',
                    label: 'Feet',
                  },
                  {
                    id: 'qekbGRPPhxtx',
                    label: 'Hair',
                  },
                  {
                    id: 'EEgkRbvXCIbh',
                    label: 'Hands',
                  },
                  {
                    id: 'URnCEQFHUvTx',
                    label: 'Mouth/throat',
                  },
                  {
                    id: 'Fjv2iSh6Ubil',
                    label: 'Scalp',
                  },
                  {
                    id: 'pKEqgf4cMDj5',
                    label: 'Dryness in general',
                  },
                  {
                    id: '27DWxkSFHjYB',
                    label: 'None',
                  },
                ],
              },
              {
                id: 'ZSxVpG3PQLud',
                title:
                  'Which of the following have you experienced in the last 6 months? ',
                type: 'multiple_choice',
                allow_multiple_selections: true,
                ref: 'afa2a6f8-0057-41dc-9e10-5967c8c53fb6',
                choices: [
                  {
                    id: 'QHBrIYdHnHws',
                    label: 'Facial acne',
                  },
                  {
                    id: 'D5Em0yClJt3F',
                    label: 'Athlete\'s foot',
                  },
                  {
                    id: 'vm16xOIuUr7d',
                    label: 'Bumps on the back of the upper arms',
                  },
                  {
                    id: 'LulD7Mprj0TF',
                    label: 'Cellulite',
                  },
                  {
                    id: '9gNRooUfrbjg',
                    label: 'Easy bruising',
                  },
                  {
                    id: 'IinF3eMvcnXE',
                    label: 'Eczema',
                  },
                  {
                    id: 'hxe6uWkbt5xv',
                    label: 'Jock itch',
                  },
                  {
                    id: 'RKvfveedscQz',
                    label: 'Moles with color/size change',
                  },
                  {
                    id: 'fkMTGmAaj0lO',
                    label: 'Oily skin',
                  },
                  {
                    id: 'DUtxDRRiZM3T',
                    label: 'Patchy dullness',
                  },
                  {
                    id: 'OBIvroHeb0YZ',
                    label: 'Psoriasis',
                  },
                  {
                    id: 'j1Qd2ZUwBNtE',
                    label: 'Rash',
                  },
                  {
                    id: 'udkmZs4MTeZE',
                    label: 'Red face',
                  },
                  {
                    id: 'Iu6WwM1166ub',
                    label: 'Shingles',
                  },
                  {
                    id: 'ugOXc9T0Qn1W',
                    label: 'Skin darkening',
                  },
                  {
                    id: '1Ec7w7NHfwEt',
                    label: 'Strong body odor',
                  },
                  {
                    id: 'twB4KBInsKRv',
                    label: 'Vitiligo',
                  },
                  {
                    id: 'XkgQM3u9wkWc',
                    label: 'Thick calluses',
                  },
                  {
                    id: 'LispWZoK7WL4',
                    label: 'Rosacea',
                  },
                  {
                    id: 'XttEpdRLWHg8',
                    label: 'None',
                  },
                ],
              },
              {
                id: 'EBcSUTMbJkeK',
                title: 'How often do you experience acne?',
                type: 'multiple_choice',
                ref: '2dec062e-994b-442a-b8fa-61048ea99c95',
                choices: [
                  {
                    id: 'ahvAcP46vD10',
                    label: 'Never',
                  },
                  {
                    id: '1QzUJNlldhT7',
                    label: 'Rarely',
                  },
                  {
                    id: 'mmefTijHabLW',
                    label: 'Sometimes',
                  },
                  {
                    id: 'b6Wzub3VSiPI',
                    label: 'Often',
                  },
                  {
                    id: 'tChqeE2dsddz',
                    label: 'Always',
                  },
                ],
              },
              {
                id: 'FFoEQMFTCu6N',
                title: 'How often do you experience excessive hair loss?',
                type: 'multiple_choice',
                ref: '04a70de3-4192-4ea0-8eb2-adb3146f3f3a',
                choices: [
                  {
                    id: 'xVFA3LUvvLFI',
                    label: 'Never',
                  },
                  {
                    id: 'FUzvoMdWrVMa',
                    label: 'Rarely',
                  },
                  {
                    id: 'ajZl0kp4XjnP',
                    label: 'Sometimes',
                  },
                  {
                    id: 'v9veUDZwlcRm',
                    label: 'Often',
                  },
                  {
                    id: 'HynSZfHAEbge',
                    label: 'Always',
                  },
                ],
              },
              {
                id: 'wFPbk2s8bu4z',
                title:
                  'How often do you experience flushing and/or hot flashes?',
                type: 'multiple_choice',
                ref: '2452c0a7-ecfd-4ae5-98f4-ee8158420345',
                choices: [
                  {
                    id: 'fllvmjtDJofj',
                    label: 'Never',
                  },
                  {
                    id: 'HeCroCGowgKc',
                    label: 'Rarely',
                  },
                  {
                    id: 'C2MrxDDAA3yQ',
                    label: 'Sometimes',
                  },
                  {
                    id: '889pPOVt9prr',
                    label: 'Often',
                  },
                  {
                    id: 'xr2J9dhWYwsg',
                    label: 'Always',
                  },
                ],
              },
              {
                id: 'KKWmN4HiBwba',
                title: 'How often do you experience excessive sweating?',
                type: 'multiple_choice',
                ref: '0a482be0-77d8-4fe1-8d90-29972360443a',
                choices: [
                  {
                    id: 'ZE9rwYCVdIe0',
                    label: 'Never',
                  },
                  {
                    id: 'iU3oG8qGHiW6',
                    label: 'Rarely',
                  },
                  {
                    id: 'OSCSLi48xKUy',
                    label: 'Sometimes',
                  },
                  {
                    id: 'u2RP0S5GQKrN',
                    label: 'Often',
                  },
                  {
                    id: 'flvNGWxxKTrk',
                    label: 'Always',
                  },
                ],
              },
              {
                id: 'DRYPRYOXpR77',
                title:
                  'Which of the following have you experienced in the last 6 months? ',
                type: 'multiple_choice',
                allow_multiple_selections: true,
                ref: '92f27acb-03e6-47c6-ad07-4dcba989efa7',
                choices: [
                  {
                    id: 'Q1SKIbvOzLNS',
                    label: 'Heart attack',
                  },
                  {
                    id: 'vcUAxRvgMAif',
                    label: 'Heart murmur',
                  },
                  {
                    id: 'bolZJDmnhEAZ',
                    label: 'High blood pressure',
                  },
                  {
                    id: 'HflnPGgxDvRZ',
                    label: 'Varicose veins',
                  },
                  {
                    id: 'mQWoOHKyWsQm',
                    label: 'None',
                  },
                ],
              },
              {
                id: 'LBAdT2g2NR93',
                title:
                  'Cardio - How often does your heart randomly race or feel like it\'s pounding out of your chest?',
                type: 'multiple_choice',
                ref: '5f504755-a045-4e34-98c0-9f01ef01f22a',
                choices: [
                  {
                    id: '0vPUgvihkRvm',
                    label: 'Never',
                  },
                  {
                    id: 'Fn65DtR1FQRX',
                    label: 'Rarely',
                  },
                  {
                    id: 'sqX9xPWkp8Yr',
                    label: 'Sometimes',
                  },
                  {
                    id: 'FRU0HkPkWlVC',
                    label: 'Often',
                  },
                  {
                    id: 'i1CPpHAbtzZw',
                    label: 'Always',
                  },
                ],
              },
              {
                id: 'aoqTUlNtSHkK',
                title:
                  'How often do you experience an irregular or skipped heartbeat?',
                type: 'multiple_choice',
                ref: '7538d0be-af10-451f-814e-7ef826fd5618',
                choices: [
                  {
                    id: 'A5Q2fByzesuA',
                    label: 'Never',
                  },
                  {
                    id: 'yHRgaHbgWOGj',
                    label: 'Rarely',
                  },
                  {
                    id: '9oImHtW3wGfg',
                    label: 'Sometimes',
                  },
                  {
                    id: 'VTDrpQcChpT3',
                    label: 'Often',
                  },
                  {
                    id: 'b3qc9I6uIrHk',
                    label: 'Always',
                  },
                ],
              },
              {
                id: 'UGIcuCxjZudV',
                title: 'How often do you experience chest pain?',
                type: 'multiple_choice',
                ref: '39c626cc-4654-47e5-943f-8b4f2c093af4',
                choices: [
                  {
                    id: 'YQ9m1DUFCKW1',
                    label: 'Never',
                  },
                  {
                    id: '7T1KQZGaoAZA',
                    label: 'Rarely',
                  },
                  {
                    id: 'AWFBZJHEFdTb',
                    label: 'Sometimes',
                  },
                  {
                    id: '5A3Oix0yWG5N',
                    label: 'Often',
                  },
                  {
                    id: '70uaqFxvZYya',
                    label: 'Always',
                  },
                ],
              },
              {
                id: 'qfsRBGU4nBbC',
                title: 'I have difficulty falling asleep...',
                type: 'multiple_choice',
                ref: '41b74e5d-b495-4e4c-8bfb-e2a0ec16427b',
                choices: [
                  {
                    id: 'hsMZb6q7IVTG',
                    label: 'Not at all',
                  },
                  {
                    id: 'R6ab7VsO7Msp',
                    label: 'A little bit',
                  },
                  {
                    id: 'Z2syhDrVxig9',
                    label: 'Somewhat',
                  },
                  {
                    id: 'iLzbseB38KQb',
                    label: 'Quite a bit',
                  },
                  {
                    id: 'Y7LkYBLLd7Cy',
                    label: 'Very much',
                  },
                ],
              },
              {
                id: 'Nybku5mENT2X',
                title: 'I feel anxious',
                type: 'multiple_choice',
                ref: '19ea123f-e451-4204-8605-898db935a005',
                choices: [
                  {
                    id: 'T0m6K8qVYB2h',
                    label: 'Never',
                  },
                  {
                    id: 'CC2UfhtGl0nP',
                    label: 'Rarely',
                  },
                  {
                    id: 'LGLVRirnWh8V',
                    label: 'Sometimes',
                  },
                  {
                    id: 'vyqwkjNkhbeV',
                    label: 'Often',
                  },
                  {
                    id: '1THKuc3cATRv',
                    label: 'Always',
                  },
                ],
              },
              {
                id: 'kcQzyF8Yenk8',
                title: 'I feel depressed',
                type: 'multiple_choice',
                ref: '886d8683-6470-4088-8ad0-109e4e5295fb',
                choices: [
                  {
                    id: 'QyfWR8RqX7fe',
                    label: 'Never',
                  },
                  {
                    id: 'SixYbphbCY1k',
                    label: 'Rarely',
                  },
                  {
                    id: 'OH9fROAA4BXQ',
                    label: 'Sometimes',
                  },
                  {
                    id: 'HcZ314olJeOz',
                    label: 'Often',
                  },
                  {
                    id: 'UJHlcmf35QbF',
                    label: 'Always',
                  },
                ],
              },
              {
                id: 'aXc8Aj3Ry0v4',
                title: 'I feel angry...',
                type: 'multiple_choice',
                ref: 'be2a1d0d-caa8-471e-bf6a-8fe2a6d3664b',
                choices: [
                  {
                    id: 'Uf468iqxZfy7',
                    label: 'Never',
                  },
                  {
                    id: 'UbuJRJ1GQUDy',
                    label: 'Rarely',
                  },
                  {
                    id: 'OiwU9tKc8g7p',
                    label: 'Sometimes',
                  },
                  {
                    id: 'aSEDYss2L6fw',
                    label: 'Often',
                  },
                  {
                    id: 'WgoUOEzoBtij',
                    label: 'Always',
                  },
                ],
              },
              {
                id: 'CeoVg1fqK5CV',
                title: 'How often do you experience mood swings?',
                type: 'multiple_choice',
                ref: 'f7041865-8471-41ff-ae91-f01304a463a3',
                choices: [
                  {
                    id: 'whKEbC8NMjLt',
                    label: 'Never',
                  },
                  {
                    id: '7axFuLVOqtUX',
                    label: 'Rarely',
                  },
                  {
                    id: '9qOc09pzrvYh',
                    label: 'Sometimes',
                  },
                  {
                    id: 'GYWZhtZVilqw',
                    label: 'Often',
                  },
                  {
                    id: 'Y1mn2E4Q5mR3',
                    label: 'Always',
                  },
                ],
              },
              {
                id: 'w4F2zktmVlpa',
                title: 'How often do you experience periods of restlessness?',
                type: 'multiple_choice',
                ref: '8cc7c5be-083f-4282-8ecb-6c7b21969f79',
                choices: [
                  {
                    id: 'NHcP94daOEuv',
                    label: 'Never',
                  },
                  {
                    id: 'bSNeSu1TYTcm',
                    label: 'Rarely',
                  },
                  {
                    id: 'QgnXGqMFGf7f',
                    label: 'Sometimes',
                  },
                  {
                    id: 'zWx4MI9C5ndR',
                    label: 'Often',
                  },
                  {
                    id: 'murnlgYgIwNs',
                    label: 'Always',
                  },
                ],
              },
              {
                id: 'EcSJcxkjuMT3',
                title: 'How often do you notice swelling in your legs? ',
                type: 'multiple_choice',
                ref: 'b78e7cdf-c0e0-445f-8709-9c93f0f4e1f4',
                choices: [
                  {
                    id: '27Y7rgNOj7V3',
                    label: 'Never',
                  },
                  {
                    id: 'vnxVvyz96pvj',
                    label: 'Rarely',
                  },
                  {
                    id: 'k3wql7MvUZPS',
                    label: 'Sometimes',
                  },
                  {
                    id: 'UacnnCrTxt2U',
                    label: 'Often',
                  },
                  {
                    id: 'qmTvVTnL6g5x',
                    label: 'Always',
                  },
                ],
              },
              {
                id: 'UVrv96Vq7TO8',
                title:
                  'Which of the following have you experienced in the last 6 months? ',
                type: 'multiple_choice',
                allow_multiple_selections: true,
                ref: 'c5abe123-36df-4fd7-b66c-b5c73eadb0a5',
                choices: [
                  {
                    id: 'cZWL1VLOr4pd',
                    label: 'Bulimia',
                  },
                  {
                    id: 'lWJgNBSydtHi',
                    label: 'Inability to gain weight',
                  },
                  {
                    id: '2I7I8PEvxqRe',
                    label: 'Inability to lose weight',
                  },
                  {
                    id: 'gIiOX9Dd4Z1w',
                    label: 'Craving carbohydrates',
                  },
                  {
                    id: 'Bo0avxSrmYaP',
                    label: 'Salt cravings',
                  },
                  {
                    id: 'b8FV87tWMLPR',
                    label: 'Sweet cravings',
                  },
                  {
                    id: 'FePTMjIOfkzR',
                    label: 'Poor appetite',
                  },
                  {
                    id: '71MYCqMR9ACf',
                    label: 'Frequent dieting',
                  },
                  {
                    id: 'bZc3uXQ1slOq',
                    label: 'Caffeine dependency',
                  },
                  {
                    id: 'HY3Ui9r1VUpr',
                    label: 'None',
                  },
                ],
              },
              {
                id: 'K25139igiWMB',
                title:
                  'Over the past 28 days, have you been deliberately trying to limit the amount of food you eat to influence your shape or weight (whether or not you have succeeded)? ',
                type: 'multiple_choice',
                ref: '4b275856-edf5-4bfc-b5a8-110f09f8061f',
                choices: [
                  {
                    id: 'J8rdg4ISpspg',
                    label: 'No Days',
                  },
                  {
                    id: 'qutGASk8r7V5',
                    label: '1-5 Days',
                  },
                  {
                    id: '6ndrJfylgJ2K',
                    label: '6-12 Days',
                  },
                  {
                    id: 'dBpos8ZNXfi2',
                    label: '13-15 Days',
                  },
                  {
                    id: 'RjT63kyyUX2n',
                    label: '16-22 Days',
                  },
                  {
                    id: '5zZuIiguhatO',
                    label: '23-27 Days',
                  },
                  {
                    id: 'SiwJpWLLxUP4',
                    label: 'Everyday',
                  },
                ],
              },
              {
                id: '8JrmlsawMW3m',
                title:
                  'Over the past 28 days, how often do you compulsively eat?',
                type: 'multiple_choice',
                ref: '6b9fc3e5-912f-4168-a41c-31daba77d4c0',
                choices: [
                  {
                    id: 'f3lysnMSkwqv',
                    label: 'No Days',
                  },
                  {
                    id: 'H2UUTuq32xNf',
                    label: '1-5 Days',
                  },
                  {
                    id: '1JzuBEPFT4uJ',
                    label: '6-12 Days',
                  },
                  {
                    id: 'pIeWPQpFQRF8',
                    label: '13-15 Days',
                  },
                  {
                    id: '6GGpctwnTwEG',
                    label: '16-22 Days',
                  },
                  {
                    id: 'mRXQKjLmlFZm',
                    label: '23-27 Days',
                  },
                  {
                    id: 'WunugbH5zsEb',
                    label: 'Everyday',
                  },
                ],
              },
              {
                id: 'WtLBJZUH1rRV',
                title: 'Do you experience nasal stuffiness',
                type: 'multiple_choice',
                ref: 'af710220-043c-42ec-97fe-d6c070cd5713',
                choices: [
                  {
                    id: '2nBtQyvTikjk',
                    label: 'Not a problem',
                  },
                  {
                    id: 'roTCWpWTzF00',
                    label: 'Very mild problem',
                  },
                  {
                    id: 'Zympqr6KF7XO',
                    label: 'Moderate problem',
                  },
                  {
                    id: 'CKjJd0rBthma',
                    label: 'Fairly bad problem',
                  },
                  {
                    id: '22tWo9cSTZPs',
                    label: 'Severe problem',
                  },
                ],
              },
              {
                id: 'C3HLT40zZCb3',
                title: 'During which seasons do you have nasal congestion?',
                type: 'multiple_choice',
                ref: 'b362d912-faea-4d9e-91bc-31dd36d690c1',
                choices: [
                  {
                    id: '6ZbY9wSvENm6',
                    label: 'Never',
                  },
                  {
                    id: 'E45igjWiFDV3',
                    label: 'Fall',
                  },
                  {
                    id: '3jEW5B1wxDQV',
                    label: 'Spring',
                  },
                  {
                    id: 'N7hJfBdAHMxr',
                    label: 'Year-Round',
                  },
                ],
              },
              {
                id: 'nIauHeA37TkM',
                title: 'How often do you have sneezing attacks?',
                type: 'multiple_choice',
                ref: 'bef4a453-8580-44d6-8c73-99fa4b4d5fbb',
                choices: [
                  {
                    id: 'pduhrOqG0efI',
                    label: 'Never',
                  },
                  {
                    id: 'nHVVgQVJoIAn',
                    label: 'Rarely',
                  },
                  {
                    id: 'MbsQFqNy1Nch',
                    label: 'Sometimes',
                  },
                  {
                    id: 'oEmqMlV4Lohs',
                    label: 'Often',
                  },
                  {
                    id: 'CwZb7oHyuNdJ',
                    label: 'Always',
                  },
                ],
              },
              {
                id: 'YAgQqk8u6Myx',
                title: 'How frequently do you experience coughing?',
                type: 'multiple_choice',
                ref: 'fa8ec76c-d2c5-45dc-8096-51dfdb546eca',
                choices: [
                  {
                    id: 'ZeSK96G16x6b',
                    label: 'Never',
                  },
                  {
                    id: 'Qv8qqc0Rg9eb',
                    label: 'Rarely',
                  },
                  {
                    id: '3IYNptf4pGgZ',
                    label: 'Sometimes',
                  },
                  {
                    id: '3RO8LzdYnjMD',
                    label: 'Often',
                  },
                  {
                    id: 'knXh4cMWynxU',
                    label: 'Always',
                  },
                ],
              },
              {
                id: 'sryhUiQhDUny',
                title:
                  'How frequently do you have swollen or discolored tongue, gums, or lips?',
                type: 'multiple_choice',
                ref: 'c3fec255-e420-4d20-911c-56d19e22e482',
                choices: [
                  {
                    id: '4szJgqjm8kq8',
                    label: 'Never',
                  },
                  {
                    id: 'av2oCO7EtYr3',
                    label: 'Rarely',
                  },
                  {
                    id: '7EnH4GWNUI6b',
                    label: 'Sometimes',
                  },
                  {
                    id: 'ZmdRCYT3Ka1O',
                    label: 'Often',
                  },
                  {
                    id: 'cmB2KGMDRXJp',
                    label: 'Always',
                  },
                ],
              },
              {
                id: 'atwT25f6H75K',
                title:
                  'How frequently do you get canker sores or lesions in your mouth?',
                type: 'multiple_choice',
                ref: '9665e6e0-21c1-40e6-bae8-cf5853b2e117',
                choices: [
                  {
                    id: '0wZyUfXaYwWq',
                    label: 'Never',
                  },
                  {
                    id: 'c7UxxaHg3UUa',
                    label: 'Rarely',
                  },
                  {
                    id: 'ovYFrnlBrGU5',
                    label: 'Sometimes',
                  },
                  {
                    id: 'wHa5KIUsmxSJ',
                    label: 'Often',
                  },
                  {
                    id: 'BTolATnpjzIE',
                    label: 'Always',
                  },
                ],
              },
              {
                id: 'TfLxuMnksB6W',
                title:
                  'In the last 2 weeks, have you suffered from a hoarse voice as a result of your cough?',
                type: 'multiple_choice',
                ref: '5db82bc4-0c0a-43da-9c49-326ed019e5cb',
                choices: [
                  {
                    id: 'vEtXRvqRmX4f',
                    label: 'All of the time',
                  },
                  {
                    id: 'L6JHvFLFpgJP',
                    label: 'Most of the time',
                  },
                  {
                    id: 'EXoqA3Zqq40s',
                    label: 'A good bit of the time',
                  },
                  {
                    id: '6lUzE0DnaLxy',
                    label: 'Some of the time',
                  },
                  {
                    id: 'bXYLHEFo27Ks',
                    label: 'A little of the time',
                  },
                ],
              },
              {
                id: 'IqetL2DKRVjL',
                title:
                  'In the last 2 weeks, have you been bothered by sputum (phlegm) production when you cough? (gagging, frequent need to clear throat)',
                type: 'multiple_choice',
                ref: 'aea30010-df31-4f3d-8af7-88abc150621a',
                choices: [
                  {
                    id: 'w7luoz8lvtba',
                    label: 'All of the time',
                  },
                  {
                    id: 'PMQvz40QJyiW',
                    label: 'Most of the time',
                  },
                  {
                    id: 'JRWVQf5DQ18f',
                    label: 'A good bit of the time',
                  },
                  {
                    id: 'iS92smVbaLDW',
                    label: 'Some of the time',
                  },
                  {
                    id: 'faXKgXlcih00',
                    label: 'A little of the time',
                  },
                  {
                    id: 'i4koasRyjCrK',
                    label: 'N/A',
                  },
                ],
              },
              {
                id: 'vAvVpvHMazrz',
                title:
                  'Which symptoms have you experienced in the last 6 months? ',
                type: 'multiple_choice',
                allow_multiple_selections: true,
                ref: '9f6c1e00-f3a9-4491-aa9b-04c40d95c159',
                choices: [
                  {
                    id: 'Ck5B26hwuDvx',
                    label: 'Back muscle spasm',
                  },
                  {
                    id: 'qAyj21oqp1iK',
                    label: 'Neck muscle spasm',
                  },
                  {
                    id: 'Qc87799Lgfh0',
                    label: 'Chest tightness',
                  },
                  {
                    id: 'yl3ll2FCoVxk',
                    label: 'Calf cramps',
                  },
                  {
                    id: 'vA32OXkUuHKn',
                    label: 'Foot cramps',
                  },
                  {
                    id: 'n1iZRZ6wKYD9',
                    label: 'Joint deformity',
                  },
                  {
                    id: 'qRr8RssGrkh7',
                    label: 'Muscle spasms',
                  },
                  {
                    id: 'gag9KbQESPJg',
                    label: 'Muscle stiffness',
                  },
                  {
                    id: '9yCBoGKCZTYb',
                    label: 'Facial muscle twitches',
                  },
                  {
                    id: 'EvTA0coKIa1x',
                    label: 'Muscle twitches on arms/legs',
                  },
                  {
                    id: 'ICn1OiXGUiwU',
                    label: 'Tendonitis',
                  },
                  {
                    id: 'I7sRUU0I8Biq',
                    label: 'None',
                  },
                ],
              },
              {
                id: 'pyYYeXlV323Z',
                title:
                  'How much of the time do you have muscle weakness in a usual month?',
                type: 'multiple_choice',
                ref: '6c6904dd-4690-47df-8e53-0669ffe9988d',
                choices: [
                  {
                    id: 'KNrDNY7S2cAm',
                    label: 'Never',
                  },
                  {
                    id: 'CKgaV4BQYsMN',
                    label: 'Rarely',
                  },
                  {
                    id: 'gUN8JoIDxDia',
                    label: 'Sometimes',
                  },
                  {
                    id: 'hSiHe7G0IS2h',
                    label: 'Often',
                  },
                  {
                    id: 'MxCHxFzH7aVV',
                    label: 'Always',
                  },
                ],
              },
              {
                id: 'M3KgOgQTgwRN',
                title:
                  'How much of the time do you have stiffness or limitation of movement in a usual month?',
                type: 'multiple_choice',
                ref: '65dbb65f-fa6c-4a4f-a31d-cc0d479ceb3b',
                choices: [
                  {
                    id: 'yODP5rRDJ1CW',
                    label: 'Never',
                  },
                  {
                    id: 'JHendcPWD6AX',
                    label: 'Rarely',
                  },
                  {
                    id: 'C1dldOH0hkCr',
                    label: 'Sometimes',
                  },
                  {
                    id: 'XTmwLFW8L6MW',
                    label: 'Often',
                  },
                  {
                    id: 'p4kLbNMVPDhF',
                    label: 'Always',
                  },
                ],
              },
              {
                id: 'nC8CEVDAzvxf',
                title: 'How frequently do you have pain or aches in joints? ',
                type: 'multiple_choice',
                ref: '7a291209-0179-4e03-a197-014d752edc88',
                choices: [
                  {
                    id: 'pnx8XflVyAEl',
                    label: 'Never',
                  },
                  {
                    id: 'JeHHLSNr4Jp3',
                    label: 'Rarely',
                  },
                  {
                    id: '9blzeFzdO5Zs',
                    label: 'Sometimes',
                  },
                  {
                    id: 'RnsRS7V2JWtn',
                    label: 'Often',
                  },
                  {
                    id: 'CD0Xr91qa8kJ',
                    label: 'Always',
                  },
                ],
              },
              {
                id: '39hUHtQaOvdQ',
                title:
                  'How often do you have redness, swelling and/or tenderness of one or more joints? (with or without a diagnosis of arthritis)',
                type: 'multiple_choice',
                ref: '334caf71-e2f4-4aff-bc29-b89cb717cb5d',
                choices: [
                  {
                    id: 'uC7xQphjxuPa',
                    label: 'Never',
                  },
                  {
                    id: 'TClYvSe22WoO',
                    label: 'Rarely',
                  },
                  {
                    id: 'JzewSIFPM4aJ',
                    label: 'Sometimes',
                  },
                  {
                    id: '4sUvDoQBeZxi',
                    label: 'Often',
                  },
                  {
                    id: '0vQiSdXLGf7Y',
                    label: 'Always',
                  },
                ],
              },
              {
                id: 'JPkJx6LoKPMx',
                title:
                  'Do you have any feedback about this survey? Or anything else you would like us to know?',
                type: 'short_text',
                ref: '54d6ef42-4dc2-4351-8e7d-b1f9c207eb23',
              },
            ],
            outcome: {
              variable: 'winning_outcome_id',
              choices: [
                {
                  id: 'upvqyu4XvOzB',
                  ref: '1be71a19-9242-4c46-aaad-0e0718067a9d',
                  title:
                    'Thank you for your patience in completing the Symptom Severity Analysis!',
                  counter_variable:
                    'counter_b43d9751_4222_4dfe_9429_83834cbeba82',
                  thankyou_screen_ref: '74d92c62-540c-4f09-8c72-d29276d992da',
                },
                {
                  id: 'QbuT6t710f2B',
                  ref: 'f5363568-5931-46dc-8aff-b666ae5a3547',
                  title:
                    'Thank you for your patience in completing the Symptom Severity Analysis!',
                  counter_variable:
                    'counter_3f09e197_9ba5_4b16_9f47_e6ce647127cd',
                  thankyou_screen_ref: '01FGWQQ65ZXKR6NCX8BVY5HHBC',
                },
                {
                  id: 'x0jX5KeAWYD9',
                  ref: 'b4b738a8-58a0-4023-9249-56792df51fba',
                  title:
                    'Thank you for your patience in completing the Symptom Severity Analysis!',
                  counter_variable:
                    'counter_a1234a1e_1b54_460e_8724_df1130d70234',
                  thankyou_screen_ref: '1555edf0-e335-4a9e-a15b-b0d714fbf77c',
                },
              ],
            },
          },
          answers: [
            {
              type: 'text',
              text: 'Sravan Kumar',
              field: {
                id: 'YqKcoo9kEtWy',
                type: 'short_text',
                ref: '01FGWQQ65ZD7RMDTMH4462HMVG',
              },
            },
            {
              type: 'text',
              text: 'Sriramula',
              field: {
                id: 'j3ALJdYXlHrR',
                type: 'short_text',
                ref: '706e5bbf-73e1-4fa3-ac33-7c415357ed34',
              },
            },
            {
              type: 'email',
              email: 'testsymptom@enterpi.com',
              field: {
                id: '1rX9ltEj23xm',
                type: 'email',
                ref: '97c27211-2c97-4c82-b576-7e6e93009257',
              },
            },
            {
              type: 'phone_number',
              phone_number: '+919700305425',
              field: {
                id: 'hSOKFuHIWKSf',
                type: 'phone_number',
                ref: '034d4045-591b-4b9b-9434-892ad8d3f0df',
              },
            },
            {
              type: 'text',
              text: 'Telangana',
              field: {
                id: 'ILCCa3DQD8kt',
                type: 'short_text',
                ref: '741fb17c-9304-4b31-b15a-e8390edfeb63',
              },
            },
            {
              type: 'number',
              number: 30,
              field: {
                id: 'eq931bEbcpmS',
                type: 'number',
                ref: '0e68452a-4084-4ec7-8c89-3af462c47629',
              },
            },
            {
              type: 'text',
              text: 'Test',
              field: {
                id: 'xxxTXdktYsNf',
                type: 'long_text',
                ref: '343c6289-b55c-4b42-9319-c228130f1193',
              },
            },
            {
              type: 'text',
              text: 'teerer',
              field: {
                id: 'Ije3Hz8UK1G3',
                type: 'long_text',
                ref: '620338f8-508f-49b2-94f0-29dbf619070d',
              },
            },
            {
              type: 'choices',
              choices: {
                labels: [
                  'Cold intolerance',
                  'Heat intolerance',
                  'Fever',
                  'Nightmares',
                ],
              },
              field: {
                id: 'Fd1WoylUhHbw',
                type: 'multiple_choice',
                ref: '0c5767f1-0430-4ff5-9bb5-435f453dba90',
              },
            },
            {
              type: 'choices',
              choices: {
                labels: ['Anal spasm', 'Dental issues', 'Bleeding gums'],
              },
              field: {
                id: '2bQJDk2DgAEX',
                type: 'multiple_choice',
                ref: '5903b23b-843d-4aa6-8db3-40304a9f648e',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Never',
              },
              field: {
                id: 'CWOhOIA3d86z',
                type: 'multiple_choice',
                ref: '0db16e2d-aedc-4082-86c0-c79382d8f4cd',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'One day',
              },
              field: {
                id: 'Q0UNh6daHPIP',
                type: 'multiple_choice',
                ref: '8b31fe1f-747e-45ec-9424-ad531b3bba67',
              },
            },
            {
              type: 'choice',
              choice: {
                label: '2-6 days',
              },
              field: {
                id: '6UlK5o0UP9im',
                type: 'multiple_choice',
                ref: '60d57423-9689-427f-9cad-7931cb7737e0',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Once a day',
              },
              field: {
                id: 'fSzBfhri1oZ7',
                type: 'multiple_choice',
                ref: 'b11d4699-125e-4a12-a761-2fa65b00f2bd',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Always',
              },
              field: {
                id: 'TPpcB5iBwD4m',
                type: 'multiple_choice',
                ref: '1605342b-bafa-4f74-b20e-4dac60ac4a5c',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Never',
              },
              field: {
                id: '8CB7JX5zHUpC',
                type: 'multiple_choice',
                ref: 'b9d0de4d-9f12-4af1-a649-5cff39cec6aa',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Rarely',
              },
              field: {
                id: 'wTzWzqn0fP3G',
                type: 'multiple_choice',
                ref: 'f5a9063d-8403-4c1f-9868-ecd9cfafdf53',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Somewhat',
              },
              field: {
                id: 'RnE1YziQycpF',
                type: 'multiple_choice',
                ref: '0b765603-f378-43d7-a916-c261f40ae27f',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'About every 2 hours',
              },
              field: {
                id: 'omlvJlDqO3nk',
                type: 'multiple_choice',
                ref: '2741ed5f-033c-4b92-b007-f64978310ba2',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'More than once a day',
              },
              field: {
                id: '4Y7XFXPabsln',
                type: 'multiple_choice',
                ref: '57de29f6-450b-46bb-b640-4a8b8b6718ba',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Never',
              },
              field: {
                id: 'zGvxOVVJ2eay',
                type: 'multiple_choice',
                ref: 'babf0f97-31a2-47e6-a0ea-0aff5962f6ba',
              },
            },
            {
              type: 'choice',
              choice: {
                label: '1 day',
              },
              field: {
                id: '3EJB9PDi1KoC',
                type: 'multiple_choice',
                ref: '53088e70-b13a-4556-93fd-e9e50f46899f',
              },
            },
            {
              type: 'choice',
              choice: {
                label: '2-6 times during the past 7 days',
              },
              field: {
                id: 'rMH27kHegiKH',
                type: 'multiple_choice',
                ref: 'ac511438-697d-4ac7-aa60-e2b5ab7b1741',
              },
            },
            {
              type: 'choices',
              choices: {
                labels: ['Nose bleeds', 'Post nasal drip'],
              },
              field: {
                id: 'areLpCEyuJrg',
                type: 'multiple_choice',
                ref: '489f31eb-face-4851-bae5-b5a433b09c23',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Quite a bit',
              },
              field: {
                id: 'rL7Rsbb9indY',
                type: 'multiple_choice',
                ref: '8381b56f-abf2-49a4-8a9c-6703b4ea44bd',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Always',
              },
              field: {
                id: 'GmLE58zXmcHJ',
                type: 'multiple_choice',
                ref: '1413c104-79b0-4820-a8ea-f320cda324a2',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Never',
              },
              field: {
                id: 'HiddsvT2fH5o',
                type: 'multiple_choice',
                ref: '350cc9e8-a106-45e2-beaa-786ed6aa56c4',
              },
            },
            {
              type: 'choices',
              choices: {
                labels: ['Auditory hallucinations', 'Agoraphobia', 'Fainting'],
              },
              field: {
                id: 'oFcDRlb5OIXV',
                type: 'multiple_choice',
                ref: 'd611a339-b294-47d3-ac9c-3a04dd90ef7c',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'A little bit',
              },
              field: {
                id: '1WmN2vozw9U0',
                type: 'multiple_choice',
                ref: '53da3c0c-8591-48f0-b0c9-0cae7721c1b7',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Sometimes (2-3 times)',
              },
              field: {
                id: 'NiXxtvN7upbQ',
                type: 'multiple_choice',
                ref: '5427110e-6da6-4e11-b40f-08747b1acc34',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Often (once a day)',
              },
              field: {
                id: '2Qals9TmONhX',
                type: 'multiple_choice',
                ref: 'c914242c-c558-4398-b448-0e74bcde2d38',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Very much',
              },
              field: {
                id: 'QohrFKWmXcvf',
                type: 'multiple_choice',
                ref: '0854a0d5-3ca8-4a48-a7d9-cbc2ab1b5303',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'A little bit',
              },
              field: {
                id: 'E1xNljbl2YMR',
                type: 'multiple_choice',
                ref: 'c2647099-ca25-451d-91e2-ca559f6a4155',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Sometimes',
              },
              field: {
                id: 'Mso73Y6Hf7so',
                type: 'multiple_choice',
                ref: '3046899e-1f3f-4809-be8e-1d6440e17589',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Sometimes',
              },
              field: {
                id: 'NUYtu8FydRv4',
                type: 'multiple_choice',
                ref: 'a2425280-050b-41e5-82b3-d56744db4c3b',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Chronic',
              },
              field: {
                id: 'PLln1q1DbvZH',
                type: 'multiple_choice',
                ref: 'e599738a-87c8-451c-8c48-ba71522d17c0',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Infrequent',
              },
              field: {
                id: 'T9oWBTESPK5M',
                type: 'multiple_choice',
                ref: '832fc74d-5ff4-453e-8458-d879636f5187',
              },
            },
            {
              type: 'choices',
              choices: {
                labels: [
                  'Distorted sense of smell',
                  'Distorted taste',
                  'Eye crusting',
                ],
              },
              field: {
                id: 'KmlWFn65eSaz',
                type: 'multiple_choice',
                ref: 'b31f954f-ddcc-4b06-9a0c-c553a1d90da1',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Frequent',
              },
              field: {
                id: 'WxrEN36oX500',
                type: 'multiple_choice',
                ref: '172a5057-4b0b-409b-b3a9-62aceb9028b6',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Frequent',
              },
              field: {
                id: 'k54gRKrCl95P',
                type: 'multiple_choice',
                ref: 'f9d29b4a-8b4a-4ff8-bcdf-ac4508675f53',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Never',
              },
              field: {
                id: 'JFj8hvrSCuZ9',
                type: 'multiple_choice',
                ref: 'ef3e4c2a-d923-424e-99d6-c64d165de623',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Frequent',
              },
              field: {
                id: 'rq1ZYXXILWCg',
                type: 'multiple_choice',
                ref: '87d22ce0-2af7-4136-9c9c-ea559ed9cfff',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Chronic',
              },
              field: {
                id: 'sc5gmnvCc7XS',
                type: 'multiple_choice',
                ref: '8e6f8c44-bf56-46ca-b61c-5727bf9151e5',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Frequent',
              },
              field: {
                id: 'd0mRSxYt0Su7',
                type: 'multiple_choice',
                ref: '726f772f-fd32-4c4d-b32d-cc0b67e3b845',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Infrequent',
              },
              field: {
                id: 'ZYRsLsOPhTOs',
                type: 'multiple_choice',
                ref: '1657dd66-9dcb-4fae-a9d8-97bef90a9298',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Never',
              },
              field: {
                id: 'H7Lpfm5OZl9H',
                type: 'multiple_choice',
                ref: 'e0edef73-2eb9-484a-8f67-3b36f8db80fa',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Rarely',
              },
              field: {
                id: 'qU20dLnZIFoH',
                type: 'multiple_choice',
                ref: 'be0d3212-6d8d-46a3-8bf1-ee716e6eab16',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Somtimes',
              },
              field: {
                id: 'FOrSbkQlVUl5',
                type: 'multiple_choice',
                ref: 'e68bde20-b384-4b33-838b-a06669a4e035',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Somtimes',
              },
              field: {
                id: 'BvD1dcKCo9NI',
                type: 'multiple_choice',
                ref: 'f7128bc2-5711-4f35-8ce6-577c2f92e903',
              },
            },
            {
              type: 'choices',
              choices: {
                labels: ['Kidney disease', 'Kidney stone'],
              },
              field: {
                id: 'jCFtI5cTVKyr',
                type: 'multiple_choice',
                ref: '6dba393c-4bfe-42c5-b4d1-246d8f67b930',
              },
            },
            {
              type: 'choices',
              choices: {
                labels: [
                  'Premature ejaculation',
                  'Lump in testicles',
                  'Unusual discharge from penis',
                ],
              },
              field: {
                id: 'jlx32ZcJMwQV',
                type: 'multiple_choice',
                ref: 'b3de3ade-a651-40d1-a9b5-fdf8b28d83fc',
              },
            },
            {
              type: 'choices',
              choices: {
                labels: ['Infertility', 'Ovarian cysts'],
              },
              field: {
                id: 'yJoWwPJTCcYu',
                type: 'multiple_choice',
                ref: '3c4de0f7-5bf9-47b7-b52a-6e4ccb6b9927',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Often',
              },
              field: {
                id: 'GNVNjUeE02zG',
                type: 'multiple_choice',
                ref: 'ae6ac64b-2e56-417c-a4fe-73ddd8e779ba',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Sometimes',
              },
              field: {
                id: 'nJktDgMvTPGw',
                type: 'multiple_choice',
                ref: '838899f2-64ec-4f65-85f9-45bc27b45ca8',
              },
            },
            {
              type: 'choices',
              choices: {
                labels: ['Frayed', 'Fungus', 'Pitting'],
              },
              field: {
                id: '8Sm3QeZ2lyfj',
                type: 'multiple_choice',
                ref: 'e703b833-9ae8-4d52-a539-3e7101aeeb37',
              },
            },
            {
              type: 'choices',
              choices: {
                labels: ['Hands', 'Mouth/throat', 'Scalp'],
              },
              field: {
                id: '0NSE8KmcCy8Q',
                type: 'multiple_choice',
                ref: 'fca46497-4ccd-4d47-ad77-bcb867b65c2b',
              },
            },
            {
              type: 'choices',
              choices: {
                labels: ['Eczema', 'Jock itch', 'Moles with color/size change'],
              },
              field: {
                id: 'ZSxVpG3PQLud',
                type: 'multiple_choice',
                ref: 'afa2a6f8-0057-41dc-9e10-5967c8c53fb6',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Sometimes',
              },
              field: {
                id: 'EBcSUTMbJkeK',
                type: 'multiple_choice',
                ref: '2dec062e-994b-442a-b8fa-61048ea99c95',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Always',
              },
              field: {
                id: 'FFoEQMFTCu6N',
                type: 'multiple_choice',
                ref: '04a70de3-4192-4ea0-8eb2-adb3146f3f3a',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Often',
              },
              field: {
                id: 'wFPbk2s8bu4z',
                type: 'multiple_choice',
                ref: '2452c0a7-ecfd-4ae5-98f4-ee8158420345',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Often',
              },
              field: {
                id: 'KKWmN4HiBwba',
                type: 'multiple_choice',
                ref: '0a482be0-77d8-4fe1-8d90-29972360443a',
              },
            },
            {
              type: 'choices',
              choices: {
                labels: ['High blood pressure', 'Varicose veins'],
              },
              field: {
                id: 'DRYPRYOXpR77',
                type: 'multiple_choice',
                ref: '92f27acb-03e6-47c6-ad07-4dcba989efa7',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Sometimes',
              },
              field: {
                id: 'LBAdT2g2NR93',
                type: 'multiple_choice',
                ref: '5f504755-a045-4e34-98c0-9f01ef01f22a',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Never',
              },
              field: {
                id: 'aoqTUlNtSHkK',
                type: 'multiple_choice',
                ref: '7538d0be-af10-451f-814e-7ef826fd5618',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Rarely',
              },
              field: {
                id: 'UGIcuCxjZudV',
                type: 'multiple_choice',
                ref: '39c626cc-4654-47e5-943f-8b4f2c093af4',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Somewhat',
              },
              field: {
                id: 'qfsRBGU4nBbC',
                type: 'multiple_choice',
                ref: '41b74e5d-b495-4e4c-8bfb-e2a0ec16427b',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Rarely',
              },
              field: {
                id: 'Nybku5mENT2X',
                type: 'multiple_choice',
                ref: '19ea123f-e451-4204-8605-898db935a005',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Sometimes',
              },
              field: {
                id: 'kcQzyF8Yenk8',
                type: 'multiple_choice',
                ref: '886d8683-6470-4088-8ad0-109e4e5295fb',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Often',
              },
              field: {
                id: 'aXc8Aj3Ry0v4',
                type: 'multiple_choice',
                ref: 'be2a1d0d-caa8-471e-bf6a-8fe2a6d3664b',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Often',
              },
              field: {
                id: 'CeoVg1fqK5CV',
                type: 'multiple_choice',
                ref: 'f7041865-8471-41ff-ae91-f01304a463a3',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Often',
              },
              field: {
                id: 'w4F2zktmVlpa',
                type: 'multiple_choice',
                ref: '8cc7c5be-083f-4282-8ecb-6c7b21969f79',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Always',
              },
              field: {
                id: 'EcSJcxkjuMT3',
                type: 'multiple_choice',
                ref: 'b78e7cdf-c0e0-445f-8709-9c93f0f4e1f4',
              },
            },
            {
              type: 'choices',
              choices: {
                labels: [
                  'Inability to lose weight',
                  'Craving carbohydrates',
                  'Sweet cravings',
                ],
              },
              field: {
                id: 'UVrv96Vq7TO8',
                type: 'multiple_choice',
                ref: 'c5abe123-36df-4fd7-b66c-b5c73eadb0a5',
              },
            },
            {
              type: 'choice',
              choice: {
                label: '16-22 Days',
              },
              field: {
                id: 'K25139igiWMB',
                type: 'multiple_choice',
                ref: '4b275856-edf5-4bfc-b5a8-110f09f8061f',
              },
            },
            {
              type: 'choice',
              choice: {
                label: '13-15 Days',
              },
              field: {
                id: '8JrmlsawMW3m',
                type: 'multiple_choice',
                ref: '6b9fc3e5-912f-4168-a41c-31daba77d4c0',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Fairly bad problem',
              },
              field: {
                id: 'WtLBJZUH1rRV',
                type: 'multiple_choice',
                ref: 'af710220-043c-42ec-97fe-d6c070cd5713',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Year-Round',
              },
              field: {
                id: 'C3HLT40zZCb3',
                type: 'multiple_choice',
                ref: 'b362d912-faea-4d9e-91bc-31dd36d690c1',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Always',
              },
              field: {
                id: 'nIauHeA37TkM',
                type: 'multiple_choice',
                ref: 'bef4a453-8580-44d6-8c73-99fa4b4d5fbb',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Sometimes',
              },
              field: {
                id: 'YAgQqk8u6Myx',
                type: 'multiple_choice',
                ref: 'fa8ec76c-d2c5-45dc-8096-51dfdb546eca',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Sometimes',
              },
              field: {
                id: 'sryhUiQhDUny',
                type: 'multiple_choice',
                ref: 'c3fec255-e420-4d20-911c-56d19e22e482',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Often',
              },
              field: {
                id: 'atwT25f6H75K',
                type: 'multiple_choice',
                ref: '9665e6e0-21c1-40e6-bae8-cf5853b2e117',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'A good bit of the time',
              },
              field: {
                id: 'TfLxuMnksB6W',
                type: 'multiple_choice',
                ref: '5db82bc4-0c0a-43da-9c49-326ed019e5cb',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Some of the time',
              },
              field: {
                id: 'IqetL2DKRVjL',
                type: 'multiple_choice',
                ref: 'aea30010-df31-4f3d-8af7-88abc150621a',
              },
            },
            {
              type: 'choices',
              choices: {
                labels: [
                  'Foot cramps',
                  'Joint deformity',
                  'Muscle spasms',
                  'Muscle stiffness',
                  'Back muscle spasm',
                  'Neck muscle spasm',
                  'Chest tightness',
                  'Calf cramps',
                ],
              },
              field: {
                id: 'vAvVpvHMazrz',
                type: 'multiple_choice',
                ref: '9f6c1e00-f3a9-4491-aa9b-04c40d95c159',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Sometimes',
              },
              field: {
                id: 'pyYYeXlV323Z',
                type: 'multiple_choice',
                ref: '6c6904dd-4690-47df-8e53-0669ffe9988d',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Rarely',
              },
              field: {
                id: 'M3KgOgQTgwRN',
                type: 'multiple_choice',
                ref: '65dbb65f-fa6c-4a4f-a31d-cc0d479ceb3b',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Never',
              },
              field: {
                id: 'nC8CEVDAzvxf',
                type: 'multiple_choice',
                ref: '7a291209-0179-4e03-a197-014d752edc88',
              },
            },
            {
              type: 'choice',
              choice: {
                label: 'Rarely',
              },
              field: {
                id: '39hUHtQaOvdQ',
                type: 'multiple_choice',
                ref: '334caf71-e2f4-4aff-bc29-b89cb717cb5d',
              },
            },
            {
              type: 'text',
              text: 'Test Symptom Analysis',
              field: {
                id: 'JPkJx6LoKPMx',
                type: 'short_text',
                ref: '54d6ef42-4dc2-4351-8e7d-b1f9c207eb23',
              },
            },
          ],
        },
        sync_type: 'forms_answers',
      },
    };
  }
  /**
   * getIntakeResonseJson
   * @return {Object}
   */
  public getIntakeResonseJson() {
    return {
      _id: ObjectId("62396772a8789163cc9f9092"),
      status: true,
      temp_status: true,
      response: {
        event_id: "01FYR3R451WCGKNE35MVWXXK94",
        event_type: "form_response",
        form_response: {
          form_id: "MMAtx65A",
          token: "wwd6rl5xam34j5x16jvowwd6rxxp3fnm",
          landed_at: "2022-03-22T05:59:50Z",
          submitted_at: "2022-03-22T06:06:40Z",
          hidden: {
            firstname: "xxxxx",
            lastname: "xxxxx",
          },
          calculated: {
            score: 32,
          },
          variables: [
            {
              key: "counter_d3850e60_6af2_40bd_bdc5_fb71bc0aaf23",
              type: "number",
              number: 0,
            },
            {
              key: "counter_f8a4ddf2_3cbd_4037_9113_3ff8d1add517",
              type: "number",
              number: 0,
            },
            {
              key: "score",
              type: "number",
              number: 32,
            },
            {
              key: "winning_outcome_id",
              type: "outcome_id",
              outcome_id: "EzSgXvPJL6gp",
            },
          ],
          outcome: {
            id: "EzSgXvPJL6gp",
            title:
              "You have successfully completed your intake form! Thank you for your patience and for helping us help you. ",
          },
          definition: {
            id: "MMAtx65A",
            title: "Intake Form (stage)",
            fields: [
              {
                id: "VGreVab7AJfo",
                title: "What's your first name?",
                type: "short_text",
                ref: "3b0f5ae9-78e8-4182-bf35-e9bca9a3284f",
              },
              {
                id: "BzLdXqMGQQfn",
                title: "What's your last name?",
                type: "short_text",
                ref: "77b493f7-b0ca-4abb-abe0-61549bd1a71c",
              },
              {
                id: "nhl0dQNXgrCU",
                title: "What is your phone number?",
                type: "phone_number",
                ref: "98365661-4ee3-4839-b303-c670e04d45cb",
              },
              {
                id: "2u830lQw5xOM",
                title: "What is your email address?",
                type: "email",
                ref: "11673941-8dd6-4c3c-af1c-822e85998923",
              },
              {
                id: "GpOOEAcmrRdY",
                title: "What's your home address?",
                type: "short_text",
                ref: "a0d7a7e4-2b3c-4827-a4eb-b3e9316f0e30",
              },
              {
                id: "DLEGRvAsDkOg",
                title: "What is your date of birth?",
                type: "date",
                ref: "1278d960-cd69-4e6d-924f-1c31ab38d1f2",
              },
              {
                id: "kGzMG9p2MXZC",
                title: "What's your race or ethnicity?",
                type: "multiple_choice",
                ref: "668ee536-d629-42d7-9079-6089451a467c",
                choices: [
                  {
                    id: "pmmM0hfp2pWY",
                    label: "African American",
                  },
                  {
                    id: "lVA3e46q55ZM",
                    label: "Asian",
                  },
                  {
                    id: "MyIuWTUSfDZT",
                    label: "Caucasian",
                  },
                  {
                    id: "6dZ8PXiENneG",
                    label: "Hispanic/Latino",
                  },
                  {
                    id: "kNQi53lDucX7",
                    label: "Mediterranean",
                  },
                  {
                    id: "2mK2KueFDIWm",
                    label: "Native American",
                  },
                  {
                    id: "P9nbRcGUUV2i",
                    label: "Other",
                  },
                ],
              },
              {
                id: "Iku21ZSjWEAA",
                title: "What is your height? ",
                type: "long_text",
                ref: "a4fec529-0519-44d9-b735-af22c078ebd6",
              },
              {
                id: "7KdyYE6gHFWe",
                title: "What is your weight? ",
                type: "short_text",
                ref: "fbed18d2-7407-4bce-b37b-4e55af8d8bc8",
              },
              {
                id: "fW6v7EyBd6GY",
                title:
                  "What are the main symptoms you're dealing with currently? What do you hope to gain through GritWell?",
                type: "long_text",
                ref: "b840e1c3-049b-4e9f-8c08-a2cea34ed283",
              },
              {
                id: "P4sCwmIqN0BQ",
                title: "Upload your past test",
                type: "file_upload",
                ref: "26aa96dc-0371-4af5-9fc9-4bff28d3bfbf",
              },
              {
                id: "fY8IHHuP4Mp7",
                title:
                  "When was the last time you felt really vibrant and well? Explain:\n\n",
                type: "long_text",
                ref: "75cece69-ef9e-4d22-8565-9ab9960173d4",
              },
              {
                id: "EFR8gadyy6nZ",
                title:
                  "What solutions have you tried to manage your symptoms so far?",
                type: "multiple_choice",
                allow_multiple_selections: true,
                allow_other_choice: true,
                ref: "ba86aea2-2c5e-4889-859e-798492503b78",
                choices: [
                  {
                    id: "7EIuOgqB3dlL",
                    label: "Medication",
                  },
                  {
                    id: "UArKXf8fW7vl",
                    label: "Supplements",
                  },
                  {
                    id: "EjbEwLG5PCSf",
                    label: "Elimination diet",
                  },
                  {
                    id: "SAcYJVpJepcG",
                    label:
                      "Non-traditional doctor's visit (functional, alternative, integrative etc.)",
                  },
                  {
                    id: "69pNreqhcxnd",
                    label:
                      "Traditional doctor's visit (primary, gastro, obgyn etc.)",
                  },
                  {
                    id: "Ps1lFJsxivZq",
                    label: "None",
                  },
                ],
              },
              {
                id: "Mt1c7Fxbztns",
                title:
                  "Because each care plan is personalized, we are unable to know the cost of supplements and testing beforehand. These will be an additional cost once care has begun. Please confirm you are willing to pay for additional testing and supplements.",
                type: "yes_no",
                ref: "03770980-7978-4215-821a-57a8be35ca01",
              },
              {
                id: "Zp5yti8O6drK",
                title:
                  "Are you committed to a long term solution in which results will take time and not occur immediately?",
                type: "yes_no",
                ref: "2a8a3595-d316-4d3a-877e-76255d51e41f",
              },
              {
                id: "X9mDyVAVtdDY",
                title:
                  "What are you most excited about in getting started in the program (rank in order with 1 being most excited) ",
                type: "ranking",
                allow_multiple_selections: true,
                ref: "970ab102-5d2e-47df-9fec-1cdcb2ef8633",
                choices: [
                  {
                    id: "FRceETFKigXL",
                    label: "Testing",
                  },
                  {
                    id: "gOJQF700oZmk",
                    label: "Nutrition",
                  },
                  {
                    id: "dXKVSjmFc0lY",
                    label: "Stress/sleep techniques and tools",
                  },
                  {
                    id: "jd1InaFJyIv3",
                    label: "Supplement protocol",
                  },
                  {
                    id: "fVv5dzKtSkIN",
                    label: "Access to functional medicine practitioners",
                  },
                ],
              },
              {
                id: "xqeqeOV3BVnH",
                title: "What diagnostic testing have you had done recently?",
                type: "multiple_choice",
                allow_multiple_selections: true,
                allow_other_choice: true,
                ref: "90951006-c46f-407c-a4e5-60afda44e806",
                choices: [
                  {
                    id: "F4yFpGwogTId",
                    label: "Routine bloodwork",
                  },
                  {
                    id: "qXcI7SBqaJfr",
                    label: "Endoscopy or colonoscopy",
                  },
                  {
                    id: "aDAZrrAzuwhL",
                    label: "Advanced gut testing (ex. GI Map)",
                  },
                  {
                    id: "I5t1liqgyQj3",
                    label: "Environmental toxin testing",
                  },
                  {
                    id: "nJswieJBctbc",
                    label: "Food sensitivity testing",
                  },
                  {
                    id: "q4gLQaxcap9h",
                    label: "None",
                  },
                ],
              },
              {
                id: "euiorEJNXP2S",
                title: "How many hours of sleep do you average per night?",
                type: "dropdown",
                ref: "7e8b58d3-f107-4f80-b896-2347e325f5d2",
                choices: [
                  {
                    id: "uFVQjjAlxfGO",
                    label: "1-3",
                  },
                  {
                    id: "MuJSGHZSebPw",
                    label: "4-6",
                  },
                  {
                    id: "ftcGUYxBJfgp",
                    label: "7-9",
                  },
                  {
                    id: "DsgiEluyC2J2",
                    label: "10-12",
                  },
                  {
                    id: "hAp2Xn7sIixs",
                    label: "12+",
                  },
                ],
              },
              {
                id: "3HHmqgn2xkrj",
                title: "How often do you exercise?",
                type: "multiple_choice",
                ref: "a576bdf7-2f43-48ef-a96f-8ee1308f3bd3",
                choices: [
                  {
                    id: "WQc4R7tSFWf1",
                    label: "Never",
                  },
                  {
                    id: "fKIneLoPdj6V",
                    label: "Less than once a month",
                  },
                  {
                    id: "MVXqNOWpTM44",
                    label: "1-2 times per month",
                  },
                  {
                    id: "31QzkOCRVGE1",
                    label: "1 time per week",
                  },
                  {
                    id: "08akHgNi0oPK",
                    label: "2 times per week",
                  },
                  {
                    id: "jYTtpgxXt1tl",
                    label: "3-4 times per week",
                  },
                  {
                    id: "71J1GzJPySXX",
                    label: "Approximately daily",
                  },
                ],
              },
              {
                id: "xNtv5qDETKxv",
                title:
                  "Do you currently follow any of the following special diets or nutritional programs? (Check all that apply)",
                type: "multiple_choice",
                allow_multiple_selections: true,
                ref: "892e4607-c3a1-4cf0-af9a-cc696631e1c6",
                choices: [
                  {
                    id: "2zGrfJmRVxSO",
                    label: "Elimination",
                  },
                  {
                    id: "DaUhKNvn4pfK",
                    label: "Gluten-Free",
                  },
                  {
                    id: "sijNCfrU3Lgn",
                    label: "High Protein",
                  },
                  {
                    id: "xvUiI1npZG5V",
                    label: "Low Carb",
                  },
                  {
                    id: "zJuQusDJZHjE",
                    label: "Low Fat",
                  },
                  {
                    id: "BrsjNmB3wg9o",
                    label: "Low Sodium",
                  },
                  {
                    id: "SaZrQpSRuBSB",
                    label: "No Dairy",
                  },
                  {
                    id: "5s26z7Bb4kRf",
                    label: "Vegetarian",
                  },
                  {
                    id: "jorVx2jgOhAr",
                    label: "Vegan",
                  },
                  {
                    id: "kBIoGpdQVDap",
                    label: "Other",
                  },
                  {
                    id: "euHwnywokg23",
                    label: "None",
                  },
                ],
              },
              {
                id: "jWife1dsvMLH",
                title:
                  'If relevant, what allergies or sensitivities do you have to certain foods and what are your symptoms? Please explain or list "None"',
                type: "long_text",
                ref: "ef05c1a3-d24b-4e94-95e6-11103958bab8",
              },
              {
                id: "FzPxxN0rnIUq",
                title:
                  "Do any of the following lifestyle/eating habits apply to you? (Check all that apply)",
                type: "multiple_choice",
                allow_multiple_selections: true,
                ref: "bcd1d667-9c0f-4892-9dbb-5c6b48127120",
                choices: [
                  {
                    id: "h90aN7wxp9Z2",
                    label: ">50% of meals away from home",
                  },
                  {
                    id: "mXcqFbFTAkLH",
                    label: "Eat too much",
                  },
                  {
                    id: "c9a9iDiPccq2",
                    label: "Emotional Eater",
                  },
                  {
                    id: "V8b6oGAyikkN",
                    label: "Fast eater",
                  },
                  {
                    id: "eSo67bRRhsGF",
                    label: "Healthy foods not readily available",
                  },
                  {
                    id: "Qc3Fvk81b7FE",
                    label: "If under stress eat too much/little",
                  },
                  {
                    id: "vKSaMW8aFbfF",
                    label: "Negative relationship with food",
                  },
                  {
                    id: "fUjSwFmcsyqU",
                    label: "None",
                  },
                ],
              },
              {
                id: "HRI4kheh2c1a",
                title:
                  "Which of the following do you consume in a typical week? (Check all that apply)",
                type: "multiple_choice",
                allow_multiple_selections: true,
                ref: "792539dc-7dc5-49ac-a6b2-0e026b6ad27d",
                choices: [
                  {
                    id: "384Mx8Gew3LH",
                    label: "Dairy/Alternatives",
                  },
                  {
                    id: "KDixGDLTFaMB",
                    label: "Fats & oils",
                  },
                  {
                    id: "TbX9rqavyEwh",
                    label: "Fish",
                  },
                  {
                    id: "ekIbEAUuug9A",
                    label: "Fruits",
                  },
                  {
                    id: "xrn6H2V2pNZ3",
                    label: "Legumes",
                  },
                  {
                    id: "1kygkzQUPwVs",
                    label: "Nuts & seeds",
                  },
                  {
                    id: "w6jslMYklwtV",
                    label: "Red meat",
                  },
                  {
                    id: "1TeYH8JrmWKx",
                    label: "Soda",
                  },
                  {
                    id: "6J5YVOKzztXK",
                    label: "Sweets",
                  },
                  {
                    id: "dQYS7MnipqIi",
                    label: "Vegetables",
                  },
                  {
                    id: "eIwbcZL3ayCr",
                    label: "None",
                  },
                ],
              },
              {
                id: "2iazIblsjQgA",
                title:
                  "Do you consume any of the following? (Check all that apply)",
                type: "multiple_choice",
                allow_multiple_selections: true,
                ref: "02596f72-8740-448d-b3ef-09e19bff21d8",
                choices: [
                  {
                    id: "Zg6503QMxun8",
                    label: "Canned/farmed fish/seafood",
                  },
                  {
                    id: "3BQnfxohkUvF",
                    label: "Non-organic animal products",
                  },
                  {
                    id: "sqQ0CPfj3GVN",
                    label: "Non-organic fruits & vegetables",
                  },
                  {
                    id: "5n0F0ruHpFBy",
                    label: "Processed, deep-fried or fast foods",
                  },
                  {
                    id: "k97RKs9pqhhF",
                    label: "Water from a well",
                  },
                  {
                    id: "k99aYnEQKbpm",
                    label: "None",
                  },
                ],
              },
              {
                id: "yb7Pb4Q4jpmq",
                title:
                  "If you drink caffeinated beverages (coffee, tea, etc.), how many cups (8 oz) do you have a day?",
                type: "dropdown",
                ref: "a5291f1d-398e-4da8-9932-101f722d7b46",
                choices: [
                  {
                    id: "bYltjSJWkVKQ",
                    label: "1",
                  },
                  {
                    id: "xecoIQyUg7pB",
                    label: "2-4",
                  },
                  {
                    id: "N14LRpvsDn6o",
                    label: ">4",
                  },
                  {
                    id: "e2jxM7LTa6pZ",
                    label: "I don't drink caffeinated beverages",
                  },
                ],
              },
              {
                id: "7K8cDea547Ts",
                title: "How often do you have a drink containing alcohol?",
                type: "multiple_choice",
                ref: "d4ed79b1-a941-449d-a8b4-3dde70d38cdd",
                choices: [
                  {
                    id: "ZYvf9NG8zbF0",
                    label: "Never",
                  },
                  {
                    id: "nVtFQNfVgAvm",
                    label: "Monthly or less",
                  },
                  {
                    id: "diVrCValpuEA",
                    label: "2-4 times a month",
                  },
                  {
                    id: "d89A0IUOfNVN",
                    label: "2-3 times a week",
                  },
                  {
                    id: "uojyAWTfjtd0",
                    label: "4 or more times a week",
                  },
                ],
              },
              {
                id: "1Sm3peieO8CE",
                title:
                  "How many drinks containing alcohol do you have on a typical day when you are drinking?",
                type: "multiple_choice",
                ref: "af9b384d-13d0-489b-b7a4-3df535ab999d",
                choices: [
                  {
                    id: "ghHPo7wRhSXJ",
                    label: "1 or 2",
                  },
                  {
                    id: "AFEpd86DDNea",
                    label: "3 or 4",
                  },
                  {
                    id: "QIjt8KlILT1k",
                    label: "5 or 6",
                  },
                  {
                    id: "gc9QBL60YLJ8",
                    label: "7 to 9",
                  },
                  {
                    id: "toOLbIjHHxo5",
                    label: "10 or more",
                  },
                ],
              },
              {
                id: "zxf1SOo4srxv",
                title:
                  "How often do you have 5 or more drinks on one occasion?",
                type: "multiple_choice",
                ref: "1d929ba9-c4f2-4eba-801e-05a69736e4fe",
                choices: [
                  {
                    id: "vnx5ZdY9HDzv",
                    label: "Never",
                  },
                  {
                    id: "EA30h5rV7IFe",
                    label: "Less than monthly",
                  },
                  {
                    id: "125o1Plu3C2n",
                    label: "Monthly",
                  },
                  {
                    id: "NzSZrxmNjrzp",
                    label: "Weekly",
                  },
                  {
                    id: "QcwWVG8O9UH7",
                    label: "Daily or almost daily",
                  },
                ],
              },
              {
                id: "b1RkdUn46Ntj",
                title: "Do you smoke currently?",
                type: "yes_no",
                ref: "cdef3554-89a4-479e-ad2d-076353438575",
              },
              {
                id: "0XCR5PH5OJ8q",
                title: "How much do you smoke on average?",
                type: "short_text",
                ref: "da29e1ae-9d8c-482d-93ff-2aae3863b08a",
              },
              {
                id: "rpqDaHZJXqE4",
                title: "When you smoked, how much were you smoking on average?",
                type: "short_text",
                ref: "8b70828d-f08a-49a5-aa4d-8cd602471920",
              },
              {
                id: "Vq85q2zcwhts",
                title: "Do you use recreational drugs ?",
                type: "yes_no",
                ref: "121af57d-9900-4c37-aa7e-1620680c0281",
              },
              {
                id: "uRF5OglEEcai",
                title: "If yes, which recreational drugs and how often?",
                type: "short_text",
                ref: "9a994c16-5d3e-4a27-a8d5-80552d5c0de9",
              },
              {
                id: "WnHztIAgIV7B",
                title: "Did you take recreational drugs in the past?",
                type: "yes_no",
                ref: "f63f3727-a03c-4c7c-aaf3-47d04ec4940e",
              },
              {
                id: "MZ8R3NQ2IttJ",
                title: "If yes, which recreational drugs and how often?",
                type: "short_text",
                ref: "cea92605-cbbc-4ee4-bf13-fb220505f790",
              },
              {
                id: "T2ATQ71KhALy",
                title:
                  "Have you had a head injury, either recently or many years ago? Explain.",
                type: "long_text",
                ref: "2bbcc0fd-f417-4a96-8b70-71623fb26b1f",
              },
              {
                id: "NVM3ccSfqWFh",
                title:
                  "Do you feel you have an excessive amount of stress in your life?",
                type: "yes_no",
                ref: "57895522-7465-4adb-b325-f017c0956afd",
              },
              {
                id: "LOlSNWdrjOFm",
                title: "Do you use relaxation techniques?",
                type: "yes_no",
                ref: "f70311f2-3666-482b-8559-e920a982a8f4",
              },
              {
                id: "k8MvvNvpeV1T",
                title: "Have you ever sought counseling?",
                type: "yes_no",
                ref: "d000406d-59bc-43c5-b319-94518dc23713",
              },
              {
                id: "V0x9FaHriXfQ",
                title:
                  "With 10 being the happiest, how happy are you with yourself currently?",
                type: "opinion_scale",
                ref: "d7850611-2095-452b-8824-b702970231f6",
              },
              {
                id: "jRaBciqlw2J2",
                title: "How were you born? Premature or term?",
                type: "multiple_choice",
                ref: "5e00c14a-d6c1-47a2-b414-fa743fe8db60",
                choices: [
                  {
                    id: "unPZZYvGvNar",
                    label: "Premature",
                  },
                  {
                    id: "b3quoQhVYwhx",
                    label: "Term",
                  },
                  {
                    id: "BmLoqsGCRtFx",
                    label: "Don't know",
                  },
                ],
              },
              {
                id: "rryhOGLXB6BK",
                title: "Were you breast-fed or bottle-fed?",
                type: "multiple_choice",
                allow_multiple_selections: true,
                ref: "640b222d-69f2-4066-8a1d-0c82b6de7c4c",
                choices: [
                  {
                    id: "aoPtpyiFsYQs",
                    label: "Breast-fed",
                  },
                  {
                    id: "v5srWX0cAu1y",
                    label: "Bottle-fed",
                  },
                  {
                    id: "J3V3pTZyV7GO",
                    label: "Don't know",
                  },
                ],
              },
              {
                id: "6rhGlskgIQjP",
                title: "Do you brush your teeth at least twice per day?",
                type: "yes_no",
                ref: "d269b21b-1233-4548-b481-950477ed188b",
              },
              {
                id: "IKC2Kjo3dAPZ",
                title: "Do you floss at least once per day?",
                type: "yes_no",
                ref: "798425c3-eb14-49b6-880d-4e0401364285",
              },
              {
                id: "p7AZmLUDn3sV",
                title:
                  "On your teeth, do you have any of the following? (Check all that apply)",
                type: "multiple_choice",
                allow_multiple_selections: true,
                ref: "0e147975-2cb1-4ce1-af3f-184b1fb02119",
                choices: [
                  {
                    id: "f6VcU1F1AkgO",
                    label: "Bleeding gums",
                  },
                  {
                    id: "GHx3jdlEu6hn",
                    label: "Caps/Crowns",
                  },
                  {
                    id: "UUkEdry0aZ2E",
                    label: "Gingivitis",
                  },
                  {
                    id: "WkIGXuaRCIl2",
                    label: "Gold fillings",
                  },
                  {
                    id: "NgOFwV8jJYpz",
                    label: "Implants",
                  },
                  {
                    id: "dWxr0yPPkYRp",
                    label: "Problems with chewing",
                  },
                  {
                    id: "jNamY0QYG8sN",
                    label: "Root canals",
                  },
                  {
                    id: "0osKTJ4zCdyS",
                    label: "Silver mercury fillings",
                  },
                  {
                    id: "3ML71UlLBkjB",
                    label: "Tooth pain/sensitivity",
                  },
                  {
                    id: "IcXxlrZD4GE4",
                    label: "None",
                  },
                ],
              },
              {
                id: "8yn75ahbsewk",
                title: "Typically, how often do you have a bowel movement?",
                type: "multiple_choice",
                allow_multiple_selections: true,
                allow_other_choice: true,
                ref: "b18d98b1-45c2-4c2b-969a-fa27ba56d392",
                choices: [
                  {
                    id: "42UE87HuwTOz",
                    label: "Three times a day",
                  },
                  {
                    id: "5b7u07jCRwVP",
                    label: "Twice a day",
                  },
                  {
                    id: "Jkh8C6E0th8g",
                    label: "Daily",
                  },
                  {
                    id: "SFb9aLL4lrbG",
                    label: "Every other day",
                  },
                  {
                    id: "YtdrZsTEpH7g",
                    label: "2-3 times a week",
                  },
                ],
              },
              {
                id: "2esXMcTcMYcr",
                title:
                  "In your work or home environment are you regularly exposed to any of the following? (Check all that apply)",
                type: "multiple_choice",
                allow_multiple_selections: true,
                ref: "d62cb5cd-2716-453d-ad1f-426784daeab8",
                choices: [
                  {
                    id: "kcuI5fR9gksu",
                    label: "Airplane travel",
                  },
                  {
                    id: "NBRBFsMGuwUW",
                    label: "Carpets or rugs",
                  },
                  {
                    id: "81YU5mLNmgay",
                    label:
                      "Cleaning chemicals, disinfectants, hand sanitizers, etc.",
                  },
                  {
                    id: "prOby34MQPNQ",
                    label: "Harsh chemicals (solvents, glues, gas, acids, etc)",
                  },
                  {
                    id: "7JqFE5pJCE8R",
                    label: "Heavy metals (lead, mercury, etc.)",
                  },
                  {
                    id: "AEWFtYmEwOjU",
                    label: "Herbicides/pesticides",
                  },
                  {
                    id: "ioTopBpBWEla",
                    label: "Mold or water damage/leaks",
                  },
                  {
                    id: "gPWNum3Q7tNS",
                    label: "Stagnant or stuffy air",
                  },
                  {
                    id: "liBP6NxoGuWD",
                    label: "Smokers",
                  },
                  {
                    id: "8jj5cFdumNnz",
                    label:
                      "Toxic substances (treated lumber, lead paint, paint chips/dust, etc.)",
                  },
                  {
                    id: "yBNAajBqKaNa",
                    label: "None",
                  },
                ],
              },
              {
                id: "8Nl0DIRxzVa6",
                title:
                  "How many times have you been hospitalized or needed to visit an Emergency Department or urgent care center in the past 6 months?",
                type: "long_text",
                ref: "75853b78-c98f-4a47-ad2b-f66e2d1007bc",
              },
              {
                id: "QIeTDMCcO6kT",
                title:
                  "Please describe any injuries, surgeries, or hospitalizations you had in the past? What happened, when, why, etc.",
                type: "long_text",
                ref: "8118bd57-5f30-48fa-93c3-a911fc5a39ce",
              },
              {
                id: "JM2f8MoDZpHK",
                title:
                  "Do you have family history of the following conditions/symptoms? (Check all that apply)",
                type: "multiple_choice",
                allow_multiple_selections: true,
                ref: "6da1ff0f-990d-4a84-99e1-9f541ea2d8c3",
                choices: [
                  {
                    id: "0X9qsEoDjPcS",
                    label: "ADHD",
                  },
                  {
                    id: "hkxAXzY9G5Jg",
                    label: "Allergies",
                  },
                  {
                    id: "SDaUCSLuAvb0",
                    label: "Anxiety",
                  },
                  {
                    id: "VZudY2kHtXx7",
                    label: "Arthritis",
                  },
                  {
                    id: "BaQ1C5fi3FI5",
                    label: "Asthma",
                  },
                  {
                    id: "n22QfuMleiVj",
                    label: "Autism",
                  },
                  {
                    id: "Hr8DYFsMoyA3",
                    label: "Autoimmune disease",
                  },
                  {
                    id: "iy9okUaBaQJU",
                    label: "Cancer",
                  },
                  {
                    id: "iFk6ZGmqlOpL",
                    label: "Dementia",
                  },
                  {
                    id: "By7J46Z6GutJ",
                    label: "Depression",
                  },
                  {
                    id: "C8sPxvnV4HoU",
                    label: "Diabetes",
                  },
                  {
                    id: "PhrKHLfA1CkC",
                    label: "Eczema",
                  },
                  {
                    id: "5045NSuQzL6d",
                    label: "Genetic disorders",
                  },
                  {
                    id: "D2oA77yqiieD",
                    label: "Heart disease",
                  },
                  {
                    id: "P6t2DL45bn4S",
                    label: "Hypertension",
                  },
                  {
                    id: "CaeRtn0D8sZg",
                    label: "Kidney disease",
                  },
                  {
                    id: "LAtLZ3m3hQxe",
                    label: "Obesity",
                  },
                  {
                    id: "foisXGGHEAc2",
                    label: "Psychiatric disorders",
                  },
                  {
                    id: "fh7G6UmuoXck",
                    label: "Seizures/epilepsy",
                  },
                  {
                    id: "2IuYZ0OwZpF9",
                    label: "Stroke",
                  },
                  {
                    id: "OfYXFKbI31Ac",
                    label: "Substance abuse",
                  },
                  {
                    id: "3pC83dNbcx4V",
                    label: "Thyroid problems",
                  },
                  {
                    id: "Z2xQxz61tt2l",
                    label: "None",
                  },
                ],
              },
              {
                id: "Qt0o64NhzV8F",
                title:
                  "How many times have you taken antibiotics or oral steroids? (Check all that apply)",
                type: "multiple_choice",
                allow_multiple_selections: true,
                ref: "3e330a6d-043c-481a-b98c-c078f6cc68fb",
                choices: [
                  {
                    id: "SI2jnIzlTOKh",
                    label: "Infancy/childhood <5",
                  },
                  {
                    id: "cSIDXyxrxtdX",
                    label: "Infancy/childhood >5",
                  },
                  {
                    id: "woEWnXviQ61Z",
                    label: "Teen <5",
                  },
                  {
                    id: "4MsTbpa47ABe",
                    label: "Teen >5",
                  },
                  {
                    id: "eGCMkINWAP83",
                    label: "Adulthood <5",
                  },
                  {
                    id: "XzUoXWO8AtZ2",
                    label: "Adulthood >5",
                  },
                  {
                    id: "2M2Vne30GBxX",
                    label: "Never",
                  },
                ],
              },
              {
                id: "JvqVcnGhdKVA",
                title:
                  "What, if any, medications, prescription, over-the-counter (advil, etc) or supplements (nutritional or otherwise) do you currently take? Please explain.",
                type: "long_text",
                ref: "d5a76850-c4bb-4241-a196-8ad6426ae487",
              },
              {
                id: "vDWIZdODJDOU",
                title: "Which gender do you most closely identify with?",
                type: "multiple_choice",
                ref: "3c09bd10-5542-45b0-8e38-9d638ba75cc5",
                choices: [
                  {
                    id: "wJ5Tt0l68vRO",
                    label: "Male",
                  },
                  {
                    id: "ELoiSIoUZwju",
                    label: "Female",
                  },
                  {
                    id: "e27efBU4NzF9",
                    label: "Intersex",
                  },
                  {
                    id: "USK7i6RBezAg",
                    label: "Other",
                  },
                ],
              },
              {
                id: "VNPlixXEYqF5",
                title:
                  "Have you undergone any of the following? (Check all that apply)",
                type: "multiple_choice",
                allow_multiple_selections: true,
                ref: "61ee3ce4-4f2d-415c-8b7b-4e7e91fe079d",
                choices: [
                  {
                    id: "3dvMTu6kd0MQ",
                    label: "Abortion",
                  },
                  {
                    id: "6DC8l5djEjqn",
                    label: "Cesarean",
                  },
                  {
                    id: "IYiDovavgdsq",
                    label: "Miscarriage",
                  },
                  {
                    id: "E8N4iVFI03cN",
                    label: "Pregnancy",
                  },
                  {
                    id: "LTtFoM7bQ6TY",
                    label: "Premature birth",
                  },
                  {
                    id: "HLNd0n3utdWd",
                    label: "None of the above",
                  },
                ],
              },
              {
                id: "grYw34tNKVKv",
                title:
                  "Did you develop any problems during or after pregnancy, for example, toxemia (high blood pressure), diabetes, post-partum depression, issues with breast feeding, etc.?",
                type: "long_text",
                ref: "c115b0ac-2c25-4e3a-9674-523ae2eb2c9e",
              },
              {
                id: "zmDFag41jzIt",
                title: "How old were you when you had your first period?",
                type: "long_text",
                ref: "227eae37-716d-41d7-86c0-ad059b7e3472",
              },
              {
                id: "nbyCIyn9Jeyd",
                title:
                  "How long do your periods last and how often do they occur?",
                type: "long_text",
                ref: "e02f3af1-8926-4f08-be33-2e2e6a06b444",
              },
              {
                id: "HcD8jB7ob4Bz",
                title:
                  "Do you experience any cramping or pain with your periods?",
                type: "long_text",
                ref: "e51afe47-9928-407c-8298-2e990f9cfdb5",
              },
              {
                id: "oj5FrMQ1527g",
                title:
                  "Have you ever had either premenstrual or postmenstrual problems (bloating, breast tenderness, irritability, etc.)?",
                type: "long_text",
                ref: "6e009b87-7f7a-4ada-a909-ae903770551e",
              },
              {
                id: "4KeyAftdg4l4",
                title:
                  "If you use hormonal birth control, for how long, and have you had any problems?",
                type: "long_text",
                ref: "fe3afb13-4fbd-4bc9-88ac-144b5acf70ae",
              },
              {
                id: "UtH5WVN6CB1L",
                title:
                  "If you are experiencing menopause, what if any symptoms have you had?",
                type: "long_text",
                ref: "d7c01ab9-6a4e-4819-956b-19e56d8260b7",
              },
              {
                id: "XxKZA8o7RwcL",
                title:
                  "How many doctor's appointments have you had in the past 6 months?",
                type: "long_text",
                ref: "af63d770-2f57-4aac-978e-e362345a96ce",
              },
              {
                id: "88CmstEg5m95",
                title:
                  "Please list the health/wellness practitioners you are actively seeing right now (both conventional and alternative i.e. GI doctor, acupuncturist, nutritionist, therapist, functional medicine doctor)",
                type: "long_text",
                ref: "337ea5ff-2faf-4f09-b9d5-73de742d8326",
              },
              {
                id: "aRgqSXqJ5u0m",
                title: "What is your insurance?",
                type: "long_text",
                ref: "c6613bb3-02c3-4482-92e6-717ef4275f83",
              },
              {
                id: "hkvJvfwO45LE",
                title:
                  "Anything else you'd like us to know that we didn't get to ask you?",
                type: "long_text",
                ref: "39a7d71e-6bad-44dd-a9c4-4e2d5080cfba",
              },
              {
                id: "rPpi2Ng3ajGM",
                title:
                  "Material comforts: home, food, conveniences, financial security",
                type: "multiple_choice",
                ref: "7a92b0a4-2b2b-4005-afa6-97c3c318d1b3",
                choices: [
                  {
                    id: "lzK1vInDsAoB",
                    label: "7- Very satisfied",
                  },
                  {
                    id: "0SSLuWf88hfo",
                    label: "6- Satisfied",
                  },
                  {
                    id: "Iv2YgeUNut95",
                    label: "5- Mostly satisfied",
                  },
                  {
                    id: "QC7K2JVjCnXN",
                    label: "4- Mixed",
                  },
                  {
                    id: "79J5U3dzZFlS",
                    label: "3- Mostly dissatisfied",
                  },
                  {
                    id: "QgFq6B2Nr8OC",
                    label: "2- Unhappy",
                  },
                  {
                    id: "kYl2Gqy6O2EU",
                    label: "1- Terrible",
                  },
                ],
              },
              {
                id: "u4Pw5N24mtdZ",
                title: "Health - being physically fit and vigorous",
                type: "multiple_choice",
                ref: "add39e94-d204-47eb-a4e8-5b00fa9cda30",
                choices: [
                  {
                    id: "xX794R0Kk6ta",
                    label: "7- Very satisfied",
                  },
                  {
                    id: "dvpT4Bb50i73",
                    label: "6- Satisfied",
                  },
                  {
                    id: "6Z8AUBbBJKc5",
                    label: "5- Mostly satisfied",
                  },
                  {
                    id: "5yWkn8HHY1Eb",
                    label: "4- Mixed",
                  },
                  {
                    id: "5RQwYCzGC9XF",
                    label: "3- Mostly dissatisfied",
                  },
                  {
                    id: "774Lw3KfuBP3",
                    label: "2- Unhappy",
                  },
                  {
                    id: "7VbLAnVKqQ9F",
                    label: "1- Terrible",
                  },
                ],
              },
              {
                id: "kIeTKqFK3b1a",
                title:
                  "Relationships with parents, siblings & other relatives - communicating, visiting, helping...",
                type: "multiple_choice",
                ref: "c7505441-dc63-4bda-8a79-e95e76af774e",
                choices: [
                  {
                    id: "GCcg9aMWQXDI",
                    label: "7- Very satisfied",
                  },
                  {
                    id: "urhK8quaJG9j",
                    label: "6- Satisfied",
                  },
                  {
                    id: "OHFNcXzE2rxH",
                    label: "5- Mostly satisfied",
                  },
                  {
                    id: "axjQFy1kz9Cn",
                    label: "4- Mixed",
                  },
                  {
                    id: "4eYFWy5355mn",
                    label: "3- Mostly dissatisfied",
                  },
                  {
                    id: "XY6QfnxrKvEj",
                    label: "2- Unhappy",
                  },
                  {
                    id: "MRsQs2YG5Kn6",
                    label: "1- Terrible",
                  },
                ],
              },
              {
                id: "L9CZtdr7T4Uk",
                title: "Having and rearing children...",
                type: "multiple_choice",
                ref: "5c2abe19-20c7-4b8c-a483-51c026da5854",
                choices: [
                  {
                    id: "p0E6gHh79qyd",
                    label: "7- Very satisfied",
                  },
                  {
                    id: "kMgyh62Wff2L",
                    label: "6- Satisfied",
                  },
                  {
                    id: "bFHkZjFOYJIF",
                    label: "5- Mostly satisfied",
                  },
                  {
                    id: "OFa3onMyNyJS",
                    label: "4- Mixed",
                  },
                  {
                    id: "7ElkrRUdOdkg",
                    label: "3- Mostly dissatisfied",
                  },
                  {
                    id: "fv9iHtHSjtVk",
                    label: "2- Unhappy",
                  },
                  {
                    id: "7l0VUMnbnYoD",
                    label: "1- Terrible",
                  },
                  {
                    id: "3XnrrjpDjL6R",
                    label: "No children",
                  },
                ],
              },
              {
                id: "knce5tVS8th2",
                title:
                  "Close relationships with spouse or significant other...",
                type: "multiple_choice",
                ref: "8b610007-96c8-49e9-8eb2-f0df1275ead8",
                choices: [
                  {
                    id: "nNxgo8Xq131m",
                    label: "7- Very satisfied",
                  },
                  {
                    id: "lTCmFqi969Jb",
                    label: "6- Satisfied",
                  },
                  {
                    id: "bzns2zowca68",
                    label: "5- Mostly satisfied",
                  },
                  {
                    id: "4ps1M4qBbyFf",
                    label: "4- Mixed",
                  },
                  {
                    id: "v6hSCisg0znD",
                    label: "3- Mostly dissatisfied",
                  },
                  {
                    id: "7iT2PdWAXbWK",
                    label: "2- Unhappy",
                  },
                  {
                    id: "PwqpDkSEAnTD",
                    label: "1- Terrible",
                  },
                  {
                    id: "JbRUnv3ZOLnU",
                    label: "No significant other",
                  },
                ],
              },
              {
                id: "Qh2nmOUhbtX2",
                title: "Close friends...",
                type: "multiple_choice",
                ref: "931afbf3-a7ef-4164-9ca8-7f12c25a242b",
                choices: [
                  {
                    id: "EtRCZHZ2NHpD",
                    label: "7- Very satisfied",
                  },
                  {
                    id: "HF7QfC5l9t0h",
                    label: "6- Satisfied",
                  },
                  {
                    id: "BWmhpJF9nIR9",
                    label: "5- Mostly satisfied",
                  },
                  {
                    id: "zeNSwsaznVRK",
                    label: "4- Mixed",
                  },
                  {
                    id: "IlPnqDPNm1Og",
                    label: "3- Mostly dissatisfied",
                  },
                  {
                    id: "wm7D2ZolwfTy",
                    label: "2- Unhappy",
                  },
                  {
                    id: "C4wbR6iGgObk",
                    label: "1- Terrible",
                  },
                ],
              },
              {
                id: "elR0LJ49OKEv",
                title:
                  "Understanding yourself - knowing your assets and limitations - knowing what life is about...",
                type: "multiple_choice",
                ref: "44e8c1c5-0864-4bea-bfda-ff704b34e67b",
                choices: [
                  {
                    id: "4QQ5kjGXxu3b",
                    label: "7- Very satisfied",
                  },
                  {
                    id: "DAW7ZUjfy0Hj",
                    label: "6- Satisfied",
                  },
                  {
                    id: "PzdsKGGIhPGO",
                    label: "5- Mostly satisfied",
                  },
                  {
                    id: "diSCS8F6fT0y",
                    label: "4- Mixed",
                  },
                  {
                    id: "ya4UjamaxFyQ",
                    label: "3- Mostly dissatisfied",
                  },
                  {
                    id: "rZxCfvEjDZ6F",
                    label: "2- Unhappy",
                  },
                  {
                    id: "OJ33Ei8D8qCq",
                    label: "1- Terrible",
                  },
                ],
              },
              {
                id: "T5IdFR5Tv6fY",
                title: "Work - job or in home...",
                type: "multiple_choice",
                ref: "475fd21f-9245-47ed-b120-4cd4d7f89294",
                choices: [
                  {
                    id: "e6A618Z8EDCf",
                    label: "7- Very satisfied",
                  },
                  {
                    id: "C5TX5PccoOz6",
                    label: "6- Satisfied",
                  },
                  {
                    id: "MOQtc8A74kKJ",
                    label: "5- Mostly satisfied",
                  },
                  {
                    id: "ajzW8nbThY9g",
                    label: "4- Mixed",
                  },
                  {
                    id: "nne1g3LBROw8",
                    label: "3- Mostly dissatisfied",
                  },
                  {
                    id: "Q8oPrGFzZomw",
                    label: "2- Unhappy",
                  },
                  {
                    id: "L2pGGGgLGnrs",
                    label: "1- Terrible",
                  },
                ],
              },
              {
                id: "sdRaeoAxHjRV",
                title:
                  "Socializing - meeting other people, doing things, parties, etc...",
                type: "multiple_choice",
                ref: "d4eee8af-8746-42da-b2d0-c7e4165144ca",
                choices: [
                  {
                    id: "rL6ZnGPVT8GA",
                    label: "7- Very satisfied",
                  },
                  {
                    id: "l1HCMRoucsdu",
                    label: "6- Satisfied",
                  },
                  {
                    id: "M5Lj3xBZKv0N",
                    label: "5- Mostly satisfied",
                  },
                  {
                    id: "Qufg3ZktQ0bi",
                    label: "4- Mixed",
                  },
                  {
                    id: "LwUORKRLs6HE",
                    label: "3- Mostly dissatisfied",
                  },
                  {
                    id: "0LzE57qY8udE",
                    label: "2- Unhappy",
                  },
                  {
                    id: "voEsvObjRhVF",
                    label: "1- Terrible",
                  },
                ],
              },
              {
                id: "9wkQSZVyi7yu",
                title:
                  "Reading, listening to music, or observing entertainment...",
                type: "multiple_choice",
                ref: "3bdacc35-4dcc-46c7-9785-3663197ad4ac",
                choices: [
                  {
                    id: "ZIfol8imIuWC",
                    label: "7- Very satisfied",
                  },
                  {
                    id: "XwqENSqhoXMP",
                    label: "6- Satisfied",
                  },
                  {
                    id: "Y3bvW1FOh4TS",
                    label: "5- Mostly satisfied",
                  },
                  {
                    id: "zx5LpUN0HjU6",
                    label: "4- Mixed",
                  },
                  {
                    id: "Z23o9Vr8TVxe",
                    label: "3- Mostly dissatisfied",
                  },
                  {
                    id: "BLLhweX6xhHe",
                    label: "2- Unhappy",
                  },
                  {
                    id: "1yJjzxs8sNhk",
                    label: "1- Terrible",
                  },
                ],
              },
              {
                id: "l1BLouRiboNJ",
                title: "Independence, doing for yourself...",
                type: "multiple_choice",
                ref: "93850eba-8838-4e21-9f7f-a9b418f40c4e",
                choices: [
                  {
                    id: "GsyGazPrAxgj",
                    label: "7- Very satisfied",
                  },
                  {
                    id: "7GBxLUvaqEnQ",
                    label: "6- Satisfied",
                  },
                  {
                    id: "fyuEydeDOI6U",
                    label: "5- Mostly satisfied",
                  },
                  {
                    id: "h72VQUIWhows",
                    label: "4- Mixed",
                  },
                  {
                    id: "MnqpQ3Yo88rs",
                    label: "3- Mostly dissatisfied",
                  },
                  {
                    id: "L6gGDuQRXShp",
                    label: "2- Unhappy",
                  },
                  {
                    id: "N96dZF2PLbKs",
                    label: "1- Terrible",
                  },
                ],
              },
            ],
            outcome: {
              variable: "winning_outcome_id",
              choices: [
                {
                  id: "EzSgXvPJL6gp",
                  ref: "8412c423-25e9-4cc1-95a2-8529ff79243e",
                  title:
                    "You have successfully completed your intake form! Thank you for your patience and for helping us help you. ",
                  counter_variable:
                    "counter_d3850e60_6af2_40bd_bdc5_fb71bc0aaf23",
                  thankyou_screen_ref: "eb9f62d2-b3db-479f-b4ee-a1b9675f0293",
                },
                {
                  id: "Q63hZWcTk5GQ",
                  ref: "9f99f02f-d175-4c3e-8d0f-a44ce468688b",
                  title:
                    "{{hidden:firstname}}, you have successfully completed your intake form! Thank you for your patience and for helping us help you.  ",
                  counter_variable:
                    "counter_f8a4ddf2_3cbd_4037_9113_3ff8d1add517",
                  thankyou_screen_ref: "1f72990f-04d5-46fd-a235-19c921c7368e",
                },
              ],
            },
          },
          answers: [
            {
              type: "text",
              text: "Juicy",
              field: {
                id: "VGreVab7AJfo",
                type: "short_text",
                ref: "3b0f5ae9-78e8-4182-bf35-e9bca9a3284f",
              },
            },
            {
              type: "text",
              text: "Homer",
              field: {
                id: "BzLdXqMGQQfn",
                type: "short_text",
                ref: "77b493f7-b0ca-4abb-abe0-61549bd1a71c",
              },
            },
            {
              type: "phone_number",
              phone_number: "+919623202653",
              field: {
                id: "nhl0dQNXgrCU",
                type: "phone_number",
                ref: "98365661-4ee3-4839-b303-c670e04d45cb",
              },
            },
            {
              type: "email",
              email: "testsymptom@enterpi.com",
              field: {
                id: "2u830lQw5xOM",
                type: "email",
                ref: "11673941-8dd6-4c3c-af1c-822e85998923",
              },
            },
            {
              type: "text",
              text: "Hyd",
              field: {
                id: "GpOOEAcmrRdY",
                type: "short_text",
                ref: "a0d7a7e4-2b3c-4827-a4eb-b3e9316f0e30",
              },
            },
            {
              type: "date",
              date: "1998-04-04",
              field: {
                id: "DLEGRvAsDkOg",
                type: "date",
                ref: "1278d960-cd69-4e6d-924f-1c31ab38d1f2",
              },
            },
            {
              type: "choice",
              choice: {
                label: "Caucasian",
              },
              field: {
                id: "kGzMG9p2MXZC",
                type: "multiple_choice",
                ref: "668ee536-d629-42d7-9079-6089451a467c",
              },
            },
            {
              type: "text",
              text: "5.3",
              field: {
                id: "Iku21ZSjWEAA",
                type: "long_text",
                ref: "a4fec529-0519-44d9-b735-af22c078ebd6",
              },
            },
            {
              type: "text",
              text: "45",
              field: {
                id: "7KdyYE6gHFWe",
                type: "short_text",
                ref: "fbed18d2-7407-4bce-b37b-4e55af8d8bc8",
              },
            },
            {
              type: "text",
              text: "yeah",
              field: {
                id: "fW6v7EyBd6GY",
                type: "long_text",
                ref: "b840e1c3-049b-4e9f-8c08-a2cea34ed283",
              },
            },
            {
              type: "file_url",
              file_url:
                "https://api.typeform.com/responses/files/bbffd788e70854dd9c4a7b2b2f3ce26ff6d14c10234250d3bf02f86cfd7a1d60/BillPayReceiptTataTele.pdf",
              field: {
                id: "P4sCwmIqN0BQ",
                type: "file_upload",
                ref: "26aa96dc-0371-4af5-9fc9-4bff28d3bfbf",
              },
            },
            {
              type: "text",
              text: "yes",
              field: {
                id: "fY8IHHuP4Mp7",
                type: "long_text",
                ref: "75cece69-ef9e-4d22-8565-9ab9960173d4",
              },
            },
            {
              type: "choices",
              choices: {
                labels: [
                  "Supplements",
                  "Traditional doctor's visit (primary, gastro, obgyn etc.)",
                ],
              },
              field: {
                id: "EFR8gadyy6nZ",
                type: "multiple_choice",
                ref: "ba86aea2-2c5e-4889-859e-798492503b78",
              },
            },
            {
              type: "boolean",
              boolean: true,
              field: {
                id: "Mt1c7Fxbztns",
                type: "yes_no",
                ref: "03770980-7978-4215-821a-57a8be35ca01",
              },
            },
            {
              type: "boolean",
              boolean: true,
              field: {
                id: "Zp5yti8O6drK",
                type: "yes_no",
                ref: "2a8a3595-d316-4d3a-877e-76255d51e41f",
              },
            },
            {
              type: "choices",
              choices: {
                labels: [
                  "Stress/sleep techniques and tools",
                  "Testing",
                  "Supplement protocol",
                  "Nutrition",
                  "Access to functional medicine practitioners",
                ],
              },
              field: {
                id: "X9mDyVAVtdDY",
                type: "ranking",
                ref: "970ab102-5d2e-47df-9fec-1cdcb2ef8633",
              },
            },
            {
              type: "choices",
              choices: {
                labels: ["Environmental toxin testing"],
              },
              field: {
                id: "xqeqeOV3BVnH",
                type: "multiple_choice",
                ref: "90951006-c46f-407c-a4e5-60afda44e806",
              },
            },
            {
              type: "choice",
              choice: {
                label: "7-9",
              },
              field: {
                id: "euiorEJNXP2S",
                type: "dropdown",
                ref: "7e8b58d3-f107-4f80-b896-2347e325f5d2",
              },
            },
            {
              type: "choice",
              choice: {
                label: "1 time per week",
              },
              field: {
                id: "3HHmqgn2xkrj",
                type: "multiple_choice",
                ref: "a576bdf7-2f43-48ef-a96f-8ee1308f3bd3",
              },
            },
            {
              type: "choices",
              choices: {
                labels: ["No Dairy"],
              },
              field: {
                id: "xNtv5qDETKxv",
                type: "multiple_choice",
                ref: "892e4607-c3a1-4cf0-af9a-cc696631e1c6",
              },
            },
            {
              type: "text",
              text: "None",
              field: {
                id: "jWife1dsvMLH",
                type: "long_text",
                ref: "ef05c1a3-d24b-4e94-95e6-11103958bab8",
              },
            },
            {
              type: "choices",
              choices: {
                labels: ["Eat too much"],
              },
              field: {
                id: "FzPxxN0rnIUq",
                type: "multiple_choice",
                ref: "bcd1d667-9c0f-4892-9dbb-5c6b48127120",
              },
            },
            {
              type: "choices",
              choices: {
                labels: ["Fruits"],
              },
              field: {
                id: "HRI4kheh2c1a",
                type: "multiple_choice",
                ref: "792539dc-7dc5-49ac-a6b2-0e026b6ad27d",
              },
            },
            {
              type: "choices",
              choices: {
                labels: ["Processed, deep-fried or fast foods"],
              },
              field: {
                id: "2iazIblsjQgA",
                type: "multiple_choice",
                ref: "02596f72-8740-448d-b3ef-09e19bff21d8",
              },
            },
            {
              type: "choice",
              choice: {
                label: ">4",
              },
              field: {
                id: "yb7Pb4Q4jpmq",
                type: "dropdown",
                ref: "a5291f1d-398e-4da8-9932-101f722d7b46",
              },
            },
            {
              type: "choice",
              choice: {
                label: "2-4 times a month",
              },
              field: {
                id: "7K8cDea547Ts",
                type: "multiple_choice",
                ref: "d4ed79b1-a941-449d-a8b4-3dde70d38cdd",
              },
            },
            {
              type: "choice",
              choice: {
                label: "3 or 4",
              },
              field: {
                id: "1Sm3peieO8CE",
                type: "multiple_choice",
                ref: "af9b384d-13d0-489b-b7a4-3df535ab999d",
              },
            },
            {
              type: "choice",
              choice: {
                label: "Monthly",
              },
              field: {
                id: "zxf1SOo4srxv",
                type: "multiple_choice",
                ref: "1d929ba9-c4f2-4eba-801e-05a69736e4fe",
              },
            },
            {
              type: "boolean",
              boolean: true,
              field: {
                id: "b1RkdUn46Ntj",
                type: "yes_no",
                ref: "cdef3554-89a4-479e-ad2d-076353438575",
              },
            },
            {
              type: "text",
              text: "5",
              field: {
                id: "0XCR5PH5OJ8q",
                type: "short_text",
                ref: "da29e1ae-9d8c-482d-93ff-2aae3863b08a",
              },
            },
            {
              type: "text",
              text: "7",
              field: {
                id: "rpqDaHZJXqE4",
                type: "short_text",
                ref: "8b70828d-f08a-49a5-aa4d-8cd602471920",
              },
            },
            {
              type: "boolean",
              boolean: true,
              field: {
                id: "Vq85q2zcwhts",
                type: "yes_no",
                ref: "121af57d-9900-4c37-aa7e-1620680c0281",
              },
            },
            {
              type: "text",
              text: "Hbjd",
              field: {
                id: "uRF5OglEEcai",
                type: "short_text",
                ref: "9a994c16-5d3e-4a27-a8d5-80552d5c0de9",
              },
            },
            {
              type: "boolean",
              boolean: true,
              field: {
                id: "WnHztIAgIV7B",
                type: "yes_no",
                ref: "f63f3727-a03c-4c7c-aaf3-47d04ec4940e",
              },
            },
            {
              type: "text",
              text: "CCO",
              field: {
                id: "MZ8R3NQ2IttJ",
                type: "short_text",
                ref: "cea92605-cbbc-4ee4-bf13-fb220505f790",
              },
            },
            {
              type: "text",
              text: "5",
              field: {
                id: "T2ATQ71KhALy",
                type: "long_text",
                ref: "2bbcc0fd-f417-4a96-8b70-71623fb26b1f",
              },
            },
            {
              type: "boolean",
              boolean: true,
              field: {
                id: "NVM3ccSfqWFh",
                type: "yes_no",
                ref: "57895522-7465-4adb-b325-f017c0956afd",
              },
            },
            {
              type: "boolean",
              boolean: true,
              field: {
                id: "LOlSNWdrjOFm",
                type: "yes_no",
                ref: "f70311f2-3666-482b-8559-e920a982a8f4",
              },
            },
            {
              type: "boolean",
              boolean: true,
              field: {
                id: "k8MvvNvpeV1T",
                type: "yes_no",
                ref: "d000406d-59bc-43c5-b319-94518dc23713",
              },
            },
            {
              type: "number",
              number: 3,
              field: {
                id: "V0x9FaHriXfQ",
                type: "opinion_scale",
                ref: "d7850611-2095-452b-8824-b702970231f6",
              },
            },
            {
              type: "choice",
              choice: {
                label: "Term",
              },
              field: {
                id: "jRaBciqlw2J2",
                type: "multiple_choice",
                ref: "5e00c14a-d6c1-47a2-b414-fa743fe8db60",
              },
            },
            {
              type: "choices",
              choices: {
                labels: ["Bottle-fed"],
              },
              field: {
                id: "rryhOGLXB6BK",
                type: "multiple_choice",
                ref: "640b222d-69f2-4066-8a1d-0c82b6de7c4c",
              },
            },
            {
              type: "boolean",
              boolean: true,
              field: {
                id: "6rhGlskgIQjP",
                type: "yes_no",
                ref: "d269b21b-1233-4548-b481-950477ed188b",
              },
            },
            {
              type: "boolean",
              boolean: true,
              field: {
                id: "IKC2Kjo3dAPZ",
                type: "yes_no",
                ref: "798425c3-eb14-49b6-880d-4e0401364285",
              },
            },
            {
              type: "choices",
              choices: {
                labels: ["Gold fillings"],
              },
              field: {
                id: "p7AZmLUDn3sV",
                type: "multiple_choice",
                ref: "0e147975-2cb1-4ce1-af3f-184b1fb02119",
              },
            },
            {
              type: "choices",
              choices: {
                labels: ["Twice a day"],
              },
              field: {
                id: "8yn75ahbsewk",
                type: "multiple_choice",
                ref: "b18d98b1-45c2-4c2b-969a-fa27ba56d392",
              },
            },
            {
              type: "choices",
              choices: {
                labels: [
                  "Cleaning chemicals, disinfectants, hand sanitizers, etc.",
                ],
              },
              field: {
                id: "2esXMcTcMYcr",
                type: "multiple_choice",
                ref: "d62cb5cd-2716-453d-ad1f-426784daeab8",
              },
            },
            {
              type: "text",
              text: "yes",
              field: {
                id: "8Nl0DIRxzVa6",
                type: "long_text",
                ref: "75853b78-c98f-4a47-ad2b-f66e2d1007bc",
              },
            },
            {
              type: "text",
              text: "GHJS",
              field: {
                id: "QIeTDMCcO6kT",
                type: "long_text",
                ref: "8118bd57-5f30-48fa-93c3-a911fc5a39ce",
              },
            },
            {
              type: "choices",
              choices: {
                labels: ["Anxiety", "Depression", "Genetic disorders"],
              },
              field: {
                id: "JM2f8MoDZpHK",
                type: "multiple_choice",
                ref: "6da1ff0f-990d-4a84-99e1-9f541ea2d8c3",
              },
            },
            {
              type: "choices",
              choices: {
                labels: ["Teen <5", "Adulthood <5", "Adulthood >5"],
              },
              field: {
                id: "Qt0o64NhzV8F",
                type: "multiple_choice",
                ref: "3e330a6d-043c-481a-b98c-c078f6cc68fb",
              },
            },
            {
              type: "text",
              text: "No",
              field: {
                id: "JvqVcnGhdKVA",
                type: "long_text",
                ref: "d5a76850-c4bb-4241-a196-8ad6426ae487",
              },
            },
            {
              type: "choice",
              choice: {
                label: "Female",
              },
              field: {
                id: "vDWIZdODJDOU",
                type: "multiple_choice",
                ref: "3c09bd10-5542-45b0-8e38-9d638ba75cc5",
              },
            },
            {
              type: "choices",
              choices: {
                labels: ["Premature birth"],
              },
              field: {
                id: "VNPlixXEYqF5",
                type: "multiple_choice",
                ref: "61ee3ce4-4f2d-415c-8b7b-4e7e91fe079d",
              },
            },
            {
              type: "text",
              text: "dghd",
              field: {
                id: "grYw34tNKVKv",
                type: "long_text",
                ref: "c115b0ac-2c25-4e3a-9674-523ae2eb2c9e",
              },
            },
            {
              type: "text",
              text: "14",
              field: {
                id: "zmDFag41jzIt",
                type: "long_text",
                ref: "227eae37-716d-41d7-86c0-ad059b7e3472",
              },
            },
            {
              type: "text",
              text: "HJgsjs",
              field: {
                id: "nbyCIyn9Jeyd",
                type: "long_text",
                ref: "e02f3af1-8926-4f08-be33-2e2e6a06b444",
              },
            },
            {
              type: "text",
              text: "yes",
              field: {
                id: "HcD8jB7ob4Bz",
                type: "long_text",
                ref: "e51afe47-9928-407c-8298-2e990f9cfdb5",
              },
            },
            {
              type: "text",
              text: "no",
              field: {
                id: "oj5FrMQ1527g",
                type: "long_text",
                ref: "6e009b87-7f7a-4ada-a909-ae903770551e",
              },
            },
            {
              type: "text",
              text: "no",
              field: {
                id: "4KeyAftdg4l4",
                type: "long_text",
                ref: "fe3afb13-4fbd-4bc9-88ac-144b5acf70ae",
              },
            },
            {
              type: "text",
              text: "no",
              field: {
                id: "UtH5WVN6CB1L",
                type: "long_text",
                ref: "d7c01ab9-6a4e-4819-956b-19e56d8260b7",
              },
            },
            {
              type: "text",
              text: "2",
              field: {
                id: "XxKZA8o7RwcL",
                type: "long_text",
                ref: "af63d770-2f57-4aac-978e-e362345a96ce",
              },
            },
            {
              type: "text",
              text: "np",
              field: {
                id: "88CmstEg5m95",
                type: "long_text",
                ref: "337ea5ff-2faf-4f09-b9d5-73de742d8326",
              },
            },
            {
              type: "text",
              text: "no",
              field: {
                id: "aRgqSXqJ5u0m",
                type: "long_text",
                ref: "c6613bb3-02c3-4482-92e6-717ef4275f83",
              },
            },
            {
              type: "text",
              text: "Np",
              field: {
                id: "hkvJvfwO45LE",
                type: "long_text",
                ref: "39a7d71e-6bad-44dd-a9c4-4e2d5080cfba",
              },
            },
            {
              type: "choice",
              choice: {
                label: "3- Mostly dissatisfied",
              },
              field: {
                id: "rPpi2Ng3ajGM",
                type: "multiple_choice",
                ref: "7a92b0a4-2b2b-4005-afa6-97c3c318d1b3",
              },
            },
            {
              type: "choice",
              choice: {
                label: "1- Terrible",
              },
              field: {
                id: "u4Pw5N24mtdZ",
                type: "multiple_choice",
                ref: "add39e94-d204-47eb-a4e8-5b00fa9cda30",
              },
            },
            {
              type: "choice",
              choice: {
                label: "2- Unhappy",
              },
              field: {
                id: "kIeTKqFK3b1a",
                type: "multiple_choice",
                ref: "c7505441-dc63-4bda-8a79-e95e76af774e",
              },
            },
            {
              type: "choice",
              choice: {
                label: "2- Unhappy",
              },
              field: {
                id: "L9CZtdr7T4Uk",
                type: "multiple_choice",
                ref: "5c2abe19-20c7-4b8c-a483-51c026da5854",
              },
            },
            {
              type: "choice",
              choice: {
                label: "No significant other",
              },
              field: {
                id: "knce5tVS8th2",
                type: "multiple_choice",
                ref: "8b610007-96c8-49e9-8eb2-f0df1275ead8",
              },
            },
            {
              type: "choice",
              choice: {
                label: "2- Unhappy",
              },
              field: {
                id: "Qh2nmOUhbtX2",
                type: "multiple_choice",
                ref: "931afbf3-a7ef-4164-9ca8-7f12c25a242b",
              },
            },
            {
              type: "choice",
              choice: {
                label: "4- Mixed",
              },
              field: {
                id: "elR0LJ49OKEv",
                type: "multiple_choice",
                ref: "44e8c1c5-0864-4bea-bfda-ff704b34e67b",
              },
            },
            {
              type: "choice",
              choice: {
                label: "5- Mostly satisfied",
              },
              field: {
                id: "T5IdFR5Tv6fY",
                type: "multiple_choice",
                ref: "475fd21f-9245-47ed-b120-4cd4d7f89294",
              },
            },
            {
              type: "choice",
              choice: {
                label: "6- Satisfied",
              },
              field: {
                id: "sdRaeoAxHjRV",
                type: "multiple_choice",
                ref: "d4eee8af-8746-42da-b2d0-c7e4165144ca",
              },
            },
            {
              type: "choice",
              choice: {
                label: "4- Mixed",
              },
              field: {
                id: "9wkQSZVyi7yu",
                type: "multiple_choice",
                ref: "3bdacc35-4dcc-46c7-9785-3663197ad4ac",
              },
            },
            {
              type: "choice",
              choice: {
                label: "3- Mostly dissatisfied",
              },
              field: {
                id: "l1BLouRiboNJ",
                type: "multiple_choice",
                ref: "93850eba-8838-4e21-9f7f-a9b418f40c4e",
              },
            },
          ],
        },
        sync_type: "forms_answers",
      },
    };
  }
}
