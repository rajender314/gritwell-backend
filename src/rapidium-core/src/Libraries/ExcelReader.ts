import { ResourceNotFound } from '@basePath/Exceptions/ResourceNotFound';
const XLSX = require('xlsx');
const readXlsxFile = require('read-excel-file/node')
// const ExcelJS = require('exceljs');
/**
 * class ExcelReader
 */
export default class ExcelReader {
  /**
   * @param {filePath} filePath
   * @param {headers} headers
   * @return {Object}
   */
  async getData(filePath: string, schema, sheetName: string) {

    //headers from schema
    const schemaHeaders = Object.keys(schema).map(element => {
      return element.toLowerCase();
    });

    await readXlsxFile(filePath, { getSheets: true }).then((sheets) => {
      if (!(sheets[0] && sheets[0].name)) {
        throw new ResourceNotFound(
          'Sheet Name not Provived',
          '',
        ); 
      } else if (sheets[0].name != sheetName) {
        throw new ResourceNotFound(
          `Invalid Sheet name, sheet name should be ${sheetName}`,
          '',
        );
      }
    });

    //headers from excel
    const excelHeaders = await readXlsxFile(filePath).then((rows) => {
      let headers: any = [];
      if (rows[0]) {
        headers = rows[0].map(element => {
          return element.toLowerCase();
        });
      }
      return headers;
    });

    //verify excel headers
    if (!(JSON.stringify(schemaHeaders) == JSON.stringify(excelHeaders))) {
      throw new ResourceNotFound(
        'Please make sure the headers match the sample file.',
        '',
      );
    }

    //return excel data
    return await readXlsxFile(filePath, { schema }).then(({ rows, errors }) => {
      if (errors.length) {
        let key = '';
        let message = '';
        let errorsArr: any = [];
        errors.map(error => {
          if (error.error === 'required') {
            key = `Row ${error.row}`;
            message = `${error.column} is required in ${key}`;
          }
          if (error.error === 'invalid') {
            key = `Row ${error.row}`;
            message = `${error.column} is invalid in ${key}`;
          }
          // errorsArr.push({
          //   //[key]: message
          //   //key,
          //   message
          // })
          errorsArr.push(message);
        })
        return { success: false, data: errorsArr };
      }
      if (rows.length) {
        return { success: true, data: rows };
      }
    })

  }
  async getData2(filePath: string, headers: Array<string>) {
    const excel = require('exceljs');
    const workbook = new excel.Workbook();

    /*
    workbook.xlsx.readFile(filePath)
      .then(function () {
        var worksheet = workbook.getWorksheet('Goal');
        const headers = [
          { header: 'Name', key: 'name', width: 25 },
          { header: 'Status', key: 'status', width: 25 },
          { header: 'UUID', key: 'uuid', width: 9, outlineLevel: 1 },
        ];
        worksheet.columns = headers;
        // worksheet.getColumn('uuid').eachCell((cell, rn) => {
        //   //console.log(cell)
        //   console.log(29, cell.value);
        // });
        // const c1 = worksheet.getColumn(3);
        // c1.eachCell(c => {
        //   console.log(c.value);
        // });
        worksheet.eachRow({ includeEmpty: false }, function (row, rowNumber) {
          if (rowNumber != 1) {
            console.log(row)
            console.log("Row " + rowNumber + " = " + JSON.stringify(row.values));
          }
        });
      });
      */


    await workbook.xlsx.readFile(filePath);
    let jsonData: any = [];
    workbook.worksheets.forEach(function (sheet) {
      let firstRow = sheet.getRow(1);
      if (!firstRow.cellCount) return;
      let keys = firstRow.values;
      sheet.eachRow((row, rowNumber) => {
        if (rowNumber == 1) return;
        let values = row.values
        let obj: any = {};
        for (let i = 1; i < keys.length; i++) {
          obj[keys[i].toLowerCase()] = values[i];
        }
        jsonData.push(obj);
      })

    });

    /*
       const wb = await XLSX.readFile(filePath);
       const sheetName = await wb.SheetNames[0];
       const worksheet = await wb.Sheets[sheetName];
   
       const excelData = await XLSX.utils.sheet_to_json(worksheet, {
         header: 1,
         raw: false,
         defval: '',
       });  
       if (excelData.length) {
         const orginalColumnNames = excelData.shift();
         const excelHeaders = orginalColumnNames.map(function(v) {
           return v.toLowerCase().trim();
         });
         if (!(JSON.stringify(headers) == JSON.stringify(excelHeaders))) {
           throw new ResourceNotFound(
               'Please make sure the headers match the sample file.',
               '',
           );
         }
         if (excelData.length) {
           return excelData;
         } else {
           throw new ResourceNotFound('No Data Provided in Excel', '');
         }
       } else {
         throw new ResourceNotFound('No Data Provided in Excel', '');
       }
       */
  }
  /**
 * @param {excelData} excelData
 * @param {headers} headers
 * @return  {Object}
 */
  async prepareData(excelData, headers: Array<string>) {
    const data: any = [];
    // const data = new Array();
    excelData.map((row) => {
      const obj: any = {};
      if (row.length) {
        row.forEach((cell, i) => {
          if (headers[i]) {
            obj[headers[i]] = cell;
          }
        });
        data.push(obj);
      }
    });
    return data;
  }
}
