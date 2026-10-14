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

const WARMUP = {
  push: [
    { name: 'Cat-Cow', reps: '8–10 reps', notes: 'Segmental — bring the thoracic spine in vertebra by vertebra, not just the lower back. Slow and fluid. Spine baseline before any pressing.' },
    { name: 'Scapular Wall Slides', reps: '10 reps', notes: 'Back to wall, arms in goalpost, slide up and down keeping wrists and elbows on the wall. Direct activation of the stabilisers you\'re about to load.' },
    { name: 'Band Pull-Apart or Light Cable Face Pull', reps: '15 reps', notes: 'Rear delts and external rotators awake before the chest press. If no band, do the face pull machine at minimal weight.' },
    { name: 'Shoulder CARs', reps: '5 reps each direction per side', notes: 'Controlled articular rotations — slow full circles at the shoulder joint, active not passive. Lubricates the joint before load.' },
    { name: 'Dead Bug', reps: '8 reps per side', notes: 'Low back flat to the floor, opposite limbs extend. Core pre-activation before pressing.' },
  ],
  pull: [
    { name: 'Cat-Cow', reps: '8–10 reps', notes: 'Thoracic mobility first — the thoracic spine is where lat pulldown and row force actually transfers. Segmental, slow.' },
    { name: 'Thoracic Extension over Foam Roller or Chair Back', reps: '8–10 reps', notes: 'Hands behind the head, extend gently over the roller at mid-back. Opens the thoracic without touching the lumbar. If no roller, use a chair back at shoulder-blade height.' },
    { name: 'Band Pull-Apart or Light Cable Face Pull', reps: '15 reps', notes: 'Rear delts and scapular retractors pre-activated before the main row work.' },
    { name: 'Scapular Wall Slides', reps: '10 reps', notes: 'Same as Push day — the scapular stabilisers are the limiting factor across both sessions; they need direct prep every time.' },
    { name: 'Dead Bug', reps: '8 reps per side', notes: 'Core pre-activation. Especially relevant for lat pulldown where the torso lean temptation is real.' },
  ],
  legs: [
    { name: 'Supine Knee-to-Chest', reps: '8 reps per side', notes: 'Lying on your back, pull one knee to the chest, hold 2–3 seconds, release. Hip flexor and low back release before any leg loading.' },
    { name: 'Glute Bridge (bodyweight)', reps: '12–15 reps', notes: 'Feet flat, drive the hips up, squeeze at the top, controlled down. Glutes activated before the leg press. If the glutes aren\'t firing, the low back compensates.' },
    { name: 'Clamshell', reps: '12 reps per side', notes: 'Side-lying, feet together, rotate the top knee up like a clamshell opening. Hip abductor and glute med activation — directly relevant to leg press tracking.' },
    { name: 'Ankle Circles', reps: '10 reps each direction per foot', notes: 'Dorsiflexion restriction is your main deep squat limiter — prep the ankle before leg press even though range is managed.' },
    { name: 'Cat-Cow', reps: '8 reps', notes: 'Spine baseline, same as every session. Especially relevant before leg press where lumbar position is the critical variable.' },
  ],
};

const COOLDOWN = {
  push: [
    { name: 'Doorway Pec Stretch', reps: '45s per side', notes: 'Forearm on the frame, step through. Pec minor and anterior shoulder — exactly what shortens under chest press and fly load.' },
    { name: 'Cross-Body Shoulder Stretch', reps: '30s per side', notes: 'Pull the arm across the chest, keep the shoulder down. Posterior capsule release.' },
    { name: "Child's Pose", reps: '1 min', notes: 'Decompress the spine, breathe into the belly. Counter the extension bias of pressing.' },
  ],
  pull: [
    { name: 'Doorway Bicep Stretch', reps: '30s per side', notes: 'Arm extended behind you at shoulder height, palm flat on a wall, rotate away. Lengthens the bicep and anterior shoulder after curls.' },
    { name: 'Thread-the-Needle', reps: '5 reps per side', notes: 'On hands and knees, thread one arm under the body and rotate — thoracic rotation and release. Undoes the retraction tension from rows.' },
    { name: "Child's Pose", reps: '1 min', notes: 'Lats and thoracic decompress fully in this position. Hold longer if the upper back feels tight.' },
  ],
  legs: [
    { name: 'Half-Kneeling Hip Flexor Stretch', reps: '45s per side', notes: 'One knee down, drive the hips forward gently, posterior pelvic tilt to deepen. Hip flexors shorten under leg press load and sitting — this is the primary release.' },
    { name: 'Glute Figure-4 Stretch', reps: '45s per side', notes: 'Lying on your back, ankle over opposite knee, draw back. Piriformis and glute release after leg work.' },
    { name: 'Spinal Twist (Supine)', reps: '30s per side', notes: 'Knees to one side, arms out, breathe into the rotation. Lumbar decompression after leg press load on the low back.' },
  ],
};

const PPL_EXERCISES = {
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
        { id: 'al6', name: 'Pallof Press', sets: 3, reps: '10 per side', unilateral: true, notes: 'Side-on to a chest-height cable, press straight out, resist the twist. Anti-rotation — a built-in belt for the spine.' },
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
        { id: 'bp4', name: 'Single-Arm Cable Pushdown', sets: 3, reps: '12–15 per side', unilateral: true, notes: 'Left side sets the working weight. Elbow pinned, full extension at lockout. Single-arm exposes the side-to-side difference the bar hides.' },
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
        { id: 'bl6', name: 'Pallof Press', sets: 3, reps: '10 per side', unilateral: true, notes: 'Anti-rotation, stay rigid against the twist.' },
      ]
    }
  }
};

const DAY_MAP = ['push', 'pull', 'legs', 'push', 'pull', 'legs'];
const DAY_LABELS = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'];

// ── Programs ─────────────────────────────────────────────────
// A session's week, dayIndex and type are what its history records and the CSV carry.
function pplSessions() {
  const sessions = {};
  for (const week of ['A', 'B']) {
    for (const type of ['push', 'pull', 'legs']) {
      const data = PPL_EXERCISES[week][type];
      sessions[`${week}-${type}`] = {
        ...data, week, type,
        heading: `${data.label} Day`,
        title: `Week ${week} • ${data.label}`,
        warmup: WARMUP[type],
        cooldown: COOLDOWN[type]
      };
    }
  }
  return sessions;
}

