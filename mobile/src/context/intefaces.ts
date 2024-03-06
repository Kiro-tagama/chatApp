export interface UserProps{
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface ChatProps{
  chatId: string;
  user1Id?: string;
  user2Id?: string;
}

export interface MessageProps{
  messageId: string;
  chatId: string;
  senderId: string;
  messageText: string;
  timestamp: Date;
}

// CREATE TABLE chat (
//   chat_id UUID PRIMARY KEY,
//   user1_id UUID NOT NULL,
//   user2_id UUID NOT NULL,
// );

// CREATE TABLE messages (
//   message_id UUID PRIMARY KEY,
//   chat_id UUID,
//   sender_id UUID,
//   message_text TEXT,
//   timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
// );
