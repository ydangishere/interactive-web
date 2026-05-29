/* screens-a.jsx — frames 01–05 */

const { useState: useStateA, useEffect: useEffectA, useRef: useRefA } = React;

/* ============ 01 · INTRO HERO ============ */
function Frame01() {
  const nav = useNav();
  const [ctaGo, setCtaGo] = useStateA(false);
  const [scrollY, setScrollY] = useStateA(0);
  const [reduceMotion, setReduceMotion] = useStateA(false);
  const scrollRef = useRefA(null);
  const startQuiz = () => {
    setCtaGo(true);
    setTimeout(() => nav.next(), 200);
  };
  useEffectA(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const set = () => setReduceMotion(mq.matches);
    set();
    mq.addEventListener('change', set);
    return () => mq.removeEventListener('change', set);
  }, []);
  useEffectA(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => setScrollY(el.scrollTop);
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);
  const py = (n) => (reduceMotion ? 0 : scrollY * n);
  const trackMagic = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--magic-x', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--magic-y', `${e.clientY - r.top}px`);
  };
  const magicText = (text) => (
    <React.Fragment>
      {text.split('').map((ch, i) => (
        <span key={i} className="pw-hero-char" style={{ '--char-i': i }}>{ch}</span>
      ))}
      <span className="pw-hero-magic" />
    </React.Fragment>
  );
  const steps = [
    { n:'1', title:'Choose your pet', sub:'Pick the companion you want to explore.', ic:'paw', bg:'var(--lime-soft)' },
    { n:'2', title:'Answer 3 quick questions', sub:'Playful prompts reveal their little habits.', ic:'sparkle', bg:'var(--lavender)' },
    { n:'3', title:'Reveal their world', sub:'See personality, scenes, and a shareable card.', ic:'heart-fill', bg:'var(--coral)' },
  ];

  return (
    <div className="pw pw-hero">
      <div className="pw-hero-bg" style={{ transform:`translateY(${py(-0.42)}px)` }}>
        <div className="pw-glow pw-hero-glow pw-hero-glow--lime" style={{ width:200, height:200, top:-50, right:-40, background:'rgba(210,242,79,.5)' }} />
        <div className="pw-glow pw-hero-glow pw-hero-glow--lav" style={{ width:240, height:240, top:120, left:-90, background:'rgba(205,192,247,.55)' }} />
        <Squiggle className="pw-hero-doodle pw-hero-doodle--sq" style={{ top:150, right:18 }} />
        <HeartDoodle className="pw-hero-doodle anim-twinkle" style={{ top:96, right:70, animationDelay:'0.3s' }} size={20} />
        <Sparkle className="pw-hero-doodle anim-twinkle" style={{ top:118, right:140, animationDelay:'0.8s' }} />
        <Sparkle className="pw-hero-doodle anim-twinkle" style={{ top:430, left:30, animationDelay:'1.1s' }} size={13} />
        <Sparkle className="pw-hero-doodle anim-twinkle" style={{ bottom:240, left:50, animationDelay:'0.5s' }} size={20} color="#cfe26a" />
      </div>

      <div className="pw-hero-scroll" ref={scrollRef}>
        <section className="pw-hero-fold">
          <div className="pw-rel pw-hero-intro" style={{ marginTop:18, transform:`translateY(${py(-0.12)}px)` }}>
            <h1 className="pw-title pw-hero-title" style={{ fontSize:44, fontWeight:900, letterSpacing:'-.02em' }}>
              <span className="pw-hero-title__line" onMouseMove={trackMagic} style={{ animationDelay:'0.06s' }}>{magicText('Pet')}</span>
              <span className="pw-hero-title__line pw-hero-title__line--row" onMouseMove={trackMagic} style={{ animationDelay:'0.16s' }}>{magicText('Personality')}</span>
              <span className="pw-hero-title__line pw-hero-title__line--row" onMouseMove={trackMagic} style={{ animationDelay:'0.26s' }}>{magicText('World')}</span>
            </h1>
            <p className="pw-sub pw-hero-sub" onMouseMove={trackMagic} style={{ fontSize:16, marginTop:16, maxWidth:230 }}>Discover the little world behind your pet&rsquo;s habits.<span className="pw-hero-magic" /></p>
          </div>

          <div className="pw-hero-stage" style={{ transform:`translateY(${py(-0.26)}px)` }}>
            <div className="pw-hero-photo">
              <Img src={PHOTOS.golden} w={330} h={300} radius={26} pos="50% 35%"
                style={{ boxShadow:'0 16px 38px rgba(40,30,80,.18)' }} />
            </div>
            <span className="pw-hero-badge pw-hero-badge--heart" style={{ top:18, left:30, transform:`translateY(${py(-0.18)}px)` }}>
              <Icon name="heart-fill" size={22} color="#f3aebb" />
            </span>
            <span className="pw-hero-badge pw-hero-badge--paw" style={{ bottom:26, right:18, transform:`translateY(${py(-0.14)}px)` }}>
              <Icon name="paw" size={22} color="var(--violet)" />
            </span>
            <span className="pw-hero-badge pw-hero-badge--star" style={{ top:'48%', left:14, transform:`translateY(${py(-0.2)}px)` }}>
              <Icon name="star" size={20} color="#5a5e16" />
            </span>
          </div>

          <div className="pw-rel pw-hero-cta" style={{ marginTop:18, transform:`translateY(${py(-0.08)}px)` }}>
            <div className={'pw-hero-btn-wrap' + (ctaGo ? ' is-go' : '')}>
              <Btn variant="lime" icon="arrow-right" style={{ width:'100%' }} onClick={startQuiz}>Start Quiz</Btn>
            </div>
            <div className="pw-hero-scroll-hint">
              Scroll down to see how it works
              <span className="pw-hero-scroll-arrow"><Icon name="arrow-down" size={16} /></span>
            </div>
          </div>
        </section>

        <section className="pw-hero-below" style={{ transform:`translateY(${py(-0.016)}px)` }}>
          <p className="pw-hero-below__eyebrow">How it works</p>
          <h2 className="pw-hero-below__title">A tiny quiz,<br/>a whole pet world</h2>
          <div className="pw-hero-steps">
            {steps.map((s) => (
              <div key={s.n} className="pw-hero-step" style={{ background:s.bg }}>
                <span className="pw-hero-step__n">{s.n}</span>
                <div className="pw-hero-step__icon"><Icon name={s.ic} size={24} color="var(--ink-2)" /></div>
                <div>
                  <div className="pw-hero-step__title">{s.title}</div>
                  <div className="pw-hero-step__sub">{s.sub}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="pw-hero-below-cta">
            <Btn variant="violet" icon="arrow-right" style={{ width:'100%' }} onClick={startQuiz}>Start Quiz</Btn>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ============ 02 · CHOOSE YOUR PET ============ */
function Frame02() {
  const nav = useNav();
  const [sel, setSel] = useQuiz('pet', 'Dog');
  const pets = [
    { k:'Dog', img:PHOTOS.golden, bg:'var(--lime-soft)', span:2 },
    { k:'Cat', img:PHOTOS.catTabby, bg:'var(--lavender)', span:2 },
    { k:'Bird', img:PHOTOS.birdParrot, bg:'var(--sky)', span:2 },
    { k:'Rabbit', img:PHOTOS.rabbit, bg:'var(--coral)', span:3 },
    { k:'Other', iconName:'paw', bg:'var(--cream)', span:3 },
  ];
  return (
    <div className="pw">
      <div className="pw-glow" style={{ width:200, height:200, top:-60, left:-50, background:'rgba(205,192,247,.4)' }} />
      <HeartDoodle style={{ top:64, right:30 }} size={22} />
      <div className="pw-pad">
        <h1 className="pw-title" style={{ fontSize:30, marginTop:14 }}>Who is your<br/>little companion?</h1>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:12, marginTop:30 }}>
          {pets.map(p => (
            <PetCard key={p.k} img={p.img} iconName={p.iconName} label={p.k} bg={p.bg}
              selected={sel===p.k} onClick={() => setSel(p.k)}
              style={{ gridColumn:`span ${p.span}` }} />
          ))}
        </div>
        <div style={{ flex:1 }} />
        <button onClick={() => sel && nav.next()} style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:10, color:'var(--ink-soft)', fontWeight:800, fontSize:15, background:'none', border:'none', fontFamily:'inherit', cursor:sel?'pointer':'default', width:'100%' }}>
          {sel ? 'Continue' : 'Pick one to continue'}
          <span style={{ width:34, height:34, borderRadius:'50%', background: sel?'var(--violet)':'#fff', color: sel?'#fff':'var(--ink)', border:'1.5px solid var(--line)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'var(--shadow-soft)', transition:'.2s' }}>
            <Icon name="arrow-right" size={16} />
          </span>
        </button>
      </div>
    </div>
  );
}

/* shared quiz scaffold */
function QuizFrame({ active, title, doodle, children, finish }) {
  const nav = useNav();
  return (
    <div className="pw">
      <HeartDoodle style={{ top:150, right:26 }} size={20} />
      {doodle}
      <div className="pw-pad">
        <div style={{ marginTop:6, padding:'0 4px' }}><Steps active={active} /></div>
        <h1 className="pw-title" style={{ fontSize:27, marginTop:26 }}>{title}</h1>
        <div style={{ marginTop:24, display:'flex', flexDirection:'column', gap:13 }}>{children}</div>
        <div style={{ flex:1 }} />
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <Fab onClick={() => nav.back()} />
          {finish
            ? <Btn variant="violet" size="sm" icon="check" style={{ minWidth:150 }} onClick={() => nav.next()}>Finish</Btn>
            : <Btn variant="violet" size="sm" icon="arrow-right" style={{ minWidth:150 }} onClick={() => nav.next()}>Next</Btn>}
        </div>
      </div>
    </div>
  );
}

/* ============ 03 · QUESTION 1 ============ */
function Frame03() {
  const [sel, setSel] = useQuiz('q1', null);
  const opts = [
    { k:'Explore outside', ic:'compass', bg:'var(--sky)' },
    { k:'Stay close to you', ic:'heart', bg:'var(--coral)' },
    { k:'Play all day', ic:'ball', bg:'var(--lime-soft)' },
    { k:'Eat tasty things', ic:'bone', bg:'var(--mint)' },
  ];
  return (
    <QuizFrame active={1} title={<>What makes your<br/>pet happiest?</>}>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:13 }}>
        {opts.map(o => (
          <Opt key={o.k} icon={<Icon name={o.ic} size={26} color="var(--ink-2)" />} bg={o.bg} label={o.k} selected={sel===o.k} onClick={() => setSel(o.k)} />
        ))}
      </div>
      <Opt icon={<Icon name="moon" size={26} color="var(--ink-2)" />} bg="var(--lavender)" label="Nap in cozy spots" selected={sel==='Nap in cozy spots'} onClick={() => setSel('Nap in cozy spots')} />
    </QuizFrame>
  );
}

