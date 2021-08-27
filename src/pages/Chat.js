import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import ChatContainer from "../components/ChatContainer";
import UsersList from "../components/UsersList";
import styled from "styled-components/"
import { db } from "../services/firebase"

const MainContainer = styled.div `
    display: grid;  
    grid-template-columns: 1fr 3fr;
    height: 100vh;
`

export function Chat({currentUser}) {
    const history = useHistory()
    const [selectedUser, setSelectedUser] = useState()
    const [currentUserData, setCurrentUserData] = useState()

    useEffect(() => {
        if(currentUser){
        db.collection('users').doc(currentUser.uid).get()
            .then((doc) => {
                setCurrentUserData(doc.data())
            })
        }
    },[currentUser, currentUser?.uid])

    useEffect(() => {
        if(!currentUser) {
            history.push("/login");
        } else {

        }
    },[currentUser, history])

    return (
        <MainContainer>
            <UsersList setSelectedUser={setSelectedUser} currentUser={currentUser} currentUserData={currentUserData}/>
            {selectedUser && 
                <ChatContainer 
                    currentUserId={currentUser?.uid} 
                    selectedUser={selectedUser}
                    currentUserName={currentUserData?.name}
                />
            }
        </MainContainer>
    )
}