// v2 reuses the v1 cue for the same exercise, so the wording lives in one place
function v1Cue(name) {
  for (const week of Object.values(PPL_EXERCISES)) {
    for (const day of Object.values(week)) {
      const ex = day.exercises.find(e => e.name === name);
      if (ex) return ex.notes;
    }
  }
  return '';
}

function v2Exercise(id, name, sets, reps, extra) {
  return { id, name, sets, reps, notes: v1Cue(name), ...extra };
}

function mergeRoutines(a, b) {
  return [...a, ...b.filter(x => !a.some(y => y.name === x.name))];
}

function v2Session(label, subtitle, week, dayIndex, type, exercises) {
  const upper = type === 'upper';
  return {
    label, subtitle, week, dayIndex, type, exercises,
    heading: label,
    title: label,
    warmup: upper ? mergeRoutines(WARMUP.push, WARMUP.pull) : WARMUP.legs,
    cooldown: upper ? mergeRoutines(COOLDOWN.push, COOLDOWN.pull) : COOLDOWN.legs
  };
}

const UNILATERAL = { unilateral: true };
const PROBE = { probe: true };

const PROGRAMS = {
  'ppl-v1': {
    name: 'Spine-safe PPL (6-day A/B)',
    constraints: CONSTRAINTS,
    sessions: pplSessions()
  },
  'ul-v2': {
    name: 'Upper/Lower v2 (4-day)',
    // The chest press baseline is a v1 rule
    constraints: CONSTRAINTS.slice(0, 7),
    rotation: ['upperA', 'lowerA', 'upperB', 'lowerB'],
    sessions: {
      upperA: v2Session('Upper A', 'Chest, Shoulders, Back, Arms', 'A', 0, 'upper', [
        v2Exercise('v2ua1', 'Pallof Press', 2, '10 per side', UNILATERAL),
        v2Exercise('v2ua2', 'Machine Chest Press', 3, '10–12'),
        v2Exercise('v2ua3', 'Arnold Press', 2, '10–15'),
        v2Exercise('v2ua4', 'Lat Pulldown', 3, '10–12'),
        v2Exercise('v2ua5', 'Chest-Supported Machine Row', 3, '10–12'),
        v2Exercise('v2ua6', 'Face Pulls', 3, '15'),
        v2Exercise('v2ua7', 'Cable Tricep Pushdown', 2, '12–15'),
        v2Exercise('v2ua8', 'Incline Dumbbell Curl', 2, '10–12'),
      ]),
      lowerA: v2Session('Lower A', 'Legs & Core', 'A', 1, 'lower', [
        v2Exercise('v2la1', 'Pallof Press', 2, '10 per side', UNILATERAL),
        v2Exercise('v2la2', 'Leg Press', 3, '10–12'),
        v2Exercise('v2la3', 'Leg Extension', 3, '12–15'),
        v2Exercise('v2la4', 'Seated Leg Curl', 3, '12–15'),
        v2Exercise('v2la5', 'Seated Calf Raise', 3, '15'),
        v2Exercise('v2la6', 'Cable Pull-Through', 2, '12–15', PROBE),
      ]),
      upperB: v2Session('Upper B', 'Shoulders, Back, Chest, Arms', 'B', 2, 'upper', [
        v2Exercise('v2ub1', 'Pallof Press', 2, '10 per side', UNILATERAL),
        v2Exercise('v2ub2', 'Arnold Press', 3, '10–15'),
        v2Exercise('v2ub3', 'Lat Pulldown (close/neutral grip)', 3, '10–12', { notes: 'Lean from the hips only, drive with the elbows.' }),
        v2Exercise('v2ub4', 'Seated Cable Row', 3, '10–12'),
        v2Exercise('v2ub5', 'Machine Chest Press', 2, '12–15'),
        v2Exercise('v2ub6', 'Pec Deck', 2, '12–15'),
        v2Exercise('v2ub7', 'Face Pulls', 3, '15'),
        v2Exercise('v2ub8', 'Seated Hammer Curl', 2, '10–12'),
      ]),
      lowerB: v2Session('Lower B', 'Legs & Core', 'B', 3, 'lower', [
        v2Exercise('v2lb1', 'Pallof Press', 2, '10 per side', UNILATERAL),
        v2Exercise('v2lb2', 'Lying Leg Curl', 3, '12–15'),
        v2Exercise('v2lb3', 'Leg Press', 2, '12–15'),
        v2Exercise('v2lb4', 'Leg Extension', 2, '12–15'),
        v2Exercise('v2lb5', 'Glute Bridge (bodyweight)', 2, '12–15', { bodyweight: true, notes: 'Feet flat, drive the hips up, squeeze at the top, controlled down. If the glutes aren\'t firing, the low back compensates.' }),
        v2Exercise('v2lb6', 'Machine Hip Thrust', 2, '12–15', PROBE),
        v2Exercise('v2lb7', 'Seated Calf Raise', 3, '15'),
      ]),
    }
  }
};

// ── Storage ──────────────────────────────────────────────────
function load(key, fallback) {
  try { const v = localStorage.getItem('sst_' + key); return v ? JSON.parse(v) : fallback; }
  catch { return fallback; }
}
function save(key, val) { localStorage.setItem('sst_' + key, JSON.stringify(val)); }

// ── State ────────────────────────────────────────────────────
let programId = load('program', 'ppl-v1');
if (!PROGRAMS[programId]) programId = 'ppl-v1';
let schedule = load('schedule', { week: 'A', dayIndex: 0 });
let pickedSession = null;
let history = load('history', []);
let customExercises = load('custom', []);
let overrides = load('overrides', {});
let activeSession = load('active', null);
let timerInterval = null;
let timerStart = 0;
let restInterval = null;
let audioCtx = null;
let detailIndex = null;
let programEditId = null;

const REST_SECONDS = 90;
// A longer session was left open rather than trained
const MAX_DURATION = 4 * 60 * 60;

// Reps in reserve is stored as the index here, so 5 means "5 or more"
const RIR_LABELS = ['0', '1', '2', '3', '4', '5+'];
const SIDES = ['Both', 'L', 'R'];
const PROBE_STATUSES = ['no symptoms', 'symptoms', 'not done'];
const PROBE_SIDES = ['L', 'R', 'Both', 'Centre'];

