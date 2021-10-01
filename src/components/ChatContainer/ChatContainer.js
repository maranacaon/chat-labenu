import { useEffect, useState, useRef } from "react";
import {ChatWrapper, Header, Messages, MessageContainer, MessageImage, 
    MessageInput, InputLabel, FileInput} from './Styles'
import { firebase, db } from "../../services/firebase";
import clipIcon from "../../assets/clip-icon.svg"
import 'firebase/compat/storage';

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
    const [selectedFile, setSelectedFile] = useState('')
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
            const storage = firebase.storage();
            const storageRef = storage.ref();
            const newFileRef = storageRef.child(file.name);
            const metadata = {
                contentType: file.type
            };
            await newFileRef.put(file, metadata);
    
            return newFileRef.getDownloadURL()
        }
        
        return null;
    }

    // FILE PREVIEW
    // function fileChange(e) {
    //     if (e.target.files && e.target.files.length > 0) {
    //       setFile(e.target.files[0]);
    //     }
    //   };

    // function removeFile() {
    //     setFile();
    // };

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
            setSelectedFile("")
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
                            <MessageContainer>
                                <h4>{message.username}:</h4> 
                                <p required>{message.text}</p>
                                {message.image && <MessageImage src={message.image} alt={"Imagem"}/>}
                            </MessageContainer>
                        )
                    })
                }
            </Messages>
            {/* FILE PREVIEW */}
            {/* {selectedFile && (
                <FilePreview>
                    <img
                    src={(URL.createObjectURL(selectedFile))}
                    alt="Thumb"
                    />
                    <button onClick={removeFile}>
                    Remove This Image
                    </button>
                </FilePreview>
            )} */}
            <MessageInput onSubmit={sendMessage}>
                <InputLabel htmlFor="arquivo"><img src={clipIcon} alt={"Anexar"}/>Anexar</InputLabel>
                <FileInput 
                    type={"file"}
                    ref={fileInputRef}
                    name="arquivo"
                    id="arquivo"
                    value={selectedFile}
                    onChange={e => setSelectedFile(e.target.value)}
                />
                <input  
                    placeholder={"Digite a sua mensagem"}
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                >
                </input>
                <button>Enviar</button>
            </MessageInput>
        </ChatWrapper>
    )
}

export default ChatContainer;

