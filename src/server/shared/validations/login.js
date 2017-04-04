// import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'

export default function validateInput(data) {
  let errors = {}
  if (!data.username) {
    errors.message = '用户名和密码不能为空！'
  }

  if (!data.password) {
    errors.message = '用户名和密码不能为空！'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
