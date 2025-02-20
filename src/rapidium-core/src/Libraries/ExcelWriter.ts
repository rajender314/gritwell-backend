/**
 * class ExcelWriter
 */
export default class ExcelWriter {
  /**
   * write
   * @param {data} data
   * @param {sheetName} sheetName
   * @param {headers} headers
   * @return {Object}
   */
  async write(data, sheetName: string, headers) {
    const excel = require('exceljs');
    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet(sheetName, {
      properties: { tabColor: { argb: 'FFC0000' } },
    });
    worksheet.columns = headers;
    let cellName = '';
    worksheet.addRows(data);
    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell, colNumber) => {
        cellName = row.getCell('status')._address.charAt(0);
        if (rowNumber == 1) {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'f5b914' },
          };
        };
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      });
      row.commit();
    });
    for (let i = 2; i < 1000; i++) {
      worksheet.getCell(`${cellName}${i}`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: ['"ACTIVE,INACTIVE"'],
        showErrorMessage: true,
        errorStyle: 'error',
        errorTitle: 'Status',
        error: 'Value must be ACTIVE or INACTIVE'
      };
    }

    return workbook;
  }
}
