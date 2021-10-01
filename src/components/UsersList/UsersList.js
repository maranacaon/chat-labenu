import { useEffect, useState } from "react";
import {UsersListWrapper, UsersHeader, LogoutButton, ColoredHr, UserContainer, Username} from './Styles'
import { db, firebase } from "../../services/firebase";

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
    },[])

    function handleSignOut() {
        firebase.auth().signOut()
    }

    return (
        <UsersListWrapper>
            <UsersHeader>
                <p>Bem vindo, {currentUserData?.name}!</p>
                <LogoutButton onClick={handleSignOut}>Logout</LogoutButton>
            </UsersHeader>
            <ColoredHr/>
            <h4>Conversas</h4>
            {
                users
                .filter((user) => user.id !== currentUser?.uid)
                .map((user) => {
                    return (
                        <UserContainer key={user.name} onClick={() => setSelectedUser(user)}>
                            <Username>{user.name}</Username>
                        </UserContainer>
                    )
                })
            }
        </UsersListWrapper>
    )
}

export default UsersList;