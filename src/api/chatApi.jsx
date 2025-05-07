import axios from 'axios';

const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL ||
    'https://chat-backend-g81a.onrender.com/api',
  // process.env.REACT_APP_API_URL || 'http://localhost:5001/api',

  timeout: 5000,
  withCredentials: true,
});

export const getAllChats = async () => {
  const response = await api.get('/chats');
  return response.data.chats;
};

export const getChatById = async chatId => {
  const response = await api.get(`/chats/${chatId}`);
  return response.data.chats;
};

export const addNewChat = async chatData => {
  const response = await api.post('/chats', chatData);
  return response.data.chats;
};

export const deleteChat = async chatId => {
  const response = await api.delete(`/chats/${chatId}`);
  return response.data.chats;
};

export const sendMessageToChat = async (chatId, text) => {
  const response = await api.post(`/chats/${chatId}/messages`, {
    text,
    sender: 'user',
  });
  return response.data;
};

export const updateChat = async (chatId, updatedData) => {
  const response = await api.put(`/chats/${chatId}`, updatedData);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get('/me');
  return response.data.user;
};
