import axios from 'axios';

export const login = (username, password) => {
  return new Promise(async (resolve, reject) => {
    let requestBody = {
      username: username,
      password: password
    };
    axios.post('/login', requestBody).then(
      response => resolve(response.data),
      err => reject(err)
    );
  })
}