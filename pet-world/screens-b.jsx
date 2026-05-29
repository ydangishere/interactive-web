/* screens-b.jsx — frames 06–10 */

const { useState: useStateB, useEffect } = React;

/* ============ 06 · BUILDING THEIR WORLD ============ */
function Frame06() {
  const nav = useNav();
  const [pct, setPct] = useStateB(8);
  useEffect(() => {
    const t1 = setTimeout(() => setPct(80), 120);
    const t2 = setTimeout(() => setPct(100), 1700);
    const t3 = nav.inApp ? setTimeout(() => nav.next(), 2900) : null;
    return () => { clearTimeout(t1); clearTimeout(t2); if (t3) clearTimeout(t3); };
  }, []);
  return (
    <div className="pw">
      <div className="pw-glow" style={{ width:260, height:260, top:280, left:-30, background:'rgba(178,164,244,.45)' }} />
      <div className="pw-glow" style={{ width:200, height:200, top:330, right:-40, background:'rgba(210,242,79,.3)' }} />
      <Sparkle style={{ top:120, right:50 }} size={16} className="anim-twinkle" />
      <Sparkle style={{ top:300, right:36 }} size={20} color="#cfe26a" className="anim-twinkle" />
      <Sparkle style={{ top:360, left:30 }} size={14} className="anim-twinkle" />

      <div className="pw-pad">
        <h1 className="pw-title" style={{ fontSize:23, marginTop:20 }}>We&rsquo;re building their<br/>personality world&hellip;</h1>
        <p style={{ color:'var(--violet-ink)', fontWeight:800, fontSize:14.5, marginTop:12, display:'flex', alignItems:'center', gap:7 }}>This might be surprisingly accurate! <Icon name="sparkle" size={16} color="var(--violet)" /></p>

        <div style={{ flex:1, position:'relative', display:'flex', alignItems:'center', justifyContent:'center' }}>
          {/* orb */}
          <div style={{ position:'relative', width:300, height:300 }}>
            <div style={{ position:'absolute', inset:0, borderRadius:'50%',
              background:'radial-gradient(60% 55% at 45% 38%, #fbf9ff 0%, #ddd2f6 55%, #c2e6d6 100%)',
              boxShadow:'0 20px 50px rgba(120,90,210,.28), inset 0 -20px 40px rgba(150,120,220,.25)' }} className="anim-float" />
            <div style={{ position:'absolute', left:'50%', top:'52%', transform:'translate(-50%,-50%)' }}>
              <Img src={PHOTOS.golden} w={150} h={150} shape="circle" pos="50% 35%"
                style={{ boxShadow:'0 12px 26px rgba(80,50,160,.28)', border:'4px solid #fff' }} />
            </div>
            <div style={{ position:'absolute', inset:0, animation:'spinOrbit 14s linear infinite' }}>
              <span className="pw-orbit" style={{ top:24, left:54 }}><Icon name="paw" size={20} color="var(--violet)" /></span>
              <span className="pw-orbit" style={{ top:8, right:70 }}><Icon name="heart-fill" size={19} color="#f3aebb" /></span>
              <span className="pw-orbit" style={{ top:120, left:-6 }}><Icon name="star" size={20} color="#c5a92e" /></span>
              <span className="pw-orbit" style={{ bottom:54, right:0 }}><Icon name="leaf" size={20} color="#5aa873" /></span>
              <span className="pw-orbit" style={{ bottom:18, left:48 }}><Icon name="ball" size={20} color="#5b8fc9" /></span>
            </div>
          </div>
        </div>

        <div>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <div style={{ flex:1, height:10, borderRadius:10, background:'#eceaf2', overflow:'hidden' }}>
              <div className="fill-anim" style={{ width:pct+'%', height:'100%', borderRadius:10, background:'linear-gradient(90deg,#d2f24f,#bfe23a)' }} />
            </div>
            <span style={{ fontWeight:900, color:'var(--ink)', fontSize:16 }}>{pct}%</span>
          </div>
          <p style={{ color:'var(--ink-soft)', fontWeight:700, fontSize:13.5, marginTop:10 }}>Analyzing answers</p>
        </div>
      </div>
    </div>
  );
}

