import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../styles/ChatScreen.module.css';
import Loading from './Loading';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isload, setIsload]=useState(false);
  const location = useLocation();

  useEffect(() => {//loading functionality, differently named so as to avoid clashes with loading of GPT response
    setIsload(true);
    const timeout = setTimeout(() => setIsload(false), 300);
    return () => clearTimeout(timeout);
  }, [location]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    const updatedMessages = [...messages, { text: newMessage, sender: 'user' }];
    setMessages(updatedMessages);
    setNewMessage('');

    await getGPTResponse(newMessage);
  };

  const getGPTResponse = async (userMessage) => {
    setLoading(true);

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: userMessage }
          ],
          max_tokens: 150,
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const gptMessage = response.data.choices[0].message.content;

      const newMessages = [...messages, { text: gptMessage, sender: 'gpt' }];
      setMessages(newMessages);
    } catch (error) {
      console.error('Error fetching GPT response:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (isload? <Loading /> :(
    <div className={styles['chat-screen']}>
      <div className={styles['chat-messages']}>
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === 'user' ? styles['user-message'] : styles['gpt-message']}>
            {msg.text}
          </div>
        ))}
        {loading && <div className={styles['loading']}>GPT is typing...</div>}
      </div>
      <div className={styles['chat-input']}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          disabled={loading}
        />
        <button onClick={handleSendMessage} disabled={loading}>Send</button>
        <Link to="/">Back to Home</Link>
      </div>
    </div>)
  );
};

export default ChatScreen;
