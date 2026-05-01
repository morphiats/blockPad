import { useState } from "react";
import './App.css';

function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  return (
    <div style={{backgroundColor:'#000000',minHeight:'100vh',color:'#60A5FA',fontFamily:'Arial, sans-serif',padding:'2rem'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'3rem'}}>
        <div>
          <h1 style={{fontSize:'2.5rem',color:'#60A5FA',margin:0}}>blockPad</h1>
          <p style={{color:'#93C5FD',margin:0,fontSize:'0.85rem'}}>Crypto-Funded Real Estate</p>
        </div>
        <button onClick={() => setWalletConnected(!walletConnected)} style={{backgroundColor:walletConnected?'#052e16':'#1D4ED8',border:walletConnected?'2px solid #22c55e':'2px solid #60A5FA',color:walletConnected?'#22c55e':'#ffffff',padding:'0.75rem 1.5rem',fontSize:'0.9rem',cursor:'pointer',borderRadius:'4px'}}>
          {walletConnected ? 'Wallet Connected' : 'Connect Wallet'}
        </button>
      </div>
      <div style={{border:'1px solid #1D4ED8',padding:'2rem',marginBottom:'2rem',textAlign:'center',background:'#060D1A'}}>
        <h2 style={{color:'#FFFFFF',marginBottom:'1rem'}}>Buy Property with Crypto</h2>
        <p style={{color:'#BFDBFE',marginBottom:'2rem'}}>Bitcoin, Ethereum, or USDC settled in DJED via Cardano smart contracts.</p>
        <div style={{display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap'}}>
          <button onClick={() => setSelectedPayment('Bitcoin')} style={{backgroundColor:selectedPayment==='Bitcoin'?'#F7931A':'#1a0a00',border:'2px solid #F7931A',color:selectedPayment==='Bitcoin'?'#000':'#F7931A',padding:'1rem 2rem',fontSize:'1rem',cursor:'pointer',borderRadius:'4px',fontWeight:'bold'}}>BTC - Bitcoin</button>
          <button onClick={() => setSelectedPayment('Ethereum')} style={{backgroundColor:selectedPayment==='Ethereum'?'#627EEA':'#0a0a2e',border:'2px solid #627EEA',color:selectedPayment==='Ethereum'?'#000':'#627EEA',padding:'1rem 2rem',fontSize:'1rem',cursor:'pointer',borderRadius:'4px',fontWeight:'bold'}}>ETH - Ethereum</button>
          <button onClick={() => setSelectedPayment('USDC')} style={{backgroundColor:selectedPayment==='USDC'?'#2775CA':'#001a33',border:'2px solid #2775CA',color:selectedPayment==='USDC'?'#000':'#2775CA',padding:'1rem 2rem',fontSize:'1rem',cursor:'pointer',borderRadius:'4px',fontWeight:'bold'}}>USDC</button>
        </div>
        {selectedPayment && (
          <div style={{marginTop:'1.5rem',padding:'1rem',border:'1px solid #1D4ED8',background:'#0A1628'}}>
            <p style={{color:'#93C5FD',margin:0}}>Selected: <strong style={{color:'#fff'}}>{selectedPayment}</strong></p>
            <p style={{color:'#BFDBFE',margin:'0.5rem 0 0',fontSize:'0.85rem'}}>Funds convert to DJED and held in Cardano escrow until closing.</p>
          </div>
        )}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))',gap:'1rem',marginBottom:'2rem'}}>
        {[{icon:'*', title:'Smart Escrow', desc:'Milestone-based Cardano escrow'},{icon:'#', title:'Compliance First', desc:'KYC - AML - Title - Legal'},{icon:'$', title:'DJED Settlement', desc:'Native Cardano stablecoin'},{icon:'@', title:'Audit Trail', desc:'Every document hashed on-chain'}].map((f,i) => (
          <div key={i} style={{border:'1px solid #1D4ED8',padding:'1.5rem',backgroundColor:'#060D1A',borderRadius:'4px'}}>
            <div style={{fontSize:'2rem',marginBottom:'0.5rem'}}>{f.icon}</div>
            <h3 style={{color:'#60A5FA',marginBottom:'0.5rem',fontSize:'1rem'}}>{f.title}</h3>
            <p style={{color:'#BFDBFE',fontSize:'0.85rem',margin:0}}>{f.desc}</p>
          </div>
        ))}
      </div>
      <div style={{textAlign:'center',color:'#1D4ED8',fontSize:'0.85rem'}}>Powered by Cardano - DJED - ADA</div>
    </div>
  );
}

export default App;
