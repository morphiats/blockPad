import { useState, useEffect } from "react";
import './App.css';

const properties = [
  { id: 1, address: "123 Miami Beach Blvd, Miami FL", price: 850000, beds: 3, baths: 2, sqft: 1800, img: "🏖️" },
  { id: 2, address: "456 Brickell Ave, Miami FL", price: 1200000, beds: 4, baths: 3, sqft: 2400, img: "🏙️" },
  { id: 3, address: "789 Ocean Drive, Miami Beach FL", price: 650000, beds: 2, baths: 2, sqft: 1200, img: "🌊" },
];

function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletName, setWalletName] = useState(null);
  const [availableWallets, setAvailableWallets] = useState([]);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [step, setStep] = useState('browse');

  useEffect(() => {
    const checkWallets = () => {
      const wallets = [];
      if (window.cardano?.nami) wallets.push({ name: 'Nami', key: 'nami' });
      if (window.cardano?.eternl) wallets.push({ name: 'Eternl', key: 'eternl' });
      if (window.cardano?.flint) wallets.push({ name: 'Flint', key: 'flint' });
      if (window.cardano?.yoroi) wallets.push({ name: 'Yoroi', key: 'yoroi' });
      setAvailableWallets(wallets);
    };
    checkWallets();
  }, []);

  const connectWallet = async (walletKey) => {
    try {
      const wallet = window.cardano[walletKey];
      await wallet.enable();
      setWalletConnected(true);
      setWalletName(walletKey.charAt(0).toUpperCase() + walletKey.slice(1));
      setShowWalletModal(false);
    } catch (err) {
      alert('Failed to connect wallet. Make sure your wallet extension is installed and unlocked.');
    }
  };

  return (
    <div style={{backgroundColor:'#000000',minHeight:'100vh',color:'#60A5FA',fontFamily:'Arial, sans-serif',padding:'2rem'}}>

      {/* Wallet Modal */}
      {showWalletModal && (
        <div style={{position:'fixed',inset:0,backgroundColor:'rgba(0,0,0,0.8)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}}>
          <div style={{backgroundColor:'#060D1A',border:'1px solid #1D4ED8',borderRadius:'8px',padding:'2rem',width:'320px'}}>
            <h3 style={{color:'#FFFFFF',marginBottom:'1.5rem',textAlign:'center'}}>Connect Wallet</h3>
            {availableWallets.length > 0 ? (
              availableWallets.map(w => (
                <button key={w.key} onClick={() => connectWallet(w.key)} style={{width:'100%',backgroundColor:'#0A1628',border:'1px solid #1D4ED8',color:'#BFDBFE',padding:'1rem',fontSize:'1rem',cursor:'pointer',borderRadius:'4px',marginBottom:'0.75rem',textAlign:'left'}}>
                  {w.name} Wallet
                </button>
              ))
            ) : (
              <div>
                <p style={{color:'#BFDBFE',fontSize:'0.85rem',marginBottom:'1rem',textAlign:'center'}}>No Cardano wallet detected.</p>
                <p style={{color:'#93C5FD',fontSize:'0.8rem',textAlign:'center'}}>Install Nami or Eternl browser extension to continue.</p>
                <a href="https://namiwallet.io" target="_blank" rel="noreferrer" style={{display:'block',textAlign:'center',color:'#60A5FA',marginTop:'1rem',fontSize:'0.85rem'}}>Get Nami Wallet</a>
                <a href="https://eternl.io" target="_blank" rel="noreferrer" style={{display:'block',textAlign:'center',color:'#60A5FA',marginTop:'0.5rem',fontSize:'0.85rem'}}>Get Eternl Wallet</a>
              </div>
            )}
            <button onClick={() => setShowWalletModal(false)} style={{width:'100%',backgroundColor:'transparent',border:'1px solid #444',color:'#666',padding:'0.75rem',cursor:'pointer',borderRadius:'4px',marginTop:'0.5rem'}}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'2rem'}}>
        <div>
          <h1 style={{fontSize:'2.5rem',color:'#60A5FA',margin:0}}>blockPad</h1>
          <p style={{color:'#93C5FD',margin:0,fontSize:'0.85rem'}}>Crypto-Funded Real Estate</p>
        </div>
        <button onClick={() => walletConnected ? null : setShowWalletModal(true)} style={{backgroundColor:walletConnected?'#052e16':'#1D4ED8',border:walletConnected?'2px solid #22c55e':'2px solid #60A5FA',color:walletConnected?'#22c55e':'#ffffff',padding:'0.75rem 1.5rem',fontSize:'0.9rem',cursor:'pointer',borderRadius:'4px'}}>
          {walletConnected ? `Connected: ${walletName}` : 'Connect Wallet'}
        </button>
      </div>

      {/* Property Listings */}
      {step === 'browse' && (
        <div>
          <h2 style={{color:'#FFFFFF',marginBottom:'1.5rem'}}>Available Properties</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))',gap:'1.5rem',marginBottom:'2rem'}}>
            {properties.map(p => (
              <div key={p.id} style={{border:'1px solid #1D4ED8',backgroundColor:'#060D1A',borderRadius:'4px',overflow:'hidden'}}>
                <div style={{fontSize:'4rem',textAlign:'center',padding:'2rem',backgroundColor:'#0A1628'}}>{p.img}</div>
                <div style={{padding:'1.5rem'}}>
                  <p style={{color:'#BFDBFE',fontSize:'0.85rem',margin:'0 0 0.5rem'}}>{p.address}</p>
                  <h3 style={{color:'#60A5FA',fontSize:'1.5rem',margin:'0 0 1rem'}}>${p.price.toLocaleString()}</h3>
                  <p style={{color:'#93C5FD',fontSize:'0.85rem',margin:'0 0 1rem'}}>{p.beds} bed · {p.baths} bath · {p.sqft.toLocaleString()} sqft</p>
                  <button onClick={() => { setSelectedProperty(p); setStep('pay'); }} style={{width:'100%',backgroundColor:'#1D4ED8',border:'none',color:'#fff',padding:'0.75rem',fontSize:'0.9rem',cursor:'pointer',borderRadius:'4px'}}>
                    Buy with Crypto
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Payment Step */}
      {step === 'pay' && selectedProperty && (
        <div style={{maxWidth:'600px',margin:'0 auto'}}>
          <button onClick={() => setStep('browse')} style={{background:'none',border:'1px solid #1D4ED8',color:'#60A5FA',padding:'0.5rem 1rem',cursor:'pointer',borderRadius:'4px',marginBottom:'1.5rem'}}>Back</button>
          <div style={{border:'1px solid #1D4ED8',padding:'2rem',backgroundColor:'#060D1A',borderRadius:'4px'}}>
            <h2 style={{color:'#FFFFFF',marginBottom:'0.5rem'}}>Purchase Property</h2>
            <p style={{color:'#BFDBFE',fontSize:'0.85rem'}}>{selectedProperty.address}</p>
            <h3 style={{color:'#60A5FA',marginBottom:'2rem'}}>${selectedProperty.price.toLocaleString()}</h3>
            <p style={{color:'#93C5FD',marginBottom:'1rem'}}>Select payment method:</p>
            <div style={{display:'flex',gap:'1rem',flexWrap:'wrap',marginBottom:'2rem'}}>
              <button onClick={() => setSelectedPayment('Bitcoin')} style={{backgroundColor:selectedPayment==='Bitcoin'?'#F7931A':'#1a0a00',border:'2px solid #F7931A',color:selectedPayment==='Bitcoin'?'#000':'#F7931A',padding:'0.75rem 1.5rem',cursor:'pointer',borderRadius:'4px',fontWeight:'bold'}}>BTC</button>
              <button onClick={() => setSelectedPayment('Ethereum')} style={{backgroundColor:selectedPayment==='Ethereum'?'#627EEA':'#0a0a2e',border:'2px solid #627EEA',color:selectedPayment==='Ethereum'?'#000':'#627EEA',padding:'0.75rem 1.5rem',cursor:'pointer',borderRadius:'4px',fontWeight:'bold'}}>ETH</button>
              <button onClick={() => setSelectedPayment('USDC')} style={{backgroundColor:selectedPayment==='USDC'?'#2775CA':'#001a33',border:'2px solid #2775CA',color:selectedPayment==='USDC'?'#000':'#2775CA',padding:'0.75rem 1.5rem',cursor:'pointer',borderRadius:'4px',fontWeight:'bold'}}>USDC</button>
            </div>
            {selectedPayment && (
              <button onClick={() => setStep('kyc')} style={{width:'100%',backgroundColor:'#1D4ED8',border:'none',color:'#fff',padding:'1rem',fontSize:'1rem',cursor:'pointer',borderRadius:'4px'}}>
                Continue to KYC Verification
              </button>
            )}
          </div>
        </div>
      )}

      {/* KYC Step */}
      {step === 'kyc' && (
        <div style={{maxWidth:'600px',margin:'0 auto'}}>
          <button onClick={() => setStep('pay')} style={{background:'none',border:'1px solid #1D4ED8',color:'#60A5FA',padding:'0.5rem 1rem',cursor:'pointer',borderRadius:'4px',marginBottom:'1.5rem'}}>Back</button>
          <div style={{border:'1px solid #1D4ED8',padding:'2rem',backgroundColor:'#060D1A',borderRadius:'4px'}}>
            <h2 style={{color:'#FFFFFF',marginBottom:'0.5rem'}}>Identity Verification</h2>
            <p style={{color:'#BFDBFE',marginBottom:'2rem',fontSize:'0.85rem'}}>Required for compliance. Your data is encrypted and secure.</p>
            {['Full Legal Name','Email Address','Phone Number','Country of Residence'].map((field, i) => (
              <div key={i} style={{marginBottom:'1rem'}}>
                <label style={{color:'#93C5FD',fontSize:'0.85rem',display:'block',marginBottom:'0.25rem'}}>{field}</label>
                <input type="text" placeholder={field} style={{width:'100%',backgroundColor:'#0A1628',border:'1px solid #1D4ED8',color:'#BFDBFE',padding:'0.75rem',borderRadius:'4px',fontSize:'0.9rem',boxSizing:'border-box'}} />
              </div>
            ))}
            <button onClick={() => setStep('escrow')} style={{width:'100%',backgroundColor:'#1D4ED8',border:'none',color:'#fff',padding:'1rem',fontSize:'1rem',cursor:'pointer',borderRadius:'4px',marginTop:'1rem'}}>
              Submit and Enter Escrow
            </button>
          </div>
        </div>
      )}

      {/* Escrow Status */}
      {step === 'escrow' && (
        <div style={{maxWidth:'600px',margin:'0 auto'}}>
          <div style={{border:'1px solid #22c55e',padding:'2rem',backgroundColor:'#060D1A',borderRadius:'4px',textAlign:'center'}}>
            <div style={{fontSize:'3rem',marginBottom:'1rem'}}>⬡</div>
            <h2 style={{color:'#22c55e',marginBottom:'0.5rem'}}>Escrow Active</h2>
            <p style={{color:'#BFDBFE',marginBottom:'2rem',fontSize:'0.85rem'}}>Your funds are secured in Cardano smart contract escrow.</p>
            {['KYC Verified','Funds in Escrow','Title Search','Legal Review','Final Closing'].map((milestone, i) => (
              <div key={i} style={{display:'flex',alignItems:'center',gap:'1rem',marginBottom:'0.75rem',padding:'0.75rem',border:'1px solid #1D4ED8',borderRadius:'4px',backgroundColor:'#0A1628'}}>
                <div style={{fontSize:'1.2rem'}}>{i < 2 ? 'OK' : '...'}</div>
                <span style={{color: i < 2 ? '#22c55e' : '#666'}}>{milestone}</span>
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
