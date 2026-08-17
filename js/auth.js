(function(){
  var authViews = document.getElementById('authViews');
  if (!authViews) return; // only runs on login.html

  var currentUser = null; // {uid, name, username, role, sessionsCompleted}

  var profileView = document.getElementById('profileView');
  var authTitle = document.getElementById('authTitle');
  var authSub = document.getElementById('authSub');
  var formMsg = document.getElementById('formMsg');
  var loginForm = document.getElementById('loginForm');
  var registerForm = document.getElementById('registerForm');
  var tabBtns = document.querySelectorAll('.tab-btn');

  var auth = firebase.auth();
  var db = firebase.firestore();

  // Firebase Auth needs an email; las cuentas del proyecto solo piden "usuario",
  // así que armamos un correo interno a partir del nombre de usuario.
  function usernameToEmail(username){
    return username.replace(/[^a-z0-9._-]/g, '') + '@aula-activa.local';
  }

  function clearMsg(){ formMsg.classList.remove('show','error','ok'); formMsg.textContent=''; }
  function showMsg(text, type){ formMsg.textContent = text; formMsg.classList.add('show', type); }

  function showAuth(which){
    authViews.style.display = 'block';
    profileView.style.display = 'none';
    clearMsg();
    tabBtns.forEach(function(b){ b.classList.toggle('active', b.dataset.tab === which); });
    loginForm.style.display = which === 'login' ? 'block' : 'none';
    registerForm.style.display = which === 'register' ? 'block' : 'none';
    authTitle.textContent = which === 'login' ? 'Entrar al aula' : 'Crear tu cuenta';
    authSub.textContent = which === 'login' ? 'Accede con tu cuenta.' : 'Súmate a Aula Activa en segundos.';
  }
  tabBtns.forEach(function(b){ b.addEventListener('click', function(){ showAuth(b.dataset.tab); }); });

  function showProfile(){
    authViews.style.display = 'none';
    profileView.style.display = 'block';
    document.getElementById('profileName').textContent = 'Hola, ' + currentUser.name.split(' ')[0];
    document.getElementById('profileRole').textContent = currentUser.role;
    document.getElementById('profileSessions').textContent = currentUser.sessionsCompleted || 0;
  }

  function friendlyError(err){
    var map = {
      'auth/email-already-in-use': 'Ese usuario ya existe. Intenta iniciar sesión.',
      'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
      'auth/user-not-found': 'No encontramos ese usuario. ¿Ya te registraste?',
      'auth/wrong-password': 'Contraseña incorrecta.',
      'auth/invalid-email': 'Ese nombre de usuario no es válido.',
      'auth/invalid-credential': 'Usuario o contraseña incorrectos.',
      'auth/network-request-failed': 'Sin conexión. Revisa tu internet e intenta de nuevo.'
    };
    return map[err.code] || 'Ocurrió un error inesperado. Intenta de nuevo.';
  }

  registerForm.addEventListener('submit', async function(e){
    e.preventDefault();
    clearMsg();
    var name = document.getElementById('regName').value.trim();
    var username = document.getElementById('regUser').value.trim().toLowerCase();
    var role = document.getElementById('regRole').value;
    var pass = document.getElementById('regPass').value;
    if (!name || !username || !pass){ showMsg('Completa todos los campos.', 'error'); return; }

    var submitBtn = registerForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true; submitBtn.textContent = 'Creando...';

    try{
      var cred = await auth.createUserWithEmailAndPassword(usernameToEmail(username), pass);
      var profile = { name: name, username: username, role: role, sessionsCompleted: 0, createdAt: Date.now() };
      await db.collection('users').doc(cred.user.uid).set(profile);
      currentUser = Object.assign({ uid: cred.user.uid }, profile);
      showMsg('Cuenta creada. ¡Bienvenido/a!', 'ok');
      setTimeout(function(){ showProfile(); initDashboardTimer(); }, 500);
    }catch(err){
      showMsg(friendlyError(err), 'error');
    }finally{
      submitBtn.disabled = false; submitBtn.textContent = 'Crear cuenta';
    }
  });

  loginForm.addEventListener('submit', async function(e){
    e.preventDefault();
    clearMsg();
    var username = document.getElementById('loginUser').value.trim().toLowerCase();
    var pass = document.getElementById('loginPass').value;
    if (!username || !pass){ showMsg('Ingresa usuario y contraseña.', 'error'); return; }

    var submitBtn = loginForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true; submitBtn.textContent = 'Entrando...';

    try{
      var cred = await auth.signInWithEmailAndPassword(usernameToEmail(username), pass);
      var doc = await db.collection('users').doc(cred.user.uid).get();
      currentUser = Object.assign({ uid: cred.user.uid }, doc.data());
      showProfile();
      initDashboardTimer();
    }catch(err){
      showMsg(friendlyError(err), 'error');
    }finally{
      submitBtn.disabled = false; submitBtn.textContent = 'Entrar';
    }
  });

  var logoutBtn = document.getElementById('logoutBtn');
  logoutBtn.addEventListener('click', function(){
    auth.signOut();
    currentUser = null;
    showAuth('login');
  });

  // Si ya había una sesión activa en este navegador, entra directo.
  auth.onAuthStateChanged(async function(user){
    if (user && !currentUser){
      try{
        var doc = await db.collection('users').doc(user.uid).get();
        if (doc.exists){
          currentUser = Object.assign({ uid: user.uid }, doc.data());
          showProfile();
          initDashboardTimer();
        }
      }catch(err){ /* si falla, se queda en la pantalla de login */ }
    }
  });

  async function registerCompletedSession(){
    if (!currentUser) return;
    currentUser.sessionsCompleted = (currentUser.sessionsCompleted || 0) + 1;
    try{
      await db.collection('users').doc(currentUser.uid).update({
        sessionsCompleted: firebase.firestore.FieldValue.increment(1)
      });
    }catch(err){ /* se refleja igual en pantalla aunque falle el guardado puntual */ }
    document.getElementById('profileSessions').textContent = currentUser.sessionsCompleted;
  }

  // ---------- dashboard pomodoro (solo se activa con sesión iniciada) ----------
  var dashboardTimerReady = false;
  function initDashboardTimer(){
    if (dashboardTimerReady) return;
    dashboardTimerReady = true;

    var CIRC = 2 * Math.PI * 90;
    var durations = { focus: 25*60, break: 5*60 };
    var mode = 'focus';
    var remaining = durations.focus;
    var running = false;
    var intervalId = null;

    var display = document.getElementById('timerDisplay');
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
      ring.style.stroke = mode === 'focus' ? 'var(--marker)' : 'var(--blue)';
      caption.textContent = mode === 'focus' ? 'Bloque de enfoque — HU‑01' : 'Pausa activa — HU‑02';
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
      if (remaining <= 0){
        remaining = 0; running = false; clearInterval(intervalId); render();
        if (mode === 'focus'){ registerCompletedSession(); }
        return;
      }
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
  }
})();
