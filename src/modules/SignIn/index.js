import SignIn from './SignIn'
import { withFormik } from 'formik'
import { validateForm } from '@/utils'

import store from '@/store'

import { fetchUserLogin } from '@/actions/network'

export default withFormik({
  mapPropsToValues: () => ({email: '', password: ''}),
  mapPropsToStatus: () => ({status: 'None'}),
  validate: values => {
    let errors = {};
    validateForm({isAuth: true, values, errors})
    // async req to server for Register and dinamic show 
    // check how promises fill
    return errors
  },
  handleSubmit: (values, {setSubmitting, setStatus}) => {
    store.dispatch(fetchUserLogin(values))
      .then(() => {
        setSubmitting(false)
      })
  },
  enableReinitialize: () => false, // if checkBox true.. forWhat
  displayName: 'LoginForm'
})(SignIn)