import styled from "styled-components";

export const ChatWrapper = styled.div `
    display: flex;
    flex-direction: column;
    overflow: hidden;

    button {
        background-color: #D0FADB;
        cursor: pointer;
        border-radius: 8px;
        margin-right: 4px;
        color: brown;
        border: 0;
        margin-left: 4px;
        padding: 10px;
        transition: filter 0.2s;

        &:hover {
        filter:brightness(0.9);
        }
    }
`

export const Header = styled.div `
    height: 50px;
    border-bottom: 1px solid orange;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
    color: brown;
    font-weight: bold;
`

export const Messages = styled.div `
    flex-grow: 1;
    padding-left: 16px;
    display: flex;
    flex-direction: column-reverse;
    overflow: auto;
    padding-bottom: 25px;

    ::-webkit-scrollbar {
        width: 15px;
    }

    ::-webkit-scrollbar-track {
        background: white;     
        border: 1px solid orange;
        border-radius: 8px;
        box-shadow: inset 0 0 4px orange; 
    }

    ::-webkit-scrollbar-thumb {
        background-color: #D0FADB; 
        border-radius: 8px;
        box-shadow: inset 0 0 4px grey; 
    }
    
`
export const MessageContainer = styled.div ` 
    display: flex;
    flex-direction: row;
    gap: 5px;
    margin-top: 30px;
    
    h4 {
        color: #F59C55;
    }
`

export const MessageInput = styled.form `
    height: 70px;
    border-top: 1px solid orange;
    display: flex;
    padding: 10px;
    background-color: white;

    input {
        flex-grow: 1;
        font-size: 18px;
        border: 1px solid orange;
        border-radius: 8px;
        padding: 10px;

        :focus {
            outline: none;
        }
    }
`

export const MessageImage = styled.img `
    max-width: 300px;
`

export const FilePreview = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    flex-grow: 1;
    width: 300px;
    border: 1px solid orange;
    border-radius: 8px;
    padding: 10px;

    img {
        max-height: 100px;
    }
`

export const FileInput = styled.input `
    display: none;
`

export const InputLabel = styled.label `
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    background-color: #D0FADB;
    cursor: pointer;
    gap: 5px;
    border-radius: 8px;
    margin-right: 4px;
    color: brown;
    transition: filter 0.2s;

    &:hover {
        filter:brightness(0.9);
        }

    img {
        max-width: 20px;
    }
`