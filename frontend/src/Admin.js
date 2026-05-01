import { useState } from "react";

const txData = [
  { id: "BP001", property: "123 Miami Beach Blvd", buyer: "0x1a2b...3c4d", amount: 850000, crypto: "BTC", status: "escrow", kyc: true, date: "2026-05-01" },
  { id: "BP002", property: "456 Brickell Ave", buyer: "0x5e6f...7g8h", amount: 1200000, crypto: "ETH", status: "pending_kyc", kyc: false, date: "2026-05-01" },
  { id: "BP003", property: "789 Ocean Drive", buyer: "0x9i0j...1k2l", amount: 650000, crypto: "USDC", status: "closed", kyc: true, date: "2026-04-28" },
];

function Admin({ onBack }) {
  const [sel, setSel] = useState(null);
  return (
    <div style={{backgroundColor:'#000',minHeight:'100vh',color:'#60A5FA',fontFamily:'Arial',padding:'2rem'}}>
      <div style={{display:'flex',justifyContent:'space-between',marginBottom:'2rem'}}>
        <h1 style={{color:'#60A5FA',margin:0}}>blockPad Admin</h1>
        <button onClick={onBack} style={{border:'1px solid #1D4ED8',backgroundColor:'transparent',color:'#60A5FA',padding:'0.75rem 1.5rem',cursor:'pointer',borderRadius:'4px'}}>Back</button>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1rem',marginBottom:'2rem'}}>
        {[['$2.7M','Volume'],['1','Escrows'],['1','Closed'],['1','Pending KYC']].map(([v,l],i)=>(
          <div key={i} style={{border:'1px solid #1D4ED8',padding:'1.5rem',backgroundColor:'#060D1A',borderRadius:'4px',textAlign:'center'}}>
            <h3 style={{color:'#60A5FA',margin:'0 0 0.5rem'}}>{v}</h3>
            <p style={{color:'#93C5FD',margin:0,fontSize:'0.8rem'}}>{l}</p>
          </div>
        ))}
      </div>
      <div style={{border:'1px solid #1D4ED8',borderRadius:'4px',overflow:'hidden'}}>
        {txData.map(tx=>(
          <div key={tx.id} onClick={()=>setSel(sel?.id===tx.id?null:tx)}
            style={{padding:'1rem 1.5rem',borderBottom:'1px solid #0A1628',cursor:'pointer',backgroundColor:sel?.id===tx.id?'#0A1628':'transparent',display:'flex',justifyContent:'space-between',alignItems:'center',gap:'1rem',flexWrap:'wrap'}}>
            <div>
              <p style={{color:'#fff',margin:'0 0 0.25rem',fontWeight:'bold'}}>{tx.id} - {tx.property}</p>
              <p style={{color:'#93C5FD',margin:0,fontSize:'0.8rem'}}>{tx.buyer}</p>
            </div>
            <div style={{textAlign:'right'}}>
              <p style={{color:'#60A5FA',margin:'0 0 0.25rem'}}>${tx.amount.toLocaleString()} {tx.crypto}</p>
              <span style={{color:tx.status==='closed'?'#22c55e':tx.status==='escrow'?'#F7931A':'#627EEA',fontSize:'0.8rem'}}>{tx.status}</span>
            </div>
          </div>
        ))}
        {sel && (
          <div style={{padding:'1.5rem',backgroundColor:'#060D1A',borderTop:'1px solid #1D4ED8'}}>
            <h3 style={{color:'#fff',marginBottom:'1rem'}}>{sel.id} Details</h3>
            <div style={{display:'flex',gap:'1rem',flexWrap:'wrap'}}>
              <button style={{backgroundColor:'#052e16',border:'1px solid #22c55e',color:'#22c55e',padding:'0.75rem 1.5rem',cursor:'pointer',borderRadius:'4px'}}>Release Escrow</button>
              <button style={{backgroundColor:'#1a0000',border:'1px solid #ef4444',color:'#ef4444',padding:'0.75rem 1.5rem',cursor:'pointer',borderRadius:'4px'}}>Refund Buyer</button>
              <button style={{backgroundColor:'#0A1628',border:'1px solid #1D4ED8',color:'#60A5FA',padding:'0.75rem 1.5rem',cursor:'pointer',borderRadius:'4px'}}>View on Chain</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
