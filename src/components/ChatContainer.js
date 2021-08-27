import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { firebase, db } from "../services/firebase";
import clipIcon from "../assets/clip-icon.svg"

const ChatWrapper = styled.div `
    display: flex;
    flex-direction: column;
`

const Header = styled.div `
    height: 50px;
    border-bottom: 1px solid orange;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Messages = styled.div `
    flex-grow: 1;
    padding-left: 16px;
    display: flex;
    flex-direction: column-reverse;
`

const MessageInput = styled.form `
    height: 50px;
    border-top: 1px solid orange;
    display: flex;
    padding: 8px;
    position: fixed;
    bottom: 0;
    background-color: white;
    align-items: stretch;
    width: 999px;

    input {
        flex-grow: 1;
        font-size: 18px;
        border: 1px solid orange;
        border-radius: 8px;
    }

    button {
        background-color: #D0FADB;
        cursor: pointer;
        border-radius: 8px;
        margin-right: 4px;
        color: brown;
        border: 0;
        margin-left: 4px;
    }
`

const MessageImage = styled.img `
    max-width: 300px;
`

const FileInput = styled.input `
    display: none;
`

const InputLabel = styled.label `
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

    img {
        max-width: 30px;
    }
`

function mountChatId(id1, id2) {
    if(id1 > id2) {
        return `${id1}-${id2}`
    } else {
        return `${id2}-${id1}`
    } 
}

function ChatContainer({ selectedUser, currentUserId, currentUserName }) {
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const fileInputRef = useRef()

    useEffect(() => {
        const chatId = mountChatId(currentUserId, selectedUser.id)

        function getMessages() {
            db
            .collection("chats")
            .doc(chatId)
            .collection("messages")
            .orderBy("sentAt", "desc")
            .onSnapshot((querySnapshot) => {
                const messagesData = querySnapshot.docs.map((doc) => {
                    return doc.data()
                });
    
                setMessages(messagesData)
            })
        };

            getMessages();

    },[ selectedUser, currentUserId ])

    async function uploadFile() {
        const file = fileInputRef.current.files[0]

        if(file) {
            const storageRef = firebase.storage().ref();
            const newFileRef = storageRef.child(file.name);
            await newFileRef.put(file)
    
            return newFileRef.getDownloadURL()
        }

        return null
    }

    async function sendMessage(e){
        e.preventDefault();

        const chatId = mountChatId(currentUserId, selectedUser.id)

        const fileUrl = await uploadFile()

        db.collection("chats").doc(chatId).collection("messages").add({
            sentAt: new Date(),
            text: newMessage,
            username: currentUserName,
            image: fileUrl
        }).then(() => {
            setNewMessage("")
        })

        
    }    

    return (
        <ChatWrapper>
            <Header>
                <p>Conversa com {selectedUser.name}</p>
            </Header>
            <Messages> 
                {
                    messages.map((message) => {
                        return (
                            <div>
                                <p>{message.username}: {message.text}</p>
                                {message.image && <MessageImage src={message.image} alt={"Imagem"}/>}
                            </div>
                
                        )
                    })
                }
            </Messages>
                <MessageInput onSubmit={sendMessage}>
                    <InputLabel for="arquivo"><img src={clipIcon} alt={"Anexar"}/>Anexar</InputLabel>
                    <FileInput 
                        type={"file"}
                        ref={fileInputRef}
                        name="arquivo"
                        id="arquivo"
                    />
                    <input  
                        placeholder={"Digite a sua mensagem"}
                        value={newMessage}
                        onChange={e => setNewMessage(e.target.value)}
                    />
                    <button>Enviar</button>
                </MessageInput>
        </ChatWrapper>
    )
}

export default ChatContainer;

