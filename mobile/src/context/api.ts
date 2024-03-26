import axios from "axios"
import { UserProps } from "./intefaces"

const baseUrl = "http://localhost:3000/"

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

export async function testConnection(){
  axios.get(baseUrl)
  .then(res=>console.log(res.status))
  .catch(err=>console.log(err));
}

export async function handleAuthApi(type: "login"|"register"|"delete",data: UserProps) {
  try {
    const method = {
      login: "get",
      register: "post",
      delete: "delete"
    }
    
    await axios[method[type]](baseAuth[type], data)
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
