import styled from "styled-components"

export const UsersListWrapper = styled.div `
    border-right: 1px solid orange;
    padding: 0 16px;
    color: brown;

    h4 {
        margin-top: 20px;
        color: brown;
    }
`

export const UsersHeader = styled.div `
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    max-height: 70px;
    font-weight: bold;
`

export const ColoredHr = styled.hr `
    display: block; 
    height: 1px;
    border: 0; 
    border-top: 1px solid orange;
    padding: 0;
`

export const LogoutButton = styled.button `
    display: flex;
    align-items: center;
    height: 30px;
    background-color: #D0FADB;
    border: 0;
    border-radius: 8px;
    cursor: pointer;
    color: brown;
    padding: 5px;
    transition: filter 0.2s;

    :hover {
        filter:brightness(0.9);
    }
`
export const UserContainer = styled.div `
    display: flex;
    align-items: center;
    height: 60px;
    border-bottom: 1px solid orange;
`
export const Username = styled.p `
    cursor: pointer;
`