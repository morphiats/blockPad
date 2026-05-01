import { useState, useEffect } from "react";
import Admin from "./Admin";
import Logo from "./Logo";
import './App.css';

const properties = [
  { id: 1, address: "123 Miami Beach Blvd, Miami FL", price: 850000, beds: 3, baths: 2, sqft: 1800 },
  { id: 2, address: "456 Brickell Ave, Miami FL", price: 1200000, beds: 4, baths: 3, sqft: 2400 },
  { id: 3, address: "789 Ocean Drive, Miami Beach FL", price: 650000, beds: 2, baths: 2, sqft: 1200 },
];

function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletName, setWalletName] = useState(null);
  const [availableWallets, setAvailableWallets] = useState([]);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [step, setStep] = useState('browse');

  useEffect(() => {
    const wallets = [];
    if (window.cardano?.nami) wallets.push({ name: 'Nami', key: 'nami' });
    if (window.cardano?.eternl) wallets.push({ name: 'Eternl', key: 'eternl' });
    setAvailableWallets(wallets);
  }, []);

  const connectWallet = async (key) => {
    try {
      await window.cardano[key].enable();
      setWalletConnected(true);
      setWalletName(key.charAt(0).toUpperCase() + key.slice(1));
      setShowWalletModal(false);
    } catch (err) {
      alert('Failed to connect wallet.');
    }
  };

  if (showAdmin) return <Admin onBack={() => setShowAdmin(false)} />;

  return (
    <div style={{backgroundColor:'#000',minHeight:'100vh',color:'#60A5FA',fontFamily:'Arial',padding:'2rem'}}>
      {showWalletModal && (
        <div style={{position:'fixed',inset:0,backgroundColor:'rgba(0,0,0,0.8)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}}>
          <div style={{backgroundColor:'#060D1A',border:'1px solid #1D4ED8',borderRadius:'8px',padding:'2rem',width:'320px'}}>
            <h3 style={{color:'#fff',marginBottom:'1.5rem',textAlign:'center'}}>Connect Wallet</h3>
            {availableWallets.length > 0 ? availableWallets.map(w => (
              <button key={w.key} onClick={() => connectWallet(w.key)} style={{width:'100%',backgroundColor:'#0A1628',border:'1px solid #1D4ED8',color:'#BFDBFE',padding:'1rem',cursor:'pointer',borderRadius:'4px',marginBottom:'0.75rem'}}>{w.name}</button>
            )) : (
              <div style={{textAlign:'center'}}>
                <p style={{color:'#BFDBFE',fontSize:'0.85rem'}}>No Cardano wallet detected.</p>
                <a href="https://namiwallet.io" target="_blank" rel="noreferrer" style={{display:'block',color:'#60A5FA',margin:'0.5rem 0'}}>Get Nami Wallet</a>
                <a href="https://eternl.io" target="_blank" rel="noreferrer" style={{display:'block',color:'#60A5FA'}}>Get Eternl Wallet</a>
              </div>
            )}
            <button onClick={() => setShowWalletModal(false)} style={{width:'100%',backgroundColor:'transparent',border:'1px solid #444',color:'#666',padding:'0.75rem',cursor:'pointer',borderRadius:'4px',marginTop:'0.5rem'}}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'2rem'}}>
        <Logo onClick={() => setShowAdmin(true)} />
        <button onClick={() => setShowWalletModal(true)} style={{backgroundColor:walletConnected?'#052e16':'#1D4ED8',border:walletConnected?'2px solid #22c55e':'2px solid #60A5FA',color:walletConnected?'#22c55e':'#fff',padding:'0.75rem 1.5rem',cursor:'pointer',borderRadius:'4px'}}>
          {walletConnected ? 'Connected: '+walletName : 'Connect Wallet'}
        </button>
      </div>

      {step === 'browse' && (
        <div>
          <h2 style={{color:'#fff',marginBottom:'1.5rem'}}>Available Properties</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))',gap:'1.5rem'}}>
            {properties.map(p => (
              <div key={p.id} style={{border:'1px solid #1D4ED8',backgroundColor:'#060D1A',borderRadius:'4px',padding:'1.5rem'}}>
                <p style={{color:'#BFDBFE',fontSize:'0.85rem',margin:'0 0 0.5rem'}}>{p.address}</p>
                <h3 style={{color:'#60A5FA',margin:'0 0 0.5rem'}}>${p.price.toLocaleString()}</h3>
                <p style={{color:'#93C5FD',fontSize:'0.85rem',margin:'0 0 1rem'}}>{p.beds} bed - {p.baths} bath - {p.sqft.toLocaleString()} sqft</p>
                <button onClick={() => { setSelectedProperty(p); setStep('pay'); }} style={{width:'100%',backgroundColor:'#1D4ED8',border:'none',color:'#fff',padding:'0.75rem',cursor:'pointer',borderRadius:'4px'}}>Buy with Crypto</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 'pay' && selectedProperty && (
        <div style={{maxWidth:'600px',margin:'0 auto'}}>
          <button onClick={() => setStep('browse')} style={{background:'none',border:'1px solid #1D4ED8',color:'#60A5FA',padding:'0.5rem 1rem',cursor:'pointer',borderRadius:'4px',marginBottom:'1.5rem'}}>Back</button>
          <div style={{border:'1px solid #1D4ED8',padding:'2rem',backgroundColor:'#060D1A',borderRadius:'4px'}}>
            <h2 style={{color:'#fff',marginBottom:'0.5rem'}}>Purchase Property</h2>
            <p style={{color:'#BFDBFE',fontSize:'0.85rem'}}>{selectedProperty.address}</p>
            <h3 style={{color:'#60A5FA',marginBottom:'2rem'}}>${selectedProperty.price.toLocaleString()}</h3>
            <div style={{display:'flex',gap:'1rem',marginBottom:'2rem'}}>
              <button onClick={() => setSelectedPayment('Bitcoin')} style={{backgroundColor:selectedPayment==='Bitcoin'?'#F7931A':'#1a0a00',border:'2px solid #F7931A',color:selectedPayment==='Bitcoin'?'#000':'#F7931A',padding:'0.75rem 1.5rem',cursor:'pointer',borderRadius:'4px'}}>BTC</button>
              <button onClick={() => setSelectedPayment('Ethereum')} style={{backgroundColor:selectedPayment==='Ethereum'?'#627EEA':'#0a0a2e',border:'2px solid #627EEA',color:selectedPayment==='Ethereum'?'#000':'#627EEA',padding:'0.75rem 1.5rem',cursor:'pointer',borderRadius:'4px'}}>ETH</button>
              <button onClick={() => setSelectedPayment('USDC')} style={{backgroundColor:selectedPayment==='USDC'?'#2775CA':'#001a33',border:'2px solid #2775CA',color:selectedPayment==='USDC'?'#000':'#2775CA',padding:'0.75rem 1.5rem',cursor:'pointer',borderRadius:'4px'}}>USDC</button>
            </div>
            {selectedPayment && <button onClick={() => setStep('kyc')} style={{width:'100%',backgroundColor:'#1D4ED8',border:'none',color:'#fff',padding:'1rem',cursor:'pointer',borderRadius:'4px'}}>Continue to KYC</button>}
          </div>
        </div>
      )}

      {step === 'kyc' && (
        <div style={{maxWidth:'600px',margin:'0 auto'}}>
          <button onClick={() => setStep('pay')} style={{background:'none',border:'1px solid #1D4ED8',color:'#60A5FA',padding:'0.5rem 1rem',cursor:'pointer',borderRadius:'4px',marginBottom:'1.5rem'}}>Back</button>
          <div style={{border:'1px solid #1D4ED8',padding:'2rem',backgroundColor:'#060D1A',borderRadius:'4px'}}>
            <h2 style={{color:'#fff',marginBottom:'2rem'}}>Identity Verification</h2>
            {['Full Legal Name','Email Address','Phone Number','Country'].map((field, i) => (
              <div key={i} style={{marginBottom:'1rem'}}>
                <label style={{color:'#93C5FD',fontSize:'0.85rem',display:'block',marginBottom:'0.25rem'}}>{field}</label>
                <input type="text" placeholder={field} style={{width:'100%',backgroundColor:'#0A1628',border:'1px solid #1D4ED8',color:'#BFDBFE',padding:'0.75rem',borderRadius:'4px',boxSizing:'border-box'}} />
              </div>
            ))}
            <button onClick={() => setStep('escrow')} style={{width:'100%',backgroundColor:'#1D4ED8',border:'none',color:'#fff',padding:'1rem',cursor:'pointer',borderRadius:'4px',marginTop:'1rem'}}>Submit and Enter Escrow</button>
          </div>
        </div>
      )}

      {step === 'escrow' && (
        <div style={{maxWidth:'600px',margin:'0 auto'}}>
          <div style={{border:'1px solid #22c55e',padding:'2rem',backgroundColor:'#060D1A',borderRadius:'4px',textAlign:'center'}}>
            <h2 style={{color:'#22c55e',marginBottom:'2rem'}}>Escrow Active</h2>
            {['KYC Verified','Funds in Escrow','Title Search','Legal Review','Final Closing'].map((m, i) => (
              <div key={i} style={{display:'flex',alignItems:'center',gap:'1rem',marginBottom:'0.75rem',padding:'0.75rem',border:'1px solid #1D4ED8',borderRadius:'4px',backgroundColor:'#0A1628'}}>
                <span>{i < 2 ? 'OK' : '...'}</span>
                <span style={{color:i < 2 ? '#22c55e' : '#666'}}>{m}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{textAlign:'center',color:'#1D4ED8',fontSize:'0.85rem',marginTop:'3rem'}}>Powered by Cardano - DJED - ADA</div>
    </div>
  );
}

export default App;
