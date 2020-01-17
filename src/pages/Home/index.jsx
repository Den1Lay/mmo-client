import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'

import { Board } from '@/containers'

import './Home.scss'

const Home = () => {

  return(
    <section className={classNames('home')}>
      <Board>

      </Board>
    </section>
  )
}

export default connect()(Home)