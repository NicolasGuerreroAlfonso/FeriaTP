(function(){
  const courses = window.AULA_COURSES || [];
  const params = new URLSearchParams(location.search);
  const id = params.get('id') || 'estudio';
  const course = courses.find(c => c.id === id) || courses[0];
  if (!course) return;

  const $ = s => document.querySelector(s);
  const allLessons = [];
  course.modules.forEach(module => module.lessons.forEach(lesson => {
    allLessons.push({...lesson, moduleId: module.id, moduleTitle: module.title});
  }));

  const storageKey = 'aula-activa-course-' + course.id;
  let completed = new Set(JSON.parse(localStorage.getItem(storageKey) || '[]'));
  let current = 0;

  // Cargar datos del curso
  $('#courseIcon').textContent = course.icon;
  $('#courseBadge').textContent = course.badge || 'Curso Aula Activa';
  $('#courseTitle').textContent = course.title;
  $('#courseDescription').textContent = course.description;
  $('#courseDuration').textContent = '⏱ ' + course.duration;
  $('#courseLevel').textContent = '📘 ' + course.level;
  $('#courseRating').textContent = '⭐ ' + course.rating;
  $('#courseGoal').textContent = course.goal;
  document.title = course.title + ' — Aula Activa';

  function save(){
    localStorage.setItem(storageKey, JSON.stringify([...completed]));
  }

  // Actualiza la barra y textos de progreso
  function renderProgress(){
    const total = allLessons.length;
    const pct = total > 0 ? Math.round((completed.size / total) * 100) : 0;
    
    $('#progressText').textContent = pct + '%';
    $('#progressBar').style.width = pct + '%';
    $('#progressCount').textContent = completed.size + ' de ' + total + ' lecciones completadas';
    $('#continueBtn').textContent = pct === 100 ? 'Curso completado ✓' : (completed.size ? 'Continuar curso' : 'Comenzar curso');
  }

  function renderSyllabus(){
    const box = $('#syllabus');
    box.innerHTML = course.modules.map((m) => `
      <div class="syllabus-module">
        <div class="syllabus-module-title"><span>${m.id}</span><strong>${m.title}</strong></div>
        ${m.lessons.map((l) => {
          const idx = allLessons.findIndex(x => x.title === l.title && x.moduleId === m.id);
          return `<button class="syllabus-lesson ${completed.has(idx)?'done':''}" data-index="${idx}">
            <span class="lesson-status">${completed.has(idx)?'✓':'○'}</span>${l.title}
          </button>`;
        }).join('')}
      </div>
    `).join('');
    box.querySelectorAll('.syllabus-lesson').forEach(btn => {
      btn.addEventListener('click', () => openLesson(Number(btn.dataset.index)));
    });
  }

  function renderLessonCards(){
    $('#lessonArea').innerHTML = course.modules.map(m => `
      <section class="module-section">
        <div class="module-heading"><span>Módulo ${m.id}</span><h2>${m.title}</h2></div>
        <div class="lesson-grid">
          ${m.lessons.map(l => {
            const idx = allLessons.findIndex(x => x.title === l.title && x.moduleId === m.id);
            return `<article class="lesson-card ${completed.has(idx)?'completed':''}">
              <div class="lesson-number">${String(idx+1).padStart(2,'0')}</div>
              <div><span class="lesson-module">Módulo ${m.id}</span><h3>${l.title}</h3><p>${l.content}</p>
              <button class="btn-lesson" data-index="${idx}">${completed.has(idx)?'Repasar lección':'Ver lección'} ${completed.has(idx)?'↗':'→'}</button></div>
            </article>`;
          }).join('')}
        </div>
      </section>
    `).join('');
    $('#lessonArea').querySelectorAll('.btn-lesson').forEach(btn => btn.addEventListener('click',()=>openLesson(Number(btn.dataset.index))));
  }

  function openLesson(index){
    current = Math.max(0, Math.min(index, allLessons.length-1));
    const l = allLessons[current];
    const isDone = completed.has(current);

    $('#lessonKicker').textContent = 'Módulo ' + l.moduleId + ' · Lección ' + (current+1) + ' de ' + allLessons.length;
    $('#lessonTitle').textContent = l.title;
    $('#lessonContent').textContent = l.content;
    $('#lessonActivity').textContent = l.activity;
    
    $('#completeLesson').textContent = isDone ? 'Completada ✓' : 'Marcar como completada';
    $('#completeLesson').classList.toggle('is-done', isDone);
    
    $('#prevLesson').disabled = current === 0;
    $('#nextLesson').textContent = current === allLessons.length-1 ? 'Finalizar →' : 'Siguiente →';
    
    $('#lessonModal').classList.remove('hidden');
    $('#lessonModal').setAttribute('aria-hidden','false');
    document.body.classList.add('modal-open');
  }

  function closeLesson(){
    $('#lessonModal').classList.add('hidden');
    $('#lessonModal').setAttribute('aria-hidden','true');
    document.body.classList.remove('modal-open');
  }

  // Evento para marcar o desmarcar lección
  $('#completeLesson').addEventListener('click', () => {
    if (completed.has(current)) {
      completed.delete(current);
    } else {
      completed.add(current);
    }
    save();
    renderProgress();
    renderSyllabus();
    renderLessonCards();
    openLesson(current); // Actualiza el texto del botón en el modal
  });

  $('#prevLesson').addEventListener('click',()=>openLesson(current-1));
  $('#nextLesson').addEventListener('click',()=>{
    if(current < allLessons.length-1) openLesson(current+1);
    else closeLesson();
  });
  $('#closeLesson').addEventListener('click',closeLesson);
  $('#lessonModal').addEventListener('click',e=>{ if(e.target.id==='lessonModal') closeLesson(); });
  document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeLesson(); });

  $('#continueBtn').addEventListener('click',()=>{
    const firstPending = allLessons.findIndex((_,i)=>!completed.has(i));
    openLesson(firstPending === -1 ? 0 : firstPending);
  });

  // Carga inicial
  renderProgress();
  renderSyllabus();
  renderLessonCards();
})();