(function(){
  'use strict';
  if (typeof firebase === 'undefined' || !firebase.apps || !firebase.apps.length) return;
  window.aulaAuth = firebase.auth();
  try {
    window.aulaAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(function(err){
      console.error('No se pudo establecer la persistencia de sesión:', err);
    });
  } catch (err) {
    console.error('No se pudo configurar la persistencia de sesión:', err);
  }
})();
