// ── Workout Data ──────────────────────────────────────────────
const DEFAULT_EXERCISES = {
  warmup: [
    { id: 'wu1', name: 'Cat-Cow', reps: '10 reps', notes: 'On all fours, gently arch and round your back. Move fluidly; do not force the end ranges.' },
    { id: 'wu2', name: 'Bird-Dog', reps: '8 reps per side', notes: 'On all fours, extend opposite arm and leg. Keep hips perfectly level. Imagine a hot cup of coffee on your lower back.' },
    { id: 'wu3', name: 'Dead Bug', reps: '10 reps per side', notes: 'Lying flat, press lower back into the floor while extending opposite limbs.' },
  ],
  cooldown: [
    { id: 'cd1', name: "Child's Pose", reps: '1-2 min', notes: 'Sit back on heels, extend arms forward, breathe deeply into your belly.' },
    { id: 'cd2', name: 'Glute Figure-4 Stretch', reps: '1 min per side', notes: 'Lying on back, cross ankle over opposite knee, pull back gently.' },
  ],
  A: {
    push: {
      label: 'Push',
      subtitle: 'Chest, Shoulders, Triceps',
      exercises: [
        { id: 'ap1', name: 'Incline Dumbbell Press', sets: 3, reps: '8-12', notes: 'Bench at 30°. Squeeze shoulder blades into the bench. Push yourself into the bench, not just the weights up.' },
        { id: 'ap2', name: 'Seated Dumbbell Shoulder Press', sets: 3, reps: '10-12', notes: 'Keep entire spine flat against the seat pad. If lower back flares away, the weight is too heavy.' },
        { id: 'ap3', name: 'Cable Chest Flyes', sets: 3, reps: '12-15', notes: 'Staggered stance for a stable base. Keeps torso upright without spine strain.' },
        { id: 'ap4', name: 'Cable Tricep Pushdowns', sets: 3, reps: '12-15', notes: 'Pin elbows firmly to your ribs. Prevents using lower back to swing momentum.' },
      ]
    },
    pull: {
      label: 'Pull',
      subtitle: 'Back, Biceps',
      exercises: [
        { id: 'apl1', name: 'Lat Pulldown', sets: 3, reps: '8-12', notes: 'Pull toward upper chest, lean back from hips not lower back. Pull with elbows—slide them into your back pockets.' },
        { id: 'apl2', name: 'Chest-Supported Machine Row', sets: 3, reps: '10-12', notes: 'Sternum glued to pad. Let weight pull shoulder blades forward for stretch, then squeeze them together.' },
        { id: 'apl3', name: 'Face Pulls', sets: 3, reps: '15', notes: 'Targets rear delts and rotator cuff. Pull rope toward forehead, separate hands at the end.' },
        { id: 'apl4', name: 'Incline Dumbbell Bicep Curls', sets: 3, reps: '10-12', notes: '45° incline keeps torso fixed, preventing the bicep curl body swing.' },
      ]
    },
    legs: {
      label: 'Legs',
      subtitle: 'Legs & Functional Core',
      exercises: [
        { id: 'al1', name: 'Leg Press', sets: 3, reps: '10-12', notes: 'CRITICAL: Do not let lower back lift off the seat pad. Only go as deep as you can keep back flat.' },
        { id: 'al2', name: 'Goblet Squats', sets: 3, reps: '8-12', notes: 'Dumbbell at chest acts as counterbalance, keeps core upright naturally.' },
        { id: 'al3', name: 'Leg Extensions', sets: 3, reps: '12-15', notes: 'Isolates quads with zero back strain.' },
        { id: 'al4', name: 'Seated Leg Curls', sets: 3, reps: '12-15', notes: 'Isolates hamstrings with zero back strain.' },
        { id: 'al5', name: 'Suitcase Carries', sets: 3, reps: '30m per side', notes: 'One heavy dumbbell, one hand. Keep shoulders level—don\'t lean. Core works to keep you upright.' },
      ]
    }
  },
  B: {
    push: {
      label: 'Push',
      subtitle: 'Chest, Shoulders, Triceps',
      exercises: [
        { id: 'bp1', name: 'Flat Dumbbell Bench Press', sets: 3, reps: '8-12', notes: 'Feet flat on floor (or on plates). Keep shoulder blades pinned back and down.' },
        { id: 'bp2', name: 'Standing Cable Shoulder Press', sets: 3, reps: '10-12', notes: 'Staggered stance, squeeze glutes to lock pelvis. Cable tension eliminates spinal compression.' },
        { id: 'bp3', name: 'Pec Deck Machine Flyes', sets: 3, reps: '12-15', notes: 'Back fully supported against pad. Focus on bringing biceps together at peak.' },
        { id: 'bp4', name: 'Overhead Cable Tricep Extensions', sets: 3, reps: '12-15', notes: 'Face away from machine. Brace core to prevent lower back arch.' },
      ]
    },
    pull: {
      label: 'Pull',
      subtitle: 'Back, Biceps',
      exercises: [
        { id: 'bpl1', name: 'Single-Arm Dumbbell Row', sets: 3, reps: '8-12 per side', notes: 'One knee + hand on bench for three-point support. Pull dumbbell toward hip in a sweeping arc.' },
        { id: 'bpl2', name: 'Wide-Grip Cable Seated Row', sets: 3, reps: '10-12', notes: 'Knees slightly bent. Keep spine tall—don\'t rock. Pull elbows back wide for upper back.' },
        { id: 'bpl3', name: 'Straight-Arm Cable Pulldowns', sets: 3, reps: '12-15', notes: 'Slight hip hinge, flat back. Push bar to thighs with locked arms. Isolates lats without bicep help.' },
        { id: 'bpl4', name: 'Seated Hammer Curls', sets: 3, reps: '10-12', notes: 'Neutral grip (palms facing). Seated position removes spinal swinging.' },
      ]
    },
    legs: {
      label: 'Legs',
      subtitle: 'Legs & Functional Core',
      exercises: [
        { id: 'bl1', name: 'Hack Squat Machine', sets: 3, reps: '8-12', notes: 'Back against angled pad. Feet higher on platform for glutes/hams emphasis.' },
        { id: 'bl2', name: 'Cable Pull-Throughs', sets: 3, reps: '12-15', notes: 'Deadlift substitute. Hip hinge with low cable. Spine stays straight, squeeze glutes to stand.' },
        { id: 'bl3', name: 'Lying Leg Curls', sets: 3, reps: '12-15', notes: 'Lying flat ensures lower back is unloaded while isolating hamstrings.' },
        { id: 'bl4', name: 'Calf Raises', sets: 3, reps: '12-15', notes: 'Seated or standing machine.' },
        { id: 'bl5', name: 'Pallof Press', sets: 3, reps: '10 per side', notes: 'Sideways to cable, press handle out from chest. Stay rigid—builds anti-rotation core strength.' },
      ]
    }
  }
};

