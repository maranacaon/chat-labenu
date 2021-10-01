import { FormContainer, GoogleButton, Button, MainContainer, Title } from "../components/FormContainer";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import googleIconImg from "../assets/google-icon.svg"

export function Login({ currentUser }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory()

    function goToSignUp() {
        history.push("/signup")
    }

    function handleLogin(e) {
        e.preventDefault()

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
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

    function handleGoogleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                const credential = result.credential;
                const token = credential.accessToken;
                const user = result.user;
                console.log(credential, token, user)
                
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    }

    return (
        <MainContainer>
            <FormContainer>
            <Title>Login</Title> 
            <form onSubmit={handleLogin}>
                    <input
                        value={email} 
                        type={"email"} 
                        placeholder={"Email"}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                        value={password} 
                        type={"password"} 
                        placeholder={"Senha"}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Button>Login</Button>
                    <Button onClick={goToSignUp}>Não tem conta? Cadastre-se</Button>
                    <GoogleButton onClick={handleGoogleLogin} type="button">
                        <img src={googleIconImg} alt="Google Login"/>
                        Login com o Google
                    </GoogleButton>
            </form>
            </FormContainer>
        </MainContainer>
    )
}

