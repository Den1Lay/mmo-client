export const getDlsData = ({sources, pathBuilder}) => {
  let sumDlsLight = [];
  let sumDlsVenom = [];
  console.log('%c%s', 'color: aqua; font-size:33px', 'INSIDE_GET_DLS_DATA:',)
  sources['me'].forEach(({move, Y, X}) => {
    let sumDls = move.effect({Y, X, sources, pathBuilder})
    console.log('EACH_SUM_DLS:',sumDls)
    sumDlsLight = sumDlsLight.concat(sumDls.dlsLight);
    sumDlsVenom = sumDlsVenom.concat(sumDls.dlsVenome);
  })
  return {
    sumDlsLight,
    sumDlsVenom,
  }
}