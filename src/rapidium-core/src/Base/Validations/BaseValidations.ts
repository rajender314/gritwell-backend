import * as Joi from '@hapi/joi';
// const moment = require('moment');
// import {ObjectId} from '@rapCore/src/Mongodb/Types';
/**
 * class BaseValidations
 */
export default class BaseValidations {
  public rules: any;
  public messages: any;
  public customValidations: object = {};
  public joiValidationRules: object = {};
  public schemaName: any;
  public fieldName: any;
  public fieldId: any;
  public customMsg: any;
  /**
 * constructor
 */
  constructor() {}
  /**
 * @param {rules} rules
 * @param {message} message
 */
  public setRules(rules: object, message: object) {
    this.rules = rules;
    this.messages = message;
  }
  /**
  * @param {customMsg} customMsg
 */
  public doCustomValidation(customMsg) {
    this.customMsg = customMsg;
  }
  /**
 * @param {rules} rules
 * @param {message} message
 * @param {schemaName} schemaName
 * @param {fieldName} fieldName
 * @param {fieldId} fieldId
 */
  public setAdminRules(
      rules: object,
      message: object,
      schemaName: any,
      fieldName: string,
      fieldId: string,
  ) {
    this.rules = rules;
    this.messages = message;
    this.schemaName = schemaName;
    this.fieldName = fieldName;
    this.fieldId = fieldId;
  }
  /**
  * @param {rule} rule
 * @return {Object}
 */
  public generateJoiValidations(rule: string) {
    const joiValidator = Joi;
    let joiValidate;
    const subRules = rule.includes('|') ?
      rule.split('|') :
      rule.includes('required') ?
      ['required'] :
      [rule];

    subRules.forEach((subRule) => {
      if (subRule === 'required') {
        joiValidate =
          typeof joiValidate != 'object' ?
            joiValidator.required() :
            joiValidate.concat(joiValidator.required());
      } else if (subRule === 'string') {
        joiValidate =
          typeof joiValidate != 'object' ?
            joiValidator.string() :
            joiValidate.concat(joiValidator.string());
      } else if (subRule === 'alphabets') {
        joiValidate =
          typeof joiValidate != 'object' ?
            joiValidator.string().regex(/^[a-zA-Z ]*$/) :
            joiValidate.concat(joiValidator.string().regex(/^[a-zA-Z ]*$/));
      } else if (subRule === 'alphanum') {
        joiValidate =
          typeof joiValidate != 'object' ?
            joiValidator.string().alphanum() :
            joiValidate.concat(joiValidator.string().alphanum());
      } else if (subRule.startsWith('min') || subRule.startsWith('max')) {
        const [ruleType, length] = subRule.split(':');
        if (ruleType === 'min') {
          joiValidate =
            typeof joiValidate != 'object' ?
              joiValidator.string().min(Number(length)) :
              joiValidate.concat(joiValidator.string().min(Number(length)));
        } else if (ruleType === 'max') {
          joiValidate =
            typeof joiValidate != 'object' ?
              joiValidator.string().max(Number(length)) :
              joiValidate.concat(joiValidator.string().max(Number(length)));
        }
      } else if (subRule === 'boolean') {
        joiValidate =
          typeof joiValidate != 'object' ?
            joiValidator.boolean() :
            joiValidate.concat(joiValidator.boolean());
      } else if (subRule === 'number') {
        joiValidate =
          typeof joiValidate != 'object' ?
            joiValidator.number() :
            joiValidate.concat(joiValidator.number());
      } else if (subRule === 'email') {
        joiValidate =
          typeof joiValidate != 'object' ?
            joiValidator.string().email() :
            joiValidate.concat(joiValidator.string().email());
      } else if (subRule === 'float') {
        joiValidate =
          typeof joiValidate != 'object' ?
            joiValidator.string().regex(/^[0-9][+-]?\d+(\.\d+)?$/) :
            joiValidate.concat(
                joiValidator.string().regex(/^[0-9][+-]?\d+(\.\d+)?$/),
            );
      } else if (subRule === 'latitude') {
        joiValidate =
          typeof joiValidate != 'object' ?
            joiValidator
                .string()
                .regex(/^[+-]?(([1-8]?[0-9])(\.[0-9]{1,6})?|90(\.0{1,6})?)$/) :
            joiValidate.concat(
                joiValidator
                    .string()
                    .regex(/^[+-]?(([1-8]?[0-9])(\.[0-9]{1,6})?|90(\.0{1,6})?)$/),
            );
      } else if (subRule === 'longitude') {
        joiValidate =
          typeof joiValidate != 'object' ?
            joiValidator
                .string()
                .regex(
                    /^[+-]?((([1-9]?[0-9]|1[0-7][0-9])(\.[0-9]{1,6})?)|180(\.0{1,6})?)$/,
                ) :
            joiValidate.concat(
                joiValidator
                    .string()
                    .regex(
                        /^[+-]?((([1-9]?[0-9]|1[0-7][0-9])(\.[0-9]{1,6})?)|180(\.0{1,6})?)$/,
                    ),
            );
      } else if (subRule === 'date') {
        joiValidate =
          typeof joiValidate != 'object' ?
            joiValidator.date() :
            joiValidate.concat(joiValidator.date());
      } else if (subRule == 'date_Y-M-D') {
        joiValidate =
          typeof joiValidate != 'object' ?
            joiValidator
                .string()
                .regex(
                    /^((19|20)\d{2})\-(0[1-9]|1[0-2])\-(0[1-9]|1\d|2\d|3[01])$/,
                ) :
            joiValidate.concat(
                joiValidator
                    .string()
                    .regex(
                        /^((19|20)\d{2})\-(0[1-9]|1[0-2])\-(0[1-9]|1\d|2\d|3[01])$/,
                    ),
            );
      } else if (subRule == 'date_D-M-Y') {
        joiValidate =
          typeof joiValidate != 'object' ?
            joiValidator
                .string()
                .regex(
                    /^(0[1-9]|1\d|2\d|3[01])\-(0[1-9]|1[0-2])\-((19|20)\d{2})$/,
                ) :
            joiValidate.concat(
                joiValidator
                    .string()
                    .regex(
                        /^(0[1-9]|1\d|2\d|3[01])\-(0[1-9]|1[0-2])\-((19|20)\d{2})$/,
                    ),
            );
      } else if (subRule == 'date_M-D-Y') {
        joiValidate =
          typeof joiValidate != 'object' ?
            joiValidator
                .string()
                .regex(
                    /^(0[1-9]|1[0-2])\-((19|20)\d{2})\-(0[1-9]|1\d|2\d|3[01])$/,
                ) :
            joiValidate.concat(
                joiValidator
                    .string()
                    .regex(
                        /^(0[1-9]|1[0-2])\-((19|20)\d{2})\-(0[1-9]|1\d|2\d|3[01])$/,
                    ),
            );
      } else if (subRule == 'date_Y/M/D') {
        joiValidate =
          typeof joiValidate != 'object' ?
            joiValidator
                .string()
                .regex(
                    /^((19|20)\d{2})\/(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])$/,
                ) :
            joiValidate.concat(
                joiValidator
                    .string()
                    .regex(
                        /^((19|20)\d{2})\/(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])$/,
                    ),
            );
      } else if (subRule == 'date_D/M/Y') {
        joiValidate =
          typeof joiValidate != 'object' ?
            joiValidator
                .string()
                .regex(
                    /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/((19|20)\d{2})$/,
                ) :
            joiValidate.concat(
                joiValidator
                    .string()
                    .regex(
                        /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/((19|20)\d{2})$/,
                    ),
            );
      } else if (subRule == 'date_M/D/Y') {
        joiValidate =
          typeof joiValidate != 'object' ?
            joiValidator
                .string()
                .regex(
                    /^(0[1-9]|1[0-2])\/((19|20)\d{2})\/(0[1-9]|1\d|2\d|3[01])$/,
                ) :
            joiValidate.concat(
                joiValidator
                    .string()
                    .regex(
                        /^(0[1-9]|1[0-2])\/((19|20)\d{2})\/(0[1-9]|1\d|2\d|3[01])$/,
                    ),
            );
      } else if (subRule == 'timestamp') {
        joiValidate =
          typeof joiValidate != 'object' ?
            joiValidator.date().timestamp() :
            joiValidate.concat(joiValidator.date().timestamp());
      } else if (subRule == 'datauri') {
        joiValidate =
          typeof joiValidate != 'object' ?
            joiValidator.string().dataUri() :
            joiValidate.concat(joiValidator.string().dataUri());
      } else if (subRule == 'array') {
        joiValidate =
          typeof joiValidate != 'object' ?
            joiValidator.array() :
            joiValidate.concat(joiValidator.array());
      } else if (subRule == 'arrayNumber') {
        joiValidate =
          typeof joiValidate != 'object' ?
            joiValidator.array().items(joiValidator.number()) :
            joiValidate.concat(
                joiValidator.array().items(joiValidator.number()),
            );
      } else if (subRule == 'arrayString') {
        joiValidate =
          typeof joiValidate != 'object' ?
            joiValidator.array().items(joiValidator.string()) :
            joiValidate.concat(
                joiValidator.array().items(joiValidator.string()),
            );
      } else if (subRule == 'object') {
        joiValidate =
          typeof joiValidate != 'object' ?
            joiValidator.object() :
            joiValidate.concat(joiValidator.object());
      } else if (subRule == 'alphanumwithspace') {
        joiValidate = typeof (joiValidate != 'object') ?
          joiValidator
              .string()
              .regex(/^[a-zA-Z0-9 _]*[a-zA-Z0-9][a-zA-Z0-9 _]*$/) :
          joiValidate.concat(
              joiValidator
                  .string()
                  .regex(/^[a-zA-Z0-9 _]*[a-zA-Z0-9][a-zA-Z0-9 _]*$/),
          );
      } else if (subRule == 'isDynamicRule') {
        if (typeof joiValidate != 'object') {
          joiValidate = joiValidator.custom((value, helper) => {
            if (!this.customMsg) {
              return helper.message({custom: this.messages.isDynamicRule});
            } else {
              return true;
            }
          });
        } else {
          joiValidate = joiValidate.concat(
              joiValidator.custom((value, helper) => {
                if (!this.customMsg) {
                  return helper.message({custom: this.messages.isDynamicRule});
                } else {
                  return true;
                }
              }),
          );
        }
      } else {
        joiValidate =
          typeof joiValidate != 'object' ?
            joiValidator.any() :
            joiValidate.concat(joiValidator.any());
      }
      joiValidate = !rule.includes('required') ?
        joiValidate.allow(null, '') :
        joiValidate;
      // joiValidate = joiValidate.message(this.messages)
    });
    return joiValidate;
  }
  /**
 * @param {rule} rule
 * @return {Object}
 */
  public generateCustomValidations(rule: string) {
    const customValidatorArray: any = [];
    const subRules = rule.split('|');
    subRules.forEach((subRule) => {
      const allCustomRules = Object.keys(this.customValidations);
      if (allCustomRules.indexOf(subRule) > -1) {
        customValidatorArray.push(this.customValidations[subRule]);
      }
    });
    return customValidatorArray[0];
  }
  /**
 * @return {Object}
 */
  public createJoiRules() {
    const JoinRules = {};
    Object.keys(this.rules).forEach((ruleKey: string) => {
      const roleValue = this.rules[ruleKey];
      const joiValidationRule = this.generateJoiValidations(roleValue);
      Object.assign(JoinRules, {
        [ruleKey]: joiValidationRule,
      });
    });
    return JoinRules;
  }
  /**
 * @return {Object}
 */
  public createCustomRules() {
    const customRules = {};
    Object.keys(this.rules).forEach((ruleKey: string) => {
      const roleValue = this.rules[ruleKey];
      const customValidationRule = this.generateCustomValidations(roleValue);
      if (customValidationRule) {
        Object.assign(customRules, {
          [ruleKey]: customValidationRule,
        });
      }
    });
    return customRules;
  }
  /**
 * @param {customRules} customRules
 * @return {Object}
 */
  public customSchemaValidate(customRules: object) {
    return Object.keys(customRules)
        .filter((ruleKey: string) => {
          const callback = customRules[ruleKey];
          const isError = callback();
          return !isError;
        })
        .map((ruleKey: string) => {
          return {
            message: this.messages[ruleKey],
            key: ruleKey,
          };
        });
  }
  /**
  * @param {data} data
 * @return {Object}
 */
  async validate(data: object) {
    const ruleKeys = Object.keys(this.rules);
    const createRules = this.createJoiRules();
    const customRules = this.createCustomRules();
    const customErrors = this.customSchemaValidate(customRules);
    let noUniqueError: any = true;
    if (this.schemaName) {
      noUniqueError = this.checkUnique(
          this.schemaName,
          this.fieldName,
          data[this.fieldName],
          data[this.fieldId],
      );
    }

    const schema = Joi.object().keys(createRules);
    const pickedData = {};

    ruleKeys.forEach((ruleKey: string) => {
      Object.assign(pickedData, {
        [ruleKey]: data[ruleKey],
      });
    });
    const errors: any = schema.validate(pickedData);
    if (errors.error) {
      if (errors.error.details[0].context.regex) {
        return errors.error.details[0].context.label + ` must be valid data`;
      }
      return errors.error.details[0].message;
    } else if (customErrors.length) {
      return customErrors[0].message;
    } else {
      return noUniqueError;
    }
  }
  /**
  * @param {validationName} validationName
 * @param {callback} callback
 * @return {Object}
 */
  public extendValidators(validationName: string, callback: () => boolean) {
    return Object.assign(this.customValidations, {
      [validationName]: callback,
    });
  }
  /**
 * @param {email} email
 * @param {emialName} emialName
 * @return {Object}
 */
  public emailValidation(email: string, emialName: string) {
    try {
      const emailValidResult: any = Joi.string()
          .email()
          .required()
          .label('Email')
          .regex(
              /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/,
          )
          .example(email)
          .error(new Error('Invalid email'));
      if (emailValidResult.error) {
        return {
          success: false,
          message: `${emialName} ${emailValidResult._flags.error.message}`,
        };
      } else {
        return {success: true};
      }
    } catch (err) {
      return err;
    }
  }
  /**
   * @param {SchemaName} SchemaName
   * @param {fieldToCheck} fieldToCheck
   * @param {fieldValue} fieldValue
   * @param {fieldIdValue} fieldIdValue
   * @return {Object}
   */
  async checkUnique(
      SchemaName: any,
      fieldToCheck: any,
      fieldValue,
      fieldIdValue: any,
  ) {
    const query = {};
    query[fieldToCheck] = fieldValue;

    if (fieldIdValue) {
      query['_id'] = {$ne: fieldIdValue};
    }
    return await SchemaName.findOne(query)
        .then(async (doc: object) => {
          if (doc && doc['_id']) {
            return this.messages['name'];
          } else {
            return true;
          }
        })
        .catch((error: any) => {
          return error;
        });
  }
}
