import axios from "axios"
import { UserProps } from "./intefaces"

const baseUrl = "https://potential-trout-j7w95r59gqqcxr-3000.app.github.dev/"

const baseAuth = {
  login: baseUrl + "auth/login",        //get 
  register: baseUrl + "auth/register",  //post
  delete: baseUrl + "auth/deleteUser",  //delete
}

const baseChat = {
  getChat: (userId:string)=>baseUrl + 'chats/userChat/'+userId,
  getMenssage: (chatId:string)=>baseUrl +  'chats/menssages/'+chatId,
  postMenssage: (chatId:string)=>baseUrl +  'chats/menssages/'+chatId
}
const baseUser = {
  findUser: (userName:string)=>baseUrl + 'users/'+userName,
  createChat: baseUrl +  'users/creatChat',
}

export async function testConnection() {
  try {
    const response = await axios.get(baseUrl);
    console.log('Status da conexão:', response.status);
    return response.status; // Retornando o status da conexão
  } catch (error) {
    console.error('Erro ao testar a conexão:', error);
    throw error; // Lançando o erro para que ele seja tratado externamente, se necessário
  }
}

export async function handleAuthApi(type: "login"|"register"|"delete",data: UserProps) {
  try {
    const method = {
      login: "get",
      register: "post",
      delete: "delete"
    }
    console.log(data);

    const url = type === "login" ? `${baseAuth[type]}/${data.password}/${data.email}` : baseAuth[type]
    
    await axios[method[type]](url, type === "login" ? null : data)
    .then((res)=>res.data)
    .catch(err =>{
      console.log(err)
      return null
    });

  } catch (err) {
    return console.log(err)
  }
}
export async function findUser (userName:string) {
  try{  
    axios.get(baseUser.findUser(userName))
    .then((res)=>res.data)
    .catch(err =>{
      console.log(err)
      return null
    });
  } catch (err) {
    return console.log(err)
  }
}
export async function createChat(user1Id:string, user2Id:string){
  try{  
    axios.get(baseUser.createChat,{user1Id: user1Id, user2Id: user2Id })
    .then((res)=>res.data)
    .catch(err =>{
      console.log(err)
      return null
    });
  } catch (err) {
    return console.log(err)
  }
}
export async function getChatsList(userId:string){
  try{  
    axios.get(baseChat.getChat(userId))
    .then((res)=>res.data)
    .catch(err =>{
      console.log(err)
      return null
    });
  } catch (err) {
    return console.log(err)
  }
}
export async function getMenssagesList(chatId:string){
  try{  
    axios.get(baseChat.getMenssage(chatId))
    .then((res)=>res.data)
    .catch(err =>{
      console.log(err)
      return null
    });
  } catch (err) {
    return console.log(err)
  }
}