// ── Helpers ──────────────────────────────────────────────────
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function saveSession() { save('active', activeSession); }

// Records and custom exercises saved before there was a second program carry no program or session
function programOf(rec) { return rec.program || 'ppl-v1'; }
function sessionKeyOf(rec) { return rec.session || `${rec.week}-${rec.type}`; }

function findSession(rec) {
  const program = PROGRAMS[programOf(rec)];
  return (program && program.sessions[sessionKeyOf(rec)]) || null;
}

// Falls back to what the record itself says, so a session that has left the program still displays
function sessionOf(rec) {
  return findSession(rec) || {
    heading: String(rec.type), title: `Week ${rec.week} • ${rec.type}`, warmup: [], cooldown: [], exercises: []
  };
}

// v2 keeps no pointer: the next session follows whichever one was logged last
function nextRotationKey() {
  const order = PROGRAMS[programId].rotation;
  for (let i = history.length - 1; i >= 0; i--) {
    const at = programOf(history[i]) === programId ? order.indexOf(history[i].session) : -1;
    if (at >= 0) return order[(at + 1) % order.length];
  }
  return order[0];
}

function todaySessionKey() {
  const program = PROGRAMS[programId];
  if (!program.rotation) return `${schedule.week}-${DAY_MAP[schedule.dayIndex]}`;
  return program.sessions[pickedSession] ? pickedSession : nextRotationKey();
}

function findDefaultExercise(id) {
  for (const program of Object.values(PROGRAMS)) {
    for (const session of Object.values(program.sessions)) {
      const ex = session.exercises.find(e => e.id === id);
      if (ex) return ex;
    }
  }
  return null;
}

function getExercisesFor(program, key) {
  const base = PROGRAMS[program].sessions[key].exercises.map(ex => ({ ...ex, ...overrides[ex.id] }));
  const custom = customExercises.filter(c => programOf(c) === program && sessionKeyOf(c) === key);
  return [...base, ...custom];
}

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short' });
}

function localDate(d) {
  const dt = new Date(d);
  return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
}

function formatDuration(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

// Matched on name, not id, so an exercise that appears in both Week A and Week B has one record.
function getLastSets(name) {
  for (let i = history.length - 1; i >= 0; i--) {
    const ex = history[i].exercises.find(e => e.name === name);
    const done = ex ? ex.sets.filter(s => s.completed && s.reps > 0) : [];
    if (done.length) return { date: history[i].date, sets: done };
  }
  return null;
}

// The first "10–12" or lone "15" in a reps target such as "10–12", "15" or "10 per side"
function repRange(reps) {
  const m = /(\d+)(?:\s*[–-]\s*(\d+))?/.exec(String(reps || ''));
  return m ? { min: Number(m[1]), max: Number(m[2] || m[1]) } : null;
}

// True when the last two sessions of an exercise both had every set at the top of its range
// with at least 2 reps in reserve. Workouts logged before the range and RIR were kept never count.
function suggestIncrease(name) {
  const recent = [];
  for (let i = history.length - 1; i >= 0 && recent.length < 2; i--) {
    const ex = history[i].exercises.find(e => e.name === name);
    if (ex) recent.push(ex);
  }
  return recent.length === 2 && recent.every(ex => {
    const range = repRange(ex.targetReps);
    return !!range && ex.sets.length > 0 &&
      ex.sets.every(s => s.completed && s.weight > 0 && s.reps >= range.max && s.rir >= 2);
  });
}

// Compared with the last set ticked before it, not with what was planned
function loadChanged(ex, si) {
  if (!ex.sets[si].completed) return false;
  for (let i = si - 1; i >= 0; i--) {
    if (ex.sets[i].completed) return ex.sets[i].weight !== ex.sets[si].weight;
  }
  return false;
}

// A probe that was attempted has to be reported on. One that was never touched is saved as not done.
function probeUnreported(ex) {
  if (!ex.probe) return false;
  const r = ex.probeResult;
  if (!r) return ex.sets.some(s => s.completed);
  return r.status === 'symptoms' && (!r.side || !String(r.location || '').trim() || r.sensation == null);
}

function probeRecord(ex) {
  const r = ex.probeResult;
  if (!r) return { status: 'not done' };
  if (r.status !== 'symptoms') return { status: r.status };
  return { status: r.status, side: r.side, location: r.location.trim(), sensation: r.sensation };
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
  $('#constraints-body').innerHTML = PROGRAMS[programId].constraints.map(c => `<div class="constraint-item">${c}</div>`).join('');
}

function toggleConstraints(header) {
  const body = header.nextElementSibling;
  body.classList.toggle('open');
  header.querySelector('.chevron').style.transform = body.classList.contains('open') ? '' : 'rotate(180deg)';
}

// ── Today View ───────────────────────────────────────────────
function renderToday() {
  const program = PROGRAMS[programId];
  const key = todaySessionKey();
  const data = program.sessions[key];
  if (program.rotation) {
    const next = nextRotationKey();
    $('#week-badge').textContent = key === next ? 'Next in rotation' : 'Your pick';
    $('#sel-session').innerHTML = program.rotation.map(k =>
      `<option value="${k}">${program.sessions[k].title}${k === next ? ' (next)' : ''}</option>`).join('');
    $('#sel-session').value = key;
  } else {
    $('#week-badge').textContent = `Week ${schedule.week} • ${DAY_LABELS[schedule.dayIndex]}`;
  }
  $('#today-pick').classList.toggle('hidden', !program.rotation);
  $('#today-workout-name').textContent = data.heading;
  $('#today-workout-subtitle').textContent = data.subtitle;
  $('#backup-prompt').classList.toggle('hidden', load('backupPrompted', false));

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
  const program = PROGRAMS[programId];
  const key = todaySessionKey();
  const session = program.sessions[key];
  const exercises = getExercisesFor(programId, key);

  activeSession = {
    program: programId,
    session: key,
    week: session.week,
    dayIndex: program.rotation ? session.dayIndex : schedule.dayIndex,
    type: session.type,
    startTime: Date.now(),
    notes: '',
    restEnd: 0,
    exercises: exercises.map(ex => {
      const last = getLastSets(ex.name);
      return {
        id: ex.id,
        name: ex.name,
        notes: ex.notes,
        probe: ex.probe || false,
        bodyweight: ex.bodyweight || false,
        unilateral: ex.unilateral || false,
        targetSets: ex.sets,
        targetReps: ex.reps,
        // Start each set from what was done last time, so only changes need typing
        sets: Array.from({ length: ex.sets }, (_, i) => {
          const prev = last ? last.sets[Math.min(i, last.sets.length - 1)] : null;
          return { weight: prev ? prev.weight : 0, reps: prev ? prev.reps : 0, completed: false };
        })
      };
    })
  };

  saveSession();
  resumeWorkout();
}

// Also runs on load, to pick up a workout that was in progress when the app was closed
function resumeWorkout() {
  // A workout started before an update has none of the flags that update added
  activeSession.exercises.forEach(ex => {
    if (ex.bodyweight !== undefined) return;
    const def = findDefaultExercise(ex.id) || customExercises.find(c => c.id === ex.id) || {};
    ex.bodyweight = !!def.bodyweight;
    ex.unilateral = !!def.unilateral;
  });

  timerStart = activeSession.startTime;
  clearInterval(timerInterval);
  timerInterval = setInterval(updateTimer, 1000);
  updateTimer();

  renderWorkoutExercises();
  runRestTimer();
  showWorkoutView();
}

function showWorkoutView() {
  $$('.view').forEach(v => v.classList.remove('active'));
  $('#view-workout').classList.add('active');
  $('#header-title').textContent = sessionOf(activeSession).heading;
  $('#header-action').textContent = 'Cancel';
  $('#header-action').classList.remove('hidden');
  $('nav').style.display = 'none';
}

function updateTimer() {
  const elapsed = Math.floor((Date.now() - timerStart) / 1000);
  $('#timer-display').textContent = formatDuration(elapsed);
}

// Rest is measured against the clock, so it stays right while the phone is locked
function restRemaining() {
  if (!activeSession || !activeSession.restEnd) return 0;
  return Math.max(0, Math.ceil((activeSession.restEnd - Date.now()) / 1000));
}

function startRestTimer() {
  activeSession.restEnd = Date.now() + REST_SECONDS * 1000;
  runRestTimer();
}

function runRestTimer() {
  clearInterval(restInterval);
  renderRestTimer();
  if (restRemaining() <= 0) return;
  restInterval = setInterval(() => {
    if (restRemaining() > 0) { renderRestTimer(); return; }
    // No alert if the rest ran out a while ago with the app in the background
    const justEnded = Date.now() - activeSession.restEnd < 3000;
    stopRestTimer();
    saveSession();
    if (justEnded) restDoneAlert();
  }, 250);
}

function stopRestTimer() {
  clearInterval(restInterval);
  if (activeSession) activeSession.restEnd = 0;
  renderRestTimer();
}

function skipRestTimer() {
  stopRestTimer();
  saveSession();
}

function renderRestTimer() {
  const el = $('#rest-timer');
  if (!el) return;
  const remaining = restRemaining();
  if (remaining <= 0) {
    el.classList.add('hidden');
  } else {
    el.classList.remove('hidden');
    $('#rest-countdown').textContent = formatDuration(remaining);
    const pct = (remaining / REST_SECONDS) * 100;
    $('#rest-bar-fill').style.width = pct + '%';
    $('#rest-bar-fill').style.background = remaining <= 15 ? 'var(--success)' : 'var(--primary)';
  }
}

// Browsers only allow sound that starts from a tap, so this is called when a set is ticked
function primeAudio() {
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
  } catch {}
}