/* ============ 04 · QUESTION 2 ============ */
function Frame04() {
  const [sel, setSel] = useQuiz('q2', 'Cuddles beside you');
  const opts = [
    { k:'Follows you everywhere', ic:'paw', bg:'var(--cream)' },
    { k:'Brings you their toys', ic:'gift', bg:'var(--mint)' },
    { k:'Cuddles beside you', ic:'heart', bg:'var(--lavender)' },
    { k:'Looks at you with those eyes', ic:'eye', bg:'var(--sky)' },
  ];
  return (
    <QuizFrame active={2} title={<>How does your pet<br/>show love?</>}>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:13 }}>
        {opts.map(o => (
          <Opt key={o.k} icon={<Icon name={o.ic} size={26} color="var(--ink-2)" />} bg={o.bg} label={o.k} selected={sel===o.k} onClick={() => setSel(o.k)} />
        ))}
      </div>
      <Opt icon={<Icon name="smile" size={26} color="var(--ink-2)" />} bg="var(--butter)" label="Greets you excitedly" selected={sel==='Greets you excitedly'} onClick={() => setSel('Greets you excitedly')} />
    </QuizFrame>
  );
}

/* ============ 05 · QUESTION 3 ============ */
function Frame05() {
  const [sel, setSel] = useQuiz('q3', null);
  const opts = [
    { k:'In the park', ic:'tree', bg:'var(--mint)' },
    { k:'At home', ic:'home', bg:'var(--coral)' },
    { k:'On a trip', ic:'car', bg:'var(--sky)' },
    { k:'On a nature trail', ic:'mountain', bg:'var(--lime-soft)' },
    { k:'At the beach', ic:'beach', bg:'var(--butter)' },
    { k:'In a cozy room', ic:'sofa', bg:'var(--lavender)' },
  ];
  return (
    <QuizFrame active={3} finish title={<>Where do they feel<br/>most alive?</>}
      doodle={<Sparkle style={{ top:150, right:54 }} size={20} color="#cfe26a" />}>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:13 }}>
        {opts.map(o => (
          <OptV key={o.k} icon={<Icon name={o.ic} size={30} color="var(--ink-2)" />} bg={o.bg} label={o.k} selected={sel===o.k} onClick={() => setSel(o.k)} />
        ))}
      </div>
    </QuizFrame>
  );
}

Object.assign(window, { Frame01, Frame02, Frame03, Frame04, Frame05 });
