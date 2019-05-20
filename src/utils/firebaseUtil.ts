import axios from 'axios';

const API_KEY = 'AIzaSyAfMJhL7W_ApnjHBzJ9F2cWlBd1tj1BGXs';
export const loginUrl =
  'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' +
  API_KEY;
export const baseUrl = 'https://time-tracker-projects.firebaseio.com/';

export type Request = {
  method?: 'GET' | 'POST' | 'PUT' | 'OPTIONS' | 'DELETE';
  url: string;
  data: any;
  headers: {
    [key: string]: string;
  };
};

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

  return request.then((response: any) => normalizeFirebaseData(response));
};

export default request;

// This method was implemented because firebase adds id's to object in another way
// than mock server tah was used in prev exercise. So all data
const normalizeFirebaseData = (response: any) => {
  if (response.data === null || response.data.idToken) {
    return response;
  }

  const objects = response.data;
  const result: any[] = [];
  for (const key in objects) {
    result.push({
      id: key,
      ...objects[key]
    });
  }

  response.data = result;

  return response;
};
