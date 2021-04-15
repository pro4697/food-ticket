export const SERVER = 'https://foodticket.xyz:8443';
// export const SERVER = 'http://localhost:5000';

/// ///////////////////////// For Header Configs //////////////////////////////////
type TConfig = {
  headers: {
    x_token?: string;
    x_tokenExp?: string;
    Content?: string;
    ['Content-type']: string;
  };
};

type TSaveTokenParams = {
  token?: string;
  tokenExp?: string;
};

const config: TConfig = {
  headers: {
    'Content-type': 'application/json',
  },
};

export const saveToken = (props?: TSaveTokenParams) => {
  if (props) {
    localStorage.setItem('x_token', props.token || '');
    localStorage.setItem('x_tokenExp', props.tokenExp || '');
  }
  const token = localStorage.getItem('x_token');
  const tokenExp = localStorage.getItem('x_tokenExp');

  if (token && tokenExp) {
    config.headers.x_token = token;
    config.headers.x_tokenExp = tokenExp;
  }
  config.headers.Content = 'application/json;charset=UTF-8';
};
saveToken();

export const headersConfig = config;