function restDoneAlert() {
  if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
  if (!audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.4);
  } catch {}
}

function chipHTML(label, on, call) {
  return `<button class="chip ${on ? 'on' : ''}" onclick="${call}">${label}</button>`;
}

function probeReportHTML(ex, ei) {
  const r = ex.probeResult || {};
  return `
    <div class="probe-report">
      <div class="extra-label">Probe result</div>
      <div class="chip-group">
        ${PROBE_STATUSES.map(s => chipHTML(s[0].toUpperCase() + s.slice(1), r.status === s, `setProbe(${ei},'${s}')`)).join('')}
      </div>
      ${r.status === 'symptoms' ? `
        <div class="chip-group">
          <span class="extra-label">Side</span>
          ${PROBE_SIDES.map(s => chipHTML(s, r.side === s, `updateProbe(${ei},'side','${s}')`)).join('')}
        </div>
        <input class="input" type="text" placeholder="Where? e.g. lower back" aria-label="Location"
          value="${esc(r.location || '')}" oninput="updateProbe(${ei},'location',this.value)">
        <label class="chip-group">
          <span class="extra-label">Sensation 0–10</span>
          <select onchange="updateProbe(${ei},'sensation',this.value)">
            <option value="">–</option>
            ${Array.from({ length: 11 }, (_, n) => `<option ${r.sensation === n ? 'selected' : ''}>${n}</option>`).join('')}
          </select>
        </label>
      ` : ''}
    </div>
  `;
}

