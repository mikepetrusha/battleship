import { createGlobalStyle } from "styled-components";


export const Global = createGlobalStyle`
  * {
  box-sizing: border-box;
}

body {
  font-family: "Roboto";
  margin: 0;
  padding-top: 2em;
  width: 100vw;
  height: 100vh;
  background-color: #050901;
}

#root {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #0a0510;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #050901;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #050901;
}
`