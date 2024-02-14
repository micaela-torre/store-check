import axios from 'axios';

export const callApi = async ({
  endpoint,
  method = 'get',
  params,
  signal,
  headers,
  data,
}) => {
  let api = `https://ikp-mobile-challenge-backend.up.railway.app/${endpoint}`;
  if (/https|http?/.test(endpoint)) api = endpoint;
  let response;
  try {
    response = await axios({
      data,
      method,
      url: api,
      params,
      signal,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    });
  } catch (error) {
    if (error.name === 'CanceledError') return;
    throw error;
  }

  return {...response};
};
