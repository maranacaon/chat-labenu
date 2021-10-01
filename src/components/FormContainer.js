import styled from "styled-components"

export const MainContainer = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`
export const Title = styled.h1 `
    margin-bottom: 15px;
    color: #F59C55;
` 

export const FormContainer = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20vh;
    width: 350px;
    height: 300px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    border-radius: 8px;

    form {
        display: grid;
        gap: 8px;

    }

    input {
        font-size: 15px;
        height: 40px;
        width: 300px;
        padding: 5px;
        border-radius: 8px;
        border: 1px solid #F59C55;

        :focus {
            outline: none;
        }
    }
`

export const Button = styled.button `
    height: 30px;
    border-radius: 3px;
    cursor: pointer;
    border: 0;
    border-radius: 8px;
    background-color: #D0FADB;
    color: brown;
    transition: filter 0.2s;

    &:hover {
        filter:brightness(0.9);
    }
`

export const GoogleButton = styled.button `
    height: 50px;
    border-radius: 8px;
    background: #ea4335;
    color: #FFF; 
    height: 30px;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
    border: 0;

    transition: filter 0.2s;

    img {
        margin-right: 8px;
        height: 18px;
    }

    &:hover {
        filter:brightness(0.9);
    }
`