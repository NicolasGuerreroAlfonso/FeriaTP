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

// ---------- icono de perfil según sesión ----------
(function(){
  var profileNav = document.querySelectorAll('.profile-nav');
  var loginBtns = document.querySelectorAll('#loginNavBtn, #loginNavBtnMobile');
  function apply(loggedIn){
    profileNav.forEach(function(el){ el.classList.toggle('hidden', !loggedIn); });
    loginBtns.forEach(function(el){ el.classList.toggle('hidden', loggedIn); });
  }
  apply(false);
  if (typeof firebase === 'undefined' || !firebase.auth) return;
  firebase.auth().onAuthStateChanged(function(user){ apply(!!user); });
})();

// ---------- valoraciones de la página ----------
(function(){
  var form = document.getElementById('rating-form');
  if (!form || typeof firebase === 'undefined') return;

  var db = firebase.firestore();
  var valueInput = document.getElementById('ratingValue');
  var stars = form.querySelectorAll('.star-picker button');
  var success = document.getElementById('rating-success');
  var error = document.getElementById('rating-error');
  var average = document.getElementById('ratingAverage');
  var count = document.getElementById('ratingCount');
  var starsOutput = document.getElementById('ratingStars');

  function paintSelected(value){
    stars.forEach(function(btn){
      btn.classList.toggle('selected', Number(btn.dataset.rating) <= value);
    });
  }

  stars.forEach(function(btn){
    btn.addEventListener('click', function(){
      var value = Number(btn.dataset.rating);
      valueInput.value = value;
      paintSelected(value);
    });
  });

  function renderRatings(snapshot){
    var total = 0;
    var amount = 0;
    snapshot.forEach(function(doc){
      var data = doc.data();
      var rating = Number(data.rating);
      if (rating >= 1 && rating <= 5){
        total += rating;
        amount++;
      }
    });
    var avg = amount ? total / amount : 0;
    average.textContent = amount ? avg.toFixed(1) : '—';
    count.textContent = amount;
    var rounded = Math.round(avg);
    starsOutput.textContent = '★★★★★'.split('').map(function(_, i){
      return i < rounded ? '★' : '☆';
    }).join('');
  }

  db.collection('ratings').onSnapshot(renderRatings, function(err){
    console.error('No se pudieron cargar las valoraciones:', err);
  });

  form.addEventListener('submit', function(e){
    e.preventDefault();
    success.classList.add('hidden');
    error.classList.add('hidden');

    var rating = Number(valueInput.value);
    if (!rating){
      error.textContent = 'Selecciona una puntuación de 1 a 5 estrellas.';
      error.classList.remove('hidden');
      return;
    }

    var btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Enviando...';

    var data = {
      rating: rating,
      name: document.getElementById('ratingName').value.trim(),
      comment: document.getElementById('ratingComment').value.trim(),
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    db.collection('ratings').add(data)
      .then(function(){
        form.reset();
        valueInput.value = '';
        paintSelected(0);
        success.classList.remove('hidden');
      })
      .catch(function(err){
        console.error(err);
        error.textContent = 'No se pudo enviar la valoración. Revisa la conexión y vuelve a intentarlo.';
        error.classList.remove('hidden');
      })
      .finally(function(){
        btn.disabled = false;
        btn.textContent = 'Enviar valoración';
      });
  });
})();
