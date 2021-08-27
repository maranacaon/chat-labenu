import styled from "styled-components"

export const FormContainer = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20vh;
    max-height: 100vh;
    

    form {
        display: grid;
        gap: 8px;
    }

    input {
        width: 250px;
        height: 28px;
        font-size: 15px;
    }

    button {
        height: 30px;
        border-radius: 3px;
        cursor: pointer;
        border: 0;
    }
`