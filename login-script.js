function switchTab(tab) {
  const signinTab  = document.getElementById('tab-signin');
  const signupTab  = document.getElementById('tab-signup');
  const signinForm = document.getElementById('signin-form');
  const signupForm = document.getElementById('signup-form');
  const btn        = document.getElementById('main-btn');

  if (tab === 'signin') {
    signinTab.className  = 'auth-tab active';
    signupTab.className  = 'auth-tab inactive';
    signinForm.classList.remove('hidden');
    signupForm.classList.add('hidden');
    btn.textContent = 'Login';
  } else {
    signinTab.className  = 'auth-tab inactive';
    signupTab.className  = 'auth-tab active';
    signinForm.classList.add('hidden');
    signupForm.classList.remove('hidden');
    btn.textContent = 'registrarse  ';
  }
}
