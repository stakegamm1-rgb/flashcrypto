import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, MessageSquare, Trash2, Image as ImageIcon, Loader2 } from 'lucide-react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, doc, setDoc, deleteDoc, getDocs } from 'firebase/firestore';

export default function AdminChatDashboard({ onClose, isPage = false }) {
  const [activeChats, setActiveChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Fetch all chats
  useEffect(() => {
    if (!isAuthenticated) return;
    const q = query(collection(db, 'chats'), orderBy('lastUpdated', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chats = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setActiveChats(chats);
    }, (error) => {
      console.log('Error fetching active chats - likely missing Firebase config', error);
    });

    return () => unsubscribe();
  }, [isAuthenticated]);

  // Fetch messages for selected chat
  useEffect(() => {
    if (!selectedChat || !isAuthenticated) return;

    const q = query(collection(db, 'chats', selectedChat.id, 'messages'), orderBy('timestamp', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    }, (error) => {
      console.log('Error fetching messages', error);
    });

    return () => unsubscribe();
  }, [selectedChat, isAuthenticated]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;

    const messageText = newMessage;
    setNewMessage('');

    try {
      await addDoc(collection(db, 'chats', selectedChat.id, 'messages'), {
        text: messageText,
        sender: 'admin',
        timestamp: serverTimestamp()
      });
      
      const chatRef = doc(db, 'chats', selectedChat.id);
      await setDoc(chatRef, {
        lastUpdated: serverTimestamp(),
        lastMessage: `Admin: ${messageText}`,
      }, { merge: true });
    } catch (error) {
      console.error("Error sending message: ", error);
      alert('Could not send message.');
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
    if (!file || !selectedChat) return;

    setIsUploading(true);

    try {
      const compressedFile = await compressImage(file);
      const base64String = await fileToBase64(compressedFile);
      
      await addDoc(collection(db, 'chats', selectedChat.id, 'messages'), {
        imageUrl: base64String,
        sender: 'admin',
        timestamp: serverTimestamp()
      });
      
      const chatRef = doc(db, 'chats', selectedChat.id);
      await setDoc(chatRef, {
        lastUpdated: serverTimestamp(),
        lastMessage: 'Admin sent an image',
      }, { merge: true });

    } catch (error) {
      console.error("Error compressing image:", error);
      alert('Could not process image.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDeleteChat = async () => {
    if (!selectedChat) return;
    
    if (window.confirm("Are you sure you want to clear this chat history? The user will remain in your list.")) {
      try {
        const messagesRef = collection(db, 'chats', selectedChat.id, 'messages');
        const snapshot = await getDocs(messagesRef);
        
        // Delete all messages
        const deletePromises = snapshot.docs.map(messageDoc => deleteDoc(messageDoc.ref));
        await Promise.all(deletePromises);
        
        // Update the main chat document instead of deleting it
        await setDoc(doc(db, 'chats', selectedChat.id), {
          lastMessage: 'Chat cleared by admin',
          lastUpdated: serverTimestamp()
        }, { merge: true });
        
      } catch (error) {
        console.error("Error clearing chat:", error);
        alert("Failed to clear the chat.");
      }
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otpInput === '894567') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect OTP!');
      setOtpInput('');
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{
        ...(isPage ? {
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          boxSizing: 'border-box',
          background: 'var(--bg-dark, #060814)'
        } : {
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(10px)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        })
      }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          style={{
            background: 'var(--panel-bg, #060814)',
            border: '1px solid var(--border-glass, rgba(255,255,255,0.1))',
            borderRadius: '16px',
            padding: '2rem',
            width: '100%',
            maxWidth: '400px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 20px var(--glow-cyan, rgba(0, 240, 255, 0.1))',
            position: 'relative'
          }}
        >
          {(!isPage || (isPage && onClose)) && (
            <button 
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>
          )}
          
          <h2 style={{ color: '#fff', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MessageSquare size={24} className="neon-text-cyan" /> Secure Desk Auth
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            Please enter the admin OTP to access the dashboard.
          </p>
          
          <form onSubmit={handleOtpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input 
              type="password"
              placeholder="Enter OTP"
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value)}
              autoFocus
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--border-glass, rgba(255,255,255,0.1))',
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                color: '#fff',
                outline: 'none',
                fontSize: '1rem',
                textAlign: 'center',
                letterSpacing: '0.2rem'
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
                fontSize: '1rem'
              }}
            >
              Verify OTP
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{
      ...(isPage ? {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        background: 'var(--bg-dark, #060814)'
      } : {
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(10px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      })
    }}>
      <style>{`
        .admin-sidebar {
          width: 300px;
          border-right: 1px solid var(--border-glass, rgba(255,255,255,0.1));
          display: flex;
          flex-direction: column;
          background: rgba(255,255,255,0.02);
        }
        .admin-chat-area {
          flex: 1;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        @media (max-width: 768px) {
          .admin-sidebar {
            width: 100% !important;
            border-right: none;
            display: ${selectedChat ? 'none' : 'flex'} !important;
          }
          .admin-chat-area {
            display: ${selectedChat ? 'flex' : 'none'} !important;
          }
          .admin-page-container {
            border-radius: 0 !important;
            height: 100vh !important;
            max-width: 100% !important;
            border: none !important;
          }
        }
      `}</style>
      <motion.div 
        className={isPage ? "admin-page-container" : ""}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        style={{
          width: '100%',
          maxWidth: isPage ? '100%' : '1000px',
          height: isPage ? '100vh' : '80vh',
          background: 'var(--panel-bg, #060814)',
          border: isPage ? 'none' : '1px solid var(--border-glass, rgba(255,255,255,0.1))',
          borderRadius: isPage ? '0' : '16px',
          display: 'flex',
          overflow: 'hidden',
          boxShadow: isPage ? 'none' : '0 20px 50px rgba(0,0,0,0.5), 0 0 20px var(--glow-cyan, rgba(0, 240, 255, 0.1))'
        }}
      >
        {/* Sidebar - Chat List */}
        <div className="admin-sidebar">
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-glass, rgba(255,255,255,0.1))' }}>
            <h2 style={{ margin: 0, fontSize: '1.2rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MessageSquare size={20} className="neon-text-cyan" /> Admin
            </h2>
          </div>
          
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {activeChats.length === 0 ? (
              <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                No active chats found.
              </div>
            ) : (
              activeChats.map(chat => (
                <div 
                  key={chat.id}
                  onClick={() => setSelectedChat(chat)}
                  style={{
                    padding: '1rem',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    cursor: 'pointer',
                    background: selectedChat?.id === chat.id ? 'rgba(0, 240, 255, 0.1)' : 'transparent',
                    transition: 'background 0.2s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', fontSize: '0.9rem', fontWeight: 600 }}>
                    <User size={16} /> {chat.userName ? `${chat.userName} (${chat.userCountry})` : `User ${chat.id.substring(0, 6)}`}
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {chat.lastMessage || 'Started a chat'}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Main Area - Chat View */}
        <div className="admin-chat-area">
          {(!isPage || (isPage && selectedChat)) && (
            <button 
              onClick={() => {
                if (isPage && selectedChat) {
                  setSelectedChat(null);
                } else if (onClose) {
                  onClose();
                }
              }}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                cursor: 'pointer',
                zIndex: 10
              }}
            >
              <X size={16} />
            </button>
          )}

          {!selectedChat ? (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
              Select a chat from the left to start messaging
            </div>
          ) : (
            <>
              {/* Chat Header */}
              <div style={{
                padding: '1.5rem',
                borderBottom: '1px solid var(--border-glass, rgba(255,255,255,0.1))',
                background: 'rgba(0, 240, 255, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                <h3 style={{ margin: 0, color: '#fff' }}>Chat with {selectedChat.userName || `User ${selectedChat.id.substring(0, 6)}`} {selectedChat.userCountry ? `from ${selectedChat.userCountry}` : ''}</h3>
                <button
                  onClick={handleDeleteChat}
                  style={{
                    background: 'rgba(255, 50, 50, 0.1)',
                    border: '1px solid rgba(255, 50, 50, 0.3)',
                    color: '#ff4a4a',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.75rem',
                    width: 'fit-content'
                  }}
                >
                  <Trash2 size={14} /> Delete Chat History
                </button>
              </div>

              {/* Messages */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {messages.length === 0 ? (
                  <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '2rem' }}>
                    No messages in this chat yet.
                  </div>
                ) : (
                  messages.map(msg => (
                    <div 
                      key={msg.id} 
                      style={{
                        alignSelf: msg.sender === 'admin' ? 'flex-end' : 'flex-start',
                        background: msg.sender === 'admin' ? 'var(--neon-green, #00ff88)' : 'rgba(255,255,255,0.1)',
                        color: msg.sender === 'admin' ? '#000' : '#fff',
                        padding: '0.75rem 1.25rem',
                        borderRadius: '16px',
                        borderBottomRightRadius: msg.sender === 'admin' ? '4px' : '16px',
                        borderBottomLeftRadius: msg.sender !== 'admin' ? '4px' : '16px',
                        maxWidth: '70%',
                        fontSize: '0.95rem'
                      }}
                    >
                      {msg.imageUrl ? (
                        <img 
                          src={msg.imageUrl} 
                          alt="attachment" 
                          style={{ width: '100%', maxWidth: '300px', borderRadius: '8px', display: 'block' }} 
                        />
                      ) : (
                        msg.text
                      )}
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form 
                onSubmit={handleSendMessage}
                style={{ padding: '1.5rem', borderTop: '1px solid var(--border-glass, rgba(255,255,255,0.1))', display: 'flex', gap: '1rem' }}
              >
                <input 
                  id="adminImageUpload"
                  type="file" 
                  accept="image/*"
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                />
                <label 
                  htmlFor="adminImageUpload"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid var(--border-glass, rgba(255,255,255,0.1))',
                    borderRadius: '8px',
                    width: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: isUploading ? 'not-allowed' : 'pointer',
                    color: '#fff',
                    opacity: isUploading ? 0.5 : 1,
                    pointerEvents: isUploading ? 'none' : 'auto'
                  }}
                >
                  {isUploading ? <Loader2 size={20} className="lucide-spin" /> : <ImageIcon size={20} />}
                </label>
                <input 
                  type="text" 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your reply..."
                  disabled={isUploading}
                  style={{
                    flex: 1,
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid var(--border-glass, rgba(255,255,255,0.1))',
                    borderRadius: '8px',
                    padding: '0.75rem 1rem',
                    color: '#fff',
                    outline: 'none',
                    fontSize: '1rem'
                  }}
                />
                <button 
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="btn-glow btn-cyan"
                  style={{
                    border: 'none',
                    padding: '0 1.5rem',
                    borderRadius: '8px',
                    cursor: newMessage.trim() ? 'pointer' : 'not-allowed',
                    opacity: newMessage.trim() ? 1 : 0.5,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontFamily: 'inherit'
                  }}
                >
                  Send <Send size={16} />
                </button>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
