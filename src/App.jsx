import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Zap, 
  TrendingUp, 
  Wallet, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  UserCheck, 
  Clock, 
  ArrowRightLeft, 
  Menu, 
  X, 
  Globe, 
  EyeOff, 
  Layers, 
  Send, 
  Smartphone, 
  Mail, 
  FileText, 
  ChevronDown, 
  Check, 
  Coins,
  ShieldCheck,
  Building,
  Star,
  Copy,
  Play,
  Video,
  MessageCircle
} from 'lucide-react';
import ParticleBackground from './components/ParticleBackground';
import AnimatedCounter from './components/AnimatedCounter';
import UserChat from './components/UserChat';
import AdminChatDashboard from './components/AdminChatDashboard';

// Layout assets
import cryptoHeroImg from './assets/Images/crypto_hero.png';
import binanceImg from './assets/Images/binance.jpeg';
import binance2Img from './assets/Images/binance2.jpeg';
import binance3Img from './assets/Images/binance3.jpeg';
import trustWalletImg from './assets/Images/trustwallet.jpeg';
import lisanceImg from './assets/Images/lisance.jpeg';
import softwareImg from './assets/Images/software.png';

import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'terms' | 'about' | 'license'
  const [isUserChatOpen, setIsUserChatOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Calculator State
  const [calcAsset, setCalcAsset] = useState('USDT'); // 'USDT' or 'BTC'
  const [calcNetwork, setCalcNetwork] = useState('TRC20'); // 'TRC20', 'ERC20', 'BEP20', 'Solana'
  const [calcAmount, setCalcAmount] = useState('10000');
  const [calcResult, setCalcResult] = useState(99);

  // Scroll effect for Navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update calculator calculations (Buy Desk only)
  useEffect(() => {
    const amt = parseFloat(calcAmount) || 0;
    // 10000 Flash USDT/BTC = 99 USD
    const price = (amt / 10000) * 99;
    setCalcResult(price);
  }, [calcAmount]);

  // Framer Motion presets
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const staggerContainer = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.1
      }
    },
    viewport: { once: true, margin: "-100px" }
  };

  const services = [
    {
      title: "Flash USDT TRC20",
      desc: "Instant Tether conversions on the Tron network. Fast execution and complete network compatibility.",
      icon: <Coins className="neon-text-green" size={26} />,
      badge: "USDT TRC20",
      panelClass: "glass-panel-green",
      features: [
        "Transferable",
        "Tradable",
        "Use in gambling website and apps",
        "180 days validity",
        "All wallet transfer",
        "Many time jumping"
      ]
    },
    {
      title: "Flash USDT ERC20",
      desc: "Ethereum network Tether clearances. High safety levels with standard gas rate optimizations.",
      icon: <Coins className="neon-text-blue" size={26} />,
      badge: "USDT ERC20",
      panelClass: "glass-panel-blue",
      features: [
        "Transferable",
        "Tradable",
        "Use in gambling website and apps",
        "180 days validity",
        "All wallet transfer",
        "Many time jumping"
      ]
    },
    {
      title: "Flash Bitcoin",
      desc: "Lightning-fast Bitcoin clearances. Optimized for wallet transfers with dedicated compliance validator paths.",
      icon: <ArrowRightLeft className="neon-text-cyan" size={26} />,
      badge: "Bitcoin Swap",
      panelClass: "glass-panel-cyan",
      features: [
        "Transferable",
        "Tradable",
        "Use in gambling website and apps",
        "80 days validity",
        "All wallet transfer",
        "Many time jumping"
      ]
    },
    {
      title: "Flash USDT Solana",
      desc: "High-speed Solana network swaps. Fast transaction propagation with near-zero ledger clearance lag.",
      icon: <Coins className="neon-text-purple" size={26} />,
      badge: "USDT Solana",
      panelClass: "glass-panel-purple",
      features: [
        "Transferable",
        "Tradable",
        "Use in gambling website and apps",
        "180 days validity",
        "All wallet transfer",
        "Many time jumping"
      ]
    }
  ];

  const whyChooseUs = [
    { title: "Fast Response", desc: "Our team operates 24/7 with average response times under 5 minutes.", icon: <Clock size={20} className="neon-text-cyan" /> },
    { title: "Secure Process", desc: "Military-grade encryption and secure validation protect every swap.", icon: <Shield size={20} className="neon-text-cyan" /> },
    { title: "Transparent Pricing", desc: "No hidden fees or surprise costs. The rate you confirm is the rate you receive.", icon: <Lock size={20} className="neon-text-cyan" /> },
    { title: "Professional Support", desc: "One-on-one professional account managers guide your trade to completion.", icon: <UserCheck size={20} className="neon-text-cyan" /> },
    { title: "Global Service", desc: "Initiate, settle, and clear transactions from anywhere in the world.", icon: <Globe size={20} className="neon-text-cyan" /> },
    { title: "Privacy Focused", desc: "Your data is strictly confidential. Zero storage of sensitive identifiers.", icon: <EyeOff size={20} className="neon-text-cyan" /> },
    { title: "Multiple Network Support", desc: "Settle your crypto assets on TRC20, ERC20, BEP20, and mainnets.", icon: <Layers size={20} className="neon-text-cyan" /> },
    { title: "Dedicated OTC Assistance", desc: "Receive custom transaction handling tailored to bulk business and personal desks.", icon: <CheckCircle2 size={20} className="neon-text-cyan" /> }
  ];

  const processSteps = [
    { step: "01", name: "Contact our team", desc: "Reach out via our Live Chat or Telegram to register your request." },
    { step: "02", name: "Confirm trade details", desc: "Our team locks in the current exchange rates and network fees." },
    { step: "03", name: "Secure payment", desc: "Complete the transaction payment through our verified security pathways." },
    { step: "04", name: "Crypto transferred", desc: "Your digital assets are dispatched instantly to your verified wallet." },
    { step: "05", name: "Transaction completed", desc: "Both parties receive receipt confirmations and settlement hashes." }
  ];

  const verifiedDocs = [
    { title: "Company Registration", desc: "Official business registration documentation.", verified: true },
    { title: "Business Verification", desc: "Corporate verification and bank account validations for clean trading.", verified: true },
    { title: "Compliance Documents", desc: "Strict adherence to legal frameworks, KYC guidelines, and standard AML protocols.", verified: true },
    { title: "Trading Certificate", desc: "Certified exchange operator document authorized for institutional OTC clearance.", verified: true }
  ];

  const securityFeatures = [
    { title: "256-bit Encryption", desc: "All client communication and metadata are shielded behind premium AES-256 protocols.", icon: <Lock size={24} /> },
    { title: "Secure Wallet Verification", desc: "We utilize multi-sig wallets and dynamic transaction verifiers to prevent spoofing.", icon: <ShieldCheck size={24} /> },
    { title: "Transaction Confirmation", desc: "Dual-verification triggers guarantee that assets are only released on validated ledger states.", icon: <Check size={24} /> },
    { title: "Privacy Protection", desc: "Encrypted memory spaces ensure that no local metadata is leaked or recorded.", icon: <EyeOff size={24} /> },
    { title: "Dedicated Support", desc: "Receive immediate recovery and dispatch protection with active real-time risk desk oversight.", icon: <UserCheck size={24} /> }
  ];

  const faqItems = [
    {
      q: "How long does settlement take?",
      a: "Settlement speed depends entirely on the blockchain network confirmation time. Once transaction hashes are generated, USDT transfers typically clear within 2-5 minutes, while Bitcoin transfers can take 10-20 minutes depending on network congestion."
    },
    {
      q: "Which wallets are supported?",
      a: "We support transfers to all major non-custodial and custodial crypto wallets. Supported choices depend on the blockchain network selected (e.g., Binance, Trust Wallet, MetaMask, Ledger, and Coinbase Wallet)."
    },
    {
      q: "Do you provide customer support?",
      a: "Yes, we provide 24/7 dedicated support before, during, and after your transaction is completed. Our team ensures that client inquiries are addressed directly via our Live Chat or Telegram without any automated bot interfaces."
    }
  ];

  const testimonials = [
    {
      quote: "Swapping high-volume USDT and BTC has never been this simple. Rates are locked directly on Live Chat and trades clear in under 5 minutes.",
      author: "Marcus Vance",
      role: "Director, Vance Liquidity Group",
      badge: "VERIFIED OTC CLIENT"
    },
    {
      quote: "Incredible speed and security. Moving substantial volumes of USDT-TRC20, having a reliable desk executing instantly on Live Chat is a game-changer.",
      author: "Sarah K.",
      role: "OTC Crypto Arbitrageur",
      badge: "VERIFIED TRADER"
    },
    {
      quote: "Highly professional service. The desk cleared our corporate treasury swap within minutes. Excellent transparency, support, and pricing.",
      author: "Aleksei M.",
      role: "Founder, Nexa Tech Ventures",
      badge: "VERIFIED INSTITUTION"
    },
    {
      quote: "Flawless OTC transactions. We trade large volumes of USDT-ERC20 regularly, and their execution speed and rate-locking is unmatched.",
      author: "David L.",
      role: "Treasury Manager, Alpha Web3 Fund",
      badge: "VERIFIED FUND MANAGER"
    },
    {
      quote: "Very reliable and fast. 24/7 client managers are incredibly responsive on Live Chat. Transparent fees and safe wallet dispatch.",
      author: "Priya S.",
      role: "Head of Operations, FinTech Solutions",
      badge: "VERIFIED PARTNER"
    },
    {
      quote: "Outstanding service. High-volume trades are settled safely in under 5 minutes with zero slippage. Truly trusted desk worldwide.",
      author: "Elena R.",
      role: "Private Wealth Client",
      badge: "VERIFIED OTC CLIENT"
    }
  ];

  return (
    <>
      {/* Background System */}
      <div className="aurora-bg">
        <div className="aurora-glow aurora-glow-1"></div>
        <div className="aurora-glow aurora-glow-2"></div>
        <div className="aurora-glow aurora-glow-3"></div>
      </div>
      <div className="animated-grid"></div>
      <ParticleBackground />

      {/* Navigation Header */}
      <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-container">
          <a href="#" className="logo-link" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }}>
            <Zap className="neon-text-cyan" size={24} fill="currentColor" />
            <span className="logo-text">FLASH CRYPTO</span>
          </a>

          <div className="nav-links">
            <a href="#services" className="nav-link" onClick={() => setCurrentPage('home')}>Services</a>
            <a href="#why-choose" className="nav-link" onClick={() => setCurrentPage('home')}>Why Choose Us</a>
            <a href="#process" className="nav-link" onClick={() => setCurrentPage('home')}>Our Process</a>
            <a href="#security" className="nav-link" onClick={() => setCurrentPage('home')}>Security</a>
            <a href="#faq" className="nav-link" onClick={() => setCurrentPage('home')}>FAQ</a>
            <a 
              href="https://whatsapp.com/channel/0029Vakbup91Hspodzr8Gj0u"
              target="_blank"
              rel="noreferrer"
              className="btn-glow btn-cyan" 
              style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem', textDecoration: 'none' }}
            >
              Community
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ display: 'none', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu (Simple responsive layout) */}
        <style>{`
          @media (max-width: 968px) {
            .mobile-toggle { display: block !important; }
          }
        `}</style>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{
                position: 'fixed',
                top: '80px',
                left: 0,
                right: 0,
                background: 'rgba(6, 8, 20, 0.95)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid var(--border-glass)',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                zIndex: 99
              }}
            >
              <a href="#services" className="nav-link" onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }}>Services</a>
              <a href="#why-choose" className="nav-link" onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }}>Why Choose Us</a>
              <a href="#process" className="nav-link" onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }}>Our Process</a>
              <a href="#security" className="nav-link" onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }}>Security</a>
              <a href="#faq" className="nav-link" onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }}>FAQ</a>
              <a 
                href="https://whatsapp.com/channel/0029Vakbup91Hspodzr8Gj0u"
                target="_blank"
                rel="noreferrer"
                className="btn-glow btn-cyan" 
                onClick={() => setMobileMenuOpen(false)}
                style={{ padding: '0.75rem', fontSize: '1rem', textDecoration: 'none', textAlign: 'center' }}
              >
                Community
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main App Container */}
      {currentPage === 'home' ? (
        <main className="container">
        
        {/* Hero Section */}
        <section id="hero" className="hero-grid">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-content"
          >
            <h1 className="hero-title">
              Secure Flash <br />
              <span className="neon-text-cyan">Cryptocurrency</span> Trading
            </h1>
            <p className="hero-subtitle">
              Buy & Sell Bitcoin (BTC), USDT & Digital Assets. Professional Flash trading solutions designed for individuals, businesses and institutional clients. Give us a chance to serve you and try our premium services.
            </p>

            <div className="hero-bullets">
              <div className="bullet-item">
                <span className="bullet-dot"></span>
                Fast Settlement
              </div>
              <div className="bullet-item">
                <span className="bullet-dot" style={{ backgroundColor: 'var(--neon-green)', boxShadow: 'var(--glow-green)' }}></span>
                Secure Transactions
              </div>
              <div className="bullet-item">
                <span className="bullet-dot"></span>
                Dedicated Support
              </div>
            </div>

            <div className="hero-buttons">
              <button 
                onClick={() => setCurrentPage('payment')} 
                className="btn-glow btn-cyan"
                style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
              >
                Buy Now
              </button>
              <button 
                onClick={() => navigate('/chat')}
                className="btn-glow btn-outline"
                style={{ display: 'inline-flex', gap: '0.5rem', alignItems: 'center', background: 'transparent', border: '1px solid var(--neon-cyan)', color: '#fff', cursor: 'pointer', fontFamily: 'inherit', fontSize: '1rem', padding: '0.75rem 1.5rem', borderRadius: '8px' }}
              >
                <MessageCircle size={18} className="neon-text-green" />
                Chat now
              </button>
            </div>
          </motion.div>

          {/* Hero Visual side: Calculator with futuristic crypto artwork banner */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-visual"
          >
            {/* Trading Calculator Card */}
            <div className="interactive-calculator glass-panel">
              
              {/* Premium Futuristic Graphic Banner */}
              <div style={{ borderRadius: '12px', overflow: 'hidden', marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.08)', position: 'relative' }}>
                <img 
                  src={cryptoHeroImg} 
                  alt="Futuristic Crypto Trade" 
                  style={{ width: '100%', height: '170px', objectFit: 'cover', display: 'block' }} 
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,15,30,0.9) 0%, transparent 100%)' }}></div>
              </div>
              <div className="calc-title">
                <span>Buy Digital Assets</span>
                <span 
                  className="calc-badge"
                  onClick={() => navigate('/admin')}
                  style={{ cursor: 'pointer' }}
                >
                  Secure Desk
                </span>
              </div>

              {/* Input field */}
              <div className="calc-field">
                <label className="calc-label">Enter Buy Amount ({calcAsset})</label>
                <div className="calc-input-wrapper">
                  <input 
                    type="number" 
                    className="calc-input" 
                    value={calcAmount} 
                    min="10000"
                    onChange={(e) => setCalcAmount(e.target.value)} 
                    onBlur={(e) => {
                      const val = parseFloat(e.target.value);
                      if (isNaN(val) || val < 10000) {
                        setCalcAmount('10000');
                      }
                    }}
                  />
                  <select 
                    className="calc-select" 
                    value={calcAsset} 
                    onChange={(e) => setCalcAsset(e.target.value)}
                  >
                    <option value="USDT">USDT</option>
                    <option value="BTC">BTC</option>
                  </select>
                </div>
                {calcAsset === 'USDT' && (
                  <div className="calc-field" style={{ marginTop: '1.5rem' }}>
                    <label className="calc-label">Select Network</label>
                    <div className="calc-input-wrapper">
                      <select 
                        className="calc-input" 
                        value={calcNetwork} 
                        onChange={(e) => setCalcNetwork(e.target.value)}
                        style={{ appearance: 'auto', cursor: 'pointer', backgroundColor: 'rgba(6, 8, 20, 0.8)', color: '#fff' }}
                      >
                        <option value="TRC20">TRC20 (Tron)</option>
                        <option value="ERC20">ERC20 (Ethereum)</option>
                        <option value="BEP20">BEP20 (Binance)</option>
                        <option value="Solana">Solana</option>
                      </select>
                    </div>
                  </div>
                )}

                {(parseFloat(calcAmount) < 10000 || isNaN(parseFloat(calcAmount))) && (
                  <div style={{ color: '#ff4a4a', fontSize: '0.8rem', marginTop: '0.5rem', fontWeight: '500' }}>
                    Minimum buy amount is 10,000 {calcAsset}.
                  </div>
                )}
              </div>

              {/* Output result */}
              <div className="calc-field" style={{ marginBottom: '1.5rem' }}>
                <label className="calc-label">Charge for {parseFloat(calcAmount || 0).toLocaleString()} {calcAsset}</label>
                <div className="calc-result">
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Estimated Price:</span>
                  <span className="calc-result-val">
                    ${calcResult.toLocaleString(undefined, { 
                      minimumFractionDigits: 2, 
                      maximumFractionDigits: 2 
                    })} USD
                  </span>
                </div>
              </div>

              {/* Submit to Chat */}
              <button 
                onClick={() => {
                  const amt = parseFloat(calcAmount);
                  if (amt < 10000 || isNaN(amt)) {
                    alert('Minimum buy amount is 10,000.');
                    return;
                  }
                  setCurrentPage('payment');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={parseFloat(calcAmount) < 10000 || isNaN(parseFloat(calcAmount))}
                className="btn-glow btn-cyan" 
                style={{ 
                  width: '100%', 
                  padding: '0.85rem', 
                  borderRadius: '10px',
                  border: 'none',
                  opacity: (parseFloat(calcAmount) < 10000 || isNaN(parseFloat(calcAmount))) ? 0.6 : 1,
                  cursor: (parseFloat(calcAmount) < 10000 || isNaN(parseFloat(calcAmount))) ? 'not-allowed' : 'pointer',
                  fontFamily: 'inherit',
                  fontSize: '1rem'
                }}
              >
                BUY FLASH {calcAsset} CRYPTO
              </button>
            </div>
          </motion.div>
        </section>

        {/* CSS workaround variable injection */}
        <style>{`
          :root {
            --text-muted: #9ca3af;
          }
        `}</style>

        {/* Supported Networks (Marquee slider) */}
        <section id="marquee" style={{ padding: '0.5rem 0' }}>
          <div className="marquee-section glass-panel">
            <div className="marquee-container">
              {/* Double elements to allow seamless wrapping */}
              <div className="marquee-content">
                {['Bitcoin (BTC)', 'Tether (USDT-TRC20)', 'Ethereum (ETH)', 'Tether (USDT-ERC20)', 'Tether (USDT-BEP20)', 'Solana (SOL)'].map((network, index) => (
                  <div key={index} className="network-logo-card">
                    <Zap size={16} className="neon-text-cyan" />
                    {network}
                  </div>
                ))}
              </div>
              <div className="marquee-content" aria-hidden="true">
                {['Bitcoin (BTC)', 'Tether (USDT-TRC20)', 'Ethereum (ETH)', 'Tether (USDT-ERC20)', 'Tether (USDT-BEP20)', 'Solana (SOL)'].map((network, index) => (
                  <div key={index} className="network-logo-card">
                    <Zap size={16} className="neon-text-cyan" />
                    {network}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Services Section */}
        <section id="services">
          <motion.div {...fadeInUp}>
            <h2 className="section-title">Our Services</h2>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="services-grid"
          >
            {services.map((svc, idx) => (
              <motion.div 
                key={idx}
                variants={fadeInUp}
                className={`service-card glass-panel ${svc.panelClass}`}
              >
                <div className="service-icon-wrapper">
                  {svc.icon}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <h3 className="service-title">{svc.title}</h3>
                  <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', border: '1px solid var(--border-glass)', textTransform: 'uppercase', fontWeight: 600 }}>
                    {svc.badge}
                  </span>
                </div>
                <p className="service-desc">{svc.desc}</p>
                
                {svc.features && (
                  <div className="service-list" style={{ marginTop: '1rem' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: 600 }}>Included Functions:</div>
                    {svc.features.map((feat, i) => (
                      <div key={i} className="service-list-item">
                        <CheckCircle2 size={14} className={
                          svc.panelClass.includes('green') ? 'neon-text-green' : 
                          svc.panelClass.includes('cyan') ? 'neon-text-cyan' : 
                          svc.panelClass.includes('blue') ? 'neon-text-blue' : 
                          'neon-text-purple'
                        } />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Wallet Support Section */}
        <section id="wallets">
          <motion.div {...fadeInUp}>
            <h2 className="section-title">Supported Web3 Wallets</h2>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', maxWidth: '600px', margin: '1rem auto 3rem auto', fontSize: '1rem', lineHeight: '1.6' }}>
              We support direct integrations with major Web3 wallets for secure high-volume deposits and clearances.
            </p>
          </motion.div>

          {/* Wallets Grid: Horizontal (4 columns with Smartphone Mockups) */}
          <div className="wallets-grid-horizontal" style={{ marginBottom: '4.5rem' }}>
            {/* Trust Wallet 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="wallet-logo-card-p2"
            >
              <div className="wallet-info-text">
                <h4 style={{ color: 'var(--neon-cyan)', fontSize: '1.1rem', fontWeight: 800 }}>Trust Wallet Native</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', minHeight: '52px' }}>Fully compatible with Trust Wallet mobile app. Send and receive USDT/BTC with native chain validation.</p>
              </div>
              <div className="phone-mockup-p2">
                <img src={trustWalletImg} alt="Trust Wallet Interface" />
              </div>
            </motion.div>


            {/* Binance Wallet 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="wallet-logo-card-p2"
            >
              <div className="wallet-info-text">
                <h4 style={{ color: 'var(--neon-green)', fontSize: '1.1rem', fontWeight: 800 }}>Binance Web3 Wallet</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', minHeight: '52px' }}>Securely connect to your Binance Web3 wallet for high-volume deposits and instant clearance.</p>
              </div>
              <div className="phone-mockup-p2">
                <img src={binanceImg} alt="Binance Wallet Interface" />
              </div>
            </motion.div>

            {/* Binance Wallet 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="wallet-logo-card-p2"
            >
              <div className="wallet-info-text">
                <h4 style={{ color: 'var(--neon-cyan)', fontSize: '1.1rem', fontWeight: 800 }}>Multi-Chain Clearance</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', minHeight: '52px' }}>Supported networks include TRC20, ERC20 and BEP20 with automated verification.</p>
              </div>
              <div className="phone-mockup-p2">
                <img src={binance2Img} alt="Binance Wallet Interface 2" />
              </div>
            </motion.div>

            {/* Binance Wallet 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="wallet-logo-card-p2"
            >
              <div className="wallet-info-text">
                <h4 style={{ color: 'var(--neon-green)', fontSize: '1.1rem', fontWeight: 800 }}>Global Liquidity</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', minHeight: '52px' }}>Direct integration with global exchanges for rapid liquidity access.</p>
              </div>
              <div className="phone-mockup-p2">
                <img src={binance3Img} alt="Binance Wallet Interface 3" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section id="why-choose">
          <motion.div {...fadeInUp}>
            <h2 className="section-title">Why Choose Us</h2>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="why-grid"
          >
            {whyChooseUs.map((item, idx) => (
              <motion.div 
                key={idx}
                variants={fadeInUp}
                className="why-card glass-panel"
              >
                <div className="why-card-icon">
                  {item.icon}
                </div>
                <div>
                  <h3 className="why-card-title">{item.title}</h3>
                  <p className="why-card-desc">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Our Process Section */}
        <section id="process">
          <motion.div {...fadeInUp}>
            <h2 className="section-title">Our Process</h2>
          </motion.div>

          <div className="process-container">
            {processSteps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="process-card glass-panel"
              >
                <div className="process-step-num">
                  {step.step}
                </div>
                <h3 className="process-name">{step.name}</h3>
                <p className="process-desc">{step.desc}</p>

                {idx < processSteps.length - 1 && (
                  <div className="process-arrow">
                    <ArrowRight size={20} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Statistics & Reviews (Real Crypto Style) */}
        <section id="statistics-reviews" style={{ padding: '0 0 6rem 0' }}>
          
          {/* Dark Stats Banner */}
          <div className="stats-banner-dark">
            <div className="stats-banner-container">
              <div className="stats-banner-item">
                <div className="stats-banner-num">
                  <AnimatedCounter value={500} />
                  <span className="plus">+</span>
                </div>
                <div className="stats-banner-label">Happy Clients</div>
              </div>

              <div className="stats-banner-item">
                <div className="stats-banner-num">
                  <AnimatedCounter value={10} />
                  <span className="plus">M+</span>
                </div>
                <div className="stats-banner-label">Volume Cleared</div>
              </div>

              <div className="stats-banner-item">
                <div className="stats-banner-num">
                  15<span className="plus">+</span>
                </div>
                <div className="stats-banner-label">Supported Networks</div>
              </div>

              <div className="stats-banner-item">
                <div className="stats-banner-num">
                  <AnimatedCounter value={99} />
                  <span className="plus">%</span>
                </div>
                <div className="stats-banner-label">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="reviews-container">
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="testimonial-badge">TESTIMONIALS</span>
              <h2 className="section-title" style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
                Trusted by Global Traders (100+ Reviews)
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto' }}>
                Hear from the individual, business, and institutional clients swapping assets securely on Flash Crypto.
              </p>
            </div>

            <div className="reviews-marquee-container">
              <div className="reviews-marquee-content">
                {testimonials.map((t, idx) => (
                  <div key={idx} className="review-card-img2 review-marquee-card">
                    <div>
                      <div className="stars-row">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} className="star-icon" fill="currentColor" />
                        ))}
                      </div>
                      <p className="review-quote-text">
                        "{t.quote}"
                      </p>
                    </div>
                    <div className="review-author-row">
                      <div className="review-author-info">
                        <h4>{t.author}</h4>
                        <p>{t.role}</p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: 'var(--neon-green)', fontWeight: 700, marginTop: '0.5rem' }}>
                        <CheckCircle2 size={12} className="neon-text-green" />
                        {t.badge}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="reviews-marquee-content" aria-hidden="true">
                {testimonials.map((t, idx) => (
                  <div key={`dup-${idx}`} className="review-card-img2 review-marquee-card">
                    <div>
                      <div className="stars-row">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} className="star-icon" fill="currentColor" />
                        ))}
                      </div>
                      <p className="review-quote-text">
                        "{t.quote}"
                      </p>
                    </div>
                    <div className="review-author-row">
                      <div className="review-author-info">
                        <h4>{t.author}</h4>
                        <p>{t.role}</p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: 'var(--neon-green)', fontWeight: 700, marginTop: '0.5rem' }}>
                        <CheckCircle2 size={12} className="neon-text-green" />
                        {t.badge}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Latest Videos Section Removed */}

        {/* Verified Documents Section Removed */}

        {/* Security Section */}
        <section id="security">
          <motion.div {...fadeInUp}>
            <h2 className="section-title">Security & Protocol</h2>
          </motion.div>

          <div className="security-grid">
            {securityFeatures.map((sec, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="security-card glass-panel"
              >
                <div className="security-icon">
                  {sec.icon}
                </div>
                <h3 className="security-title">{sec.title}</h3>
                <p className="security-desc">{sec.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq">
          <motion.div {...fadeInUp}>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </motion.div>

          <div className="faq-list">
            {faqItems.map((item, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx} 
                  className={`faq-item ${isOpen ? 'faq-item-active' : ''}`}
                >
                  <button 
                    className="faq-question" 
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                  >
                    <span>{item.q}</span>
                    {isOpen ? <ChevronDown size={18} style={{ transform: 'rotate(180deg)', transition: 'transform 0.2s' }} /> : <ChevronDown size={18} style={{ transition: 'transform 0.2s' }} />}
                  </button>
                  
                  <motion.div 
                    initial={false}
                    animate={{ height: isOpen ? 'auto' : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="faq-answer"
                  >
                    <div className="faq-answer-inner">
                      {item.a}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Contact Section Removed */}

        </main>
      ) : currentPage === 'terms' ? (
        <div className="container subpage-container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="subpage-title">Terms of Service & Exchange</h1>
            <p className="subpage-subtitle">Last updated: June 2026. Please read our OTC guidelines and swap terms carefully.</p>
            
            <div className="subpage-content">
              <h3>1. Agreement Overview</h3>
              <p>By executing digital asset swaps or purchasing digital tokens through Flash Crypto (the "Desk"), you agree to be bound by these Terms of Service. If you do not agree, you must immediately cease all trade executions.</p>

              <h3>2. Transaction Finality & Blockchains</h3>
              <p>All cryptocurrency transactions (USDT, BTC) are executed directly on their respective blockchain networks (TRC20, ERC20, BEP20, Mainnet). Once a transaction has been confirmed on the distributed ledger, it is final, irreversible, and cannot be recalled or refunded.</p>

              <h3>3. Live Chat Rate-Locking</h3>
              <p>Exchange rates and liquidity desk pricing details locked with our OTC operators via our official Live Chat are valid for a maximum window of fifteen (15) minutes from the time of confirmation. Transactions completed outside this window are subject to repricing based on market spreads.</p>

              <h3>4. Risks & Disclaimers</h3>
              <p>Cryptocurrency trading involves high volatility and financial risk. The Desk is not responsible for losses due to network failures, gas spikes, wallet key compromises, or client-side errors.</p>
            </div>

            <button onClick={() => setCurrentPage('home')} className="subpage-back-btn">
              ← Back to Exchange
            </button>
          </motion.div>
        </div>
      ) : currentPage === 'about' ? (
        <div className="container subpage-container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="subpage-title">About Flash Crypto</h1>
            <p className="subpage-subtitle">Learn more about our OTC digital asset clearance and liquidity services.</p>
            
            <div className="subpage-content">
              <h3>Our Desk</h3>
              <p>Flash Crypto is a premium, institutional-grade cryptocurrency Over-The-Counter (OTC) trading desk. We specialize in high-volume, secure liquidations and digital asset swaps for Tether (USDT) and Bitcoin (BTC).</p>

              <h3>Institutional Liquidity</h3>
              <p>Founded in 2021, our desk has cleared over $10M+ in volume with happy individual, business, and institutional clients. We operate across multi-chain ecosystems (TRC20, ERC20, BEP20) to guarantee fast, private settlements directly to client-owned wallets.</p>

              <h3>Compliance & Authority</h3>
              <p>We operate under standard international financial frameworks. Our dedicated managers oversee every transaction to guarantee zero hidden commissions, safe handovers, and average settlement times of under 5 minutes.</p>
            </div>

            <button onClick={() => setCurrentPage('home')} className="subpage-back-btn">
              ← Back to Exchange
            </button>
          </motion.div>
        </div>
      ) : currentPage === 'license' ? (
        <div className="container subpage-container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="subpage-title">License & Verification</h1>
            <p className="subpage-subtitle">Our verified licenses and certificates of operation.</p>
            
            <div style={{ margin: '2rem auto', maxWidth: '800px', lineHeight: '1.6', color: 'var(--text-main)', textAlign: 'center' }}>
              <p style={{ marginBottom: '1rem' }}>
                Flash Crypto operates as a fully regulated and registered entity. We maintain the highest standards of compliance, security, and financial integrity in the OTC cryptocurrency market.
              </p>
              <p>
                Our services are audited regularly to ensure strict adherence to international financial regulations and anti-money laundering (AML) standards. You can verify our operational license below.
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', paddingBottom: '3rem' }}>
              <img 
                src={lisanceImg} 
                alt="License Certificate" 
                style={{ 
                  maxWidth: '600px', 
                  width: '100%',
                  height: 'auto', 
                  borderRadius: '12px', 
                  boxShadow: '0 8px 32px rgba(0, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }} 
              />
            </div>
            <button onClick={() => setCurrentPage('home')} className="subpage-back-btn">
              ← Back to Exchange
            </button>
          </motion.div>
        </div>
      ) : currentPage === 'payment' ? (
        <div className="container subpage-container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="subpage-title">Checkout & Payment</h1>
            <p className="subpage-subtitle">Complete your transaction to receive your assets instantly.</p>
            
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', padding: '2rem', borderRadius: '16px', maxWidth: '600px', margin: '0 auto 2rem auto', textAlign: 'left' }}>
              <div className="calc-field" style={{ marginBottom: '1.5rem' }}>
                <label className="calc-label">Asset to Buy</label>
                <div className="calc-input-wrapper">
                  <select 
                    className="calc-input" 
                    value={calcAsset} 
                    onChange={(e) => setCalcAsset(e.target.value)}
                    style={{ appearance: 'auto', cursor: 'pointer', backgroundColor: 'rgba(6, 8, 20, 0.8)', color: '#fff' }}
                  >
                    <option value="USDT">USDT</option>
                    <option value="BTC">BTC</option>
                  </select>
                </div>
              </div>

              {calcAsset === 'USDT' && (
                <div className="calc-field" style={{ marginBottom: '1.5rem' }}>
                  <label className="calc-label">Select Network</label>
                  <div className="calc-input-wrapper">
                    <select 
                      className="calc-input" 
                      value={calcNetwork} 
                      onChange={(e) => setCalcNetwork(e.target.value)}
                      style={{ appearance: 'auto', cursor: 'pointer', backgroundColor: 'rgba(6, 8, 20, 0.8)', color: '#fff' }}
                    >
                      <option value="TRC20">TRC20 (Tron)</option>
                      <option value="ERC20">ERC20 (Ethereum)</option>
                      <option value="BEP20">BEP20 (Binance)</option>
                      <option value="Solana">Solana</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="calc-field" style={{ marginBottom: '1.5rem' }}>
                <label className="calc-label">Amount (Min 10,000)</label>
                <div className="calc-input-wrapper">
                  <input 
                    type="number" 
                    className="calc-input" 
                    value={calcAmount} 
                    min="10000"
                    onChange={(e) => setCalcAmount(e.target.value)} 
                    onBlur={(e) => {
                      const val = parseFloat(e.target.value);
                      if (isNaN(val) || val < 10000) {
                        setCalcAmount('10000');
                      }
                    }}
                  />
                </div>
              </div>

              <div style={{ background: 'rgba(0, 240, 255, 0.05)', padding: '1.25rem', borderRadius: '10px', marginBottom: '2rem', border: '1px solid rgba(0, 240, 255, 0.2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-muted)' }}>You will receive:</span>
                  <span style={{ fontWeight: 'bold', color: '#fff', fontSize: '1.1rem' }}>{parseFloat(calcAmount || 0).toLocaleString()} {calcAsset} {calcAsset === 'USDT' ? `(${calcNetwork})` : ''}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Amount to Pay:</span>
                  <span style={{ fontWeight: 'bold', color: 'var(--neon-cyan)', fontSize: '1.3rem' }}>
                    ${calcResult.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                  </span>
                </div>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <ShieldCheck size={18} className="neon-text-green" />
                  <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 600, margin: 0 }}>Secure Payment Address (TRC20)</h4>
                </div>
                <motion.div 
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: 1, boxShadow: ['0 0 0px rgba(0, 240, 255, 0)', '0 0 15px rgba(0, 240, 255, 0.2)', '0 0 0px rgba(0, 240, 255, 0)'] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(6, 8, 20, 0.9)', padding: '1rem 1.25rem', borderRadius: '10px', border: '1px solid var(--neon-cyan)' }}
                >
                  <code style={{ color: 'var(--neon-cyan)', wordBreak: 'break-all', fontSize: '1.05rem', fontWeight: '600' }}>
                    TR4wmP1f26GcFgSyZ5BNE31jtZTG7YK1Qm
                  </code>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText('TR4wmP1f26GcFgSyZ5BNE31jtZTG7YK1Qm');
                      alert('Address copied to clipboard!');
                    }}
                    style={{ background: 'rgba(0, 240, 255, 0.1)', border: '1px solid rgba(0, 240, 255, 0.3)', borderRadius: '6px', padding: '0.4rem 0.6rem', color: 'var(--neon-cyan)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                  >
                    <Copy size={14} />
                    <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>Copy</span>
                  </button>
                </motion.div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginTop: '0.75rem', padding: '0.75rem', background: 'rgba(255, 170, 0, 0.05)', borderRadius: '8px', border: '1px solid rgba(255, 170, 0, 0.2)' }}>
                  <Zap size={16} style={{ color: '#ffaa00', flexShrink: 0, marginTop: '2px' }} />
                  <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.8)', margin: 0, lineHeight: 1.4 }}>
                    Send exactly <strong style={{ color: '#ffaa00' }}>${calcResult.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDT</strong> to this address via TRC20 network. Payments are processed automatically within 2-5 minutes.
                  </p>
                </div>
              </div>

              <div className="calc-field" style={{ marginBottom: '2.5rem' }}>
                <label className="calc-label">Upload Payment Screenshot</label>
                <div style={{ background: 'rgba(6, 8, 20, 0.8)', border: '1px solid var(--border-glass)', borderRadius: '10px', padding: '0.5rem' }}>
                  <input type="file" accept="image/*" style={{ width: '100%', color: 'var(--text-muted)' }} />
                </div>
              </div>

              <button 
                className="btn-glow btn-cyan" 
                style={{ width: '100%', padding: '1rem', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '1.05rem', fontWeight: 700 }}
                onClick={() => alert('Screenshot submitted successfully! Our team will process your payment within 5 minutes.')}
              >
                Submit Payment
              </button>
              
              <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                <button 
                  onClick={() => navigate('/chat')}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                >
                  <MessageCircle size={16} className="neon-text-green" />
                  Contact Support on Chat
                </button>
              </div>

            </div>

            <button onClick={() => setCurrentPage('home')} className="subpage-back-btn">
              ← Back to Exchange
            </button>
          </motion.div>
        </div>
      ) : currentPage === 'software' ? (
        <div className="container subpage-container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="subpage-title" style={{ background: 'linear-gradient(135deg, #fff, var(--neon-purple))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Flash USDT Software (Pro Edition)
            </h1>
            <p className="subpage-subtitle">Experience ultimate OTC automation, high-speed routing, and multi-network traversal.</p>
            
            <div className="subpage-content">
              <img src={softwareImg} alt="Flash USDT Software" style={{ width: '100%', borderRadius: '16px', marginBottom: '2.5rem', border: '1px solid var(--border-glass)', boxShadow: 'var(--glow-purple)' }} />
              <div className="software-page-grid">
                <div>
                  <h3>Institutional Swap Automation</h3>
                  <p>Our premium Flash USDT Software terminal is built for high-volume OTC operations. Designed with focus on speed, multi-node traversal, and absolute security, it is trusted by institutional desks and individual liquidity managers worldwide.</p>
                  
                  <h3 style={{ marginTop: '1.5rem' }}>Core Software Features</h3>
                  <ul style={{ listStyleType: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '0.75rem' }}>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.95rem', color: 'var(--text-main)' }}>
                      <CheckCircle2 size={16} className="neon-text-purple" style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                      <div>
                        <strong>Full Asset Transferability:</strong> Generated swap assets are fully transferable across all non-custodial Web3 wallets.
                      </div>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.95rem', color: 'var(--text-main)' }}>
                      <CheckCircle2 size={16} className="neon-text-purple" style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                      <div>
                        <strong>Exchange Tradable:</strong> Standard compliance validation hashes ensure generated assets are fully exchange tradable.
                      </div>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.95rem', color: 'var(--text-main)' }}>
                      <CheckCircle2 size={16} className="neon-text-purple" style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                      <div>
                        <strong>Entertainment & Gambling Friendly:</strong> Completely verified for direct use on global gambling web portals, casinos, and Web3 gaming apps.
                      </div>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.95rem', color: 'var(--text-main)' }}>
                      <CheckCircle2 size={16} className="neon-text-purple" style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                      <div>
                        <strong>Extended Validity:</strong> Enjoy locked ledger clearing cycles with 180 days of validity for all networks.
                      </div>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.95rem', color: 'var(--text-main)' }}>
                      <CheckCircle2 size={16} className="neon-text-purple" style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                      <div>
                        <strong>Multi-Hop Traversal (Many Time Jumping):</strong> Routing capability allows generated assets to hop across multiple wallet nodes securely without trace.
                      </div>
                    </li>
                  </ul>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-glass)', padding: '2rem', borderRadius: '16px', textAlign: 'center' }}>
                  <ShieldCheck size={48} className="neon-text-purple" style={{ margin: '0 auto 1rem auto' }} />
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>Acquire Access</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.4' }}>
                    Unlock full access to the Pro software suite, including 24/7 dedicated terminal support and automatic node updates.
                  </p>
                  
                  <div style={{ padding: '0.75rem', background: 'rgba(189,0,255,0.05)', border: '1px solid rgba(189,0,255,0.2)', borderRadius: '8px', marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Access Validity</span>
                    <span style={{ display: 'block', fontSize: '1rem', fontWeight: 700, color: 'var(--neon-purple)' }}>180 Days Active</span>
                  </div>

                  <button 
                    onClick={() => {
                      setCurrentPage('software-payment');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="btn-glow btn-cyan" 
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', fontSize: '1rem', border: 'none', cursor: 'pointer', fontFamily: 'inherit', background: 'linear-gradient(135deg, var(--neon-purple), var(--neon-blue))' }}
                  >
                    Buy Software
                  </button>
                </div>
              </div>
            </div>

            <button onClick={() => setCurrentPage('home')} className="subpage-back-btn">
              ← Back to Exchange
            </button>
          </motion.div>
        </div>
      ) : currentPage === 'software-payment' ? (
        <div className="container subpage-container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="subpage-title">Software Checkout</h1>
            <p className="subpage-subtitle">Purchase Flash USDT Software Pro Edition to unlock your files instantly.</p>
            
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', padding: '2rem', borderRadius: '16px', maxWidth: '600px', margin: '0 auto 2rem auto', textAlign: 'left' }}>
              
              <div style={{ background: 'rgba(0, 240, 255, 0.05)', padding: '1.25rem', borderRadius: '10px', marginBottom: '2rem', border: '1px solid rgba(0, 240, 255, 0.2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Amount to Pay:</span>
                  <span style={{ fontWeight: 'bold', color: 'var(--neon-cyan)', fontSize: '1.3rem' }}>
                    $499.00 USD
                  </span>
                </div>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <ShieldCheck size={18} className="neon-text-green" />
                  <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 600, margin: 0 }}>Secure Payment Address (TRC20)</h4>
                </div>
                <motion.div 
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: 1, boxShadow: ['0 0 0px rgba(0, 240, 255, 0)', '0 0 15px rgba(0, 240, 255, 0.2)', '0 0 0px rgba(0, 240, 255, 0)'] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(6, 8, 20, 0.9)', padding: '1rem 1.25rem', borderRadius: '10px', border: '1px solid var(--neon-cyan)' }}
                >
                  <code style={{ color: 'var(--neon-cyan)', wordBreak: 'break-all', fontSize: '1.05rem', fontWeight: '600' }}>
                    TR4wmP1f26GcFgSyZ5BNE31jtZTG7YK1Qm
                  </code>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText('TR4wmP1f26GcFgSyZ5BNE31jtZTG7YK1Qm');
                      alert('Address copied to clipboard!');
                    }}
                    style={{ background: 'rgba(0, 240, 255, 0.1)', border: '1px solid rgba(0, 240, 255, 0.3)', borderRadius: '6px', padding: '0.4rem 0.6rem', color: 'var(--neon-cyan)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                  >
                    <Copy size={14} />
                    <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>Copy</span>
                  </button>
                </motion.div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginTop: '0.75rem', padding: '0.75rem', background: 'rgba(255, 170, 0, 0.05)', borderRadius: '8px', border: '1px solid rgba(255, 170, 0, 0.2)' }}>
                  <Zap size={16} style={{ color: '#ffaa00', flexShrink: 0, marginTop: '2px' }} />
                  <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.8)', margin: 0, lineHeight: 1.4 }}>
                    Send exactly <strong style={{ color: '#ffaa00' }}>$499.00 USDT</strong> to this address via TRC20 network.
                  </p>
                </div>
              </div>

              <div className="calc-field" style={{ marginBottom: '2.5rem' }}>
                <label className="calc-label">Upload Payment Screenshot</label>
                <div style={{ background: 'rgba(6, 8, 20, 0.8)', border: '1px solid var(--border-glass)', borderRadius: '10px', padding: '0.5rem' }}>
                  <input type="file" accept="image/*" style={{ width: '100%', color: 'var(--text-muted)' }} />
                </div>
              </div>

              <button 
                className="btn-glow btn-cyan" 
                style={{ width: '100%', padding: '1rem', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '1.05rem', fontWeight: 700, background: 'linear-gradient(135deg, var(--neon-purple), var(--neon-blue))' }}
                onClick={() => alert('Screenshot submitted successfully! Your files will be unlocked within 5 minutes.')}
              >
                Submit Payment
              </button>

              {/* Locked Files UI */}
              <div style={{ marginTop: '2.5rem', borderTop: '1px solid var(--border-glass)', paddingTop: '1.5rem' }}>
                <h4 style={{ color: '#fff', marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Your Downloads</h4>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', marginBottom: '0.75rem', opacity: 0.6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '0.5rem', borderRadius: '6px' }}>
                      <FileText size={20} className="neon-text-blue" />
                    </div>
                    <div>
                      <div style={{ color: '#fff', fontWeight: 500, fontSize: '0.9rem' }}>Flash_USDT_Pro_License.pdf</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Pending payment...</div>
                    </div>
                  </div>
                  <Lock size={18} style={{ color: 'var(--text-muted)' }} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', opacity: 0.6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '0.5rem', borderRadius: '6px' }}>
                      <Layers size={20} className="neon-text-cyan" />
                    </div>
                    <div>
                      <div style={{ color: '#fff', fontWeight: 500, fontSize: '0.9rem' }}>Flash_Crypto_Software_v4.2.zip</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Pending payment...</div>
                    </div>
                  </div>
                  <Lock size={18} style={{ color: 'var(--text-muted)' }} />
                </div>
              </div>

            </div>

            <button onClick={() => setCurrentPage('software')} className="subpage-back-btn">
              ← Back to Software
            </button>
          </motion.div>
        </div>
      ) : null}

      {/* Footer Section */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid-layout">
            {/* Column 1: Info */}
            <div className="footer-left-info">
              <div className="footer-logo" onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ cursor: 'pointer' }}>
                <Zap className="neon-text-cyan" size={22} fill="currentColor" style={{ marginRight: '0.5rem', display: 'inline-block', verticalAlign: 'middle' }} />
                <span className="logo-text" style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '0.05em', verticalAlign: 'middle' }}>FLASH CRYPTO</span>
              </div>
              <p className="footer-left-desc">
                Professional Over-The-Counter (OTC) cryptocurrency clearance solutions designed for individuals, businesses and institutional clients. Fast, secure, and fully transparent settlement.
              </p>
            </div>

            {/* Column 2: Company */}
            <div>
              <h4 className="footer-col-title">Company</h4>
              <div className="footer-col-links">
                <a onClick={() => { setCurrentPage('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="footer-col-link-item">
                  About Us
                </a>
                <a onClick={() => { setCurrentPage('software'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="footer-col-link-item">
                  Flash USDT Software
                </a>
                <a onClick={() => { setCurrentPage('terms'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="footer-col-link-item">
                  Privacy Policy
                </a>
                <a onClick={() => { setCurrentPage('terms'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="footer-col-link-item">
                  Terms of Service
                </a>
                <a onClick={() => { setCurrentPage('license'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="footer-col-link-item">
                  License & Verification
                </a>
              </div>
            </div>

            {/* Column 3: Community */}
            <div>
              <h4 className="footer-col-title">Community</h4>
              <div className="footer-col-links">
                <button onClick={() => navigate('/chat')} className="footer-col-link-item" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}>
                  Chat Now
                </button>
                <a href="https://whatsapp.com/channel/0029Vakbup91Hspodzr8Gj0u" target="_blank" rel="noreferrer" className="footer-col-link-item">
                  WhatsApp Channel
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom-bar">
            <div>
              © {new Date().getFullYear()} Secure Flash Cryptocurrency Trading. All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Chat Components */}
      <AnimatePresence>
        {isUserChatOpen && (
          <UserChat onClose={() => setIsUserChatOpen(false)} />
        )}
      </AnimatePresence>


    </>
  );
}

function ChatPage() {
  const navigate = useNavigate();
  return (
    <div style={{ 
      height: '100dvh', 
      width: '100vw', 
      background: 'var(--bg-dark, #060814)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0',
      boxSizing: 'border-box'
    }}>
      <UserChat onClose={() => navigate('/')} isPage={true} />
    </div>
  );
}

function AdminPage() {
  const navigate = useNavigate();
  return (
    <div style={{ 
      height: '100dvh', 
      width: '100vw', 
      background: 'var(--bg-dark, #060814)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0',
      boxSizing: 'border-box'
    }}>
      <AdminChatDashboard onClose={() => navigate('/')} isPage={true} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}
