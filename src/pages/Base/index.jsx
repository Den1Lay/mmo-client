import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'

import { Board } from '@/containers'
import { Home } from '@/modules'

import './Base.scss'

const Base = () => {

  return(
    <section className={classNames('base')}>
      <Home />
      <Board />
    </section>
  )
}

export default connect()(Base)