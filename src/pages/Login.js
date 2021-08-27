import styled from "styled-components";
import { FormContainer } from "../components/FormContainer";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import firebase from "firebase/app";

const GoogleButton = styled.button `
    height: 50px;
    border-radius: 8px;
    background: #ea4335;
    color: #FFF; 

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
    border: 0;

    transition: filter 0.2s;

    img {
        margin-right: 8px;
    }

    &:hover {
        filter:brightness(0.9);
    }
`

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
        <FormContainer>
           <h1>Login</h1> 
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
                <button>Login</button>
                <button onClick={goToSignUp}>Não tem conta? Cadastre-se</button>
               <GoogleButton onClick={handleGoogleLogin} type="button">Login com o Google</GoogleButton>
           </form>
        </FormContainer>
    )
}

