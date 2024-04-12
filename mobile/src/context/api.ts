import axios from 'axios'

export const baseUrl = "http://192.168.0.103:3000/"

export const baseAuth = {
  login: baseUrl + "auth/login",       
  register: baseUrl + "auth/register",
  delete: baseUrl + "auth/deleteUser",
}

export const baseChat = {
  getChat: (userId:string)=>baseUrl + 'chats/userChat/'+userId,
  getMenssage: (chatId:string)=>baseUrl +  'chats/menssages/'+chatId,
  postMenssage: (chatId:string)=>baseUrl +  'chats/menssages/'+chatId
}
export const baseUser = {
  findUser: (userName:string)=>baseUrl + 'users/'+userName,
  createChat: baseUrl +  'users/creatChat',
}

export async function testConnection() {
  try {
    const response = await axios.get(baseUrl);
    console.log('Status da conexão:', response.status);
    return response.status;
  } catch (error) {
    console.error('Erro ao testar a conexão:', error);
    throw error;
  }
}


export async function createChat(user1Id:string, user2Id:string){
  try{  
    const data = {user1Id: user1Id, user2Id: user2Id }
    axios.get(baseUser.createChat,data)
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
