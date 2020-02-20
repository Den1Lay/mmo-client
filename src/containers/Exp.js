import React from 'react';
export default React.memo((data) => {
  return(
    <div style={{width: '33px', height: '44px', backgroundColor: 'navy', position:'absolute', bottom: '0px', right: '0px'}}>
      {`33/44 + + ${data}`}
    </div>
  )
}, (prev, next) => {
  console.log('PREV:', prev)
  console.log('NEXT:', next)
  return prev.data === next.data
})