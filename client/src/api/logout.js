import axios from 'axios'

export const logout = () => {
  return new Promise(async (resolve, reject) => {
    axios.post('logout').then(
      response => resolve(response.data),
      err => reject(err)
    )
  })
}