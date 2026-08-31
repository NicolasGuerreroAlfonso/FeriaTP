(function(){
  'use strict';
  var loginForm = document.getElementById('loginForm');
  var registerForm = document.getElementById('registerForm');
  if (!loginForm || !registerForm) return;

  var auth = window.aulaAuth || firebase.auth();
  var db = firebase.firestore();
  var formMsg = document.getElementById('formMsg');
  var tabBtns = document.querySelectorAll('.tab-btn');

  function usernameToEmail(value){
    var username = value.trim().toLowerCase();
    return username.indexOf('@') !== -1 ? username : username.replace(/[^a-z0-9._-]/g, '') + '@aula-activa.local';
  }

  function legacyEmail(value){
    return value.trim().toLowerCase().replace(/[^a-z0-9._-]/g, '') + '@aula-activa.local';
  }

  function clearMsg(){
    if (!formMsg) return;
    formMsg.className = 'form-msg';
    formMsg.textContent = '';
  }

  function showMsg(text, type){
    if (!formMsg) return;
    formMsg.textContent = text;
    formMsg.className = 'form-msg show ' + type;
  }

  function switchTab(which){
    var loginTitle = document.getElementById('authTitle');
    var loginSub = document.getElementById('authSub');
    loginForm.style.display = which === 'login' ? 'block' : 'none';
    registerForm.style.display = which === 'register' ? 'block' : 'none';
    tabBtns.forEach(function(btn){ btn.classList.toggle('active', btn.dataset.tab === which); });
    if (loginTitle) loginTitle.textContent = which === 'login' ? 'Entrar al aula activa' : 'Crear tu cuenta';
    if (loginSub) loginSub.textContent = which === 'login' ? 'Accede con tu cuenta para continuar.' : 'Súmate a Aula Activa en segundos.';
    clearMsg();
  }

  tabBtns.forEach(function(btn){ btn.addEventListener('click', function(){ switchTab(btn.dataset.tab); }); });

  function friendlyError(err){
    var map = {
      'auth/email-already-in-use': 'Ese correo ya está asociado a una cuenta.',
      'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
      'auth/user-not-found': 'No encontramos ese usuario. Revisa los datos o regístrate.',
      'auth/wrong-password': 'Contraseña incorrecta.',
      'auth/invalid-credential': 'Usuario o contraseña incorrectos.',
      'auth/invalid-email': 'Ese correo no es válido.',
      'auth/network-request-failed': 'Sin conexión. Revisa internet e inténtalo nuevamente.',
      'auth/too-many-requests': 'Demasiados intentos. Espera un momento y vuelve a intentarlo.'
    };
    return map[err.code] || 'Ocurrió un error. Intenta nuevamente.';
  }

  async function ensureLocalPersistence(){
    if (!auth || !firebase.auth.Auth || !firebase.auth.Auth.Persistence) return;
    await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  }

  registerForm.addEventListener('submit', async function(e){
    e.preventDefault();
    clearMsg();
    var name = document.getElementById('regName').value.trim();
    var username = document.getElementById('regUser').value.trim().toLowerCase();
    var role = document.getElementById('regRole').value;
    var pass = document.getElementById('regPass').value;
    if (!name || !username || !pass){ showMsg('Completa todos los campos.', 'error'); return; }

    var button = registerForm.querySelector('button[type="submit"]');
    button.disabled = true;
    button.textContent = 'Creando...';
    try{
      await ensureLocalPersistence();
      var cred = await auth.createUserWithEmailAndPassword(usernameToEmail(username), pass);
      var profile = {
        name:name,
        username:username,
        email:username.indexOf('@') !== -1 ? username : '',
        role:role,
        sessionsCompleted:0,
        createdAt:firebase.firestore.FieldValue.serverTimestamp()
      };
      await db.collection('users').doc(cred.user.uid).set(profile);
      showMsg('Cuenta creada correctamente. ¡Bienvenido/a!', 'ok');
      setTimeout(function(){ window.location.href = 'index.html'; }, 450);
    } catch(err){
      console.error(err);
      showMsg(friendlyError(err), 'error');
    } finally {
      button.disabled = false;
      button.textContent = 'Crear cuenta';
    }
  });

  loginForm.addEventListener('submit', async function(e){
    e.preventDefault();
    clearMsg();
    var username = document.getElementById('loginUser').value.trim().toLowerCase();
    var pass = document.getElementById('loginPass').value;
    if (!username || !pass){ showMsg('Ingresa correo/usuario y contraseña.', 'error'); return; }

    var button = loginForm.querySelector('button[type="submit"]');
    button.disabled = true;
    button.textContent = 'Entrando...';
    try{
      await ensureLocalPersistence();
      var credential;
      try {
        credential = await auth.signInWithEmailAndPassword(usernameToEmail(username), pass);
      } catch(firstErr){
        if (username.indexOf('@') !== -1 && usernameToEmail(username) !== legacyEmail(username)){
          credential = await auth.signInWithEmailAndPassword(legacyEmail(username), pass);
        } else {
          throw firstErr;
        }
      }
      if (!credential || !credential.user) throw new Error('LOGIN_FAILED');
      showMsg('Sesión iniciada. Redirigiendo...', 'ok');
      window.location.href = 'index.html';
    } catch(err){
      console.error(err);
      showMsg(friendlyError(err), 'error');
    } finally {
      button.disabled = false;
      button.textContent = 'Entrar';
    }
  });
})();
