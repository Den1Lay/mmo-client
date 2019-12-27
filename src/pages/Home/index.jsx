import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'

import { Board } from '@/modules'
import { killer } from '@/store/actions'

import { Button } from 'antd'

import './Home.scss'

const Home = ({ killer, dir }) => {

  return(
    <section className={classNames('home')}>
      <h3>
        {`Kill ${dir}`}
      </h3>
      <Board>
        
      </Board>
      <Button 
        type='primary'
        onClick={() => killer({dir: 'him'})}>
        Kill
      </Button>
    </section>
  )
}

export default connect(({dir}) => ({dir}), { killer })(Home)