function exerciseCardHTML(ex, ei, open) {
  const allDone = ex.sets.every(s => s.completed);
  const last = getLastSets(ex.name);
  const noteOpen = ex.noteOpen || ex.userNote;
  return `
    <div class="exercise-header ${ex.probe ? 'probe-header' : ''}" onclick="toggleExercise(${ei})">
      <div class="ex-check ${allDone ? 'done' : ''}"></div>
      <span class="ex-name">${esc(ex.name)}${ex.probe ? ' <span class="probe-badge">PROBE</span>' : ''}</span>
      <span class="ex-meta">${ex.targetSets}×${esc(ex.targetReps)}</span>
    </div>
    <div class="exercise-body ${open ? 'open' : ''}" id="ex-body-${ei}">
      ${ex.notes ? `<div class="exercise-notes">${esc(ex.notes)}</div>` : ''}
      ${last ? `<div class="prev-weight">Last time (${formatDate(last.date)}): ${last.sets.map(s => `${s.weight} kg × ${s.reps}`).join(' · ')}</div>` : ''}
      ${!ex.probe && suggestIncrease(ex.name) ? '<div class="suggestion">All sets at the top of the range at 2–3 RIR in the last two sessions — consider the smallest increment.</div>' : ''}
      ${ex.sets.map((set, si) => `
        <div class="set-row">
          <span class="set-label">${si + 1}</span>
          <input class="set-input" type="number" inputmode="decimal" placeholder="kg"
            value="${set.weight || ''}" oninput="this.classList.remove('invalid');updateSet(${ei},${si},'weight',this.value)"
            onchange="fillWeightDown(${ei},${si})">
          <span class="set-unit">kg</span>
          <input class="set-input" type="number" inputmode="numeric" placeholder="reps"
            value="${set.reps || ''}" oninput="this.classList.remove('invalid');updateSet(${ei},${si},'reps',this.value)">
          <span class="set-unit">reps</span>
          <button class="set-check-btn ${set.completed ? 'done' : ''}"
            onclick="toggleSet(${ei},${si})"></button>
        </div>
        <div class="set-extra">
          <span class="chip-group">
            <span class="extra-label">RIR</span>
            ${RIR_LABELS.map((label, rir) => chipHTML(label, set.rir === rir, `setRir(${ei},${si},${rir})`)).join('')}
          </span>
          ${ex.unilateral ? `
            <span class="chip-group">
              <span class="extra-label">Side</span>
              ${SIDES.map(s => chipHTML(s, (set.side || 'Both') === s, `setSide(${ei},${si},'${s}')`)).join('')}
            </span>
          ` : ''}
          ${loadChanged(ex, si) ? '<span class="load-tag">load changed</span>' : ''}
        </div>
      `).join('')}
      <div class="set-actions">
        <button class="btn-small" onclick="addSet(${ei})">+ Add set</button>
        ${ex.sets.length > ex.targetSets ? `<button class="btn-small btn-small-muted" onclick="removeSet(${ei})">Remove last</button>` : ''}
        ${noteOpen ? '' : `<button class="btn-small btn-small-muted" onclick="openNote(${ei})">Add note</button>`}
      </div>
      ${noteOpen ? `<textarea class="session-notes-textarea exercise-note" placeholder="Note for this exercise" aria-label="Exercise note"
        oninput="updateExerciseNote(${ei},this.value)">${esc(ex.userNote || '')}</textarea>` : ''}
      ${ex.probe ? probeReportHTML(ex, ei) : ''}
    </div>
  `;
}

// Redraws one exercise only, so everything else on the page stays as the user left it
function refreshExercise(ei) {
  const open = $(`#ex-body-${ei}`).classList.contains('open');
  $(`#ex-card-${ei}`).innerHTML = exerciseCardHTML(activeSession.exercises[ei], ei, open);
}

