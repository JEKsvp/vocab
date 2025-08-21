import axios from "axios";

export const generateBatch = async (language) => {
  return new Promise(async (resolve, reject) => {
    axios.post(`/v1/words-batch/generate`, null, {
      params: {
        language: language
      }
    }).then(
      () => resolve(null),
      err => reject(err)
    )
  })
}

export const getBatch = async (language) => {
  return new Promise(async (resolve, reject) => {
    axios.get(`/v1/words-batch`, {
      params: {
        language: language
      }
    }).then(
      response => resolve(response.data),
      err => reject(err)
    )
  })
}