import React from 'react';
import classNames from 'classnames'

import './Square.scss'

const Square = ({x, y}) => {
  return (
    <div className={classNames('square')}>
      {`${y}, ${x}`}
    </div>
  )
}

export default Square