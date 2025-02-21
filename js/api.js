import { BASE_URL, Route, Method, ErrorText } from './data.js';

const load = async (route, errorText, method = Method.GET, body = null) => {
  try {
    const response = await fetch(`${BASE_URL}${route}`, {method, body});

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    return await response.json();

  } catch {
    throw new Error (errorText);
  }
};

const getData = () => load( // функция получения данных
  Route.GET_DATA,
  ErrorText.GET_DATA);

const sendData = (body) => load( // функция отправки данных
  Route.SEND_DATA,
  ErrorText.SEND_DATA,
  Method.POST, body);

export {getData, sendData};
