/* ui-kit.jsx — shared components for Pet Personality World
   Exposes components on window so the screen files can use them. */

const { useState, useEffect, useRef, useContext, createContext } = React;

/* ---- navigation + quiz state shared via context ----
   When no provider is present (e.g. the static canvas), useNav is a
   no-op and useQuiz falls back to local component state. */
const NavContext = createContext(null);
const QuizContext = createContext(null);
function useNav() {
  return useContext(NavContext) || { next(){}, back(){}, go(){}, reset(){}, route:0, inApp:false };
}
function useQuiz(key, initial) {
  const ctx = useContext(QuizContext);
  const [local, setLocal] = useState(initial);
  if (ctx) {
    const val = ctx.answers[key] !== undefined ? ctx.answers[key] : initial;
    return [val, (v) => ctx.setAnswer(key, v)];
  }
  return [local, setLocal];
}

/* ---------- icons ---------- */
const SOLID = new Set(['paw','star','flower','sparkle','heart-fill']);
function Icon({ name, size = 22, stroke = 2.2, color = 'currentColor' }) {
  const solid = SOLID.has(name);
  const p = { width: size, height: size, viewBox: '0 0 24 24',
    fill: solid ? color : 'none',
    stroke: solid ? 'none' : color, strokeWidth: stroke, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'arrow-right': return <svg {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
    case 'arrow-left':  return <svg {...p}><path d="M19 12H5M11 18l-6-6 6-6"/></svg>;
    case 'arrow-down':  return <svg {...p}><path d="M12 5v14M6 13l6 6 6-6"/></svg>;
    case 'check':       return <svg {...p}><path d="M5 12.5l4.5 4.5L19 6.5"/></svg>;
    case 'chevron-down':return <svg {...p}><path d="M6 9l6 6 6-6"/></svg>;
    case 'download':    return <svg {...p}><path d="M12 4v11M7.5 10.5L12 15l4.5-4.5M5 19h14"/></svg>;
    case 'share':       return <svg {...p}><path d="M5 12v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6M12 15V4M8 7.5L12 3.5l4 4"/></svg>;
    case 'bookmark':    return <svg {...p}><path d="M7 4h10a1 1 0 0 1 1 1v15l-6-4-6 4V5a1 1 0 0 1 1-1z"/></svg>;
    case 'image':       return <svg {...p}><rect x="4" y="5" width="16" height="14" rx="2.5"/><circle cx="9" cy="10" r="1.6"/><path d="M5 17l4-4 3 3 3-3 4 4"/></svg>;
    case 'music':       return <svg {...p}><path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/></svg>;
    case 'home':        return <svg {...p}><path d="M4 11l8-7 8 7M6 10v9h12v-9"/></svg>;
    case 'plus':        return <svg {...p}><path d="M12 6v12M6 12h12"/></svg>;
    case 'heart':       return <svg {...p}><path d="M12 20s-7-4.6-9.2-9C1.3 7.3 3 4 6.4 4 8.4 4 10 5.3 12 7.6 14 5.3 15.6 4 17.6 4 21 4 22.7 7.3 21.2 11 19 15.4 12 20 12 20z"/></svg>;
    case 'heart-fill':  return <svg {...p}><path d="M12 20s-7-4.6-9.2-9C1.3 7.3 3 4 6.4 4 8.4 4 10 5.3 12 7.6 14 5.3 15.6 4 17.6 4 21 4 22.7 7.3 21.2 11 19 15.4 12 20 12 20z"/></svg>;
    case 'compass':     return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2.2 5.3-5.3 2.2 2.2-5.3z"/></svg>;
    case 'ball':        return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M4 9c5 2 11 2 16 0M4 15c5-2 11-2 16 0M12 3v18"/></svg>;
    case 'bone':        return <svg {...p}><path d="M7.2 7.8a2.1 2.1 0 1 0-1.4 3.4l3.2 3.2 3-3-3.2-3.2a2.1 2.1 0 0 0-1.6-.4zM16.8 16.2a2.1 2.1 0 1 0 1.4-3.4"/><path d="M9 14.4l5.4-5.4"/></svg>;
    case 'moon':        return <svg {...p}><path d="M20.5 14.5A8 8 0 1 1 9.5 3.5a6.3 6.3 0 0 0 11 11z"/></svg>;
    case 'gift':        return <svg {...p}><rect x="4" y="9" width="16" height="11" rx="1.5"/><path d="M4 13h16M12 9v11M12 9C12 6.5 10.5 5 8.7 5.4 7 5.8 7.4 8.6 12 9zM12 9c0-2.5 1.5-4 3.3-3.6C17 5.8 16.6 8.6 12 9z"/></svg>;
    case 'eye':         return <svg {...p}><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>;
    case 'smile':       return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M8.5 14.5s1.3 1.8 3.5 1.8 3.5-1.8 3.5-1.8M9 9.5h.01M15 9.5h.01"/></svg>;
    case 'sun':         return <svg {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8"/></svg>;
    case 'tree':        return <svg {...p}><path d="M12 3l5 7h-3l3.5 6H6.5L10 10H7z"/><path d="M12 16v5"/></svg>;
    case 'car':         return <svg {...p}><path d="M4 13l1.8-4.5A2 2 0 0 1 7.7 7h8.6a2 2 0 0 1 1.9 1.5L20 13v5h-2.2M6.2 18H4v-5"/><circle cx="7.5" cy="18" r="1.8"/><circle cx="16.5" cy="18" r="1.8"/></svg>;
    case 'mountain':    return <svg {...p}><path d="M3 19l6-11 3.5 6.2L15 10l6 9z"/></svg>;
    case 'beach':       return <svg {...p}><circle cx="12" cy="8" r="3.2"/><path d="M2.5 17c1.8 0 1.8 1.8 3.7 1.8S8 17 9.8 17s1.9 1.8 3.7 1.8S15.4 17 17.2 17s1.9 1.8 3.7 1.8"/></svg>;
    case 'sofa':        return <svg {...p}><path d="M5 11V8.5A2.5 2.5 0 0 1 7.5 6h9A2.5 2.5 0 0 1 19 8.5V11"/><path d="M3.5 11.5A2 2 0 0 1 5.5 13.5V16h13v-2.5a2 2 0 0 1 4 0V19H2.5v-5.5a2 2 0 0 1 1-2z"/></svg>;
    case 'leaf':        return <svg {...p}><path d="M5 19C5 11 11 5 19 5c0 8-6 14-14 14z"/><path d="M5 19c4-4 8-8 12-12"/></svg>;
    case 'paw':         return <svg {...p}><ellipse cx="12" cy="15.5" rx="4.2" ry="3.4"/><circle cx="6.6" cy="11.2" r="1.9"/><circle cx="10" cy="7.6" r="1.9"/><circle cx="14" cy="7.6" r="1.9"/><circle cx="17.4" cy="11.2" r="1.9"/></svg>;
    case 'star':        return <svg {...p}><path d="M12 3l2.6 5.6 6 .8-4.4 4.1 1.1 6L12 16.8 6.7 19.5l1.1-6L3.4 9.4l6-.8z"/></svg>;
    case 'flower':      return <svg {...p}><circle cx="12" cy="12" r="2.4"/><path d="M12 9.6c0-2.6-1.4-3.8 0-5.6 1.4 1.8 0 3 0 5.6zM12 14.4c0 2.6 1.4 3.8 0 5.6-1.4-1.8 0-3 0-5.6zM9.6 12c-2.6 0-3.8-1.4-5.6 0 1.8 1.4 3 0 5.6 0zM14.4 12c2.6 0 3.8 1.4 5.6 0-1.8-1.4-3 0-5.6 0z"/></svg>;
    case 'sparkle':     return <svg {...p}><path d="M12 2c.6 4.7 2.7 6.8 7.4 7.4-4.7.6-6.8 2.7-7.4 7.4-.6-4.7-2.7-6.8-7.4-7.4C9.3 8.8 11.4 6.7 12 2z"/></svg>;
    default: return null;
  }
}

/* unsplash photo helper + curated concept photo map */
const U = (id, w = 700) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;
const PHOTOS = {
  golden:      U('1552053831-71594a27632d'),
  catTabby:    U('1518791841217-8f162f1e1131'),
  birdParrot:  U('1552728089-57bdde30beb3'),
  rabbit:      U('1585110396000-c9ffd4e4b308'),
  dogCouch:    U('1583511655857-d19b40a7a54e'),
  livingRoom:  'assets/living-room-dog.png',
  beachDog:    U('1530281700549-e82e7bf110d6'),
  mountainDog: U('1477884213360-7e9d7dcc1e48'),
  catRegal:    U('1495360010541-f48722b34f7d'),
  heroHug:     U('1450778869180-41d0601e046e', 900),
  dogOwner2:   U('1548199973-03cce0bbc87b'),
};

/* photo fill — drops a real image cropped to a shaped container */
function Img({ src, w, h, shape = 'rounded', radius = 18, pos = '50% 50%', style }) {
  const br = shape === 'circle' ? '50%' : shape === 'pill' ? '999px' : `${radius}px`;
  return (
    <div style={{ width: w, height: h, borderRadius: br, overflow: 'hidden',
      background: '#e7e1f3', ...style }}>
      <img src={src} alt="" loading="lazy" referrerPolicy="no-referrer"
        style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:pos, display:'block' }} />
    </div>
  );
}

