// ---------- modo oscuro ----------
(function(){
  var root = document.documentElement;
  var desktopToggle = document.getElementById('theme-toggle');
  var mobileToggle = document.getElementById('theme-toggle-mobile');

  function updateButtons(isDark){
    var icon = isDark ? '☀️' : '🌙';
    var label = isDark ? 'Desactivar modo oscuro' : 'Activar modo oscuro';
    if (desktopToggle){
      desktopToggle.textContent = icon;
      desktopToggle.setAttribute('aria-label', label);
      desktopToggle.setAttribute('title', label);
    }
    if (mobileToggle){
      mobileToggle.textContent = icon + (isDark ? ' Modo claro' : ' Modo oscuro');
      mobileToggle.setAttribute('aria-label', label);
      mobileToggle.setAttribute('title', label);
    }
  }

  var savedTheme = localStorage.getItem('aula-activa-theme');
  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  var isDark = savedTheme ? savedTheme === 'dark' : prefersDark;

  if (isDark) root.setAttribute('data-theme', 'dark');
  updateButtons(isDark);

  function toggleTheme(){
    isDark = root.getAttribute('data-theme') !== 'dark';
    if (isDark) {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('aula-activa-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
      localStorage.setItem('aula-activa-theme', 'light');
    }
    updateButtons(isDark);
  }

  if (desktopToggle) desktopToggle.addEventListener('click', toggleTheme);
  if (mobileToggle) mobileToggle.addEventListener('click', toggleTheme);
})();

// ---------- mobile menu ----------
(function(){
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobile-menu');
  if (!hamburger || !mobileMenu) return;
  hamburger.addEventListener('click', function(){
    mobileMenu.classList.toggle('hidden');
  });
  mobileMenu.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ mobileMenu.classList.add('hidden'); });
  });
})();

// ---------- reveal on scroll ----------
(function(){
  var revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, {threshold:0.12});
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in'); });
  }
})();

// ---------- contact form (no backend: confirms locally) ----------
(function(){
  var form = document.getElementById('contact-form');
  var success = document.getElementById('form-success');
  if (!form || !success) return;
  form.addEventListener('submit', function(e){
    e.preventDefault();
    success.classList.remove('hidden');
    form.reset();
    setTimeout(function(){ success.classList.add('hidden'); }, 5000);
  });
})();

// ---------- hero demo timer (index.html — no login needed) ----------
(function(){
  var display = document.getElementById('timerDisplay');
  var isLoginPage = document.getElementById('authViews');
  if (!display || isLoginPage) return; // login page has its own timer wired in auth.js

  var CIRC = 2 * Math.PI * 90;
  var durations = { focus: 25*60, break: 5*60 };
  var mode = 'focus';
  var remaining = durations.focus;
  var running = false;
  var intervalId = null;

  var ring = document.getElementById('ringProgress');
  var caption = document.getElementById('timerCaption');
  var startBtn = document.getElementById('timerStart');
  var resetBtn = document.getElementById('timerReset');
  var tabFocus = document.getElementById('modeFocus');
  var tabBreak = document.getElementById('modeBreak');

  function fmt(s){ var m = Math.floor(s/60); var sec = s%60; return (m<10?'0':'')+m+':'+(sec<10?'0':'')+sec; }
  function render(){
    display.textContent = fmt(remaining);
    var frac = remaining / durations[mode];
    ring.style.strokeDashoffset = CIRC * (1 - frac);
    caption.textContent = mode === 'focus' ? 'Pruébalo — no necesitas cuenta' : 'Pausa activa · 5 min';
    startBtn.textContent = running ? 'Pausar' : 'Iniciar';
  }
  function setMode(m){
    mode = m; running = false; clearInterval(intervalId);
    remaining = durations[m];
    tabFocus.classList.toggle('active', m==='focus');
    tabBreak.classList.toggle('active', m==='break');
    render();
  }
  function tick(){
    remaining -= 1;
    if (remaining <= 0){ remaining = 0; running = false; clearInterval(intervalId); render(); return; }
    render();
  }
  startBtn.addEventListener('click', function(){
    running = !running;
    if (running){ intervalId = setInterval(tick, 1000); } else { clearInterval(intervalId); }
    render();
  });
  resetBtn.addEventListener('click', function(){ setMode(mode); });
  tabFocus.addEventListener('click', function(){ setMode('focus'); });
  tabBreak.addEventListener('click', function(){ setMode('break'); });
  render();
})();
