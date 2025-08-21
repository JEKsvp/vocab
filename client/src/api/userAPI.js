import axios from 'axios';


export const getCurrentUser = () => {
  return new Promise(async (resolve, reject) => {
    axios.get(`/v1/current-user`).then(
      response => resolve(response.data),
      err => reject(err)
    )
  })
}