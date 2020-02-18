export const getDlsData = ({sources, pathBuilder}) => {
  let sumDlsLight = [];
  let sumDlsMyVenom = [];
  let sumDlsPartVenom = [];
  console.log('%c%s', 'color: aqua; font-size:33px', 'INSIDE_GET_DLS_DATA:',)
  sources['me'].forEach(({move, Y, X}) => {
    let sumDls = move.effect({Y, X, sources, pathBuilder})
    console.log('EACH_SUM_DLS:',sumDls)
    sumDlsLight = sumDlsLight.concat(sumDls.dlsLight);
    sumDlsMyVenom = sumDlsMyVenom.concat(sumDls.dlsVenome);
  })
  sources['partner'].forEach(({move, Y, X}) => {
    let partnerSumDls = move.effect({Y, X, sources, pathBuilder})
    sumDlsPartVenom = sumDlsPartVenom.concat(partnerSumDls.dlsVenome)
  })
  return {
    sumDlsLight,
    sumDlsMyVenom,
    sumDlsPartVenom,
  }
}