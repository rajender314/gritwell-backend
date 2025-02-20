// import {env} from 'process';
import moment from 'moment';
// import {myconsole} from './myconsole';

const fs = require('fs');

export const Logger = {
  saveLog(errObj: any) {
    const fileName = 'log-' + moment(new Date()).format('DD-MM-YYYY') + '.txt';
    const logPath = process.cwd() + '/logs/' + fileName;
    const dir = './logs';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
      fs.writeFile(logPath, ' ', async (err, data) => {
        if (err) throw err;
      });
    }

    const data: any = {
      error: errObj.message,
      statusCode: errObj.errorCode,
      currentDate: moment(new Date()).format('dddd, MMMM Do YYYY, h:mm:ss a'),
      stack: JSON.stringify(errObj.stack),
      ipAddress: errObj.ipAddress,
    };
    const formattedLog =
    `${data.ipAddress} [${data.currentDate}] 
    ${data.error} ${data.statusCode} ${data.stack}`;

    // if (env.APP_ENV == "local") {
    //   logPattern(formattedLog);
    // }

    fs.open(logPath, 'a', 666, function(e, id) {
      fs.write(id, formattedLog + '\n', null, 'utf8', function() {
        fs.close(id, function() {});
      });
    });
  },
};
/**
 * @param {str} str
 */
// function logPattern(str) {
//   const p =
//     '%{IP:clientIP} \\[%{DAY:day}, %{MONTH:month} %{WORD:date} %{YEAR:year}, %{GREEDYDATA:time}\\] %{GREEDYDATA:error} %{INT:statusCode} %{GREEDYDATA:errorMessage}';

//   require('grok-js').loadDefault((err, patterns) => {
//     if (err) {
//       myconsole.log(err);
//       return;
//     }

//     const pattern = patterns.createPattern(p);

//     pattern.parse(str, (err, obj) => {
//       if (err) {
//         myconsole.log(err);
//         return;
//       }
//       myconsole.log(obj);
//     });
//   });
// }
