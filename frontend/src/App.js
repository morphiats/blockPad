import './App.css';

function App() {
  return (
    <div style={{backgroundColor:'#000000',minHeight:'100vh',color:'#60A5FA',fontFamily:'Arial, sans-serif',padding:'2rem'}}>
      <div style={{textAlign:'center',marginBottom:'3rem'}}>
        <h1 style={{fontSize:'3rem',color:'#60A5FA'}}>blockPad</h1>
        <p style={{color:'#93C5FD'}}>The Settlement Infrastructure for Crypto-Funded Real Estate</p>
      </div>
      <div style={{border:'1px solid #1D4ED8',padding:'2rem',marginBottom:'2rem',textAlign:'center'}}>
        <h2 style={{color:'#FFFFFF',marginBottom:'1rem'}}>Buy Property with Crypto</h2>
        <p style={{color:'#BFDBFE',marginBottom:'2rem'}}>Use Bitcoin, Ethereum, or USDC — powered by Cardano smart contracts.</p>
        <div style={{display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap'}}>
          <button style={{backgroundColor:'#1a0a00',border:'2px solid #F7931A',color:'#F7931A',padding:'1rem 2rem',fontSize:'1rem',cursor:'pointer'}}>₿ Pay with Bitcoin</button>
          <button style={{backgroundColor:'#0a0a2e',border:'2px solid #627EEA',color:'#627EEA',padding:'1rem 2rem',fontSize:'1rem',cursor:'pointer'}}>Ξ Pay with Ethereum</button>
          <button style={{backgroundColor:'#001a00',border:'2px solid #2775CA',color:'#2775CA',padding:'1rem 2rem',fontSize:'1rem',cursor:'pointer'}}>$ Pay with USDC</button>
        </div>
      </div>
      <div style={{textAlign:'center',marginTop:'3rem',color:'#1D4ED8'}}>Powered by Cardano · DJED · ADA</div>
    </div>
  );
}

export default App;
