export const getDlsData = ({sources, pathBuilder}) => {
  let sumDlsLight = [];
  let sumDlsPartLight = []
  let sumDlsMyVenom = [];
  let sumDlsPartVenom = [];
  console.log('%c%s', 'color: aqua; font-size:33px', 'INSIDE_GET_DLS_DATA:',sources)
  sources['me'].forEach(({move, Y, X, id}) => {
    let sumDls = move.effect({id, Y, X, sources, pathBuilder})
    console.log('EACH_SUM_DLS:',sumDls)
    sumDlsLight = sumDlsLight.concat(sumDls.dlsLight);
    sumDlsMyVenom = sumDlsMyVenom.concat(sumDls.dlsVenome);
  })
  sources['partner'].forEach(({move, Y, X, id}) => {
    let partnerSumDls = move.effect({id, Y, X, sources, pathBuilder});
    sumDlsPartVenom = sumDlsPartVenom.concat(partnerSumDls.dlsVenome);
    sumDlsPartLight = sumDlsPartLight.concat(partnerSumDls.dlsLight);
  })
  return {
    sumDlsLight,
    sumDlsPartLight,
    sumDlsMyVenom,
    sumDlsPartVenom,
  }
}

export const opacityRedWrapper = (baseStep, endStep) => {
  return new Promise((resolve) => {
    let progress = 0
    let opacityRed = () => {
      setTimeout(() => {
        progress++
        baseStep(progress)
        
        if(progress <100) {
          opacityRed()
        } else {
          endStep()
          resolve()
          //display: block; position: absolute; width: 90px; transform: translateY(-104px) translateX(104px); opacity: 0;
        }
      }, 10)
    }
    opacityRed()
  })
}

export const lightFilter = (lightArr) => {
  let workArr = lightArr.slice() // check on Right pass
  workArr.forEach(({newY, newX}) => {
    let deathFlag = false;
    console.log('%c%s', 'color: navy; font-size: 33px;', 'THAT_LIGHT_FILTER_PASS')
    workArr.forEach(({newY: nY, newX: nX}, i) => {
      let gC = newY === nY && newX === nX
      if(gC) {
        deathFlag = true
      }
      if(gC && deathFlag) {
        workArr.splice(i, 1)
      }
    })
  })
  return workArr
}