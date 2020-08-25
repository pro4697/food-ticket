export const SERVER = 'http://15.164.225.45:5000';
//export const SERVER = 'http://localhost:5000';

//////////////////////////// For Header Configs //////////////////////////////////
const config = {
  headers: {
    'Content-type': 'application/json',
  },
};

const token = localStorage.getItem('x_token');
const tokenExp = localStorage.getItem('x_tokenExp');
// If token, add to headers
if (token && tokenExp) {
  config.headers['x_token'] = token;
  config.headers['x_tokenExp'] = tokenExp;
}

config.headers['Content'] = 'application/json;charset=UTF-8';

export const headersConfig = config;
