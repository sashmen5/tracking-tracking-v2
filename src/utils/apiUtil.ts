import axios from 'axios';

export type Request = {
  method?: 'GET' | 'POST' | 'PUT' | 'OPTIONS' | 'DELETE';
  url: string;
  data: any;
  headers: {
    [key: string]: string;
  };
};

axios.defaults.baseURL = 'https://5cdd1853b22718001417c288.mockapi.io/api/v1/';
const request = ({
  method = 'GET',
  url,
  data = null,
  headers = {}
}: Request) => {
  const request = axios({
    url,
    method,
    data,
    headers
  });

  return request.then((data: any) => data);
};

export default request;
