import Client from './api'

export const SignInUser = async (data: any) => {
  try {
    const res = await Client.post('/user/login', data)
    localStorage.setItem('token', res.data.token)
    return res.data.user
  } catch (error) {
    throw error
  }
}

export const RegisterUser = async (data: any) => {
  try {
    const res = await Client.post('/user/register', data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const CheckSession = async () => {
  try {
    // Checks to see if there is a current, valid token
    const res = await Client.get('/user/session')
    return res.data
  } catch (error) {
    throw error
  }
}
