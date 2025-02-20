import {env} from 'process';

export const myconsole = {
  log(...args: any) {
    getLog(...args);
  },
};
/**
 * @param {data} data
 * @return {Boolean}
 */
function getLog(...data: any) {
  if (env.APP_ENV === 'local') {
    return console.log(data);
  } else {
    return true;
  }
}
