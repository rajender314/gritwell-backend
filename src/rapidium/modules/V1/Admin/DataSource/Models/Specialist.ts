import BaseModel from '@rapCoreBase/Models/BaseModel';
import {GetSpecialists} from '@basePath/Admin/Commands/GetSpecialists';

// const environment = process.env;
/**
 * class Specialist
 */
export default class Specialist extends BaseModel {
  private modelDs: any;
  /**
   * constructor
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
  public getSpecialists(data: GetSpecialists) {
    return this.modelDs
        .find(
            {status: true},
            {
              _id: 1,
              value: '$_id',
              name: 1,
              label: '$name',
              order: 1,
              parent_order: 1,
              children: 1,
            },
        )
        .sort({order: 1})
        .then(async (docs: object) => {
          if (docs) {
            const propertyValues = Object.values(docs);
            const parentSpecialists: any = [];
            const childSpecialists: any = [];

            propertyValues.forEach((element: any) => {
              const parentElement: any = {
                _id: element._id,
                name: element.name,
                parent_order: element.parent_order,
                children: element.children,
                order: element.order,
                value: element.value,
                label: element.name,
              };
              // element.id = element._id;
              if (element['parent_order']) {
                childSpecialists.push(element);
              } else {
                parentElement.expanded = false;
                parentElement.checked = false;
                delete parentElement.parent_order;
                parentSpecialists.push(parentElement);
              }
            });

            parentSpecialists.forEach((parent: any) => {
              childSpecialists.forEach((child: any) => {
                if (parent['order'] == child['parent_order']) {
                  parent['children'] = [...parent['children'], child];
                }
              });
            });
            return parentSpecialists;
          } else {
            return 'There are no permissions exists';
          }
        })
        .catch((error: any) => {
          return error;
        });
  }
}
