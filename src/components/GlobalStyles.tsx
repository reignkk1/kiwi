import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyles = createGlobalStyle`
    ${reset}
    :root{
        --signature-color:#0ceb0c;
    }

    * {
        box-sizing:border-box;
    }

    button {
        background:none;
        border:none;
        cursor: pointer;
    }
`;
