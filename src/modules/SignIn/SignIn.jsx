import React, {useState} from 'react';
import { connect } from 'react-redux';
import { Input, Button, Form, Icon } from 'antd';

import { registControl } from '@/actions/base';
import { fetchUserLogin } from '@/actions/network'

import './SignIn.scss'

const SignIn = (
  {
  nowIsReg, registControl, fetchUserLogin,
  value, // formick part
  errors: {
    password: ePassword,
    email: eEmail
  },
  touched: {
    password: tPassword,
    email: tEmail
  },
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  status: {status, message}
  }
  ) => {
  return (
    <div onClick={() => registControl()} className='signIn'>
      <div className='signIn__workArea' onClick={(ev) => ev.stopPropagation()}>
        <div className='signIn__header'>
          <h2>SIGH_IN | LOGIN_IN</h2>
          <p>You'r data</p>
        </div>
        <Form onSubmit={handleSubmit} className='signIn__form'>
          <Form.Item validateStatus={
            !tEmail ? '' : eEmail
              ? 'error' : 'success'}
                help={tEmail ? eEmail : null} hasFeedback>
            <Input 
              id='email'
              name='email'
              placeholder='Email'
              onChange={handleChange}
              onBlur={handleBlur}
              size='large'
              prefix={<Icon type='user' style={{color: 'rgba(0,0,0,.25)'}} />}
              />
          </Form.Item>
          <Form.Item validateStatus={
            !tPassword ? '' : ePassword
              ? 'error' : 'success'}
                help={tPassword ? ePassword : null} hasFeedback>
            <Input 
              id='password'
              name='password'
              onChange={handleChange}
              onBlur={handleBlur}
              size='large'
              prefix={<Icon type='lock' style={{color: 'rgba(0,0,0,.25)'}} />}
              />
          </Form.Item>
          <Form.Item>
            <Button
              className='signIn__button'
              disabled={isSubmitting}
              type='primary'
              htmlType='submit'
              size='large'>
              ACTION
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default connect(({admin: {nowIsReg}}) => ({nowIsReg}), {registControl, fetchUserLogin})(SignIn)