const DAY_MAP = ['push', 'pull', 'legs', 'push', 'pull', 'legs'];
const DAY_LABELS = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'];

// ── Storage ──────────────────────────────────────────────────
function load(key, fallback) {
  try { const v = localStorage.getItem('sst_' + key); return v ? JSON.parse(v) : fallback; }
  catch { return fallback; }
}
function save(key, val) { localStorage.setItem('sst_' + key, JSON.stringify(val)); }

// ── State ────────────────────────────────────────────────────
let schedule = load('schedule', { week: 'A', dayIndex: 0 });
let history = load('history', []);
let customExercises = load('custom', []);
let activeSession = null;
let timerInterval = null;
let timerStart = 0;

// ── Helpers ──────────────────────────────────────────────────
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

function getExercisesFor(week, type) {
  const base = DEFAULT_EXERCISES[week][type].exercises.slice();
  const custom = customExercises.filter(c => c.week === week && c.type === type);
  return [...base, ...custom];
}

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short' });
}

function formatDuration(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function getLastWeight(exerciseId) {
  for (let i = history.length - 1; i >= 0; i--) {
    const ex = history[i].exercises.find(e => e.id === exerciseId);
    if (ex) {
      const lastSet = ex.sets.find(s => s.weight > 0);
      if (lastSet) return lastSet.weight;
    }
  }
  return null;
}

// ── Navigation ───────────────────────────────────────────────
function showView(name) {
  $$('.view').forEach(v => v.classList.remove('active'));
  $$('.nav-btn').forEach(b => b.classList.remove('active'));
  $(`#view-${name}`).classList.add('active');
  $(`.nav-btn[data-view="${name}"]`).classList.add('active');
  $('#header-action').classList.add('hidden');

  if (name === 'today') {
    $('#header-title').textContent = 'Today';
    renderToday();
  } else if (name === 'history') {
    $('#header-title').textContent = 'History';
    renderHistory();
  } else if (name === 'manage') {
    $('#header-title').textContent = 'Settings';
    renderManage();
  }
}

// ── Today View ───────────────────────────────────────────────
function renderToday() {
  const type = DAY_MAP[schedule.dayIndex];
  const data = DEFAULT_EXERCISES[schedule.week][type];
  $('#week-badge').textContent = `Week ${schedule.week} • ${DAY_LABELS[schedule.dayIndex]}`;
  $('#today-workout-name').textContent = `${data.label} Day`;
  $('#today-workout-subtitle').textContent = data.subtitle;

  if (history.length === 0) {
    $('#stats-content').innerHTML = '<p style="color:var(--text-light);font-size:17px">No workouts logged yet. Start your first one!</p>';
  } else {
    const total = history.length;
    const thisWeek = history.filter(h => {
      const d = new Date(h.date);
      const now = new Date();
      const diff = (now - d) / (1000 * 60 * 60 * 24);
      return diff <= 7;
    }).length;
    const totalSets = history.reduce((sum, h) => sum + h.exercises.reduce((s, e) => s + e.sets.filter(st => st.completed).length, 0), 0);

    $('#stats-content').innerHTML = `
      <div class="stat-row">
        <div class="stat-item"><div class="stat-val">${total}</div><div class="stat-label">Total Workouts</div></div>
        <div class="stat-item"><div class="stat-val">${thisWeek}</div><div class="stat-label">This Week</div></div>
        <div class="stat-item"><div class="stat-val">${totalSets}</div><div class="stat-label">Sets Logged</div></div>
      </div>
    `;
  }
}

// ── Workout View ─────────────────────────────────────────────
function startWorkout() {
  const type = DAY_MAP[schedule.dayIndex];
  const exercises = getExercisesFor(schedule.week, type);

  activeSession = {
    week: schedule.week,
    dayIndex: schedule.dayIndex,
    type,
    startTime: Date.now(),
    notes: '',
    exercises: exercises.map(ex => ({
      id: ex.id,
      name: ex.name,
      notes: ex.notes,
      targetSets: ex.sets,
      targetReps: ex.reps,
      sets: Array.from({ length: ex.sets }, () => ({ weight: 0, reps: 0, completed: false }))
    }))
  };

  timerStart = Date.now();
  timerInterval = setInterval(updateTimer, 1000);
  updateTimer();

  renderWorkoutExercises();
  showWorkoutView();
}

function showWorkoutView() {
  $$('.view').forEach(v => v.classList.remove('active'));
  $('#view-workout').classList.add('active');
  $('#header-title').textContent = `${DEFAULT_EXERCISES[activeSession.week][activeSession.type].label} Day`;
  $('#header-action').textContent = 'Cancel';
  $('#header-action').classList.remove('hidden');
  $('nav').style.display = 'none';
}

function updateTimer() {
  const elapsed = Math.floor((Date.now() - timerStart) / 1000);
  $('#timer-display').textContent = formatDuration(elapsed);
}

function renderWorkoutExercises() {
  // Warmup
  $('#warmup-section').innerHTML = `
    <div class="section-label">Warm-Up (5–8 min)</div>
    <div class="routine-card">
      <div class="routine-header" onclick="toggleRoutine(this)">
        <span class="name">Warm-Up Routine</span>
        <span class="chevron">▼</span>
      </div>
      <div class="routine-body">
        ${DEFAULT_EXERCISES.warmup.map(e => `
          <div class="routine-item"><strong>${e.name}</strong> — ${e.reps}<br>${e.notes}</div>
        `).join('')}
      </div>
    </div>
  `;

  // Main exercises
  const container = $('#exercise-list');
  container.innerHTML = '<div class="section-label">Exercises</div>';

  activeSession.exercises.forEach((ex, ei) => {
    const allDone = ex.sets.every(s => s.completed);
    const lastWeight = getLastWeight(ex.id);

    const card = document.createElement('div');
    card.className = 'exercise-card';
    card.innerHTML = `
      <div class="exercise-header" onclick="toggleExercise(${ei})">
        <div class="ex-check ${allDone ? 'done' : ''}"></div>
        <span class="ex-name">${ex.name}</span>
        <span class="ex-meta">${ex.targetSets}×${ex.targetReps}</span>
      </div>
      <div class="exercise-body" id="ex-body-${ei}">
        ${ex.notes ? `<div class="exercise-notes">${ex.notes}</div>` : ''}
        ${lastWeight ? `<div class="prev-weight">Last session: ${lastWeight} kg</div>` : ''}
        ${ex.sets.map((set, si) => `
          <div class="set-row">
            <span class="set-label">${si + 1}</span>
            <input class="set-input" type="number" inputmode="decimal" placeholder="kg"
              value="${set.weight || ''}" onchange="updateSet(${ei},${si},'weight',this.value)">
            <span class="set-unit">kg</span>
            <input class="set-input" type="number" inputmode="numeric" placeholder="reps"
              value="${set.reps || ''}" onchange="updateSet(${ei},${si},'reps',this.value)">
            <span class="set-unit">reps</span>
            <button class="set-check-btn ${set.completed ? 'done' : ''}"
              onclick="toggleSet(${ei},${si})"></button>
          </div>
        `).join('')}
      </div>
    `;
    container.appendChild(card);
  });

  // Cooldown
  $('#cooldown-section').innerHTML = `
    <div class="section-label">Cool-Down (5 min)</div>
    <div class="routine-card">
      <div class="routine-header" onclick="toggleRoutine(this)">
        <span class="name">Cool-Down Routine</span>
        <span class="chevron">▼</span>
      </div>
      <div class="routine-body">
        ${DEFAULT_EXERCISES.cooldown.map(e => `
          <div class="routine-item"><strong>${e.name}</strong> — ${e.reps}<br>${e.notes}</div>
        `).join('')}
      </div>
    </div>
    <div class="section-label">Session Notes</div>
    <div class="session-notes-card">
      <label for="session-notes-input">How did it go?</label>
      <textarea id="session-notes-input" class="session-notes-textarea"
        placeholder="e.g. felt strong today, increased weight on shoulder press, right shoulder a bit tight..."
        oninput="activeSession.notes = this.value">${activeSession.notes || ''}</textarea>
    </div>
  `;
}

function toggleExercise(index) {
  const body = $(`#ex-body-${index}`);
  body.classList.toggle('open');
}

function toggleRoutine(header) {
  const body = header.nextElementSibling;
  body.classList.toggle('open');
  header.querySelector('.chevron').style.transform = body.classList.contains('open') ? 'rotate(180deg)' : '';
}

function updateSet(ei, si, field, value) {
  if (!activeSession) return;
  activeSession.exercises[ei].sets[si][field] = parseFloat(value) || 0;
}

function toggleSet(ei, si) {
  if (!activeSession) return;
  const set = activeSession.exercises[ei].sets[si];
  set.completed = !set.completed;
  renderWorkoutExercises();
  // Re-open the exercise that was being edited
  const body = $(`#ex-body-${ei}`);
  if (body) body.classList.add('open');
}

function finishWorkout() {
  if (!activeSession) return;

  const completedSets = activeSession.exercises.reduce((sum, e) => sum + e.sets.filter(s => s.completed).length, 0);
  const totalSets = activeSession.exercises.reduce((sum, e) => sum + e.sets.length, 0);

  if (completedSets === 0) {
    if (!confirm('You haven\'t logged any sets. Discard this workout?')) return;
    cancelWorkout();
    return;
  }

  if (completedSets < totalSets) {
    if (!confirm(`You've completed ${completedSets}/${totalSets} sets. Finish anyway?`)) return;
  }

  const elapsed = Math.floor((Date.now() - timerStart) / 1000);
  clearInterval(timerInterval);

  const record = {
    date: new Date().toISOString(),
    week: activeSession.week,
    dayIndex: activeSession.dayIndex,
    type: activeSession.type,
    duration: elapsed,
    notes: activeSession.notes || '',
    exercises: activeSession.exercises.map(e => ({
      id: e.id,
      name: e.name,
      sets: e.sets.map(s => ({ weight: s.weight, reps: s.reps, completed: s.completed }))
    }))
  };

  history.push(record);
  save('history', history);

  advanceSchedule();
  activeSession = null;
  $('nav').style.display = 'flex';
  showView('today');
}

function cancelWorkout() {
  if (activeSession && !confirm('Cancel this workout? Progress will be lost.')) return;
  clearInterval(timerInterval);
  activeSession = null;
  $('nav').style.display = 'flex';
  showView('today');
}

function advanceSchedule() {
  schedule.dayIndex++;
  if (schedule.dayIndex >= 6) {
    schedule.dayIndex = 0;
    schedule.week = schedule.week === 'A' ? 'B' : 'A';
  }
  save('schedule', schedule);
}

// ── History View ─────────────────────────────────────────────
function renderHistory() {
  const container = $('#history-list');
  const empty = $('#history-empty');

  if (history.length === 0) {
    container.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }

  empty.classList.add('hidden');
  const sorted = [...history].reverse();

  container.innerHTML = sorted.map((h, i) => {
    const realIdx = history.length - 1 - i;
    const data = DEFAULT_EXERCISES[h.week][h.type];
    const completedSets = h.exercises.reduce((s, e) => s + e.sets.filter(st => st.completed).length, 0);
    return `
      <div class="history-item" onclick="showHistoryDetail(${realIdx})">
        <div class="hi-left">
          <h4>Week ${h.week} • ${data.label}</h4>
          <p>${completedSets} sets completed</p>
        </div>
        <div class="hi-right">
          <div class="hi-date">${formatDate(h.date)}</div>
          <div class="hi-duration">${formatDuration(h.duration)}</div>
        </div>
      </div>
    `;
  }).join('');
}

function showHistoryDetail(index) {
  const h = history[index];
  if (!h) return;
  const data = DEFAULT_EXERCISES[h.week][h.type];

  $('#detail-title').textContent = `Week ${h.week} • ${data.label} — ${formatDate(h.date)}`;
  $('#detail-content').innerHTML = `
    ${h.notes ? `<div class="detail-notes">${h.notes}</div>` : ''}
    ${h.exercises.map(e => `
      <div style="margin-bottom:12px">
        <strong style="font-size:17px">${e.name}</strong>
        ${e.sets.map((s, i) => `
          <div style="font-size:15px;color:var(--text-light);padding:2px 0 2px 8px">
            Set ${i + 1}: ${s.completed ? `${s.weight}kg × ${s.reps} reps ✓` : '— skipped'}
          </div>
        `).join('')}
      </div>
    `).join('')}
  `;

  $('#modal-detail').classList.remove('hidden');
}

// ── Manage View ──────────────────────────────────────────────
function renderManage() {
  $('#sel-week').value = schedule.week;
  $('#sel-day').value = schedule.dayIndex;

  const container = $('#custom-exercise-list');
  if (customExercises.length === 0) {
    container.innerHTML = '<p style="font-size:16px;color:var(--text-light)">No custom exercises added yet.</p>';
  } else {
    container.innerHTML = customExercises.map((c, i) => `
      <div class="custom-ex-item">
        <div class="cex-info">
          ${c.name}
          <small>Week ${c.week} • ${c.type} • ${c.sets}×${c.reps}</small>
        </div>
        <button class="custom-ex-remove" onclick="removeCustomExercise(${i})">×</button>
      </div>
    `).join('');
  }
}

function removeCustomExercise(index) {
  if (!confirm('Remove this exercise?')) return;
  customExercises.splice(index, 1);
  save('custom', customExercises);
  renderManage();
}

function addCustomExercise() {
  const name = $('#add-name').value.trim();
  const sets = parseInt($('#add-sets').value) || 3;
  const reps = $('#add-reps').value.trim() || '8-12';
  const notes = $('#add-notes').value.trim();
  const [week, type] = $('#add-target').value.split('-');

  if (!name) { alert('Please enter an exercise name.'); return; }

  customExercises.push({
    id: 'custom_' + Date.now(),
    name, sets, reps, notes, week, type
  });
  save('custom', customExercises);

  $('#add-name').value = '';
  $('#add-notes').value = '';
  $('#add-sets').value = '3';
  $('#add-reps').value = '';
  $('#modal-add').classList.add('hidden');
  renderManage();
}

function exportHistory() {
  if (history.length === 0) { alert('No history to export.'); return; }
  const lines = ['Date,Week,Type,Exercise,Set,Weight(kg),Reps,Completed'];
  history.forEach(h => {
    h.exercises.forEach(e => {
      e.sets.forEach((s, i) => {
        lines.push(`${h.date},${h.week},${h.type},${e.name},${i + 1},${s.weight},${s.reps},${s.completed}`);
      });
    });
  });
  const blob = new Blob([lines.join('\n')], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'spine-safe-history.csv';
  a.click();
}

function clearAllData() {
  if (!confirm('This will delete ALL workout history and custom exercises. Are you sure?')) return;
  if (!confirm('Really? This cannot be undone.')) return;
  history = [];
  customExercises = [];
  schedule = { week: 'A', dayIndex: 0 };
  save('history', history);
  save('custom', customExercises);
  save('schedule', schedule);
  renderManage();
  alert('All data cleared.');
}

// ── Event Listeners ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Nav
  $$('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => showView(btn.dataset.view));
  });

  // Today
  $('#btn-start').addEventListener('click', startWorkout);

  // Workout
  $('#btn-finish').addEventListener('click', finishWorkout);
  $('#header-action').addEventListener('click', cancelWorkout);

  // Manage
  $('#sel-week').addEventListener('change', () => {
    schedule.week = $('#sel-week').value;
    save('schedule', schedule);
    renderToday();
  });
  $('#sel-day').addEventListener('change', () => {
    schedule.dayIndex = parseInt($('#sel-day').value);
    save('schedule', schedule);
    renderToday();
  });

  $('#btn-add-exercise').addEventListener('click', () => {
    $('#modal-add').classList.remove('hidden');
  });
  $('#btn-cancel-add').addEventListener('click', () => {
    $('#modal-add').classList.add('hidden');
  });
  $('#btn-confirm-add').addEventListener('click', addCustomExercise);
  $('#btn-export').addEventListener('click', exportHistory);
  $('#btn-clear').addEventListener('click', clearAllData);
  $('#btn-close-detail').addEventListener('click', () => {
    $('#modal-detail').classList.add('hidden');
  });

  // Close modals on backdrop click
  $$('.modal').forEach(m => {
    m.addEventListener('click', e => {
      if (e.target === m) m.classList.add('hidden');
    });
  });

  // Init
  showView('today');
});

// Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}