/* small decorations */
function HeartDoodle({ size = 22, color = '#8a6cf2', style, className }) {
  return <svg className={'pw-doodle' + (className ? ' ' + className : '')} style={style} width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="1.6"><path d="M12 20s-7-4.6-9.2-9C1.3 7.3 3 4 6.4 4 8.4 4 10 5.3 12 7.6 14 5.3 15.6 4 17.6 4 21 4 22.7 7.3 21.2 11 19 15.4 12 20 12 20z"/></svg>;
}
function Sparkle({ size = 16, color = '#b6a4f4', style, className }) {
  return <svg className={'pw-doodle' + (className ? ' ' + className : '')} style={style} width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2c.6 4.7 2.7 6.8 7.4 7.4-4.7.6-6.8 2.7-7.4 7.4-.6-4.7-2.7-6.8-7.4-7.4C9.3 8.8 11.4 6.7 12 2z"/></svg>;
}
function Squiggle({ style, color = '#c9c3e0', className }) {
  return <svg className={'pw-doodle' + (className ? ' ' + className : '')} style={style} width="90" height="70" viewBox="0 0 90 70" fill="none"
    stroke={color} strokeWidth="2" strokeLinecap="round">
    <path d="M5 40c20-30 40 20 60-5 8-10 18-8 20 2"/></svg>;
}

