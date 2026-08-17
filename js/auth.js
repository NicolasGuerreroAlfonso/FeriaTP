:root{
  --chalkboard:#1E3A2F;
  --chalkboard-dark:#142A20;
  --chalk:#F6F2E7;
  --pencil:#F0B429;
  --pencil-dark:#C98F14;
  --marker:#E24E36;
  --blue:#2F5F8A;
  --ink:#16261D;
  --ink-soft:#4A5D51;
  --line:#DCD3BC;
}
*{box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{
  margin:0;
  background:var(--chalk);
  color:var(--ink);
  font-family:'Inter',sans-serif;
  -webkit-font-smoothing:antialiased;
}
h1,h2,h3,.display{font-family:'Fredoka',sans-serif;font-weight:600;letter-spacing:-0.01em;margin:0;}
.mono{font-family:'Space Mono',monospace;}
a{color:inherit;text-decoration:none;}
img,svg{display:block;max-width:100%;}
button{font-family:inherit;cursor:pointer;}
ul{margin:0;padding:0;list-style:none;}
.hidden{display:none !important;}

.container{max-width:1120px;margin:0 auto;padding:0 28px;}
.section{padding:96px 0;}
.section-eyebrow, .eyebrow{
  font-family:'Space Mono',monospace;text-transform:uppercase;letter-spacing:.14em;
  font-size:12px;color:var(--pencil-dark);display:inline-block;margin-bottom:14px;
}
.eyebrow--blue{color:var(--blue);}
.eyebrow--green{color:var(--chalkboard);}
.section-header{max-width:600px;margin:0 auto 48px;text-align:center;}
.section-header p{color:var(--ink-soft);margin-top:12px;font-size:15px;line-height:1.6;}
.highlight{color:var(--marker);}
.highlight-blue{color:var(--blue);}
.highlight-yellow{background:linear-gradient(180deg, transparent 60%, rgba(240,180,41,0.45) 60%);}

.btn-primary, .btn-nav, .btn-secondary, .btn-cta, .btn-curso, .btn-submit, .btn-mobile{
  display:inline-flex;align-items:center;justify-content:center;gap:8px;
  border-radius:8px;padding:12px 22px;font-size:14px;font-weight:600;border:1px solid transparent;
  transition:transform .15s ease, background .15s ease, color .15s ease, border-color .15s ease;
}
.btn-primary, .btn-nav, .btn-cta, .btn-curso, .btn-submit{background:var(--pencil);color:var(--ink);}
.btn-primary:hover, .btn-nav:hover, .btn-cta:hover, .btn-curso:hover, .btn-submit:hover{background:var(--pencil-dark);}
.btn-secondary{background:transparent;color:var(--chalk);border-color:rgba(246,242,231,0.4);}
.btn-secondary:hover{background:var(--chalk);color:var(--ink);}
.btn-mobile{width:100%;margin-top:8px;}
a:active, button:active{transform:translateY(1px);}

/* ---------- navbar ---------- */
.navbar{position:sticky;top:0;z-index:50;background:var(--chalkboard);border-bottom:1px solid rgba(246,242,231,0.12);}
.nav-inner{display:flex;align-items:center;gap:28px;padding:14px 28px;}
.nav-logo{width:38px;height:38px;border-radius:10px;}
.nav-links{display:flex;gap:26px;margin-right:auto;margin-left:8px;font-size:14px;color:rgba(246,242,231,0.75);}
.nav-links a:hover{color:var(--chalk);}
.hamburger{display:none;background:none;border:none;color:var(--chalk);font-size:22px;}
.mobile-menu{display:flex;flex-direction:column;gap:14px;padding:18px 28px 24px;background:var(--chalkboard-dark);color:var(--chalk);font-size:15px;}
.mobile-menu a{color:rgba(246,242,231,0.85);}

/* ---------- hero ---------- */
.hero{background:radial-gradient(circle at 85% 15%, rgba(240,180,41,0.10), transparent 45%), var(--chalkboard);color:var(--chalk);position:relative;overflow:hidden;}
.hero::before{content:"";position:absolute;inset:0;background-image:repeating-linear-gradient(0deg, rgba(246,242,231,0.035) 0px, rgba(246,242,231,0.035) 1px, transparent 1px, transparent 42px);pointer-events:none;}
.hero-inner{display:grid;grid-template-columns:1.1fr 0.9fr;gap:56px;align-items:center;padding:80px 28px 90px;position:relative;}
.hero-text h1{font-size:clamp(34px,5vw,54px);line-height:1.08;margin:16px 0 20px;}
.hero-text p{font-size:17px;line-height:1.6;color:rgba(246,242,231,0.8);max-width:480px;margin:0 0 32px;}
.hero-btns{display:flex;gap:14px;flex-wrap:wrap;}

/* index card / notebook motif (signature element) */
.card-index{background:var(--chalk);color:var(--ink);border-radius:6px;border-left:5px solid var(--marker);box-shadow:0 22px 44px rgba(0,0,0,0.28);position:relative;}
.card-index::before{content:"";position:absolute;left:34px;right:18px;top:0;bottom:0;background-image:repeating-linear-gradient(180deg, transparent 0 27px, var(--line) 27px 28px);pointer-events:none;}

.timer-card{padding:26px 26px 30px;}
.widget-tabs{display:flex;gap:8px;margin-bottom:20px;position:relative;z-index:1;}
.widget-tab{flex:1;text-align:center;padding:8px 6px;border-radius:6px;font-size:13px;font-weight:600;background:rgba(20,42,32,0.06);color:var(--ink-soft);border:none;}
.widget-tab.active{background:var(--chalkboard);color:var(--chalk);}
.timer-face{position:relative;width:190px;height:190px;margin:6px auto 18px;z-index:1;}
.timer-ring{width:100%;height:100%;transform:rotate(-90deg);}
.ring-bg{fill:none;stroke:rgba(20,42,32,0.10);stroke-width:10;}
.ring-progress{fill:none;stroke:var(--marker);stroke-width:10;stroke-linecap:round;stroke-dasharray:565.48;stroke-dashoffset:0;transition:stroke-dashoffset .3s linear, stroke .3s ease;}
.timer-time{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:'Space Mono',monospace;font-size:38px;font-weight:700;color:var(--ink);}
.timer-controls{display:flex;gap:10px;justify-content:center;position:relative;z-index:1;}
.timer-caption{text-align:center;font-size:12px;color:var(--ink-soft);margin-top:14px;font-family:'Space Mono',monospace;position:relative;z-index:1;}

/* ---------- stats / ficha ---------- */
.stats{background:var(--chalk);border-bottom:1px solid var(--line);}
.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:0;padding:36px 0;}
.stat-card{text-align:center;border-right:1px dashed var(--line);padding:0 12px;}
.stat-card:last-child{border-right:none;}
.stat-num{display:block;font-family:'Space Mono',monospace;font-size:30px;font-weight:700;color:var(--chalkboard);}
.stat-label{display:block;font-size:12.5px;color:var(--ink-soft);margin-top:4px;}