function renderWorkoutExercises() {
  const sessionWarmup = sessionOf(activeSession).warmup;
  const sessionCooldown = sessionOf(activeSession).cooldown;

  // Warmup
  $('#warmup-section').innerHTML = `
    <div class="section-label">Warm-Up (6–8 min)</div>
    <div class="routine-card">
      <div class="routine-header" onclick="toggleRoutine(this)">
        <span class="name">Warm-Up Routine</span>
        <span class="chevron">▼</span>
      </div>
      <div class="routine-body">
        ${sessionWarmup.map(e => `
          <div class="routine-item"><strong>${e.name}</strong> — ${e.reps}<br>${e.notes}</div>
        `).join('')}
      </div>
    </div>
  `;

  // Main exercises
  const container = $('#exercise-list');
  container.innerHTML = '<div class="section-label">Exercises</div>';

  activeSession.exercises.forEach((ex, ei) => {
    const card = document.createElement('div');
    card.className = 'exercise-card';
    card.id = `ex-card-${ei}`;
    card.innerHTML = exerciseCardHTML(ex, ei, false);
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
        ${sessionCooldown.map(e => `
          <div class="routine-item"><strong>${e.name}</strong> — ${e.reps}<br>${e.notes}</div>
        `).join('')}
      </div>
    </div>
    <div class="section-label">Session Notes</div>
    <div class="session-notes-card">
      <label for="session-notes-input">How did it go?</label>
      <textarea id="session-notes-input" class="session-notes-textarea"
        placeholder="e.g. felt strong today, increased weight on shoulder press, right shoulder a bit tight..."
        oninput="updateNotes(this.value)">${esc(activeSession.notes || '')}</textarea>
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
  saveSession();
}

// With nothing from last time to start from, a weight typed in one set carries down to the empty ones below.
// The inputs are filled in place: redrawing the card here would take the focus from the field just tapped.
function fillWeightDown(ei, si) {
  if (!activeSession) return;
  const sets = activeSession.exercises[ei].sets;
  const rows = $$(`#ex-body-${ei} .set-row`);
  for (let i = si + 1; i < sets.length; i++) {
    if (sets[i].completed || sets[i].weight) continue;
    sets[i].weight = sets[si].weight;
    rows[i].querySelector('.set-input').value = sets[si].weight || '';
  }
  saveSession();
}

function updateNotes(value) {
  if (!activeSession) return;
  activeSession.notes = value;
  saveSession();
}

// Tapping the chosen value again clears it
function setRir(ei, si, rir) {
  if (!activeSession) return;
  const set = activeSession.exercises[ei].sets[si];
  set.rir = set.rir === rir ? null : rir;
  saveSession();
  refreshExercise(ei);
}

function setSide(ei, si, side) {
  if (!activeSession) return;
  activeSession.exercises[ei].sets[si].side = side;
  saveSession();
  refreshExercise(ei);
}

function openNote(ei) {
  if (!activeSession) return;
  activeSession.exercises[ei].noteOpen = true;
  saveSession();
  refreshExercise(ei);
  $(`#ex-card-${ei} .exercise-note`).focus();
}

function updateExerciseNote(ei, value) {
  if (!activeSession) return;
  activeSession.exercises[ei].userNote = value;
  saveSession();
}

function setProbe(ei, status) {
  if (!activeSession) return;
  const ex = activeSession.exercises[ei];
  ex.probeResult = ex.probeResult && ex.probeResult.status === status ? null : { ...ex.probeResult, status };
  saveSession();
  refreshExercise(ei);
}

function updateProbe(ei, field, value) {
  if (!activeSession) return;
  const r = activeSession.exercises[ei].probeResult;
  r[field] = field === 'sensation' ? (value === '' ? null : Number(value)) : value;
  saveSession();
  if (field === 'side') refreshExercise(ei);
}

function toggleSet(ei, si) {
  if (!activeSession) return;
  const ex = activeSession.exercises[ei];
  const set = ex.sets[si];

  // A set needs reps before it counts, and a weight too unless the exercise is bodyweight
  if (!set.completed) {
    const [weightInput, repsInput] = $$(`#ex-body-${ei} .set-row`)[si].querySelectorAll('.set-input');
    const missing = [];
    if (!(set.weight > 0) && !ex.bodyweight) missing.push(weightInput);
    if (!(set.reps > 0)) missing.push(repsInput);
    if (missing.length) {
      missing.forEach(input => input.classList.add('invalid'));
      missing[0].focus();
      return;
    }
  }

  set.completed = !set.completed;
  const workoutDone = activeSession.exercises.every(e => e.sets.every(s => s.completed));
  if (set.completed && !workoutDone) {
    primeAudio();
    startRestTimer();
  } else {
    stopRestTimer();
  }
  saveSession();
  refreshExercise(ei);
}

function addSet(ei) {
  if (!activeSession) return;
  const sets = activeSession.exercises[ei].sets;
  const prev = sets[sets.length - 1];
  sets.push({ weight: prev ? prev.weight : 0, reps: prev ? prev.reps : 0, completed: false, ...(prev && prev.side && { side: prev.side }) });
  saveSession();
  refreshExercise(ei);
}

function removeSet(ei) {
  if (!activeSession) return;
  const ex = activeSession.exercises[ei];
  if (ex.sets.length <= ex.targetSets) return;
  ex.sets.pop();
  saveSession();
  refreshExercise(ei);
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

  const unreported = activeSession.exercises.findIndex(probeUnreported);
  if (unreported >= 0) {
    alert(`Record the probe result for ${activeSession.exercises[unreported].name} before finishing.`);
    $(`#ex-body-${unreported}`).classList.add('open');
    $(`#ex-card-${unreported} .probe-report`).scrollIntoView({ block: 'center' });
    return;
  }

  if (completedSets < totalSets) {
    if (!confirm(`You've completed ${completedSets}/${totalSets} sets. Finish anyway?`)) return;
  }

  const elapsed = Math.floor((Date.now() - timerStart) / 1000);
  // A workout left open for hours has no duration worth keeping
  const leftOpen = elapsed > MAX_DURATION;

  const record = {
    // Dated by when it began, so a workout closed days late still lands on the day it was done
    date: new Date(activeSession.startTime).toISOString(),
    finished: new Date().toISOString(),
    program: programOf(activeSession),
    session: sessionKeyOf(activeSession),
    week: activeSession.week,
    dayIndex: activeSession.dayIndex,
    type: activeSession.type,
    duration: leftOpen ? null : elapsed,
    ...(leftOpen && { durationInvalid: true }),
    notes: activeSession.notes || '',
    exercises: activeSession.exercises.map(e => ({
      id: e.id,
      name: e.name,
      targetReps: e.targetReps,
      // Unticked sets still hold their prefilled numbers, which were never lifted.
      // An added set that was never done is dropped rather than recorded as skipped.
      sets: e.sets.map((s, i) => s.completed ? {
        weight: s.weight, reps: s.reps, completed: true,
        ...(s.rir != null && { rir: s.rir }),
        ...(e.unilateral && { side: s.side || 'Both' }),
        ...(loadChanged(e, i) && { loadChanged: true })
      } : i < e.targetSets ? { weight: 0, reps: 0, completed: false } : null).filter(Boolean),
      ...(e.userNote && e.userNote.trim() && { userNote: e.userNote.trim() }),
      ...(e.probe && { probeResult: probeRecord(e) })
    }))
  };

  history.push(record);
  save('history', history);

  if (!PROGRAMS[record.program].rotation) advanceSchedule();
  pickedSession = null;
  endSession();
  if (leftOpen) alert('This workout was open for more than 4 hours, so no duration was recorded. It is saved under the day it was started.');
}

function cancelWorkout() {
  if (activeSession && !confirm('Cancel this workout? Progress will be lost.')) return;
  endSession();
}

function endSession() {
  clearInterval(timerInterval);
  activeSession = null;
  saveSession();
  stopRestTimer();
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
    const completedSets = h.exercises.reduce((s, e) => s + e.sets.filter(st => st.completed).length, 0);
    return `
      <div class="history-item" onclick="showHistoryDetail(${realIdx})">
        <div class="hi-left">
          <h4>${esc(sessionOf(h).title)}</h4>
          <p>${completedSets} sets completed</p>
        </div>
        <div class="hi-right">
          <div class="hi-date">${formatDate(h.date)}</div>
          <div class="hi-duration">${h.duration == null ? '—' : formatDuration(h.duration)}</div>
        </div>
      </div>
    `;
  }).join('');
}

function setExtras(s) {
  const extras = [s.rir != null ? `RIR ${RIR_LABELS[s.rir]}` : '', s.side || '', s.loadChanged ? 'load changed' : ''];
  return extras.filter(Boolean).map(x => ` · ${esc(x)}`).join('');
}

function probeText(r) {
  return r.status === 'symptoms' ? `symptoms — ${r.side}, ${r.location}, ${r.sensation}/10` : r.status;
}

