import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { palette } from "../constant";

export const GlobalStyles = createGlobalStyle`
    ${reset}
    
    * {
        box-sizing:border-box;
    }

    button {
        background:none;
        border:none;
        cursor: pointer;
    }

    a {
        text-decoration:none;
        display:inline-block;
    }

    body {
        height: calc(var(--vh, 1vh) * 100);
        -webkit-tap-highlight-color:rgba(0,0,0,0);
    }

    mark {
      background: none;
      color: ${palette.signatureColor};
    }
    
    html, body {
      overflow: hidden;
      height: 100%;
    }

`;
