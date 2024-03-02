import { Pool } from "pg";

export const db = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'chat',
  password: '123',
  port: 5432,
})