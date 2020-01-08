export const indexFinderModel = resSchema => (workIndex, newY, newX) => {
  // console.log(`NEWY: ${newY}, NEWX: ${newX}`)
   resSchema[newY].forEach(({x}, i) => {
     if(newX === x) {
       workIndex[0] = i
     }
   })
 }