CREATE TABLE users (
    id UUID PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(100),
    password VARCHAR(100)
);

CREATE TABLE chat (
    chat_id UUID PRIMARY KEY,
    user1_id UUID NOT NULL,
    user2_id UUID NOT NULL,
    FOREIGN KEY (user1_id) REFERENCES users(id),
    FOREIGN KEY (user2_id) REFERENCES users(id)
);

CREATE TABLE messages (
    message_id UUID PRIMARY KEY,
    chat_id UUID,
    sender_id UUID,
    message_text TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (chat_id) REFERENCES chat(chat_id),
    FOREIGN KEY (sender_id) REFERENCES users(id)
);