/* ---------- buttons ---------- */
function Btn({ variant = 'violet', size, icon, iconLeft, children, style, ...rest }) {
  const cls = `pw-btn pw-btn--${variant}${size === 'sm' ? ' pw-btn--sm' : ''}`;
  return (
    <button className={cls} style={style} {...rest}>
      {iconLeft && <Icon name={iconLeft} size={20} />}
      {children}
      {icon && <Icon name={icon} size={20} />}
    </button>
  );
}
function Fab({ dir = 'arrow-left', ...rest }) {
  return <button className="pw-fab" {...rest}><Icon name={dir} size={22} /></button>;
}

/* ---------- quiz progress ---------- */
function Steps({ active = 1 }) {
  // 3 steps
  return (
    <div className="pw-steps">
      {[1,2,3].map((n,i) => (
        <React.Fragment key={n}>
          {i>0 && <div className={`pw-seg${active>=n ? ' is-done':''}`} />}
          <div className={`pw-node${active===n?' is-active': active>n?' is-done':''}`} />
        </React.Fragment>
      ))}
    </div>
  );
}

/* ---------- option cards ---------- */
function Opt({ icon, bg, label, selected, onClick }) {
  return (
    <button className={`pw-opt${selected?' is-sel':''}`} onClick={onClick} style={{ position:'relative' }}>
      <span className="pw-opt__ic" style={{ background: bg }}>{icon}</span>
      <span className="pw-opt__lbl">{label}</span>
      {selected && <span className="pw-check"><Icon name="check" size={13} stroke={3}/></span>}
    </button>
  );
}
function OptV({ icon, bg, label, selected, onClick }) {
  return (
    <button className={`pw-optv${selected?' is-sel':''}`} onClick={onClick} style={{ position:'relative' }}>
      <span className="pw-optv__ic" style={{ background: bg }}>{icon}</span>
      <span className="pw-optv__lbl">{label}</span>
      {selected && <span className="pw-check"><Icon name="check" size={13} stroke={3}/></span>}
    </button>
  );
}

