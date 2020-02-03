import React, {useState} from 'react';
import { connect } from 'react-redux';
import { Input, Button } from 'antd';

import { registControl } from '@/actions/base';
import { fetchUserLogin } from '@/actions/network'

import './SignIn.scss'

const SignIn = ({nowIsReg, registControl, fetchUserLogin}) => {
  
const [payload, setPayload] = useState(['', ''])
const submitHandl = () => {
  fetchUserLogin({email: payload[0], password: payload[1]})
}
  return (
    <div onClick={() => registControl()} className='signIn'>
      <div className='signIn__workArea' onClick={(ev) => ev.stopPropagation()}>
        <Input onChange={(ev) => { 
          ev.persist();
          setPayload([ev.target.value, payload[1]])
        }} /> 
        <Input onChange={(ev) => {
          ev.persist();
          setPayload([payload[0], ev.target.value])
        }}/>
        <Button type='primary' size='large' onClick={submitHandl}>SIGN_IN</Button>
      </div>
    </div>
  )
}

export default connect(({admin: {nowIsReg}}) => ({nowIsReg}), {registControl, fetchUserLogin})(SignIn)