import { FormContainer, Button, MainContainer, Title } from "../components/FormContainer";
import { useHistory } from "react-router-dom";
import firebase from "firebase/compat/app";
import { useState, useEffect } from "react";

export function SignUp({ currentUser }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const history = useHistory()

    function goToLogin() {
        history.push("/login")
    }

    function handleSignUp(e) {
        e.preventDefault()

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
                 return firebase.firestore().collection('users').doc(user.uid).set({
                    name: name
                })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    }

    useEffect(() => {
        if (currentUser) {
            history.push("/")
        }
    }, [currentUser, history])

    return (
        <MainContainer>
            <FormContainer>
                <Title>Sign Up</Title>
                <form onSubmit={handleSignUp}>
                    <input 
                        type={"text"} 
                        placeholder={"Seu nome"}
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input 
                        type={"email"} 
                        placeholder={"Email"}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                        type={"password"} 
                        placeholder={"Senha"}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                <Button>Cadastro</Button>
                <Button onClick={goToLogin}>Já tem conta? Faça o login</Button>
            </form>
            </FormContainer>
        </MainContainer>
    )
}