/* ---------- pet card ---------- */
function PetCard({ img, iconName, label, bg, selected, onClick, style }) {
  return (
    <button className={`pw-petcard${selected?' is-sel':''}`} onClick={onClick} style={{ background: bg, ...style }}>
      {selected && <span className="pw-check"><Icon name="check" size={13} stroke={3}/></span>}
      {img
        ? <Img src={img} w={62} h={62} shape="circle" style={{ boxShadow:'0 6px 14px rgba(40,30,80,.18)' }} />
        : <span style={{ width:62, height:62, borderRadius:'50%', background:'rgba(255,255,255,.7)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 6px 14px rgba(40,30,80,.12)' }}><Icon name={iconName} size={30} color="var(--violet)" /></span>}
      <span className="pw-petcard__lbl">{label}</span>
    </button>
  );
}

/* ---------- trait chip ---------- */
function Chip({ icon, label, bg }) {
  return <span className="pw-chip" style={{ background: bg }}>{icon && <span>{icon}</span>}{label}</span>;
}

/* ---------- form field ---------- */
function Field({ label, children }) {
  return (
    <div className="pw-field">
      <span className="pw-field__lbl">{label}</span>
      {children}
    </div>
  );
}

/* ---------- image slot helper ---------- */
function Slot({ id, w, h, shape = 'rounded', radius = 18, mask, bg, placeholder, style }) {
  const br = mask ? undefined
    : shape === 'circle' ? '50%'
    : shape === 'pill' ? '999px'
    : `${radius}px`;
  const s = { width: w, height: h, display:'block', overflow:'hidden',
    background: bg || 'linear-gradient(150deg,#ece8fb,#e6def8)',
    borderRadius: br, clipPath: mask || undefined,
    ...style };
  const props = { id, shape, placeholder: placeholder || 'Drop a render', style: s };
  if (mask) props.mask = mask; else props.radius = String(radius);
  return React.createElement('image-slot', props);
}

/* ---------- emoji illustration scene ----------
   A soft gradient bubble holding a big "hero" emoji plus optional
   accessory props placed around it. Looks like a 3D-sticker scene,
   and stays fully editable. */
function Scene({ w, h, shape = 'rounded', radius = 24, bg, hero, heroSize = 96, floor, items = [], glow, style }) {
  const br = shape === 'circle' ? '50%' : shape === 'pill' ? '999px' : `${radius}px`;
  return (
    <div style={{ position:'relative', width:w, height:h, borderRadius:br, overflow:'hidden',
      background: bg || 'radial-gradient(120% 100% at 50% 18%, #f1ecfd 0%, #e0d4f7 65%, #cdbcf2 100%)',
      boxShadow:'inset 0 -22px 44px rgba(150,120,220,.16)', ...style }}>
      {glow && <div style={{ position:'absolute', width:'70%', height:'55%', left:'15%', top:'14%',
        borderRadius:'50%', background:glow, filter:'blur(26px)' }} />}
      {floor && <div style={{ position:'absolute', left:0, right:0, bottom:0, height:'34%',
        background:floor, borderRadius:'0 0 '+br+' '+br }} />}
      {items.map((it, i) => (
        <span key={i} style={{ position:'absolute', lineHeight:1,
          fontSize:(it.s||30), filter:'drop-shadow(0 5px 7px rgba(40,30,80,.16))',
          transform:it.r?`rotate(${it.r}deg)`:undefined, ...it.at }}>{it.e}</span>
      ))}
      {hero && (
        <span style={{ position:'absolute', left:'50%', bottom: floor?'18%':'50%',
          transform:`translate(-50%, ${floor?'0':'50%'})`, fontSize:heroSize, lineHeight:1,
          filter:'drop-shadow(0 12px 14px rgba(40,30,80,.22))' }}>{hero}</span>
      )}
    </div>
  );
}

Object.assign(window, {
  Icon, HeartDoodle, Sparkle, Squiggle, Img, PHOTOS,
  Btn, Fab, Steps, Opt, OptV, PetCard, Chip, Field, Slot, Scene,
  NavContext, QuizContext, useNav, useQuiz,
});
