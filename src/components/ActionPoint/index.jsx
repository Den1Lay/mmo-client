import React, {useState, useEffect} from 'react';
//import {  } from 'color'
import classNames from 'classnames'
import './ActionPoint.scss';

const ActionPoint = ({actionPass, simbol, back, src, oldSrc, startTrans, opacityAfMod, cost}) => {
  useEffect(() => {
    if(src && !opacityAfMod) {
      startTrans()
      // action to up to start back
      // 2 рендера 
    }
    if(!src && opacityAfMod) {
      startTrans()
    }
  })
  //in future mast be img here
  //debugger
  //console.info('%c%s','color: green; font-size: 33px', 'THAT_BACK',  typeof back)
 return (
  <div style={{position: 'relative'}}>
    <div className='actionPoint' onClick={() => actionPass()}>
      {/* <div style={{background: back, opacity: back ? '0' : '1'}} >{simbol}</div> */}
      <div style={{opacity: opacityAfMod ? '0' : '1'}} >{'0‿0'}</div>
      <img // сделать плавное отображение иконки в буд
      src={src || oldSrc} 
      alt='NOONI' 
      style={{opacity: opacityAfMod ? '1' : '0'}}
      /> 
      {/* <img 
      src={'data:image/png;base64,'+window.localStorage.mainSrc} 
      //onClick={() => console.log('lookAt')}
      style={{opacity: src ? 0 : 1}}
      />  */}
    </div>
    {cost ?
    <div className='cost'>
      {cost}
    </div> : null}
  </div>
 )
}

export default ActionPoint;