/* ============ 07 · PERSONALITY REVEAL ============ */
function Frame07() {
  const nav = useNav();
  const chips = [
    { l:'Calm', i:'moon', bg:'var(--lavender)' },
    { l:'Loyal', i:'heart-fill', bg:'var(--coral)' },
    { l:'Warm', i:'sun', bg:'var(--butter)' },
    { l:'Sensitive', i:'flower', bg:'var(--mint)' },
    { l:'Affectionate', i:'sparkle', bg:'var(--lime-soft)' },
  ];
  return (
    <div className="pw">
      <HeartDoodle style={{ top:64, right:34 }} size={20} />
      <HeartDoodle style={{ top:150, left:26 }} size={16} color="#b6a4f4" />
      <Sparkle style={{ top:120, right:70 }} size={14} />
      <div className="pw-pad" style={{ alignItems:'center', textAlign:'center' }}>
        <p style={{ color:'var(--violet-ink)', fontWeight:800, fontSize:16, marginTop:8, whiteSpace:'nowrap' }}>Your pet is</p>
        <h1 className="pw-title" style={{ fontSize:40, fontWeight:900, color:'var(--violet)', marginTop:2 }}>The Cozy Soul</h1>
        <p className="pw-sub" style={{ color:'#7a68c0', fontSize:15.5, marginTop:8, maxWidth:250 }}>A gentle heart who turns quiet moments into home.</p>

        <div style={{ marginTop:20, position:'relative' }}>
          <Img src={PHOTOS.dogCouch} w={300} h={236} radius={26} pos="50% 45%"
            style={{ boxShadow:'0 16px 36px rgba(40,30,80,.2)' }} />
        </div>

        <div style={{ display:'flex', flexWrap:'wrap', gap:9, justifyContent:'center', marginTop:18, maxWidth:320 }}>
          {chips.map(c => <Chip key={c.l} icon={<Icon name={c.i} size={15} color="var(--ink-2)" />} label={c.l} bg={c.bg} />)}
        </div>

        <div style={{ flex:1 }} />
        <Btn variant="violet" icon="arrow-right" style={{ width:'100%' }} onClick={() => nav.next()}>See details</Btn>
      </div>
    </div>
  );
}

/* ============ 08 · EXPLORE THEIR WORLD ============ */
function Frame08() {
  const nav = useNav();
  const [tab, setTab] = useStateB('home');
  const navs = [['home','home'],['memory','bookmark'],['gallery','image'],['sound','music']];
  return (
    <div className="pw">
      <div className="pw-pad">
        <h1 className="pw-title" style={{ fontSize:25, marginTop:14 }}>Step into their<br/>little world</h1>

        <div style={{ flex:1, display:'flex', gap:14, marginTop:22, minHeight:0 }}>
          <div className="pw-vnav">
            {navs.map(([k,ic]) => (
              <button key={k} className={`pw-vbtn${tab===k?' is-on':''}`} onClick={() => setTab(k)}>
                <Icon name={ic} size={21} />
              </button>
            ))}
          </div>
          <div style={{ flex:1, position:'relative', display:'flex' }}>
            <Img src={PHOTOS.livingRoom} w="100%" h="100%" radius={24} pos="50% 60%"
              style={{ width:'100%', height:'100%', boxShadow:'0 14px 30px rgba(40,30,80,.18)' }} />
            <span className="pw-hot" data-tip="Lorem ipsum cozy corner." tabIndex="0" style={{ top:'14%', left:'18%' }}><Icon name="plus" size={18}/></span>
            <span className="pw-hot pw-hot--left" data-tip="Lorem ipsum sunny window." tabIndex="0" style={{ top:'24%', right:'10%' }}><Icon name="plus" size={18}/></span>
            <span className="pw-hot pw-hot--left" data-tip="Lorem ipsum favorite spot." tabIndex="0" style={{ bottom:'22%', right:'14%' }}><Icon name="plus" size={18}/></span>
            <span className="pw-hot" data-tip="Lorem ipsum nap zone." tabIndex="0" style={{ bottom:'30%', left:'26%' }}><Icon name="plus" size={18}/></span>
          </div>
        </div>

        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:18 }}>
          <Fab onClick={() => nav.back()} />
          <div className="pw-dots">
            {[0,1,2,3,4].map(i => <span key={i} className={`pw-dot${i===0?' is-on':''}`} />)}
          </div>
          <Btn variant="violet" size="sm" icon="arrow-right" style={{ minWidth:128 }} onClick={() => nav.next()}>Next</Btn>
        </div>
      </div>
    </div>
  );
}

