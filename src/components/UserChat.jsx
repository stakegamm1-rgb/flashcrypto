import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Send, Image as ImageIcon, Loader2 } from 'lucide-react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, setDoc, doc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

export default function UserChat({ onClose, isPage }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [userCountry, setUserCountry] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Get or create unique user ID for this chat session
    let id = localStorage.getItem('chatUserId');
    if (!id) {
      id = uuidv4();
      localStorage.setItem('chatUserId', id);
    }
    setUserId(id);

    const savedName = localStorage.getItem('chatUserName');
    const savedCountry = localStorage.getItem('chatUserCountry');
    if (savedName && savedCountry) {
      setUserName(savedName);
      setUserCountry(savedCountry);
      setIsRegistered(true);
    }
    
    // Create initial chat document if it doesn't exist to show in admin dashboard
    const chatRef = doc(db, 'chats', id);
    setDoc(chatRef, {
      userId: id,
      lastUpdated: serverTimestamp(),
      hasUnreadAdmin: false,
    }, { merge: true }).catch(err => console.log('Firebase not configured yet', err));

    const q = query(collection(db, 'chats', id, 'messages'), orderBy('timestamp', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    }, (error) => {
      console.log('Error fetching messages - likely missing Firebase config', error);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isRegistered]);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!userName.trim() || !userCountry.trim()) return;

    localStorage.setItem('chatUserName', userName);
    localStorage.setItem('chatUserCountry', userCountry);
    setIsRegistered(true);

    try {
      const chatRef = doc(db, 'chats', userId);
      await setDoc(chatRef, {
        userName: userName,
        userCountry: userCountry,
        lastUpdated: serverTimestamp(),
      }, { merge: true });
    } catch (err) {
      console.log('Error saving user info to Firebase', err);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !userId) return;

    const messageText = newMessage;
    setNewMessage('');

    try {
      await addDoc(collection(db, 'chats', userId, 'messages'), {
        text: messageText,
        sender: 'user',
        timestamp: serverTimestamp()
      });
      
      // Update chat document lastUpdated
      const chatRef = doc(db, 'chats', userId);
      await setDoc(chatRef, {
        lastUpdated: serverTimestamp(),
        lastMessage: messageText,
      }, { merge: true });

      if (messages.length === 0) {
        setTimeout(async () => {
          try {
            await addDoc(collection(db, 'chats', userId, 'messages'), {
              text: 'hi sir i am asim flash usdt seller how much you need flash ?',
              sender: 'admin',
              timestamp: serverTimestamp()
            });
            await setDoc(chatRef, {
              lastUpdated: serverTimestamp(),
              lastMessage: 'Admin: hi sir i am asim flash usdt seller how much you need flash ?',
            }, { merge: true });
          } catch (autoErr) {
            console.error("Auto-reply failed:", autoErr);
          }
        }, 1000); // 1 second delay
      }
    } catch (error) {
      console.error("Error sending message: ", error);
      alert('Could not send message. Please ensure Firebase config is correct.');
    }
  };

  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let { width, height } = img;
          const max_size = 800;

          if (width > height && width > max_size) {
            height *= max_size / width;
            width = max_size;
          } else if (height > max_size) {
            width *= max_size / height;
            height = max_size;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          canvas.toBlob((blob) => {
            resolve(new File([blob], file.name, { type: 'image/jpeg' }));
          }, 'image/jpeg', 0.7);
        };
      };
    });
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !userId) return;

    setIsUploading(true);

    try {
      const compressedFile = await compressImage(file);
      const base64String = await fileToBase64(compressedFile);
            
      await addDoc(collection(db, 'chats', userId, 'messages'), {
        imageUrl: base64String,
        sender: 'user',
        timestamp: serverTimestamp()
      });
      
      const chatRef = doc(db, 'chats', userId);
      await setDoc(chatRef, {
        lastUpdated: serverTimestamp(),
        lastMessage: 'Sent an image',
      }, { merge: true });

    } catch (error) {
      console.error("Error compressing image:", error);
      alert('Could not process image.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.95 }}
      style={isPage ? {
        width: '100%',
        maxWidth: '800px',
        height: 'calc(100vh - 40px)',
        maxHeight: '800px',
        background: 'var(--panel-bg, rgba(6, 8, 20, 0.95))',
        backdropFilter: 'blur(20px)',
        border: '1px solid var(--border-glass, rgba(255,255,255,0.1))',
        borderRadius: '24px',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1000,
        boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 20px var(--glow-cyan, rgba(0, 240, 255, 0.1))',
        overflow: 'hidden'
      } : {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: 'calc(100vw - 40px)',
        maxWidth: '350px',
        height: 'calc(100vh - 40px)',
        maxHeight: '500px',
        background: 'var(--panel-bg, rgba(6, 8, 20, 0.95))',
        backdropFilter: 'blur(20px)',
        border: '1px solid var(--border-glass, rgba(255,255,255,0.1))',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1000,
        boxShadow: '0 10px 40px rgba(0,0,0,0.5), 0 0 20px var(--glow-cyan, rgba(0, 240, 255, 0.2))'
      }}
    >
      {/* Header */}
      <div style={{
        padding: '1rem',
        borderBottom: '1px solid var(--border-glass, rgba(255,255,255,0.1))',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'rgba(0, 240, 255, 0.1)',
        borderTopLeftRadius: '16px',
        borderTopRightRadius: '16px'
      }}>
        <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#fff' }}>Asim flash seller</h3>
        <button 
          onClick={onClose}
          style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>
      </div>

      {!isRegistered ? (
        <div style={{ flex: 1, padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h4 style={{ color: '#fff', marginBottom: '0.5rem', textAlign: 'center' }}>Welcome to Chat</h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center', marginBottom: '2rem' }}>
            Please enter your details to start chatting with us.
          </p>
          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input 
              type="text" 
              placeholder="Your Name" 
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--border-glass, rgba(255,255,255,0.1))',
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                color: '#fff',
                outline: 'none'
              }}
            />
            <input 
              type="text" 
              placeholder="Your Country" 
              value={userCountry}
              onChange={(e) => setUserCountry(e.target.value)}
              required
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--border-glass, rgba(255,255,255,0.1))',
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                color: '#fff',
                outline: 'none'
              }}
            />
            <button 
              type="submit"
              className="btn-glow btn-cyan"
              style={{
                border: 'none',
                padding: '0.75rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: '1rem',
                marginTop: '0.5rem'
              }}
            >
              Start Chat
            </button>
          </form>
        </div>
      ) : (
        <>
          {/* Messages Area */}
      <div style={{
        flex: 1,
        padding: '1rem',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
      }}>
        {messages.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text-muted, #9ca3af)', marginTop: '2rem' }}>
            Send a message to start chatting!
          </div>
        ) : (
          messages.map((msg) => (
            <div 
              key={msg.id} 
              style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                background: msg.sender === 'user' ? 'var(--neon-cyan, #00f0ff)' : 'rgba(255,255,255,0.1)',
                color: msg.sender === 'user' ? '#000' : '#fff',
                padding: '0.5rem 1rem',
                borderRadius: '16px',
                borderBottomRightRadius: msg.sender === 'user' ? '4px' : '16px',
                borderBottomLeftRadius: msg.sender !== 'user' ? '4px' : '16px',
                maxWidth: '80%',
                wordBreak: 'break-word',
                fontSize: '0.9rem'
              }}
            >
              {msg.imageUrl ? (
                <img 
                  src={msg.imageUrl} 
                  alt="attachment" 
                  style={{ width: '100%', maxWidth: '200px', borderRadius: '8px', display: 'block' }} 
                />
              ) : (
                msg.text
              )}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form 
        onSubmit={handleSendMessage}
        style={{
          padding: '1rem',
          borderTop: '1px solid var(--border-glass, rgba(255,255,255,0.1))',
          display: 'flex',
          gap: '0.5rem'
        }}
      >
          <input 
            id="userImageUpload"
            type="file" 
            accept="image/*"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleImageUpload}
          />
          <label 
            htmlFor="userImageUpload"
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: isUploading ? 'not-allowed' : 'pointer',
              color: '#fff',
              opacity: isUploading ? 0.5 : 1,
              pointerEvents: isUploading ? 'none' : 'auto'
            }}
          >
            {isUploading ? <Loader2 size={16} className="lucide-spin" /> : <ImageIcon size={16} />}
          </label>
          
          <input 
            type="text" 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            disabled={isUploading}
            style={{
            flex: 1,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid var(--border-glass, rgba(255,255,255,0.1))',
            borderRadius: '20px',
            padding: '0.5rem 1rem',
            color: '#fff',
            outline: 'none'
          }}
        />
        <button 
          type="submit"
          disabled={!newMessage.trim()}
          style={{
            background: 'var(--neon-cyan, #00f0ff)',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: newMessage.trim() ? 'pointer' : 'not-allowed',
            opacity: newMessage.trim() ? 1 : 0.5,
            color: '#000'
          }}
        >
          <Send size={16} style={{ marginLeft: '2px' }} />
        </button>
      </form>
        </>
      )}
    </motion.div>
  );
}
