import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
import {NutritionSchema}
  from '@basePath/Admin/DataSource/Models/Schema/NutritionSchema';
import {LifeStyleSchema}
  from '@basePath/Admin/DataSource/Models/Schema/LifeStyleSchema';
import {
  INutrition,
  ILifeStyle,
} from '@basePath/Admin/Interfaces/IRecommendations';
/**
 * class CreateRecommendation
 */
export class CreateRecommendation extends BaseCommand {
  public payload: INutrition | ILifeStyle;
  public schema: typeof NutritionSchema | typeof LifeStyleSchema;
  public path =
    __dirname.replace(process.cwd(), '.') + '/CreateRecommendation.ts';
  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.payload = data.payload ? data.payload : '';
    this.schema = data.schema;
  }
}
