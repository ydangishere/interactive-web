/* app-shell.jsx — interactive animated mobile prototype shell */

const { useState: useStateApp, useEffect: useEffectApp, useRef: useRefApp } = React;

const SCREENS = [Frame01, Frame02, Frame03, Frame04, Frame05, Frame06, Frame07, Frame08, Frame09, Frame10];

function StatusBar() {
  return (
    <div className="phone__status">
      <span>9:41</span>
      <span className="dots">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="7" width="3" height="5" rx="1"/><rect x="5" y="4" width="3" height="8" rx="1"/><rect x="10" y="1.5" width="3" height="10.5" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1" opacity="0.35"/></svg>
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M1 5.5C4.5 2 12.5 2 16 5.5M3.3 7.8c2.6-2.4 7.8-2.4 10.4 0M6 10.2c1.4-1.2 3.6-1.2 5 0" strokeLinecap="round"/></svg>
        <svg width="26" height="13" viewBox="0 0 26 13" fill="none"><rect x="1" y="1" width="21" height="11" rx="3" stroke="currentColor" strokeWidth="1.3" opacity="0.5"/><rect x="3" y="3" width="15" height="7" rx="1.5" fill="currentColor"/><rect x="23.5" y="4.5" width="1.6" height="4" rx="0.8" fill="currentColor" opacity="0.5"/></svg>
      </span>
    </div>
  );
}

function PhoneApp() {
  const [route, setRoute] = useStateApp(0);
  const [anim, setAnim] = useStateApp(null);     // { from, to, dir }
  const [answers, setAnswers] = useStateApp({});
  const busy = useRefApp(false);

  const go = (to) => {
    if (busy.current || to === route || to < 0 || to >= SCREENS.length) return;
    busy.current = true;
    setAnim({ from: route, to, dir: to > route ? 1 : -1 });
    setTimeout(() => {
      setRoute(to);
      setAnim(null);
      busy.current = false;
    }, 440);
  };
  const nav = {
    inApp: true,
    get route() { return route; },
    next: () => go(route + 1),
    back: () => go(route - 1),
    go,
    reset: () => { setAnswers({}); go(0); },
  };
  const quiz = { answers, setAnswer: (k, v) => setAnswers(a => ({ ...a, [k]: v })) };

  const renderScreen = (idx) => {
    const S = SCREENS[idx];
    return (
      <NavContext.Provider value={nav}>
        <QuizContext.Provider value={quiz}>
          <S />
        </QuizContext.Provider>
      </NavContext.Provider>
    );
  };

  return (
    <div className="app-stage">
      <div className="phone">
        <div className="phone__screen">
          <div className="phone__notch" />
          <StatusBar />
          <div className="router">
            {anim ? (
              <React.Fragment>
                <div className={'router__layer ' + (anim.dir > 0 ? 'lyr-out-left' : 'lyr-out-right')}>
                  {renderScreen(anim.from)}
                </div>
                <div className={'router__layer screen-enter ' + (anim.dir > 0 ? 'lyr-in-right' : 'lyr-in-left')}>
                  {renderScreen(anim.to)}
                </div>
              </React.Fragment>
            ) : (
              <div className="router__layer screen-enter" key={route}>
                {renderScreen(route)}
              </div>
            )}
          </div>
          <div className="phone__home" />
        </div>
      </div>
    </div>
  );
}

window.PhoneApp = PhoneApp;
