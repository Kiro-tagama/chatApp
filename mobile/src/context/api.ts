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
  findUser: baseUrl + 'users/:userName',
  createChat: baseUrl +  'users/creatChat',
}

export async function handleAuthApi(type: "login"|"register"|"delete",data: UserProps) {
  try {
    const method = ()=>{
      switch (type) {
        case "login":return "get"
        case "register":return "post"
        case "delete":return "delete"
      }
    }

    await axios[method()](baseAuth[type], data)
    .then(res =>res.data)
    .catch(err =>console.log(err));

  } catch (err) {
    return console.log(err)
  }
}