/* ---------- nosotros ---------- */
.nosotros-inner{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:start;}
.nosotros-text p{color:var(--ink-soft);line-height:1.65;font-size:15.5px;margin:16px 0 24px;}
.features-list li{display:flex;align-items:center;gap:12px;font-size:14.5px;padding:10px 0;border-top:1px solid var(--line);}
.features-list li:first-child{border-top:none;}
.feat-icon{width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;}
.feat-yellow{background:rgba(240,180,41,0.18);}
.feat-blue{background:rgba(47,95,138,0.14);}
.feat-green{background:rgba(30,58,47,0.10);}
.feat-pink{background:rgba(226,78,54,0.12);}

.nosotros-cards{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
.info-card{background:#fff;border:1px solid var(--line);border-radius:8px;padding:22px 20px;border-top:4px solid var(--pencil);}
.info-card.card-blue{border-top-color:var(--blue);}
.info-card.card-green{border-top-color:var(--chalkboard);}
.info-card.card-coral{border-top-color:var(--marker);}
.card-icon{font-size:20px;margin-bottom:10px;}
.info-card h3{font-size:15px;margin-bottom:6px;}
.info-card p{font-size:13px;color:var(--ink-soft);line-height:1.5;margin:0;}

/* ---------- cursos ---------- */
.cursos{background:var(--chalkboard);color:var(--chalk);}
.cursos .section-header p{color:rgba(246,242,231,0.7);}
.cursos-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
.curso-card{background:var(--chalk);color:var(--ink);border-radius:8px;padding:24px 22px;position:relative;}
.curso-badge{position:absolute;top:16px;right:16px;font-family:'Space Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:.06em;padding:4px 9px;border-radius:20px;}
.badge-blue{background:rgba(47,95,138,0.15);color:var(--blue);}
.badge-green{background:rgba(30,58,47,0.12);color:var(--chalkboard);}
.badge-yellow{background:rgba(240,180,41,0.2);color:var(--pencil-dark);}
.curso-icon{font-size:26px;margin-bottom:14px;}
.curso-card h3{font-size:16.5px;margin-bottom:8px;line-height:1.3;}
.curso-card p{font-size:13.5px;color:var(--ink-soft);line-height:1.55;margin:0 0 16px;}
.curso-meta{display:flex;gap:16px;font-size:12px;color:var(--ink-soft);font-family:'Space Mono',monospace;margin-bottom:18px;}
.btn-curso{width:100%;}

/* ---------- testimonios ---------- */
.testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
.testi-card{background:#fff;border:1px solid var(--line);border-radius:8px;padding:24px 22px;}
.testi-featured{background:var(--chalkboard);color:var(--chalk);border-color:transparent;}
.testi-featured .testi-author span{color:rgba(246,242,231,0.65);}
.stars{color:var(--pencil-dark);letter-spacing:2px;margin-bottom:12px;}
.testi-featured .stars{color:var(--pencil);}
.testi-card p{font-size:14.5px;line-height:1.6;margin:0 0 20px;}
.testi-author{display:flex;align-items:center;gap:12px;}
.avatar{width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Fredoka',sans-serif;font-weight:600;font-size:13px;color:#fff;flex-shrink:0;}
.av-blue{background:var(--blue);}
.av-green{background:var(--chalkboard);}
.av-yellow{background:var(--pencil-dark);}
.testi-author strong{display:block;font-size:14px;}
.testi-author span{font-size:12px;color:var(--ink-soft);}

/* ---------- cta ---------- */
.cta-section{background:linear-gradient(120deg, var(--marker), var(--pencil-dark));color:var(--chalk);}
.cta-inner{text-align:center;padding:60px 0;}
.cta-inner h2{font-size:clamp(24px,3.4vw,34px);margin-bottom:12px;}
.cta-inner p{font-size:15px;color:rgba(246,242,231,0.9);margin-bottom:26px;}
.btn-cta{background:var(--chalk);color:var(--ink);}
.btn-cta:hover{background:#fff;}

/* ---------- contacto ---------- */
.contacto-inner{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:start;}
.contacto-text p{color:var(--ink-soft);line-height:1.6;font-size:15px;margin:16px 0 26px;}
.contact-item{display:flex;align-items:center;gap:10px;font-size:14.5px;padding:10px 0;border-top:1px solid var(--line);}
.contact-item:first-child{border-top:none;}
.contact-form{background:#fff;border:1px solid var(--line);border-radius:10px;padding:28px;}
.form-group{margin-bottom:16px;}
.form-group label{display:block;font-size:12.5px;font-weight:600;color:var(--ink-soft);margin-bottom:6px;}
.form-group input, .form-group textarea{width:100%;padding:11px 13px;border:1px solid var(--line);border-radius:6px;font-family:inherit;font-size:14px;color:var(--ink);background:var(--chalk);resize:vertical;}
.form-group input:focus, .form-group textarea:focus{outline:2px solid var(--pencil-dark);outline-offset:1px;}
.btn-submit{width:100%;justify-content:center;padding:13px;}
.form-success{margin-top:14px;font-size:13.5px;color:var(--chalkboard);background:rgba(30,58,47,0.08);padding:10px 12px;border-radius:6px;}

/* ---------- footer ---------- */
.footer{background:var(--chalkboard-dark);color:rgba(246,242,231,0.65);}
.footer-inner{display:grid;grid-template-columns:1.4fr 1fr 1fr 1fr;gap:32px;padding:56px 0 36px;}
.footer-logo{width:34px;height:34px;border-radius:8px;margin-bottom:14px;}
.footer-brand p{font-size:13px;line-height:1.6;color:rgba(246,242,231,0.5);}
.footer-links h4{color:var(--chalk);font-size:13px;text-transform:uppercase;letter-spacing:.06em;margin-bottom:14px;}
.footer-links a{display:block;font-size:13.5px;padding:6px 0;color:rgba(246,242,231,0.6);}
.footer-links a:hover{color:var(--chalk);}
.footer-bottom{border-top:1px solid rgba(246,242,231,0.1);text-align:center;padding:18px 0;font-size:12.5px;color:rgba(246,242,231,0.45);}

/* ---------- reveal ---------- */
.reveal{opacity:0;transform:translateY(18px);transition:opacity .6s ease, transform .6s ease;}
.reveal.in{opacity:1;transform:none;}
@media (prefers-reduced-motion:reduce){.reveal{opacity:1;transform:none;transition:none;}html{scroll-behavior:auto;}}

/* ---------- login page ---------- */
.auth-shell{min-height:calc(100vh - 66px);display:grid;grid-template-columns:1fr 1fr;}
.auth-side{background:var(--chalkboard);color:var(--chalk);padding:64px 56px;display:flex;flex-direction:column;justify-content:center;position:relative;overflow:hidden;}
.auth-side::before{content:"";position:absolute;inset:0;background-image:repeating-linear-gradient(0deg, rgba(246,242,231,0.035) 0px, rgba(246,242,231,0.035) 1px, transparent 1px, transparent 42px);pointer-events:none;}
.auth-side h2{font-size:clamp(26px,3vw,36px);line-height:1.2;margin-bottom:16px;position:relative;}
.auth-side p{color:rgba(246,242,231,0.75);font-size:15px;line-height:1.6;max-width:380px;position:relative;margin-bottom:28px;}
.auth-side .features-list{position:relative;}
.auth-side .features-list li{border-top-color:rgba(246,242,231,0.15);color:rgba(246,242,231,0.85);}
.auth-main{display:flex;align-items:center;justify-content:center;padding:56px 28px;}
.auth-card{width:100%;max-width:380px;}
.auth-card h1{font-size:26px;margin-bottom:6px;}
.auth-card .sub{color:var(--ink-soft);font-size:13.5px;margin-bottom:26px;}
.tabs{display:flex;gap:6px;margin-bottom:22px;background:rgba(20,42,32,0.06);border-radius:8px;padding:4px;}
.tab-btn{flex:1;padding:9px;border:none;background:transparent;border-radius:6px;font-size:13.5px;font-weight:600;color:var(--ink-soft);}
.tab-btn.active{background:#fff;color:var(--ink);box-shadow:0 2px 6px rgba(0,0,0,0.08);}
.field{margin-bottom:15px;}
.field label{display:block;font-size:12px;font-weight:600;margin-bottom:6px;color:var(--ink-soft);}
.field input, .field select{width:100%;padding:11px 13px;border:1px solid var(--line);border-radius:6px;font-size:14px;font-family:inherit;background:#fff;color:var(--ink);}
.field input:focus, .field select:focus{outline:2px solid var(--pencil-dark);outline-offset:1px;}
.form-msg{font-size:13px;padding:10px 12px;border-radius:6px;margin-bottom:15px;display:none;}
.form-msg.show{display:block;}
.form-msg.error{background:rgba(226,78,54,0.1);color:#B4381F;}
.form-msg.ok{background:rgba(30,58,47,0.1);color:var(--chalkboard);}
.full-btn{width:100%;justify-content:center;padding:13px;}
.privacy-note{font-size:11.5px;color:var(--ink-soft);margin-top:18px;line-height:1.5;}
.back-link{font-size:13.5px;color:var(--ink-soft);display:inline-flex;align-items:center;gap:6px;margin-bottom:22px;}
.back-link:hover{color:var(--ink);}

.profile-role{display:inline-block;font-family:'Space Mono',monospace;font-size:11px;text-transform:uppercase;background:rgba(240,180,41,0.18);color:var(--pencil-dark);padding:3px 9px;border-radius:20px;margin-bottom:16px;}
.profile-stat{background:#fff;border:1px solid var(--line);border-radius:8px;padding:16px;margin:18px 0;display:flex;justify-content:space-between;align-items:center;}
.profile-stat .num{font-family:'Space Mono',monospace;font-size:26px;font-weight:700;}
.profile-stat .lbl{font-size:12px;color:var(--ink-soft);max-width:150px;text-align:right;line-height:1.4;}

/* ---------- responsive ---------- */
@media (max-width:960px){
  .hero-inner, .nosotros-inner, .contacto-inner{grid-template-columns:1fr;}
  .cursos-grid, .testi-grid{grid-template-columns:repeat(2,1fr);}
  .nosotros-cards{grid-template-columns:1fr 1fr;}
  .footer-inner{grid-template-columns:1fr 1fr;}
  .auth-shell{grid-template-columns:1fr;}
  .auth-side{padding:48px 32px;}
}
@media (max-width:640px){
  .nav-links{display:none;}
  .hamburger{display:block;}
  .section{padding:64px 0;}
  .cursos-grid, .testi-grid{grid-template-columns:1fr;}
  .nosotros-cards{grid-template-columns:1fr;}
  .stats-grid{grid-template-columns:repeat(2,1fr);row-gap:24px;}
  .stat-card{border-right:none;}
  .footer-inner{grid-template-columns:1fr;}
}
