import React from 'react'

import './Dialogs.scss'

const Dialogs = () => {
  return (
    <div className='dialogs'>
      <div className='dialogs__inputWrap'>
        <input 
            className='friendList__search'
            type="text" 
            placeholder='find me some-body'/>
      </div>
      <div>
        FRIEND LIST
      </div>
    </div>
  )
}

export default Dialogs