function showHistoryDetail(index, editing = false) {
  const h = history[index];
  if (!h) return;
  detailIndex = index;

  $('#detail-title').textContent = `${sessionOf(h).title} — ${formatDate(h.date)}`;
  $('#detail-content').innerHTML = editing ? `
    ${h.exercises.map((e, ei) => `
      <div style="margin-bottom:12px">
        <strong style="font-size:17px">${esc(e.name)}</strong>
        ${e.sets.map((s, si) => `
          <div class="set-row" data-ei="${ei}" data-si="${si}">
            <span class="set-label">${si + 1}</span>
            <input class="set-input" type="number" inputmode="decimal" placeholder="kg" value="${s.weight || ''}">
            <span class="set-unit">kg</span>
            <input class="set-input" type="number" inputmode="numeric" placeholder="reps" value="${s.reps || ''}">
            <span class="set-unit">reps</span>
            <input class="edit-done" type="checkbox" aria-label="Completed" ${s.completed ? 'checked' : ''}>
          </div>
        `).join('')}
      </div>
    `).join('')}
    <textarea id="edit-notes" class="session-notes-textarea" placeholder="Session notes">${esc(h.notes || '')}</textarea>
  ` : `
    ${h.notes ? `<div class="detail-notes">${esc(h.notes)}</div>` : ''}
    ${h.exercises.map(e => `
      <div style="margin-bottom:12px">
        <strong style="font-size:17px">${esc(e.name)}</strong>
        ${e.sets.map((s, i) => `
          <div style="font-size:15px;color:var(--text-light);padding:2px 0 2px 8px">
            Set ${i + 1}: ${s.completed ? `${s.weight}kg × ${s.reps} reps ✓${setExtras(s)}` : '— skipped'}
          </div>
        `).join('')}
        ${e.userNote ? `<div style="font-size:15px;color:var(--text-light);padding:2px 0 2px 8px">Note: ${esc(e.userNote)}</div>` : ''}
        ${e.probeResult ? `<div style="font-size:15px;color:var(--text-light);padding:2px 0 2px 8px">Probe: ${esc(probeText(e.probeResult))}</div>` : ''}
      </div>
    `).join('')}
  `;

  $('#detail-actions-view').classList.toggle('hidden', editing);
  $('#detail-actions-edit').classList.toggle('hidden', !editing);
  $('#modal-detail').classList.remove('hidden');
}

function saveHistoryEdit() {
  const h = history[detailIndex];
  if (!h) return;
  $$('#detail-content .set-row').forEach(row => {
    const set = h.exercises[row.dataset.ei].sets[row.dataset.si];
    const [weight, reps] = row.querySelectorAll('.set-input');
    set.weight = parseFloat(weight.value) || 0;
    set.reps = parseFloat(reps.value) || 0;
    set.completed = row.querySelector('.edit-done').checked;
  });
  h.notes = $('#edit-notes').value;
  save('history', history);
  renderHistory();
  showHistoryDetail(detailIndex);
}

function deleteHistoryEntry() {
  if (!history[detailIndex]) return;
  if (!confirm('Delete this workout from history? This cannot be undone.')) return;
  history.splice(detailIndex, 1);
  save('history', history);
  $('#modal-detail').classList.add('hidden');
  renderHistory();
}

// ── Manage View ──────────────────────────────────────────────
function renderManage() {
  const program = PROGRAMS[programId];
  $('#sel-active-program').value = programId;
  $('#manage-schedule').classList.toggle('hidden', !!program.rotation);
  $('#rotation-note').classList.toggle('hidden', !program.rotation);
  $('#sel-week').value = schedule.week;
  $('#sel-day').value = schedule.dayIndex;

  const sessions = Object.entries(program.sessions).map(([key, s]) => `<option value="${key}">${s.title}</option>`).join('');
  $('#sel-program').innerHTML = sessions;
  $('#add-target').innerHTML = sessions;
  $('#sel-program').value = todaySessionKey();
  renderProgram();

  const container = $('#custom-exercise-list');
  if (customExercises.length === 0) {
    container.innerHTML = '<p style="font-size:16px;color:var(--text-light)">No custom exercises added yet.</p>';
  } else {
    container.innerHTML = customExercises.map((c, i) => `
      <div class="custom-ex-item">
        <div class="cex-info">
          ${esc(c.name)}
          <small>${esc(sessionOf(c).title)} • ${c.sets}×${esc(c.reps)}</small>
        </div>
        <button class="custom-ex-remove" onclick="removeCustomExercise(${i})">×</button>
      </div>
    `).join('');
  }
}

// Sets, reps and cues of the built-in program can be changed here; the edits are kept
// as overrides so the original is still there to reset to.
function renderProgram() {
  $('#program-list').innerHTML = PROGRAMS[programId].sessions[$('#sel-program').value].exercises.map(base => {
    const ex = { ...base, ...overrides[base.id] };
    return `
      <div class="custom-ex-item">
        <div class="cex-info">
          ${esc(ex.name)}
          <small>${ex.sets}×${esc(ex.reps)}${overrides[base.id] ? ' • edited' : ''}</small>
        </div>
        <button class="btn-small" onclick="editProgramExercise('${base.id}')">Edit</button>
      </div>
    `;
  }).join('');
}

function editProgramExercise(id) {
  const ex = { ...findDefaultExercise(id), ...overrides[id] };
  programEditId = id;
  $('#program-title').textContent = ex.name;
  $('#prog-sets').value = ex.sets;
  $('#prog-reps').value = ex.reps;
  $('#prog-notes').value = ex.notes;
  $('#btn-prog-reset').disabled = !overrides[id];
  $('#modal-program').classList.remove('hidden');
}

function saveProgramExercise() {
  const base = findDefaultExercise(programEditId);
  overrides[programEditId] = {
    sets: Math.max(1, parseInt($('#prog-sets').value) || base.sets),
    reps: $('#prog-reps').value.trim() || base.reps,
    notes: $('#prog-notes').value.trim()
  };
  save('overrides', overrides);
  $('#modal-program').classList.add('hidden');
  renderProgram();
}

function resetProgramExercise() {
  delete overrides[programEditId];
  save('overrides', overrides);
  $('#modal-program').classList.add('hidden');
  renderProgram();
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
  const session = $('#add-target').value;
  const { week, type } = PROGRAMS[programId].sessions[session];

  if (!name) { alert('Please enter an exercise name.'); return; }

  customExercises.push({
    id: 'custom_' + Date.now(),
    name, sets, reps, notes, week, type,
    program: programId, session,
    bodyweight: $('#add-bodyweight').checked
  });
  save('custom', customExercises);

  $('#add-name').value = '';
  $('#add-notes').value = '';
  $('#add-sets').value = '3';
  $('#add-reps').value = '';
  $('#add-bodyweight').checked = false;
  $('#modal-add').classList.add('hidden');
  renderManage();
}