/* ============ 09 · PET PROFILE CARD ============ */
function Frame09() {
  const nav = useNav();
  const [note, setNote] = useStateB(true);
  return (
    <div className="pw">
      <Sparkle style={{ top:60, right:30 }} size={16} />
      <div className="pw-pad">
        <h1 className="pw-title" style={{ fontSize:22, marginTop:8 }}>Create your pet&rsquo;s<br/>profile and share it!</h1>

        <div style={{ display:'grid', gridTemplateColumns:'minmax(0,1fr) 134px', gap:14, marginTop:22 }}>
          {/* form */}
          <div style={{ display:'flex', flexDirection:'column', gap:13 }}>
            <Field label="Pet Name">
              <div className="pw-input"><input defaultValue="Milo" /><Icon name="paw" size={16} color="var(--ink-faint)" /></div>
            </Field>
            <Field label="Pet Type">
              <div className="pw-input">
                <select defaultValue="Golden Retriever"><option>Golden Retriever</option><option>Shiba Inu</option><option>Poodle</option></select>
                <Icon name="chevron-down" size={16} color="var(--ink-soft)" />
              </div>
            </Field>
            <Field label="Favorite Thing">
              <div className="pw-input"><input defaultValue="Sunbeams & naps" /><Icon name="sun" size={16} color="var(--ink-faint)" /></div>
            </Field>
            <Field label="Personality">
              <div className="pw-input">
                <select defaultValue="The Cozy Soul"><option>The Cozy Soul</option><option>The Explorer</option><option>The Playful One</option></select>
                <Icon name="chevron-down" size={16} color="var(--ink-soft)" />
              </div>
            </Field>
            <button onClick={() => setNote(!note)} style={{ display:'flex', alignItems:'center', gap:8, background:'none', border:'none', cursor:'pointer', fontFamily:'inherit', padding:0, marginTop:2 }}>
              <span style={{ width:20, height:20, borderRadius:6, background: note?'var(--violet)':'#fff', border:`1.5px solid ${note?'var(--violet)':'var(--line)'}`, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff' }}>
                {note && <Icon name="check" size={12} stroke={3} />}
              </span>
              <span style={{ fontWeight:700, fontSize:13.5, color:'var(--ink-2)', whiteSpace:'nowrap' }}>Add a short note</span>
            </button>
          </div>

          {/* share card */}
          <div style={{ position:'relative', borderRadius:22, padding:'16px 14px',
            background:'linear-gradient(165deg,#7c5cf5 0%,#6948e6 55%,#583ad6 100%)',
            color:'#fff', boxShadow:'0 14px 30px rgba(108,76,241,.35)', overflow:'hidden' }}>
            <Sparkle style={{ top:14, right:14 }} size={12} color="rgba(255,255,255,.8)" />
            <div style={{ display:'flex', alignItems:'center', gap:6, fontWeight:900, fontSize:20 }}>Milo <Icon name="heart-fill" size={16} color="rgba(255,255,255,.85)" /></div>
            <div style={{ fontWeight:700, fontSize:13, opacity:.92 }}>The Cozy Soul</div>
            <div style={{ fontSize:11.5, opacity:.8, marginTop:6, lineHeight:1.3 }}>Quiet moments become home.</div>
            <div style={{ display:'flex', justifyContent:'center', marginTop:10 }}>
              <Img src={PHOTOS.golden} w={92} h={92} shape="circle" pos="50% 35%"
                style={{ border:'3px solid rgba(255,255,255,.7)' }} />
            </div>
          </div>
        </div>

        <div style={{ flex:1 }} />
        <Btn variant="lime" icon="download" style={{ width:'100%' }} onClick={() => nav.next()}>Download Card</Btn>
        <div style={{ display:'flex', gap:12, marginTop:12 }}>
          <Btn variant="ghost" size="sm" icon="share" style={{ flex:1 }}>Share</Btn>
          <button className="pw-fab"><Icon name="heart" size={22} color="var(--coral-deep)" /></button>
        </div>
      </div>
    </div>
  );
}

/* ============ 10 · BRAND CLOSING ============ */
function Frame10() {
  const nav = useNav();
  // bubbles positioned within the scene container (absolute, full bounds)
  const bubbles = [
    { id:'b-beach',    img:PHOTOS.beachDog,    s:82, pos:{ top:4,   left:'50%', marginLeft:-41 } },
    { id:'b-living',   img:PHOTOS.livingRoom,  s:74, pos:{ top:64,  left:6 } },
    { id:'b-mountain', img:PHOTOS.mountainDog, s:76, pos:{ top:74,  right:4 } },
    { id:'b-royal',    img:PHOTOS.catRegal,    s:70, pos:{ bottom:6, left:18 } },
    { id:'b-cozy',     img:PHOTOS.dogCouch,    s:70, pos:{ bottom:6, right:18 } },
  ];
  return (
    <div className="pw">
      <Sparkle style={{ top:54, left:30 }} size={16} />
      <HeartDoodle style={{ top:50, right:26 }} size={18} />

      {/* header */}
      <div style={{ position:'absolute', top:36, left:34, right:34, textAlign:'center' }}>
        <h1 className="pw-title" style={{ fontSize:23, fontWeight:800, color:'var(--violet)', lineHeight:1.18 }}>
          Every pet brings a little<br/>world into ours.</h1>
        <p className="pw-sub" style={{ fontSize:13.5, marginTop:8, color:'#8478b8' }}>Thanks for discovering theirs.</p>
      </div>

      {/* scene */}
      <div style={{ position:'absolute', top:160, left:26, right:26, bottom:236 }}>
        {bubbles.map(b => (
          <div key={b.id} style={{ position:'absolute', zIndex:2, ...b.pos }}>
            <Img src={b.img} w={b.s} h={b.s} shape="circle" style={{ border:'3px solid #fff', boxShadow:'0 8px 18px rgba(40,30,80,.18)' }} />
          </div>
        ))}
        <div style={{ position:'absolute', left:'50%', top:'50%', transform:'translate(-50%,-50%)', zIndex:3 }}>
          <Img src={PHOTOS.golden} w={166} h={166} shape="circle" pos="50% 35%"
            style={{ border:'5px solid #fff', boxShadow:'0 14px 32px rgba(40,30,80,.24)' }} />
        </div>
      </div>

      {/* brand band */}
      <div style={{ position:'absolute', left:0, right:0, bottom:0, height:226 }}>
        <svg viewBox="0 0 390 226" width="100%" height="226" style={{ position:'absolute', inset:0 }} preserveAspectRatio="none">
          <path d="M0 52 C 90 14, 150 14, 200 36 C 260 62, 320 36, 390 42 L390 226 L0 226 Z" fill="#e7dffb"/>
        </svg>
        <div style={{ position:'absolute', left:0, right:0, top:46, textAlign:'center' }}>
          <Btn variant="violet" size="sm" iconLeft="arrow-right" style={{ minWidth:206 }} onClick={() => nav.reset()}>Start another quiz</Btn>
        </div>
        <div style={{ position:'absolute', left:0, right:0, bottom:26, textAlign:'center' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, fontWeight:900, fontSize:18, color:'var(--violet-ink)', whiteSpace:'nowrap' }}>
            Pet Personality World <Icon name="paw" size={17} color="var(--violet)" />
          </div>
          <p style={{ fontWeight:800, fontSize:13, color:'#7e72b4', marginTop:6 }}>Discover. Understand. Cherish.</p>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Frame06, Frame07, Frame08, Frame09, Frame10 });
