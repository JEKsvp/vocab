import axios from 'axios';

export const signup = (username, password) => {
  return new Promise(async (resolve, reject) => {
    let requestBody = {
      username: username,
      password: password
    };
    axios.post('/v1/signup', requestBody).then(
      response => resolve(response.data),
      err => reject(err)
    );
  })
}