// ── Workout Data ──────────────────────────────────────────────
const CONSTRAINTS = [
  'No axial loading — nothing compressing down through the spine.',
  'No loaded forward hinging — torso stays supported or vertical under load.',
  'Overhead pressing: Arnold press only. No other overhead movement until cleared.',
  'Left side governs. Set the weight the left shoulder/arm controls cleanly. Right matches, never exceeds.',
  'Submaximal always: 2–3 reps in reserve. Never train to failure.',
  'Loaded squats: on hold. Not in this program until Body Applications clears them.',
  'Cable pull-through and machine hip thrust are re-entry probes, not progressions. Light, controlled, stop and report if anything pulls.',
  'Machine chest press baseline: 18kg, 3×10. Hold until four clean sets with the left blade keeping position. Only then add the smallest increment.',
];

const DEFAULT_EXERCISES = {
  warmup: [
    { id: 'wu1', name: 'Cat-Cow', reps: '8–10 reps', notes: 'Move segmentally — bring the thoracic spine into it vertebra by vertebra, not just the lower back. Slow and fluid.' },
    { id: 'wu2', name: 'Bird-Dog', reps: '8 reps per side', notes: 'Opposite arm and leg, hips dead level. Brace as if balancing a full cup on your lower back.' },
    { id: 'wu3', name: 'Dead Bug', reps: '10 reps per side', notes: 'Lower back pressed firmly into the floor while opposite limbs extend.' },
    { id: 'wu4', name: 'Scapular Wall Slides', reps: '10 reps', notes: 'Back to wall, arms in a goalpost, slide up and down keeping wrists and elbows on the wall. Direct prep for the scapular stabilisers.' },
  ],
  cooldown: [
    { id: 'cd1', name: "Child's Pose", reps: '1–2 min', notes: 'Sit back on heels, arms forward, breathe into the belly.' },
    { id: 'cd2', name: 'Glute Figure-4 Stretch', reps: '1 min per side', notes: 'Ankle over opposite knee, draw back gently.' },
    { id: 'cd3', name: 'Doorway Pec Stretch', reps: '30s per side', notes: 'Forearm on the frame, step through. Opens the chest so the blade can sit back where it should.' },
  ],
  A: {
    push: {
      label: 'Push',
      subtitle: 'Chest, Shoulders, Triceps',
      exercises: [
        { id: 'ap1', name: 'Machine Chest Press', sets: 3, reps: '10 @ 18kg', notes: 'Left shoulder blade must stay set against the pad for the entire set. The moment it lifts or slides forward, the set is done and the weight stays. Progression gate: four clean sets with the left blade holding before the smallest increment goes on.' },
        { id: 'ap2', name: 'Arnold Press', sets: 3, reps: '10–12', notes: 'Seated, back supported. Only cleared overhead movement. Start palms facing you at chin height, rotate as you press, stop short of a hard lock-out. Spine flat to the pad — if the lower back flares off it, the weight is too heavy.' },
        { id: 'ap3', name: 'Pec Deck', sets: 3, reps: '12–15', notes: 'Back flat to the pad, squeeze at the front, control the return.' },
        { id: 'ap4', name: 'Cable Tricep Pushdown', sets: 3, reps: '12–15', notes: 'Elbows pinned to the ribs, full extension at lockout, brief hold at the bottom. Run the fourth set before adding any weight.' },
      ]
    },
    pull: {
      label: 'Pull',
      subtitle: 'Back, Biceps',
      exercises: [
        { id: 'apl1', name: 'Lat Pulldown', sets: 3, reps: '10–12', notes: 'Slight lean from the hips only, never from the lower back. Pull the elbows down toward your back pockets, not with the hands.' },
        { id: 'apl2', name: 'Chest-Supported Machine Row', sets: 3, reps: '10–12', notes: 'Sternum glued to the pad. Let the blades open at the front, then drive the elbows back and squeeze. Your main scapular-retraction work.' },
        { id: 'apl3', name: 'Face Pulls', sets: 3, reps: '15', notes: 'Rear delts, rotator cuff, scapular stabilisers — your primary live rehab target. Pull the rope to the forehead, separate the hands at the end.' },
        { id: 'apl4', name: 'Incline Dumbbell Curl', sets: 3, reps: '10–12', notes: 'Seated 45° incline fixes the torso and kills the swing. The left arm sets the weight.' },
      ]
    },
    legs: {
      label: 'Legs',
      subtitle: 'Legs & Core',
      exercises: [
        { id: 'al1', name: 'Leg Press', sets: 3, reps: '10–12', notes: 'Lower back must not round or lift off the pad at the bottom. Control the depth — only as deep as the back stays flat. Reduce range before you reduce form.' },
        { id: 'al2', name: 'Seated Leg Curl', sets: 3, reps: '12–15', notes: 'Back supported, hamstrings isolated, zero spinal load.' },
        { id: 'al3', name: 'Leg Extension', sets: 3, reps: '12–15', notes: 'Quads isolated, no back involvement. Control the eccentric.' },
        { id: 'al4', name: 'Cable Pull-Through', sets: 2, reps: '12–15', probe: true, notes: 'RE-ENTRY PROBE — not a progression. Hips reach back to the wall behind you, spine dead straight, squeeze the glutes to stand. Stop immediately if anything pulls in the lower back and report the sensation and location to Body Applications.' },
        { id: 'al5', name: 'Seated Calf Raise', sets: 3, reps: '15', notes: 'Seated keeps the load off the spine. Avoid standing calf raises — they load axially.' },
        { id: 'al6', name: 'Pallof Press', sets: 3, reps: '10 per side', notes: 'Side-on to a chest-height cable, press straight out, resist the twist. Anti-rotation — a built-in belt for the spine.' },
      ]
    }
  },
  B: {
    push: {
      label: 'Push',
      subtitle: 'Chest, Shoulders, Triceps',
      exercises: [
        { id: 'bp1', name: 'Machine Chest Press', sets: 3, reps: '10 @ 18kg', notes: 'Same rule as Week A — left blade holds position or the set ends. Anchor lift across both weeks; keep it consistent for tracking.' },
        { id: 'bp2', name: 'Arnold Press', sets: 3, reps: '10–12', notes: 'Seated, back supported. Controlled rotation, no aggressive lock-out, spine flat to the pad.' },
        { id: 'bp3', name: 'Cable Fly (high pulley)', sets: 3, reps: '12–15', notes: 'High-to-low arc to bias the lower pec. Staggered stance for a stable base, torso upright, no spinal strain.' },
        { id: 'bp4', name: 'Single-Arm Cable Pushdown', sets: 3, reps: '12–15 per side', notes: 'Left side sets the working weight. Elbow pinned, full extension at lockout. Single-arm exposes the side-to-side difference the bar hides.' },
      ]
    },
    pull: {
      label: 'Pull',
      subtitle: 'Back, Biceps',
      exercises: [
        { id: 'bpl1', name: 'Lat Pulldown (close/neutral grip)', sets: 3, reps: '10–12', notes: 'Grip variation from Week A. Same rule — lean from the hips only, drive with the elbows.' },
        { id: 'bpl2', name: 'Seated Cable Row', sets: 3, reps: '10–12', notes: 'Torso stays vertical and locked the entire set. Do NOT lean forward and rock back under load. Let the blades open with the torso still, then pull the elbows back. If you can\'t keep the torso fixed, revert to the chest-supported row.' },
        { id: 'bpl3', name: 'Face Pulls', sets: 3, reps: '15', notes: 'Repeated by design — scapular stabilisers are the priority, they get worked both weeks. Pull to the forehead, separate the hands at the end.' },
        { id: 'bpl4', name: 'Seated Hammer Curl', sets: 3, reps: '10–12', notes: 'Neutral grip, seated to remove the swing. Left arm governs.' },
      ]
    },
    legs: {
      label: 'Legs',
      subtitle: 'Legs & Core',
      exercises: [
        { id: 'bl1', name: 'Leg Press', sets: 3, reps: '10–12', notes: 'Same as Week A — back flat to the pad, control the depth, range before form.' },
        { id: 'bl2', name: 'Lying Leg Curl', sets: 3, reps: '12–15', notes: 'Lying flat unloads the lower back entirely while isolating the hamstrings.' },
        { id: 'bl3', name: 'Leg Extension', sets: 3, reps: '12–15', notes: 'Quads isolated, controlled eccentric.' },
        { id: 'bl4', name: 'Machine Hip Thrust', sets: 2, reps: '12–15', probe: true, notes: 'RE-ENTRY PROBE — not a progression. Controlled tempo, full squeeze at the top, ribs down. Stop and report if anything pulls. Do not load this up as a main lift.' },
        { id: 'bl5', name: 'Seated Calf Raise', sets: 3, reps: '15', notes: 'Seated keeps the load off the spine.' },
        { id: 'bl6', name: 'Pallof Press', sets: 3, reps: '10 per side', notes: 'Anti-rotation, stay rigid against the twist.' },
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
    renderConstraints();
  } else if (name === 'history') {
    $('#header-title').textContent = 'History';
    renderHistory();
  } else if (name === 'manage') {
    $('#header-title').textContent = 'Settings';
    renderManage();
  }
}

// ── Constraints ──────────────────────────────────────────────
function renderConstraints() {
  $('#constraints-body').innerHTML = CONSTRAINTS.map(c => `<div class="constraint-item">${c}</div>`).join('');
}

function toggleConstraints(header) {
  const body = header.nextElementSibling;
  body.classList.toggle('open');
  header.querySelector('.chevron').style.transform = body.classList.contains('open') ? 'rotate(180deg)' : '';
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
      probe: ex.probe || false,
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
      <div class="exercise-header ${ex.probe ? 'probe-header' : ''}" onclick="toggleExercise(${ei})">
        <div class="ex-check ${allDone ? 'done' : ''}"></div>
        <span class="ex-name">${ex.name}${ex.probe ? ' <span class="probe-badge">PROBE</span>' : ''}</span>
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
