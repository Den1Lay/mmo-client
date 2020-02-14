import React from 'react'
import { connect } from 'react-redux'
import { makeSlide } from '@/actions/base'

import { Button, Progress as ProgressLine } from 'antd'

import './Progress.scss'

const Progress = ({show, makeSlide}) => {
  const moveHandler = () => {
    //console.log("CLICK_HANDL", makeSlide)
    makeSlide('game')
  }

  return (
    <div className='progress'>
      <div className='progress__panel'>
        <div className='progress__panel_level'>
          LEVEL: 5
        </div>
        <div className='progress__panel_line'>
          <ProgressLine
              strokeColor={{
                from: '#e0a72c',
                to: '#ffd700',
              }}
              percent={66.9}
              showInfo={false}
              // status="active"
            />
        </div>
      </div>
      <div className='progress__'>
        <Button type='danger' size='large' disabled={show === 'game'} onClick={() => moveHandler()}>FIND ENEMY</Button>
      </div>
    </div>
  )
}

export default connect(({admin: {show}}) => ({show}), {makeSlide})(Progress)