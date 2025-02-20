import { DownloadNutrition } from '@basePath/Exports/Commands/DownloadNutrition';
import { DownloadLifeStyle } from '@basePath/Exports/Commands/DownloadLifeStyle';
import { DownloadSupplement }
  from '@basePath/Exports/Commands/DownloadSupplement';
import { DownloadTest } from '@basePath/Exports/Commands/DownloadTest';
import { NutritionSchema }
  from '@basePath/Admin/DataSource/Models/Schema/NutritionSchema';
import { LifeStyleSchema }
  from '@basePath/Admin/DataSource/Models/Schema/LifeStyleSchema';
import { SupplementSchema }
  from '@basePath/Admin/DataSource/Models/Schema/SupplementSchema';
import { TestSchema } from '@basePath/Admin/DataSource/Models/Schema/TestSchema';
import {
  INutrition,
  ILifeStyle,
  ISupplement,
  ITest,
} from '@basePath/Exports/Interfaces/IExport';
// import {ResourceNotFound} from '@basePath/Exceptions/ResourceNotFound';
/**
 * class ExportRecommendationDataSource
 */
export default class ExportRecommendationDataSource {
  /**
   * @param {data} data
   * @return {Object}
   */
  async downloadNutrition(data: DownloadNutrition) {
    const search = data.search;
    const nutritions: INutrition[] = [];
    return NutritionSchema.aggregate([
      {
        $match: {
          $or: [
            {
              name: {
                $regex: search,
                $options: 'i',
              },
            },
            {
              description: {
                $regex: search,
                $options: 'i',
              },
            },
          ],
        },
      },
      { $sort: { 'status': -1 } },
    ]).then((dbNutritions: INutrition[]) => {
      if (dbNutritions.length) {
        dbNutritions.map((nutrition) => {
          const status = nutrition.status ? 'ACTIVE' : 'INACTIVE';
          nutritions.push({
            name: nutrition.name,
            description: nutrition.description,
            status: status,
            uuid: nutrition.uuid,
          });
        });
      }
      return nutritions;
    });
  }
  /**
   * @param {data} data
   * @return {Object}
   */
  async downloadLifeStyle(data: DownloadLifeStyle) {
    const search = data.search;
    const lifestyles: ILifeStyle[] = [];
    return LifeStyleSchema.aggregate([
      {
        $match: {
          $or: [
            {
              name: {
                $regex: search,
                $options: 'i',
              },
            },
            {
              description: {
                $regex: search,
                $options: 'i',
              },
            },
          ],
        },
      },
      { $sort: { 'status': -1 } },
    ]).then((dbLifestyles: ILifeStyle[]) => {
      if (dbLifestyles.length) {
        dbLifestyles.map((lifestyle) => {
          const status = lifestyle.status ? 'ACTIVE' : 'INACTIVE';
          lifestyles.push({
            name: lifestyle.name,
            description: lifestyle.description,
            status: status,
            uuid: lifestyle.uuid,
          });
        });
      }
      return lifestyles;
    });
  }
  /**
   * @param {data} data
   * @return {Object}
   */
  async downloadSupplement(data: DownloadSupplement) {
    const search = data.search;
    const supplements: ISupplement[] = [];
    return SupplementSchema.aggregate([
      {
        $match: {
          $or: [
            {
              name: {
                $regex: search,
                $options: 'i',
              },
            },
            {
              description: {
                $regex: search,
                $options: 'i',
              },
            },
          ],
        },
      },
      { $sort: { 'status': -1 } },
    ]).then((dbSupplements: ISupplement[]) => {
      if (dbSupplements.length) {
        dbSupplements.map((supplement) => {
          const status = supplement.status ? 'ACTIVE' : 'INACTIVE';
          supplements.push({
            name: supplement.name,
            description: supplement.description,
            brand: supplement.brand,
            dosage: supplement.dosage,
            price: supplement.price,
            link: supplement.link, 
            status: status, 
            uuid: supplement.uuid
          });
        });
      }
      return supplements;
    });
  }
  /**
   * @param {data} data
   * @return {Object}
   */
  async downloadTest(data: DownloadTest) {
    const search = data.search;
    const tests: ITest[] = [];
    return TestSchema.aggregate([
      {
        $match: {
          $or: [
            {
              name: {
                $regex: search,
                $options: 'i',
              },
            },
            {
              description: {
                $regex: search,
                $options: 'i',
              },
            },
          ],
        },
      },
      { $sort: { 'status': -1 } },
    ]).then((dbTests: ITest[]) => {
      if (dbTests.length) {
        dbTests.map((test) => {
          const status = test.status ? 'ACTIVE' : 'INACTIVE';
          tests.push({
            name: test.name,
            description: test.description,
            brand: test.brand,
            price: test.price,
            type: test.type,
            link: test.link,
            status: status,
            uuid: test.uuid,
          });
        });
      }
      return tests;
    });
  }
}
