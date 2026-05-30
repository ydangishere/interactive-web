import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.dirname(fileURLToPath(import.meta.url));
const mainPath = path.join(root, 'Jaguar Dark Heritage.html');
const main = fs.readFileSync(mainPath, 'utf8');

const shellStart = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<title>Jaguar · {{TITLE}}</title>
<link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="device">
  <div class="topbar" id="topbar"></div>

  <header class="header" id="header">
    <button class="menu-btn" id="openMenu" aria-label="Open menu"><span></span><span></span></button>
    <div class="wordmark">JAGUAR</div>
    <div class="right-min"><span></span></div>
  </header>

  <div class="viewport" id="viewport">
    <div class="content" id="content">
`;

const shellMid = `
    </div>
  </div>

  <div class="sticky-cta" id="stickyCta">
    <a class="btn btn-red" href="frame-10-contact.html"><span>Book a consultation</span><svg class="arr" viewBox="0 0 16 10" fill="none"><path d="M0 5h14M10 1l4 4-4 4" stroke="currentColor" stroke-width="1.3"/></svg></a>
  </div>
`;

const menuBlock = main.match(/<!-- ===== FULLSCREEN MENU ===== -->[\s\S]*?<!-- ===== VIDEO MODAL ===== -->/)[0];
const vmodalBlock = main.match(/<!-- ===== VIDEO MODAL ===== -->[\s\S]*?<!-- ===== LOADER ===== -->/)[0];
const loaderBlock = main.match(/<!-- ===== LOADER ===== -->[\s\S]*?<\/div><!-- \/device -->/)[0];

const shellEnd = `
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js"></script>
<script src="app.js"></script>
</body>
</html>
`;

function between(startMarker, endMarker) {
  const start = main.indexOf(startMarker);
  const end = main.indexOf(endMarker, start);
  if (start === -1 || end === -1) throw new Error(`Markers not found: ${startMarker}`);
  return main.slice(start, end).trim();
}

const scrollLinks = {
  hero: 'frame-01-hero.html',
  details: 'frame-03-details.html',
  exterior: 'frame-04-exterior.html',
  interior: 'frame-05-interior.html',
  collection: 'frame-06-collection.html',
  videos: 'frame-08-videos.html',
  faq: 'frame-09-faq.html',
  contact: 'frame-10-contact.html',
};

function linkifyScrollTargets(html) {
  let out = html;
  for (const [id, href] of Object.entries(scrollLinks)) {
    out = out.replaceAll(`data-scroll="${id}"`, `href="${href}"`);
  }
  out = out.replace(
    '<a class="menu-link" href="frame-01-hero.html"',
    '<a class="menu-link" href="Jaguar Dark Heritage.html"'
  );
  out = out.replace('>Home</a>', '>Full site</a>');
  return out;
}

const frames = [
  { file: 'frame-01-hero.html', title: 'Hero · Frame 01', start: '<!-- 02 · HERO -->', end: '<!-- 03 · BRAND STATEMENT -->', vmodal: false },
  { file: 'frame-02-statement.html', title: 'Statement · Frame 02', start: '<!-- 03 · BRAND STATEMENT -->', end: '<!-- 04 · DETAILS -->', vmodal: false },
  { file: 'frame-03-details.html', title: 'Details · Frame 03', start: '<!-- 04 · DETAILS -->', end: '<!-- 05 · EXTERIOR -->', vmodal: false },
  { file: 'frame-04-exterior.html', title: 'Exterior · Frame 04', start: '<!-- 05 · EXTERIOR -->', end: '<!-- 06 · INTERIOR -->', vmodal: false },
  { file: 'frame-05-interior.html', title: 'Interior · Frame 05', start: '<!-- 06 · INTERIOR -->', end: '<!-- 07 · COLLECTION -->', vmodal: false },
  { file: 'frame-06-collection.html', title: 'Collection · Frame 06', start: '<!-- 07 · COLLECTION -->', end: '<!-- 08 · CTA DIVIDER -->', vmodal: false },
  { file: 'frame-07-invitation.html', title: 'Invitation · Frame 07', start: '<!-- 08 · CTA DIVIDER -->', end: '<!-- 09 · VIDEOS -->', vmodal: false },
  { file: 'frame-08-videos.html', title: 'Videos · Frame 08', start: '<!-- 09 · VIDEOS -->', end: '<!-- 10 · FAQ -->', vmodal: true },
  { file: 'frame-09-faq.html', title: 'FAQ · Frame 09', start: '<!-- 10 · FAQ -->', end: '<!-- 11 · CONTACT / FOOTER -->', vmodal: false },
  { file: 'frame-10-contact.html', title: 'Contact · Frame 10', start: '<!-- 11 · CONTACT / FOOTER -->', end: '    </div><!-- /content -->', vmodal: false },
];

for (const f of frames) {
  const section = linkifyScrollTargets(between(f.start, f.end));
  const title = shellStart.replace('{{TITLE}}', f.title);
  const extras = linkifyScrollTargets(
    shellMid + '\n' + menuBlock + (f.vmodal ? vmodalBlock : '') + '\n' + loaderBlock + shellEnd
  );
  const html = title + '\n' + section + '\n' + extras;
  fs.writeFileSync(path.join(root, f.file), html, 'utf8');
  console.log('wrote', f.file);
}
