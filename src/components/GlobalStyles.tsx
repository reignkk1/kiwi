import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyles = createGlobalStyle`
    ${reset}
    :root{
        --signature-color:#0ceb0c;
        --title-color:rgba(255,255,255,1);
        --singer-color:rgba(255,255,255,0.5);
    }

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
    }

    body {
        height: calc(var(--vh, 1vh) * 100);
        -webkit-tap-highlight-color:rgba(0,0,0,0);
    }
`;
