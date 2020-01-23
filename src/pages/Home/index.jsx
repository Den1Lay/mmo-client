import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'

import { Board, Home } from '@/containers'

import './Home.scss'

const HomeLayout = () => {

  return(
    <section className={classNames('home')}>
      <Home />
      <Board />
    </section>
  )
}

export default connect()(HomeLayout)