function exportHistory() {
  if (history.length === 0) { alert('No history to export.'); return; }
  // The first 11 columns are the original export and must not change; new columns only go on the end
  const lines = ['Date,Week,Day,Session Type,Exercise,Set,Weight (kg),Reps,Completed,Duration (s),Notes,' +
    'Program,RIR,Side,Exercise Notes,Probe Result,Probe Side,Probe Location,Probe Sensation,Flags'];
  history.forEach(h => {
    const dayLabel = DAY_LABELS[h.dayIndex] || '';
    const dateStr = localDate(h.date);
    h.exercises.forEach(e => {
      e.sets.forEach((s, i) => {
        const notes = i === 0 ? csvCell(h.notes || '') : '';
        const duration = i === 0 ? h.duration ?? '' : '';
        const probe = (i === 0 && e.probeResult) || {};
        const flags = [
          i === 0 && (h.durationInvalid || h.duration > MAX_DURATION) ? 'duration-invalid' : '',
          s.loadChanged ? 'load-changed' : ''
        ].filter(Boolean).join(';');
        lines.push(`${dateStr},${h.week},${dayLabel},${h.type},${csvCell(e.name)},${i + 1},${s.weight || ''},${s.reps || ''},${s.completed},${duration},${notes}` +
          `,${programOf(h)},${s.rir == null ? '' : RIR_LABELS[s.rir]},${s.side || ''},${i === 0 ? csvCell(e.userNote || '') : ''}` +
          `,${probe.status || ''},${probe.side || ''},${csvCell(probe.location || '')},${probe.sensation ?? ''},${flags}`);
      });
    });
  });
  downloadFile('spine-safe-history.csv', lines.join('\n'), 'text/csv');
}

function csvCell(value) {
  const s = String(value);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function downloadFile(filename, text, type) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type }));
  a.download = filename;
  a.click();
}

// The backup holds everything the app stores, so it can be restored on this or another device
function exportBackup() {
  const backup = {
    app: 'spine-safe-tracker',
    version: 2,
    exported: new Date().toISOString(),
    program: programId,
    schedule, history, customExercises, overrides
  };
  downloadFile(`spine-safe-backup-${localDate(new Date())}.json`, JSON.stringify(backup, null, 2), 'application/json');
}

function dismissBackupPrompt() {
  save('backupPrompted', true);
  $('#backup-prompt').classList.add('hidden');
}

async function importBackup(file) {
  let data = null;
  try { data = JSON.parse(await file.text()); } catch {}
  const valid = data && data.app === 'spine-safe-tracker' && Array.isArray(data.history) &&
    data.history.every(h => h && findSession(h) && Array.isArray(h.exercises));
  if (!valid) { alert('That file is not a Spine-Safe Tracker backup.'); return; }
  if (!confirm(`Replace everything on this device with the backup (${data.history.length} workouts)? This cannot be undone.`)) return;

  history = data.history;
  customExercises = Array.isArray(data.customExercises) ? data.customExercises : [];
  overrides = data.overrides || {};
  schedule = data.schedule || { week: 'A', dayIndex: 0 };
  // A version 1 backup predates the second program
  programId = PROGRAMS[data.program] ? data.program : 'ppl-v1';
  pickedSession = null;
  save('history', history);
  save('custom', customExercises);
  save('overrides', overrides);
  save('schedule', schedule);
  save('program', programId);
  renderManage();
  alert('Backup restored.');
}

function clearAllData() {
  if (!confirm('This will delete ALL workout history, custom exercises and program edits. Are you sure?')) return;
  if (!confirm('Really? This cannot be undone.')) return;
  history = [];
  customExercises = [];
  overrides = {};
  schedule = { week: 'A', dayIndex: 0 };
  save('history', history);
  save('custom', customExercises);
  save('overrides', overrides);
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
  $('#sel-session').addEventListener('change', () => {
    pickedSession = $('#sel-session').value;
    renderToday();
  });
  $('#btn-prompt-backup').addEventListener('click', () => {
    exportBackup();
    dismissBackupPrompt();
  });
  $('#btn-prompt-dismiss').addEventListener('click', dismissBackupPrompt);

  // Workout
  $('#btn-finish').addEventListener('click', finishWorkout);
  $('#header-action').addEventListener('click', cancelWorkout);

  // Manage
  $('#sel-active-program').innerHTML = Object.entries(PROGRAMS).map(([id, p]) => `<option value="${id}">${p.name}</option>`).join('');
  $('#sel-active-program').addEventListener('change', () => {
    // The workout view hides the nav, so this is only a backstop
    if (activeSession) { $('#sel-active-program').value = programId; return; }
    programId = $('#sel-active-program').value;
    pickedSession = null;
    save('program', programId);
    renderManage();
  });
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
  $('#sel-program').addEventListener('change', renderProgram);
  $('#btn-prog-save').addEventListener('click', saveProgramExercise);
  $('#btn-prog-reset').addEventListener('click', resetProgramExercise);
  $('#btn-prog-cancel').addEventListener('click', () => {
    $('#modal-program').classList.add('hidden');
  });

  $('#btn-export').addEventListener('click', exportHistory);
  $('#btn-backup').addEventListener('click', exportBackup);
  $('#btn-restore').addEventListener('click', () => $('#file-restore').click());
  $('#file-restore').addEventListener('change', e => {
    if (e.target.files[0]) importBackup(e.target.files[0]);
    e.target.value = '';
  });
  $('#btn-clear').addEventListener('click', clearAllData);

  // History detail
  $('#btn-close-detail').addEventListener('click', () => {
    $('#modal-detail').classList.add('hidden');
  });
  $('#btn-edit-workout').addEventListener('click', () => showHistoryDetail(detailIndex, true));
  $('#btn-delete-workout').addEventListener('click', deleteHistoryEntry);
  $('#btn-save-edit').addEventListener('click', saveHistoryEdit);
  $('#btn-cancel-edit').addEventListener('click', () => showHistoryDetail(detailIndex));

  // Close modals on backdrop click, unless a history edit would be thrown away
  $$('.modal').forEach(m => {
    m.addEventListener('click', e => {
      const editing = !$('#detail-actions-edit').classList.contains('hidden');
      if (e.target === m && !editing) m.classList.add('hidden');
    });
  });

  // Init
  // With no history there is nothing to back up before the first use of this version
  if (history.length === 0) save('backupPrompted', true);
  if (activeSession) resumeWorkout();
  else showView('today');
});

// Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}
