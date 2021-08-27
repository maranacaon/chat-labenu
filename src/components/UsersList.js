import { useEffect, useState } from "react";
import styled from "styled-components";
import { db, firebase } from "../services/firebase";

const UsersListWrapper = styled.div `
    border-right: 1px solid orange;
    padding: 0 16px;
`

const UsersHeader = styled.div `
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const LogoutButton = styled.button `
    display: flex;
    align-items: center;
    height: 30px;
    background-color: #D0FADB;
    border: 0;
    border-radius: 8px;
    cursor: pointer;
    color: brown;
`

function UsersList({ setSelectedUser, currentUser, currentUserData }) {
    const [users, setUsers] = useState([])

    useEffect(() => {

        const getUsers = async () => {
    
            const querySnapshot = await db.collection("users").get()

            const usersData = querySnapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            });

            setUsers(usersData)
        };

            getUsers();

        // const db = firebase.firestore();

        // db.collection("users").get().then((querySnapshot) => {
        //     const docsData = querySnapshot.docs.map((doc) => {
        //         console.log(doc.id, " => ", doc.data());
        //         return doc.data()
        //     });
        //     console.log(docsData)
        // })
        // .catch((error) => {
        //     console.log("Error getting documents: ", error);
        // });
    },[])

    // function onClickUser(user) {
    //     setSelectedUser(user)
    // }

    function handleSignOut() {
        firebase.auth().signOut()
    }

    return (
        <UsersListWrapper>
            <UsersHeader>
                <p>Bem vindo, {currentUserData?.name}!</p>
                <LogoutButton onClick={handleSignOut}>Logout</LogoutButton>
            </UsersHeader>
            <hr/>
            <h4>Conversas</h4>
            {
                users
                .filter((user) => user.id !== currentUser?.uid)
                .map((user) => {
                    return (
                        <div key={user.name} onClick={() => setSelectedUser(user)}>
                            <p>{user.name}</p>
                        </div>
                    )
                })
            }
        </UsersListWrapper>
    )
}

export default UsersList;