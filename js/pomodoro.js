(function(){
  'use strict';
  var display = document.getElementById('timerDisplay');
  if (!display) return;

  var startBtn = document.getElementById('timerStart');
  var resetBtn = document.getElementById('timerReset');
  var focusBtn = document.getElementById('modeFocus');
  var breakBtn = document.getElementById('modeBreak');
  var ring = document.getElementById('ringProgress');
  var caption = document.getElementById('timerCaption');
  if (!startBtn || !resetBtn || !focusBtn || !breakBtn || !ring || !caption) return;

  var KEY = 'aula-activa-pomodoro-state-v3';
  var durations = { focus: 25 * 60, break: 5 * 60 };
  var circumference = 2 * Math.PI * 90;
  var intervalId = null;
  var completedKey = 'aula-activa-pomodoro-completed-v1';

  function defaults(){
    return { mode:'focus', remaining:durations.focus, running:false, updatedAt:Date.now() };
  }

  function sanitize(data){
    if (!data || (data.mode !== 'focus' && data.mode !== 'break')) return defaults();
    var duration = durations[data.mode];
    var remaining = Number(data.remaining);
    if (!Number.isFinite(remaining)) remaining = duration;
    remaining = Math.max(0, Math.min(duration, Math.floor(remaining)));
    var running = !!data.running;
    var updatedAt = Number(data.updatedAt);
    if (!Number.isFinite(updatedAt) || updatedAt <= 0) updatedAt = Date.now();
    if (running){
      var elapsed = Math.max(0, Math.floor((Date.now() - updatedAt) / 1000));
      remaining = Math.max(0, remaining - elapsed);
      if (remaining === 0) running = false;
    }
    return { mode:data.mode, remaining:remaining, running:running, updatedAt:Date.now() };
  }

  function read(){
    try { return sanitize(JSON.parse(localStorage.getItem(KEY) || 'null')); }
    catch (e) { return defaults(); }
  }

  function write(){
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
  }

  function fmt(value){
    var mins = Math.floor(value / 60);
    var secs = value % 60;
    return (mins < 10 ? '0' : '') + mins + ':' + (secs < 10 ? '0' : '') + secs;
  }

  function render(){
    var duration = durations[state.mode];
    display.textContent = fmt(state.remaining);
    var fraction = duration ? state.remaining / duration : 0;
    ring.style.strokeDashoffset = circumference * (1 - fraction);
    ring.style.stroke = state.mode === 'focus' ? 'var(--marker)' : 'var(--blue)';
    focusBtn.classList.toggle('active', state.mode === 'focus');
    breakBtn.classList.toggle('active', state.mode === 'break');
    startBtn.textContent = state.running ? 'Pausar' : 'Iniciar';
    caption.textContent = state.mode === 'focus'
      ? (state.running ? 'Pomodoro activo — se conserva al navegar.' : 'Bloque de enfoque — listo para comenzar.')
      : (state.running ? 'Pausa activa en curso — se conserva al navegar.' : 'Pausa activa — listo para comenzar.');
    state.updatedAt = Date.now();
    write();
  }

  function stopInterval(){
    if (intervalId){ clearInterval(intervalId); intervalId = null; }
  }

  function handleComplete(){
    stopInterval();
    state.running = false;
    state.remaining = 0;
    state.updatedAt = Date.now();
    write();
    if (state.mode === 'focus'){
      try { localStorage.setItem(completedKey, String(Date.now())); } catch (e) {}
    }
    render();
  }

  function tick(){
    state.remaining = Math.max(0, state.remaining - 1);
    state.updatedAt = Date.now();
    if (state.remaining === 0){ handleComplete(); return; }
    write();
    render();
  }

  function start(){
    if (state.remaining <= 0) state.remaining = durations[state.mode];
    state.running = true;
    state.updatedAt = Date.now();
    stopInterval();
    intervalId = setInterval(tick, 1000);
    render();
  }

  function pause(){
    state.running = false;
    state.updatedAt = Date.now();
    stopInterval();
    render();
  }

  function setMode(mode){
    stopInterval();
    state = { mode:mode, remaining:durations[mode], running:false, updatedAt:Date.now() };
    render();
  }

  var state = read();
  startBtn.addEventListener('click', function(){ state.running ? pause() : start(); });
  resetBtn.addEventListener('click', function(){ setMode(state.mode); });
  focusBtn.addEventListener('click', function(){ setMode('focus'); });
  breakBtn.addEventListener('click', function(){ setMode('break'); });

  document.addEventListener('visibilitychange', function(){
    if (document.visibilityState === 'visible'){
      var restored = read();
      state = restored;
      stopInterval();
      render();
      if (state.running) intervalId = setInterval(tick, 1000);
    } else {
      write();
      stopInterval();
    }
  });

  window.addEventListener('storage', function(event){
    if (event.key !== KEY || !event.newValue) return;
    var restored = read();
    state = restored;
    stopInterval();
    render();
    if (state.running) intervalId = setInterval(tick, 1000);
  });

  window.addEventListener('pagehide', write);
  render();
  if (state.running) intervalId = setInterval(tick, 1000);
})();
