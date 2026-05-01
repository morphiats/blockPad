function Logo({ onClick }) {
  return (
    <div onClick={onClick} style={{cursor:'pointer',display:'flex',alignItems:'center',gap:'0.75rem'}}>
      <div style={{background:'linear-gradient(135deg, #0a0a1a, #1a0a2e)',border:'2px solid #7C3AED',borderRadius:'8px',padding:'0.4rem 0.6rem',boxShadow:'0 0 20px rgba(124,58,237,0.5)',display:'flex',flexDirection:'column',alignItems:'center',minWidth:'52px'}}>
        <span style={{color:'#888',fontSize:'0.55rem',letterSpacing:'0.15em'}}>ADA</span>
        <span style={{color:'#39FF14',fontSize:'1.4rem',fontWeight:'900',fontFamily:'Arial',lineHeight:1,textShadow:'0 0 10px #39FF14'}}>BP</span>
        <span style={{color:'#fff',fontSize:'0.45rem',letterSpacing:'0.1em'}}>BLOCK PAD</span>
      </div>
      <div>
        <div style={{color:'#39FF14',fontSize:'1.6rem',fontWeight:'900',letterSpacing:'0.05em',lineHeight:1}}>
          <span style={{color:'#A855F7'}}>BLOCK</span> <span style={{color:'#39FF14'}}>PAD</span>
        </div>
        <div style={{color:'#93C5FD',fontSize:'0.7rem',letterSpacing:'0.1em'}}>Crypto-Funded Real Estate</div>
      </div>
    </div>
  );
}
export default Logo;
