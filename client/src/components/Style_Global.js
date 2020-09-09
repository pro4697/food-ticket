import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
body{
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* =================================
             Scroll-y 
================================= */
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.589);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgb(54, 56, 58);
}
`;
