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

// ── Exercise library ─────────────────────────────────────────
// Every exercise the app knows, with general technique cues. A program's own note for an exercise
// (its spine-safe rules) is shown above these cues; the cues are how to do the lift itself.
//   compound — multi-joint, rests longer      rest — seconds, overrides the compound default
//   report   — needs a symptom check, counts like a new lift      probe — a re-entry probe
//   restricted — loaded squat or hinge from a barbell: warns until the plan allows it
const LIBRARY = {
  // Legs
  'Goblet Squat': { area: 'Legs', compound: true, report: true, reps: '8', cues: [
    'Hold the bell at your chest, elbows under it, ribs down.',
    'Feet about shoulder-width, toes slightly out; knees track over the toes.',
    'Sit down between your heels to the box, chest tall, light touch, then stand by pushing the floor away.',
    'Stop the descent before the pelvis starts to tuck under.'] },
  'Dumbbell RDL': { area: 'Legs', compound: true, report: true, reps: '8–10', cues: [
    'Dumbbells against the thighs, knees soft and staying soft: it\'s a hip movement, not a squat.',
    'Push the hips back as if shutting a car door behind you; the dumbbells slide down the legs.',
    'Spine neutral, lats on (squeeze your armpits), eyes a few metres ahead.',
    'Stand by driving the hips forward. Finish tall; don\'t lean back.'] },
  'Barbell Back Squat': { area: 'Legs', compound: true, report: true, restricted: true, rest: 180, reps: '5–8', cues: [
    'Squat in a rack with the safety pins set just below your bottom position.',
    'Bar on the upper traps, hands just outside the shoulders, squeeze the bar to tighten the upper back.',
    'Big breath into the belly and brace before every rep; ribs stay down.',
    'Sit down between the heels, knees out over the toes, chest proud. Depth only to where the pelvis stays untucked.'] },
  'Barbell Deadlift': { area: 'Legs', compound: true, report: true, restricted: true, rest: 180, reps: '5', cues: [
    'Bar over mid-foot, feet hip-width, shins close to the bar.',
    'Hinge down and grip just outside the legs. Pull the slack out of the bar before it leaves the floor.',
    'Lats tight, chest up, brace, then push the floor away with the bar dragging up the legs.',
    'Finish by squeezing the glutes, not leaning back. Lower with the hips back first.'] },
  'Barbell RDL': { area: 'Legs', compound: true, report: true, restricted: true, rest: 150, reps: '8', cues: [
    'Take the bar from a rack at hip height; start standing, never from the floor.',
    'Soft knees, hips back, bar slides down the thighs.',
    'Stop where the back would round, usually between the knee and mid-shin.',
    'Drive the hips through to stand. No lean back at the top.'] },
  'Leg Press': { area: 'Legs', compound: true, reps: '10–12', cues: [
    'Feet hip-width in the middle of the platform, whole foot flat.',
    'Lower under control until just before the hips start to curl off the pad.',
    'Knees in line with the toes; don\'t let them cave in.',
    'Press through heels and mid-foot, stopping just short of locked knees.'] },
  'Single-Leg Leg Press': { area: 'Legs', compound: true, unilateral: true, reps: '10–12', cues: [
    'Start at about 40% of your two-leg weight.',
    'Foot in the middle of the platform, hips square to the sled.',
    'Same depth rule as two legs: stop before the lower back lifts.',
    'Left leg sets the weight; the right matches.'] },
  'Seated Leg Curl': { area: 'Legs', reps: '12–15', cues: [
    'Line the knee up with the machine\'s pivot, roller just above the heels.',
    'Lock the thigh pad down so the hips stay put.',
    'Curl fully, squeeze for a second, return slowly over 2–3 s.'] },
  'Lying Leg Curl': { area: 'Legs', reps: '12–15', cues: [
    'Knees just past the bench edge, hips pressed into the pad.',
    'Curl without the hips lifting; if they rise, the weight is too heavy.',
    'Take 2–3 s on the way down.'] },
  'Leg Extension': { area: 'Legs', reps: '12–15', cues: [
    'Knee joint lined up with the pivot, back against the pad.',
    'Hold the handles so the hips stay down.',
    'Extend fully, squeeze briefly, lower slowly.'] },
  'Single-Leg Leg Extension': { area: 'Legs', unilateral: true, reps: '12–15', cues: [
    'Knee lined up with the pivot, back against the pad.',
    'Extend fully, squeeze, lower over 2–3 s.',
    'Left leg sets the weight.'] },
  'Cable Pull-Through': { area: 'Legs', probe: true, reps: '12–15', cues: [
    'Face away from a low cable, rope between the legs, walk out until there\'s tension.',
    'Hinge: hips back, knees soft, spine straight.',
    'Stand by squeezing the glutes, not by leaning back.',
    'The arms only hold the rope; they don\'t pull.'] },
  'Machine Hip Thrust': { area: 'Legs', probe: true, reps: '12–15', cues: [
    'Upper back on the pad, belt or pad across the hips, feet flat about hip-width.',
    'Chin tucked and ribs down as you drive up.',
    'Finish with the hips level with the knees, squeeze 1 s, lower under control.',
    'If the lower back is working more than the glutes, lower the weight.'] },
  'Glute Bridge (bodyweight)': { area: 'Legs', bodyweight: true, reps: '12–15', cues: [
    'Feet flat, heels close enough to brush with your fingertips.',
    'Flatten the lower back first, then lift the hips.',
    'Squeeze the glutes at the top without arching.'] },
  'Seated Calf Raise': { area: 'Legs', reps: '15', cues: [
    'Balls of the feet on the edge, pad snug on the thighs.',
    'Lower to a full stretch, pause, rise as high as you can.',
    'No bouncing at the bottom.'] },
  'Calf Press on the Leg Press': { area: 'Legs', reps: '15', cues: [
    'Set the sled\'s safety catches first.',
    'Balls of the feet on the bottom edge, knees almost straight but not locked.',
    'Full stretch, full press, no bounce.'] },

  // Push
  'Machine Chest Press': { area: 'Push', compound: true, reps: '10', cues: [
    'Seat height so the handles line up with mid-chest.',
    'Set the shoulder blades back and down against the pad before the first rep.',
    'Press without the shoulders rolling forward; stop short of locking out.',
    'Return slowly until you feel a stretch.'] },
  'Seated Cable Chest Press': { area: 'Push', compound: true, reps: '10–12', cues: [
    'Back against the pad or bench, handles at mid-chest.',
    'Blades back and down, then press straight out.',
    'Control the return; the left blade holds position or the set ends.'] },
  'Dumbbell Bench Press (flat)': { area: 'Push', compound: true, reps: '8–10', cues: [
    'Rest the dumbbells on your thighs, then kick them up as you lie back.',
    'Blades pinched, feet flat, only a slight natural arch.',
    'Lower to chest level with the elbows about 45° from the body.',
    'To finish, bring the bells back to the thighs and sit up; don\'t drop them out to the side.'] },
  'Barbell Bench Press': { area: 'Push', compound: true, rest: 150, reps: '6–8', cues: [
    'Use a spotter or set the safety arms just below chest height.',
    'Eyes under the bar, blades squeezed back and down, feet flat.',
    'Grip just outside shoulder-width, wrists stacked over the elbows.',
    'Lower to the lower chest with elbows about 45°, touch lightly, press back up over the shoulders. The left-blade rule still applies.'] },
  'Arnold Press': { area: 'Push', compound: true, reps: '10–12', cues: [
    'Seated with the back supported, dumbbells at chin height, palms facing you.',
    'Rotate the palms outward as you press up.',
    'Stop short of a hard lockout and reverse the rotation on the way down.'] },
  'Seated Dumbbell Overhead Press': { area: 'Push', compound: true, report: true, reps: '8–10', cues: [
    'Bench upright, back against it, feet flat, ribs down.',
    'Dumbbells at shoulder height, palms forward or slightly in.',
    'Press up and slightly in. If the lower back leaves the pad, it\'s too heavy.'] },
  'Pec Deck': { area: 'Push', reps: '12–15', cues: [
    'Seat height so the handles are at chest level.',
    'Elbows slightly bent and fixed in that bend.',
    'Bring the hands together in an arc, squeeze, open slowly to a comfortable stretch.'] },
  'Cable Fly (high pulley)': { area: 'Push', reps: '12–15', cues: [
    'Pulleys high, staggered stance, slight lean forward from the hips.',
    'Sweep the hands down and together toward the lower chest.',
    'Elbows softly bent and fixed; control the return.'] },
  'Cable Fly (mid pulley)': { area: 'Push', reps: '12–15', cues: [
    'Pulleys at shoulder height, staggered stance, torso upright.',
    'Sweep the hands together in front of the chest.',
    'Return slowly to a gentle stretch.'] },
  'Seated Cable Lateral Raise': { area: 'Push', unilateral: true, reps: '12–15', cues: [
    'Low cable to your side, sit tall.',
    'Raise out to the side leading with the elbow, to just below shoulder height.',
    'Lower slowly; no shrugging.'] },
  'Machine Lateral Raise': { area: 'Push', reps: '12–15', cues: [
    'Pads on the outside of the upper arms.',
    'Lift to shoulder height, pause, lower slowly.',
    'Shoulders stay down away from the ears.'] },
  'Cable Tricep Pushdown': { area: 'Arms', reps: '12–15', cues: [
    'Elbows pinned to your sides.',
    'Push down to full extension, squeeze, let the forearms rise back to parallel.',
    'Body stays still; don\'t lean over the bar.'] },
  'Single-Arm Cable Pushdown': { area: 'Arms', unilateral: true, reps: '12–15', cues: [
    'Elbow pinned to your side.',
    'Full extension, brief squeeze, slow return.',
    'Left arm sets the weight.'] },
  'Seated Dip Machine': { area: 'Arms', reps: '10–12', cues: [
    'Back on the pad, shoulders down.',
    'Push the handles down to full extension.',
    'Control the return and stop before the shoulders roll forward.'] },

  // Pull
  'Lat Pulldown': { area: 'Pull', compound: true, reps: '10–12', cues: [
    'Thighs locked under the pads, grip a little wider than the shoulders.',
    'Start by drawing the shoulders down, then drive the elbows to the back pockets.',
    'Bar to the upper chest, then a slow return to a full arm stretch.',
    'Lean back only slightly, from the hips.'] },
  'Lat Pulldown (close/neutral grip)': { area: 'Pull', compound: true, reps: '10–12', cues: [
    'Neutral handle, palms facing each other.',
    'Drive the elbows down and back close to the body.',
    'Handle to the upper chest, slow return.'] },
  'Single-Arm Cable Pulldown (kneeling)': { area: 'Pull', compound: true, unilateral: true, reps: '10–12', cues: [
    'Half-kneeling, torso tall, cable slightly in front.',
    'Pull the elbow down toward the back pocket.',
    'Left arm sets the weight.'] },
  'Chest-Supported Machine Row': { area: 'Pull', compound: true, reps: '10–12', cues: [
    'Chest on the pad, seat set so the handles are at arm\'s length.',
    'Let the shoulder blades spread forward, then pull them back and drive the elbows past the torso.',
    'Squeeze 1 s, slow return.'] },
  'Chest-Supported Dumbbell Row (incline bench)': { area: 'Pull', compound: true, reps: '10–12', cues: [
    'Bench at 30–45°, chest on the pad, feet planted.',
    'Row the dumbbells toward the hips.',
    'Pause at the top, lower to a full stretch.'] },
  'Seated Cable Row': { area: 'Pull', compound: true, reps: '10–12', cues: [
    'Feet on the plate, knees soft, torso upright and still.',
    'Pull the handle to the lower ribs with the elbows close.',
    'Let the arms straighten without the torso rocking forward.'] },
  'Face Pulls': { area: 'Pull', reps: '15', cues: [
    'Rope at forehead height, thumbs pointing back toward you.',
    'Pull to the forehead and separate the hands, elbows high.',
    'Finish with the hands beside the ears, then return slowly.'] },
  'Reverse Pec Deck': { area: 'Pull', reps: '15', cues: [
    'Chest on the pad, handles at shoulder height.',
    'Arms long, sweep back until they\'re in line with the body.',
    'Squeeze the shoulder blades; no shrugging.'] },
  'Band Pull-Apart': { area: 'Pull', bodyweight: true, reps: '15', cues: [
    'Band at shoulder height, arms straight.',
    'Pull the band to the chest by squeezing the shoulder blades.',
    'Return slowly.'] },
  'Incline Dumbbell Curl': { area: 'Arms', reps: '10–12', cues: [
    'Bench at about 45°, back and head on the pad, arms hanging straight.',
    'Curl without the elbows drifting forward.',
    'Lower all the way to a straight arm.'] },
  'Seated Hammer Curl': { area: 'Arms', reps: '10–12', cues: [
    'Sit tall, palms facing each other.',
    'Curl with the elbows pinned to your sides.',
    'Lower under control.'] },
  'Cable Curl': { area: 'Arms', reps: '10–12', cues: [
    'Cable low, elbows by your sides.',
    'Curl up, squeeze, lower slowly.',
    'No hip swing.'] },
  'Cable Rope Hammer Curl': { area: 'Arms', reps: '10–12', cues: [
    'Rope on a low pulley, palms facing each other.',
    'Elbows pinned; curl to shoulder height.',
    'Lower slowly.'] },

  // Core
  'Pallof Press': { area: 'Core', unilateral: true, reps: '10 per side', cues: [
    'Stand side-on to a chest-height cable, feet hip-width.',
    'Press the handle straight out from the sternum and hold 1–2 s.',
    'Don\'t let the cable turn you: ribs down, glutes on.',
    'Do both sides, left first.'] },
  'Band Pallof Press': { area: 'Core', unilateral: true, bodyweight: true, reps: '10 per side', cues: [
    'Band anchored at chest height, stand side-on.',
    'Press straight out, hold 1–2 s, resist the twist.',
    'Do both sides, left first.'] },
  'Farmer Carry': { area: 'Core', reps: '30–40 m', cues: [
    'Pick the weights up like a deadlift: hips back, flat back, stand tall.',
    'Shoulders down and back, ribs down, eyes ahead.',
    'Short, steady steps; don\'t let the weights swing or lean you to one side.',
    'Put them down the same way you picked them up. Log kg per hand, and metres in the reps box.'] },
  'Dead Bug': { area: 'Core', unilateral: true, bodyweight: true, reps: '8 per side', cues: [
    'On your back, arms up, knees over the hips.',
    'Press the lower back into the floor and keep it there.',
    'Lower the opposite arm and leg slowly, breathing out as they go.'] },
};
const LIBRARY_AREAS = ['Legs', 'Push', 'Pull', 'Arms', 'Core'];

// Flags an exercise gets from the library, for one added or swapped in, or a custom one
function libraryFlags(name) {
  const lib = LIBRARY[name] || {};
  return { probe: !!lib.probe, gated: lib.report ? 1 : 0, unilateral: !!lib.unilateral, bodyweight: !!lib.bodyweight };
}

// <option>s for every library exercise, grouped by area
function libraryOptionsHTML() {
  return '<option value="">Pick from all exercises…</option>' + LIBRARY_AREAS.map(area => `
    <optgroup label="${area}">${Object.keys(LIBRARY).filter(n => LIBRARY[n].area === area)
      .map(n => `<option value="${esc(n)}">${esc(n)}${LIBRARY[n].restricted ? ' (after review)' : ''}</option>`).join('')}</optgroup>`).join('');
}


// Warm-up drills. Each session's warm-up is built from the lifts actually in it (after any swaps),
// so it preps what is about to be loaded rather than a fixed list per day type.
const DRILLS = {
  'Cat-Cow': { reps: '8–10 reps', notes: 'Segmental and slow — bring the upper back in vertebra by vertebra, not just the lower back. Spine baseline before any load.' },
  'Supine Knee-to-Chest': { reps: '8 reps per side', notes: 'On your back, pull one knee to the chest, hold 2–3 seconds, release. Hip flexor and low-back release before leg loading.' },
  'Scapular Wall Slides': { reps: '10 reps', notes: 'Back to the wall, arms in goalpost, slide up and down keeping wrists and elbows on the wall. Wakes the shoulder-blade stabilisers that limit your pressing and pulling.' },
  'Band Pull-Apart or Light Cable Face Pull': { reps: '15 reps', notes: 'Rear delts and external rotators on before the main work. No band: the face pull cable at minimal weight.' },
  'Shoulder CARs': { reps: '5 each direction per side', notes: 'Slow, active full circles at the shoulder joint. Gets it moving through range before pressing or flyes.' },
  'Thoracic Extension over Foam Roller or Chair Back': { reps: '8–10 reps', notes: 'Hands behind the head, extend over the roller at mid-back. Opens the upper back without arching the lower back — that is where pulldown and row force transfers.' },
  'Dead Bug': { reps: '8 reps per side', notes: 'Low back flat to the floor, opposite arm and leg extend. Rehearses the ribs-down brace you need to hold under load.' },
  'Glute Bridge (bodyweight)': { reps: '12–15 reps', notes: 'Feet flat, drive the hips up, squeeze at the top, lower under control. If the glutes aren\'t firing, the low back compensates.' },
  'Clamshell': { reps: '12 reps per side', notes: 'Side-lying, feet together, open the top knee. Glute med on, so the knees track over the toes.' },
  'Ankle Circles': { reps: '10 each direction per foot', notes: 'Ankle dorsiflexion is the usual limit on knee-bending depth. Prep it before the lift that needs it.' },
  'Bodyweight Box Squat': { reps: '8 reps', notes: 'Sit back to the same box or bench you goblet squat to, tap, stand. Check the pelvis stays untucked at that height before any weight goes in your hands.' },
  'Hip Hinge Wall Tap': { reps: '8 reps', notes: 'Stand a foot from a wall, push the hips back to tap it, spine neutral, stand tall. Grooves the hinge before the RDL.' },
};

// Which drills prep which lift
const PREP = {
  'Machine Chest Press': ['Band Pull-Apart or Light Cable Face Pull', 'Scapular Wall Slides'],
  'Pec Deck': ['Shoulder CARs'],
  'Cable Fly (high pulley)': ['Shoulder CARs'],
  'Arnold Press': ['Shoulder CARs', 'Scapular Wall Slides', 'Dead Bug'],
  'Seated Dumbbell Overhead Press': ['Shoulder CARs', 'Scapular Wall Slides', 'Dead Bug'],
  'Lat Pulldown': ['Thoracic Extension over Foam Roller or Chair Back', 'Scapular Wall Slides', 'Dead Bug'],
  'Lat Pulldown (close/neutral grip)': ['Thoracic Extension over Foam Roller or Chair Back', 'Scapular Wall Slides', 'Dead Bug'],
  'Chest-Supported Machine Row': ['Thoracic Extension over Foam Roller or Chair Back', 'Band Pull-Apart or Light Cable Face Pull'],
  'Seated Cable Row': ['Thoracic Extension over Foam Roller or Chair Back', 'Band Pull-Apart or Light Cable Face Pull'],
  'Face Pulls': ['Band Pull-Apart or Light Cable Face Pull'],
  'Goblet Squat': ['Ankle Circles', 'Bodyweight Box Squat', 'Glute Bridge (bodyweight)'],
  'Dumbbell RDL': ['Hip Hinge Wall Tap', 'Glute Bridge (bodyweight)'],
  'Leg Press': ['Glute Bridge (bodyweight)', 'Clamshell', 'Ankle Circles'],
  'Cable Pull-Through': ['Glute Bridge (bodyweight)'],
  'Machine Hip Thrust': ['Glute Bridge (bodyweight)'],
  'Seated Calf Raise': ['Ankle Circles'],
  'Pallof Press': ['Dead Bug'],
  // Lifts that only come in through Add, Swap or a custom exercise
  'Barbell Back Squat': ['Ankle Circles', 'Bodyweight Box Squat', 'Glute Bridge (bodyweight)'],
  'Barbell Deadlift': ['Hip Hinge Wall Tap', 'Glute Bridge (bodyweight)'],
  'Barbell RDL': ['Hip Hinge Wall Tap', 'Glute Bridge (bodyweight)'],
  'Barbell Bench Press': ['Band Pull-Apart or Light Cable Face Pull', 'Scapular Wall Slides'],
  'Dumbbell Bench Press (flat)': ['Band Pull-Apart or Light Cable Face Pull', 'Scapular Wall Slides'],
  'Seated Cable Chest Press': ['Band Pull-Apart or Light Cable Face Pull', 'Scapular Wall Slides'],
  'Single-Leg Leg Press': ['Glute Bridge (bodyweight)', 'Clamshell', 'Ankle Circles'],
  'Single-Arm Cable Pulldown (kneeling)': ['Thoracic Extension over Foam Roller or Chair Back', 'Scapular Wall Slides'],
  'Chest-Supported Dumbbell Row (incline bench)': ['Thoracic Extension over Foam Roller or Chair Back', 'Band Pull-Apart or Light Cable Face Pull'],
};

const MAX_DRILLS = 6;
// Core and prehab work that needs no ramp-up set of its own
const NO_RAMP = ['Pallof Press', 'Face Pulls'];

// Cat-Cow always and the knee-to-chest release on leg days. Then, while there is room: every drill
// for a new lift, then each other lift's first drill, then the rest. Shown in the order the lifts come,
// then a ramp-up set of the first loaded lift.
function buildWarmup(type, exercises) {
  const lower = type === 'legs' || type === 'lower';
  const names = new Set(exercises.map(e => e.name));
  const picked = new Map(); // drill -> { order, lifts }
  const add = (drill, order, lift) => {
    if (names.has(drill)) return; // already a working exercise today
    if (!picked.has(drill)) {
      if (picked.size >= MAX_DRILLS) return;
      picked.set(drill, { order, lifts: [] });
    }
    const p = picked.get(drill);
    p.order = Math.min(p.order, order);
    if (lift && !p.lifts.includes(lift)) p.lifts.push(lift);
  };
  add('Cat-Cow', -2);
  if (lower) add('Supine Knee-to-Chest', -1);
  const tiers = [
    exercises.map((e, i) => [e, i, e.gated ? (PREP[e.name] || []) : []]),
    exercises.map((e, i) => [e, i, (PREP[e.name] || []).slice(0, 1)]),
    exercises.map((e, i) => [e, i, PREP[e.name] || []]),
  ];
  tiers.forEach(tier => tier.forEach(([e, i, drills]) => drills.forEach(d => add(d, i, e.name))));

  const items = [...picked].sort((a, b) => a[1].order - b[1].order).map(([name, { lifts }]) => ({
    name, reps: DRILLS[name].reps,
    notes: DRILLS[name].notes + (lifts.length ? ` Preps: ${lifts.join(', ')}.` : '')
  }));
  const first = exercises.find(e => !e.bodyweight && !e.probe && !NO_RAMP.includes(e.name));
  if (first) items.push({
    name: `Ramp-up set: ${first.name}`, reps: '1 × 8',
    notes: 'About half your working weight, same tempo as the working sets. It does not count as a working set.'
  });
  return items;
}
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
function pplSessions(exercises) {
  const sessions = {};
  for (const week of ['A', 'B']) {
    for (const type of ['push', 'pull', 'legs']) {
      const data = exercises[week][type];
      sessions[`${week}-${type}`] = {
        ...data, week, type,
        heading: `${data.label} Day`,
        title: `Week ${week} • ${data.label}`,
        cooldown: COOLDOWN[type]
      };
    }
  }
  return sessions;
}

// ── PPL v2: compound re-entry ────────────────────────────────
// Push and pull are v1 unchanged (same ids, so program edits carry over). Legs gain the goblet squat,
// then the dumbbell RDL in the hinge slot; Day 4 swaps the Arnold press for a seated dumbbell press.
// gated: n  — shown from phase n on.  until: n — shown before phase n only.
// days      — dayIndex values the gate applies to; on other days a gated lift is hidden and an until one stays.
const V2_CONSTRAINTS = [
  'PhysioFlex has cleared all compound lifts (as you reported, 6 Nov 2026). Everything below is self-imposed.',
  'Before the first goblet squat, confirm with PhysioFlex: that they know about the June goblet-squat lumbar pull, whether a depth or load ceiling applies, and whether barbell work is included.',
  'Submaximal always: 2–3 reps in reserve. The first 2 sessions of any new lift: 4–5 RIR, technique only.',
  'Left side governs on unilateral and dumbbell work. Right matches, never exceeds.',
  'Tempo: 2–3 s down, controlled up. No bouncing out of the bottom.',
  'One new lift at a time. The next unlocks after 4 clean sessions in a row (no symptoms, tempo held, left side in control), and not before 2 weeks on the current one.',
  'Stop and log: a lumbar pull or stretch, a sharp or radiating feeling, or the left blade losing position ends the set. Log it, report it to PhysioFlex, and don\'t repeat the lift until it has been reviewed.',
  'Load: the smallest increment only after 2 clean sessions in a row at the top of the rep range. One increment per session, never load and reps together. After any symptom, go back to the last clean load.',
  'No barbell squat or barbell RDL until the PhysioFlex review after phase 3.',
  CONSTRAINTS[7], // the machine chest press baseline still applies
];

const GOBLET = { id: 'p2-goblet', name: 'Goblet Squat', sets: 3, reps: '8', gated: 1, notes: 'First lift of the session. 2–3 s down, no bounce. Squat to a box or bench set where the pelvis stays untucked (the tuck is the June sensation) and note its height. Lower the box before you add load.' };
const RDL = { id: 'p2-rdl', name: 'Dumbbell RDL', sets: 3, reps: '8–10', gated: 2, notes: 'Hips back, neutral spine, dumbbells close to the legs. Stop at mid-shin or where the back would round, whichever comes first. 2–3 s down.' };
const OHP = { id: 'p2-ohp', name: 'Seated Dumbbell Overhead Press', sets: 3, reps: '8–10', gated: 3, days: [3], notes: 'Day 4 only; Day 1 keeps the Arnold press. Back supported, ribs down, no arch off the pad. Start lighter than your Arnold press weight.' };
// v1 calls the Arnold press the only cleared overhead lift; in the re-entry programs it isn't
const ARNOLD_REENTRY_NOTE = 'Seated, back supported. Start palms facing you at chin height, rotate as you press, stop short of a hard lock-out. Spine flat to the pad — if the lower back flares off it, the weight is too heavy.';
const byId = (week, type, id) => PPL_EXERCISES[week][type].exercises.find(e => e.id === id);

const PPL_V2 = {
  A: {
    push: { ...PPL_EXERCISES.A.push, exercises: [byId('A', 'push', 'ap1'), { ...byId('A', 'push', 'ap2'), notes: ARNOLD_REENTRY_NOTE, until: 3, days: [3] }, OHP, byId('A', 'push', 'ap3'), byId('A', 'push', 'ap4')] },
    pull: PPL_EXERCISES.A.pull,
    legs: { ...PPL_EXERCISES.A.legs, exercises: [
      GOBLET,
      byId('A', 'legs', 'al1'),
      byId('A', 'legs', 'al2'),
      { id: 'p2-pullthrough', name: 'Cable Pull-Through', sets: 2, reps: '12–15', probe: true, until: 2, notes: 'Hinge slot until the dumbbell RDL unlocks. Hips back to the wall behind you, spine straight, squeeze the glutes to stand. Stop and log if anything pulls.' },
      RDL,
      byId('A', 'legs', 'al5'),
      byId('A', 'legs', 'al6'),
    ] },
  },
  B: {
    push: { ...PPL_EXERCISES.B.push, exercises: [byId('B', 'push', 'bp1'), { ...byId('B', 'push', 'bp2'), notes: ARNOLD_REENTRY_NOTE, until: 3, days: [3] }, OHP, byId('B', 'push', 'bp3'), byId('B', 'push', 'bp4')] },
    pull: PPL_EXERCISES.B.pull,
    legs: { ...PPL_EXERCISES.B.legs, exercises: [
      GOBLET,
      byId('B', 'legs', 'bl1'),
      byId('B', 'legs', 'bl2'),
      RDL,
      { id: 'p2-hipthrust', name: 'Machine Hip Thrust', sets: 2, reps: '12–15', probe: true, notes: 'The hinge slot until the RDL unlocks, then an accessory after it. Controlled, full squeeze at the top, ribs down. Stop and log if anything pulls.' },
      byId('B', 'legs', 'bl5'),
      byId('B', 'legs', 'bl6'),
    ] },
  },
};

function visibleIn(ex, phase, dayIndex) {
  if (ex.days && !ex.days.includes(dayIndex)) return !ex.gated;
  if (ex.gated && phase < ex.gated) return false;
  if (ex.until && phase >= ex.until) return false;
  return true;
}

// The first exercise in a list of sessions that matches
function findInSessions(sessions, match) {
  for (const session of sessions) {
    const ex = session.exercises.find(match);
    if (ex) return ex;
  }
  return null;
}

// v2 reuses the v1 cue for the same exercise, so the wording lives in one place
function v1Cue(name) {
  const ex = findInSessions(Object.values(PPL_EXERCISES).flatMap(Object.values), e => e.name === name);
  return ex ? ex.notes : '';
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
    cooldown: upper ? mergeRoutines(COOLDOWN.push, COOLDOWN.pull) : COOLDOWN.legs
  };
}

const UNILATERAL = { unilateral: true };
const PROBE = { probe: true };

// The lift each re-entry phase introduces, in order; passing all three means the review is due.
// Shared by every re-entry program, and gates are read by lift name, so history carries across them.
const REENTRY_GATES = ['Goblet Squat', 'Dumbbell RDL', 'Seated Dumbbell Overhead Press'];

// ── Upper/Lower v3: re-entry ─────────────────────────────────
// The PPL v2 re-entry inside a 4-day upper/lower rotation: each muscle and the goblet squat twice a
// week, about an hour a session. Built from the v1/v2 exercise objects, so ids (and program edits) carry over.
// pair — the other half of a superset: alternate sets, short switch rest between them
const pairWith = (ex, partner, extra) => ({ ...ex, pair: partner, ...extra });
const { days: _ohpDays, ...OHP_ANY_DAY } = OHP;

const UL3_CONSTRAINTS = [
  ...V2_CONSTRAINTS,
  'Supersets (⇄): alternate a set of each, with a short switch in between and the full rest after both. The main lifts are never supersetted.',
];

const cooldownNamed = names => names.map(n => [...COOLDOWN.push, ...COOLDOWN.pull].find(c => c.name === n));
const SHORT_UPPER_COOLDOWN = cooldownNamed(['Doorway Pec Stretch', 'Thread-the-Needle', "Child's Pose"]);

function ul3Session(label, subtitle, week, dayIndex, type, exercises) {
  return { ...v2Session(label, subtitle, week, dayIndex, type, exercises), cooldown: type === 'upper' ? SHORT_UPPER_COOLDOWN : COOLDOWN.legs };
}

const FARMER_CARRY = { id: 'u3-carry', name: 'Farmer Carry', sets: 2, reps: '30–40 m', notes: 'Your usual 16 kg per hand. Log the weight per hand, and metres in the reps box. Left grip governs: if it starts to open, the set ends.' };

const UL3 = {
  lowerA: ul3Session('Lower A', 'Squat, Legs & Core', 'A', 0, 'lower', [
    GOBLET,
    byId('A', 'legs', 'al1'),
    pairWith(byId('A', 'legs', 'al2'), 'Seated Calf Raise'),
    pairWith(byId('A', 'legs', 'al5'), 'Seated Leg Curl'),
    { ...byId('A', 'legs', 'al6'), sets: 2 },
  ]),
  upperA: ul3Session('Upper A', 'Chest, Back, Shoulders, Arms', 'A', 1, 'upper', [
    byId('A', 'push', 'ap1'),
    byId('A', 'pull', 'apl2'),
    byId('A', 'pull', 'apl1'),
    { ...byId('A', 'push', 'ap2'), notes: ARNOLD_REENTRY_NOTE, sets: 2 },
    pairWith(byId('A', 'pull', 'apl3'), 'Incline Dumbbell Curl'),
    pairWith(byId('A', 'pull', 'apl4'), 'Face Pulls', { sets: 2 }),
    FARMER_CARRY,
  ]),
  lowerB: ul3Session('Lower B', 'Squat, Hinge & Legs', 'B', 2, 'lower', [
    GOBLET,
    { id: 'u3-pullthrough', name: 'Cable Pull-Through', sets: 2, reps: '12–15', probe: true, until: 2, notes: 'Hinge slot until the dumbbell RDL unlocks. Hips back to the wall behind you, spine straight, squeeze the glutes to stand. Stop and log if anything pulls.' },
    RDL,
    { ...byId('B', 'legs', 'bl1'), sets: 2 },
    pairWith(byId('B', 'legs', 'bl2'), 'Seated Calf Raise'),
    pairWith(byId('B', 'legs', 'bl5'), 'Lying Leg Curl'),
  ]),
  upperB: ul3Session('Upper B', 'Shoulders, Back, Chest, Arms', 'B', 3, 'upper', [
    // The new overhead lift goes first, while you're fresh
    { ...byId('B', 'push', 'bp2'), notes: ARNOLD_REENTRY_NOTE, until: 3 },
    { ...OHP_ANY_DAY, notes: 'Upper B only; Upper A keeps the Arnold press. Back supported, ribs down, no arch off the pad. Start lighter than your Arnold press weight.' },
    byId('B', 'pull', 'bpl1'),
    byId('B', 'pull', 'bpl2'),
    { ...byId('A', 'push', 'ap3'), sets: 2 },
    pairWith(byId('A', 'push', 'ap4'), 'Seated Hammer Curl', { sets: 2 }),
    pairWith(byId('B', 'pull', 'bpl4'), 'Cable Tricep Pushdown', { sets: 2 }),
    FARMER_CARRY,
  ]),
};

const PROGRAMS = {
  'ppl-v1': {
    name: 'Spine-safe PPL (6-day A/B)',
    constraints: CONSTRAINTS,
    sessions: pplSessions(PPL_EXERCISES)
  },
  'ppl-v2': {
    name: 'PPL v2: compound re-entry (6-day A/B)',
    constraints: V2_CONSTRAINTS,
    gates: REENTRY_GATES,
    sessions: pplSessions(PPL_V2)
  },
  'ul-v3': {
    name: 'Upper/Lower v3: re-entry (4-day)',
    constraints: UL3_CONSTRAINTS,
    gates: REENTRY_GATES,
    rotation: ['lowerA', 'upperA', 'lowerB', 'upperB'],
    sessions: UL3
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

function isReentry(id) { return !!(PROGRAMS[id] && PROGRAMS[id].gates); }

// The fields a program edit can change. Up here because stored edits are migrated at startup.
const OVERRIDE_FIELDS = ['sets', 'reps', 'notes', 'rest'];

// ── Storage ──────────────────────────────────────────────────
function load(key, fallback) {
  try { const v = localStorage.getItem('sst_' + key); return v ? JSON.parse(v) : fallback; }
  catch { return fallback; }
}
function save(key, val) { localStorage.setItem('sst_' + key, JSON.stringify(val)); }

// Bumped on every history save, so anything worked out from history knows to work it out again
let historyVersion = 0;
function saveHistory() {
  historyVersion++;
  save('history', history);
}

// ── State ────────────────────────────────────────────────────
let programId = load('program', 'ppl-v1');
if (!PROGRAMS[programId]) programId = 'ppl-v1';
let schedule = load('schedule', { week: 'A', dayIndex: 0 });
let pickedSession = null;
let history = load('history', []);
let customExercises = load('custom', []);
const storedOverrides = load('overrides', {});
let overrides = migrateOverrides(storedOverrides);
if (JSON.stringify(overrides) !== JSON.stringify(storedOverrides)) save('overrides', overrides);
let activeSession = load('active', null);
let timerInterval = null;
let timerStart = 0;
let restInterval = null;
let audioCtx = null;
let detailIndex = null;
let programEditId = null;

const REST_SECONDS = 90;
// Multi-joint lifts rest longer by default. Isolation, core and the probes keep 90 s.
// Any exercise's rest can be changed in Settings → Program.
const COMPOUND_REST = 120;
// The library's default for an exercise: its own rest (heavy barbell lifts), else compound or not
function defaultRest(name) {
  const lib = LIBRARY[name] || {};
  return lib.rest || (lib.compound ? COMPOUND_REST : REST_SECONDS);
}

// An edited rest in that program wins, then the library default. Looked up by name and id when the
// set is ticked, so it also covers swapped-in exercises and workouts started before this was added.
function restFor(ex, program = activeSession ? activeSession.program : programId) {
  const edit = overrideFor(program, ex.id);
  return (edit && edit.rest) || defaultRest(ex.name);
}
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

// Searches every program, the preferred one first. Returns the exercise and the program it came from.
function findExercise(match, preferProgram) {
  const ids = Object.keys(PROGRAMS).sort((a, b) => (b === preferProgram) - (a === preferProgram));
  for (const id of ids) {
    const ex = programExercise(id, match);
    if (ex) return { program: id, ex };
  }
  return null;
}

function programExercise(program, match) {
  return findInSessions(Object.values(PROGRAMS[program].sessions), typeof match === 'string' ? e => e.id === match : match);
}

function findDefaultExercise(id) {
  const found = findExercise(e => e.id === id);
  return found && found.ex;
}

// ── Program edits ────────────────────────────────────────────
// Kept per program as "program:id", holding only the fields that differ from that program's own
// version, so a v3 variant (fewer sets) and the v1 original never overwrite each other.
function overrideKey(program, id) { return `${program}:${id}`; }
function overrideFor(program, id) { return overrides[overrideKey(program, id)]; }
function withOverride(program, ex) { return { ...ex, ...overrideFor(program, ex.id) }; }

// Edits saved before this were keyed by id alone, made against the first program with that id, and
// held every field. Each becomes a per-program edit, in every program with that id, of only the
// fields that were really changed.
function migrateOverrides(raw) {
  const out = {};
  for (const [key, edit] of Object.entries(raw || {})) {
    if (key.includes(':')) { out[key] = { ...out[key], ...edit }; continue; }
    const legacyBase = findDefaultExercise(key);
    if (!legacyBase || !edit) continue;
    const changed = Object.fromEntries(OVERRIDE_FIELDS
      .filter(f => edit[f] !== undefined && edit[f] !== legacyBase[f]).map(f => [f, edit[f]]));
    if (!Object.keys(changed).length) continue;
    Object.keys(PROGRAMS).filter(p => programExercise(p, key)).forEach(p => {
      out[overrideKey(p, key)] = { ...changed, ...out[overrideKey(p, key)] };
    });
  }
  return out;
}

// The cue for an exercise swapped or added mid-workout, taken from the workout's own program if it has one
function cueFor(name, preferProgram) {
  const found = findExercise(e => e.name === name, preferProgram);
  return found ? withOverride(found.program, found.ex).notes : '';
}

function getExercisesFor(program, key, dayIndex = 0, phase = 1) {
  const base = PROGRAMS[program].sessions[key].exercises
    .filter(ex => visibleIn(ex, phase, dayIndex))
    .map(ex => withOverride(program, ex));
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
// A new lift also needs its two technique sessions behind it and both recent sessions clean.
function suggestIncrease(name, gated) {
  const recent = [];
  for (let i = history.length - 1; i >= 0 && recent.length < 2; i--) {
    const ex = history[i].exercises.find(e => e.name === name);
    if (ex) recent.push(ex);
  }
  if (gated && (liftLog(name).length < 4 || !recent.every(cleanLift))) return false;
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
// Probes and new (gated) lifts both carry a symptom report
function needsReport(ex) { return !!(ex.probe || ex.gated); }

// A new lift's clean report also says whether tempo and the left side held.
function probeUnreported(ex) {
  if (!needsReport(ex)) return false;
  const r = ex.probeResult;
  if (!r) return ex.sets.some(s => s.completed);
  if (ex.gated && r.status === 'no symptoms' && !r.control) return true;
  return r.status === 'symptoms' && (!r.side || !String(r.location || '').trim() || r.sensation == null);
}

function probeRecord(ex) {
  const r = ex.probeResult;
  if (!r) return { status: 'not done' };
  if (r.status !== 'symptoms') return { status: r.status, ...(ex.gated && r.control && { control: r.control }) };
  return { status: r.status, side: r.side, location: r.location.trim(), sensation: r.sensation };
}

// ── Re-entry gates (PPL v2) ──────────────────────────────────
const GATE_STREAK = 4;
const GATE_MIN_DAYS = 14;
const DAY_MS = 24 * 60 * 60 * 1000;

// Every planned set done, no symptoms, tempo and left side in control
function cleanLift(ex) {
  const r = ex.probeResult;
  return !!r && r.status === 'no symptoms' && r.control === 'yes' &&
    ex.sets.length > 0 && ex.sets.every(s => s.completed);
}

// The logged sessions of a lift, oldest first. One where no set was done is left out, unless
// symptoms stopped it before the first set was ticked. Cached until history next changes.
let liftLogCache = { version: -1, logs: {} };
function liftLog(name) {
  if (liftLogCache.version !== historyVersion) liftLogCache = { version: historyVersion, logs: {} };
  if (!liftLogCache.logs[name]) {
    liftLogCache.logs[name] = history
      .map(h => ({ date: new Date(h.date).getTime(), ex: h.exercises.find(e => e.name === name) }))
      .filter(x => x.ex && (x.ex.sets.some(s => s.completed) || hasSymptoms(x.ex)))
      .sort((a, b) => a.date - b.date);
  }
  return liftLogCache.logs[name];
}

// Passed once there was a time, at least GATE_MIN_DAYS after the lift's first session, when its last
// GATE_STREAK sessions were all clean. A later bad session doesn't take a passed gate back.
function gateStatus(name) {
  const log = liftLog(name);
  if (!log.length) return { sessions: 0, streak: 0, passed: false, earliest: null, last: null };
  const earliest = log[0].date + GATE_MIN_DAYS * DAY_MS;
  let streak = 0;
  let passed = false;
  log.forEach((x, i) => {
    streak = cleanLift(x.ex) ? streak + 1 : 0;
    const heldUntil = i + 1 < log.length ? log[i + 1].date : Date.now();
    if (streak >= GATE_STREAK && heldUntil >= earliest) passed = true;
  });
  return { sessions: log.length, streak, passed, earliest, last: log[log.length - 1] };
}

// 1–3 is the phase being trained; 4 means all three lifts passed and the review is due
function currentPhase() {
  const forced = load('phaseOverride', 0);
  if (forced) return forced;
  const gates = REENTRY_GATES;
  let phase = 1;
  while (phase <= gates.length && gateStatus(gates[phase - 1]).passed) phase++;
  return phase;
}

function programPhase(id) { return isReentry(id) ? currentPhase() : 1; }

// What the card says about where a new lift is in its re-entry
function gateNoteHTML(ex) {
  const st = gateStatus(ex.name);
  const n = st.sessions + 1;
  const rir = n <= 2
    ? `Session ${n} of this lift: 4–5 RIR, technique only.`
    : `Session ${n} of this lift: 2–3 RIR. Clean sessions in a row: ${st.streak}/${GATE_STREAK}.`;
  const lastSymptoms = st.last && st.last.ex.probeResult && st.last.ex.probeResult.status === 'symptoms';
  return `
    <div class="suggestion">${rir}</div>
    ${lastSymptoms ? `<div class="warning">Symptoms logged last time (${formatDate(st.last.date)}). The plan says don't repeat this lift until PhysioFlex has reviewed it.</div>` : ''}
  `;
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
  renderPhaseCard();

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

// Where the re-entry stands, as plain text, for the Today card and the physio report
function phaseSummary() {
  const gates = REENTRY_GATES;
  const phase = currentPhase();
  const forced = !!load('phaseOverride', 0);
  if (phase > gates.length) {
    return {
      title: 'Re-entry: review due', forced, lines: [],
      notes: ['All three new lifts passed their gates. Book the PhysioFlex review before any barbell squat or barbell RDL, and decide then whether leg extension comes back.'],
      warnings: []
    };
  }
  const lift = gates[phase - 1];
  const st = gateStatus(lift);
  const next = phase < gates.length ? `${gates[phase]} unlocks` : 'The review is due';
  const when = st.sessions
    ? `after ${GATE_STREAK} clean sessions in a row, and not before ${formatDate(st.earliest)}`
    : `after ${GATE_STREAK} clean sessions in a row, and at least 2 weeks after the first session`;
  const last = st.last && st.last.ex.probeResult;
  return {
    title: `Re-entry: phase ${phase} of ${gates.length}`, forced, lift,
    lines: [`${st.sessions} session${st.sessions === 1 ? '' : 's'} logged, ${st.streak}/${GATE_STREAK} clean in a row.`],
    notes: [`${next} ${when}.`],
    warnings: [
      last && last.status === 'symptoms' ? `Symptoms logged on ${formatDate(st.last.date)}. Don't repeat ${lift.toLowerCase()} until PhysioFlex has reviewed it.` : '',
      phase === 1 && !st.sessions ? 'Before the first goblet squat: confirm the three open questions with PhysioFlex (see Session Constraints).' : ''
    ].filter(Boolean)
  };
}

function renderPhaseCard() {
  const card = $('#phase-card');
  if (!isReentry(programId)) { card.classList.add('hidden'); return; }
  const s = phaseSummary();
  card.innerHTML = `
    <h3>${esc(s.title)}${s.forced ? ' <span class="swap-tag-inline">set in Settings</span>' : ''}</h3>
    ${s.lines.map(l => `<p class="card-note"><strong>${esc(s.lift)}</strong> — ${esc(l)}</p>`).join('')}
    ${s.notes.map(n => `<p class="card-note">${esc(n)}</p>`).join('')}
    ${s.warnings.map(w => `<div class="warning">${esc(w)}</div>`).join('')}
  `;
  card.classList.remove('hidden');
}

// ── Workout View ─────────────────────────────────────────────
// Start each set from what was done last time, so only changes need typing
function prefillSets(name, count) {
  const last = getLastSets(name);
  return Array.from({ length: count }, (_, i) => {
    const prev = last ? last.sets[Math.min(i, last.sets.length - 1)] : null;
    return { weight: prev ? prev.weight : 0, reps: prev ? prev.reps : 0, completed: false };
  });
}

function startWorkout() {
  const program = PROGRAMS[programId];
  const key = todaySessionKey();
  const session = program.sessions[key];
  const dayIndex = program.rotation ? session.dayIndex : schedule.dayIndex;
  const phase = programPhase(programId);
  const exercises = getExercisesFor(programId, key, dayIndex, phase);

  activeSession = {
    program: programId,
    session: key,
    week: session.week,
    dayIndex,
    type: session.type,
    ...(isReentry(programId) && { phase }),
    startTime: Date.now(),
    notes: '',
    restEnd: 0,
    exercises: exercises.map(ex => ({ ex, lib: libraryFlags(ex.name) })).map(({ ex, lib }) => ({
      id: ex.id,
      name: ex.name,
      notes: ex.notes,
      // A custom exercise gets its flags from the library, so a new lift added in Settings is still checked
      probe: !!ex.probe || lib.probe,
      gated: ex.gated || lib.gated,
      bodyweight: !!ex.bodyweight || lib.bodyweight,
      unilateral: !!ex.unilateral || lib.unilateral,
      ...(ex.pair && { pair: ex.pair }),
      targetSets: ex.sets,
      targetReps: ex.reps,
      sets: prefillSets(ex.name, ex.sets)
    }))
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

const SUPERSET_SWITCH = 20;

// The partner is matched by name, so it is lost if either half is swapped out
function supersetPartner(ex) {
  return ex.pair ? activeSession.exercises.find(e => e.name === ex.pair && e.pair === ex.name) || null : null;
}

function startRestTimer(seconds, label) {
  activeSession.restLabel = label || '';
  activeSession.restTotal = seconds;
  activeSession.restEnd = Date.now() + seconds * 1000;
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
    $('#rest-label').textContent = activeSession.restLabel || 'REST';
    const pct = (remaining / (activeSession.restTotal || REST_SECONDS)) * 100;
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
      <div class="extra-label">${ex.gated ? 'Symptom check' : 'Probe result'}</div>
      <div class="chip-group">
        ${PROBE_STATUSES.map(s => chipHTML(s[0].toUpperCase() + s.slice(1), r.status === s, `setProbe(${ei},'${s}')`)).join('')}
      </div>
      ${ex.gated && r.status === 'no symptoms' ? `
        <div class="chip-group">
          <span class="extra-label">Tempo held, left side in control</span>
          ${chipHTML('Yes', r.control === 'yes', `updateProbe(${ei},'control','yes')`)}
          ${chipHTML('No', r.control === 'no', `updateProbe(${ei},'control','no')`)}
        </div>
      ` : ''}
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

// Collapsed by default; whether it's open is kept on the exercise, so ticking a set doesn't close it
function cuesHTML(ex, ei) {
  const lib = LIBRARY[ex.name];
  if (!lib) return '';
  return `
    <details class="cues" ${ex.cuesOpen ? 'open' : ''} ontoggle="setCuesOpen(${ei}, this.open)">
      <summary>Technique cues</summary>
      <ul>${lib.cues.map(c => `<li>${esc(c)}</li>`).join('')}</ul>
    </details>
  `;
}

function setCuesOpen(ei, open) {
  if (!activeSession || !activeSession.exercises[ei]) return;
  const ex = activeSession.exercises[ei];
  if (!!ex.cuesOpen === open) return;
  ex.cuesOpen = open;
  saveSession();
}

// A lift the program doesn't allow yet. Barbell squats and hinges wait for the review in PPL v2;
// v2's new lifts wait for their phase (one new lift at a time); v1 and Upper/Lower hold all of them.
function restrictionWarning(name, program) {
  const lib = LIBRARY[name] || {};
  const gate = REENTRY_GATES.indexOf(name) + 1;
  if (!lib.restricted && !gate) return '';
  if (!isReentry(program)) return 'This program keeps loaded squats, hinges and overhead pressing (other than the Arnold press) on hold until they are cleared.';
  const phase = currentPhase();
  if (lib.restricted) {
    return phase > REENTRY_GATES.length ? ''
      : 'Your plan says no barbell squat, deadlift or RDL until the PhysioFlex review after phase 3.';
  }
  return gate > phase ? `Your plan brings in ${name} at phase ${gate}, and you're on phase ${phase}: one new lift at a time.` : '';
}

function exerciseCardHTML(ex, ei, open) {
  const allDone = ex.sets.every(s => s.completed);
  const last = getLastSets(ex.name);
  const noteOpen = ex.noteOpen || ex.userNote;
  return `
    <div class="exercise-header ${needsReport(ex) ? 'probe-header' : ''}" onclick="toggleExercise(${ei})">
      <div class="ex-check ${allDone ? 'done' : ''}"></div>
      <span class="ex-name">${esc(ex.name)}${ex.probe ? ' <span class="probe-badge">PROBE</span>' : ''}${ex.gated ? ' <span class="probe-badge">NEW LIFT</span>' : ''}${supersetPartner(ex) ? ' <span class="pair-mark">⇄</span>' : ''}</span>
      <span class="ex-meta">${ex.targetSets}×${esc(ex.targetReps)}<br><span class="ex-rest">rest ${formatDuration(restFor(ex))}</span></span>
    </div>
    <div class="exercise-body ${open ? 'open' : ''}" id="ex-body-${ei}">
      ${ex.swappedFrom ? `<div class="swap-tag">In place of ${esc(ex.swappedFrom)}</div>` : ''}
      ${ex.added ? '<div class="swap-tag">Added today</div>' : ''}
      ${supersetPartner(ex) ? `<div class="swap-tag">⇄ Superset with ${esc(ex.pair)}: alternate sets</div>` : ''}
      ${ex.notes ? `<div class="exercise-notes">${esc(ex.notes)}</div>` : ''}
      ${cuesHTML(ex, ei)}
      ${ex.gated ? gateNoteHTML(ex) : ''}
      ${last ? `<div class="prev-weight">Last time (${formatDate(last.date)}): ${last.sets.map(s => `${s.weight} kg × ${s.reps}`).join(' · ')}</div>` : ''}
      ${!ex.probe && suggestIncrease(ex.name, ex.gated) ? '<div class="suggestion">All sets at the top of the range at 2–3 RIR in the last two sessions — consider the smallest increment.</div>' : ''}
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
        <button class="btn-small btn-small-muted" onclick="openSwap(${ei})">Swap</button>
        <button class="btn-small btn-small-muted" onclick="removeExercise(${ei})">Remove</button>
      </div>
      ${noteOpen ? `<textarea class="session-notes-textarea exercise-note" placeholder="Note for this exercise" aria-label="Exercise note"
        oninput="updateExerciseNote(${ei},this.value)">${esc(ex.userNote || '')}</textarea>` : ''}
      ${needsReport(ex) ? probeReportHTML(ex, ei) : ''}
    </div>
  `;
}

// Redraws one exercise only, so everything else on the page stays as the user left it
function refreshExercise(ei) {
  const open = $(`#ex-body-${ei}`).classList.contains('open');
  $(`#ex-card-${ei}`).innerHTML = exerciseCardHTML(activeSession.exercises[ei], ei, open);
}

function renderWorkoutExercises() {
  const sessionWarmup = buildWarmup(activeSession.type, activeSession.exercises);
  const sessionCooldown = sessionOf(activeSession).cooldown;

  // Warmup
  $('#warmup-section').innerHTML = `
    <div class="section-label">Warm-Up (6–8 min)</div>
    <div class="routine-card">
      <div class="routine-header" onclick="toggleRoutine(this)">
        <span class="name">Warm-Up for Today's Lifts</span>
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
  container.insertAdjacentHTML('beforeend',
    '<button class="btn-outline add-exercise-btn" onclick="openSwap(-1)">+ Add exercise</button>');

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
  if (field === 'side' || field === 'control') refreshExercise(ei);
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
    // In a superset, a set whose partner still has the matching set to do gets a short switch;
    // the full rest comes after both
    const partner = supersetPartner(ex);
    const partnerSet = partner && partner.sets[si];
    if (partnerSet && !partnerSet.completed) startRestTimer(SUPERSET_SWITCH, `Now: ${partner.name}`);
    else startRestTimer(partner ? Math.max(restFor(ex), restFor(partner)) : restFor(ex));
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

// ── Swap, add and remove mid-workout ─────────────────────────
// For when the equipment is taken. All stay within the same constraints (supported, no axial load);
// new lifts and probes have none, since a stand-in would not tell you the same thing.
const SUBSTITUTES = {
  'Machine Chest Press': [{ name: 'Seated Cable Chest Press', notes: 'Back against the bench or pad, press straight out, same left-blade rule.' }, { name: 'Dumbbell Bench Press (flat)', notes: 'Feet flat, blades set, no arch. Left side sets the weight.' }],
  'Pec Deck': [{ name: 'Cable Fly (high pulley)' }, { name: 'Cable Fly (mid pulley)', notes: 'Staggered stance, torso upright, hug a tree at chest height.' }],
  'Cable Fly (high pulley)': [{ name: 'Pec Deck' }, { name: 'Cable Fly (mid pulley)', notes: 'Staggered stance, torso upright, hug a tree at chest height.' }],
  'Arnold Press': [{ name: 'Seated Cable Lateral Raise', unilateral: true, notes: 'Seated, back upright, lead with the elbow to just below shoulder height. Not overhead.' }, { name: 'Machine Lateral Raise', notes: 'Pad on the upper arm, lift to shoulder height, controlled down.' }],
  'Cable Tricep Pushdown': [{ name: 'Single-Arm Cable Pushdown' , unilateral: true }, { name: 'Seated Dip Machine', notes: 'Back on the pad, elbows tucked, no shrug.' }],
  'Single-Arm Cable Pushdown': [{ name: 'Cable Tricep Pushdown' }, { name: 'Seated Dip Machine', notes: 'Back on the pad, elbows tucked, no shrug.' }],
  'Lat Pulldown': [{ name: 'Lat Pulldown (close/neutral grip)' }, { name: 'Single-Arm Cable Pulldown (kneeling)', unilateral: true, notes: 'Half-kneeling, torso tall, drive the elbow to the back pocket.' }],
  'Lat Pulldown (close/neutral grip)': [{ name: 'Lat Pulldown' }, { name: 'Single-Arm Cable Pulldown (kneeling)', unilateral: true, notes: 'Half-kneeling, torso tall, drive the elbow to the back pocket.' }],
  'Chest-Supported Machine Row': [{ name: 'Chest-Supported Dumbbell Row (incline bench)', notes: 'Chest on a 30–45° bench, row both dumbbells to the hips. Left side sets the weight.' }, { name: 'Seated Cable Row' }],
  'Seated Cable Row': [{ name: 'Chest-Supported Machine Row' }, { name: 'Chest-Supported Dumbbell Row (incline bench)', notes: 'Chest on a 30–45° bench, row both dumbbells to the hips. Left side sets the weight.' }],
  'Face Pulls': [{ name: 'Reverse Pec Deck', notes: 'Chest on the pad, arms long, squeeze the blades.' }, { name: 'Band Pull-Apart', bodyweight: true, notes: 'Arms straight at shoulder height, pull the band to the chest.' }],
  'Incline Dumbbell Curl': [{ name: 'Seated Hammer Curl' }, { name: 'Cable Curl', notes: 'Elbows pinned, no swing.' }],
  'Seated Hammer Curl': [{ name: 'Incline Dumbbell Curl' }, { name: 'Cable Rope Hammer Curl', notes: 'Elbows pinned, no swing.' }],
  'Leg Press': [{ name: 'Single-Leg Leg Press', unilateral: true, notes: 'Same back-flat rule, lighter. Left leg sets the weight.' }, { name: 'Leg Extension' }],
  'Seated Leg Curl': [{ name: 'Lying Leg Curl' }],
  'Lying Leg Curl': [{ name: 'Seated Leg Curl' }],
  'Leg Extension': [{ name: 'Single-Leg Leg Extension', unilateral: true, notes: 'Left leg sets the weight.' }],
  'Seated Calf Raise': [{ name: 'Calf Press on the Leg Press', notes: 'Back flat to the pad, balls of the feet on the platform edge.' }],
  'Pallof Press': [{ name: 'Dead Bug', bodyweight: true, notes: 'Low back flat to the floor, opposite arm and leg extend.' }, { name: 'Band Pallof Press', bodyweight: true, notes: 'Band at chest height, press out, resist the twist.' }],
};

let swapIndex = null;

function openSwap(ei) {
  if (!activeSession) return;
  swapIndex = ei;
  const adding = ei < 0;
  const ex = adding ? null : activeSession.exercises[ei];
  const original = ex && (ex.swappedFrom || ex.name);
  const options = adding ? [] : (SUBSTITUTES[original] || []).filter(o => o.name !== ex.name);
  if (ex && ex.swappedFrom) options.unshift({ name: ex.swappedFrom });

  $('#swap-title').textContent = adding ? 'Add exercise' : `Swap ${ex.name}`;
  $('#swap-note').textContent = adding ? 'Added to today only, unless you tick the box below.'
    : needsReport(ex) ? 'No stand-in suggested: this lift is being tested on its own. If the equipment is taken, Remove it for today, or type another.'
    : 'Today only. Sets and reps carry over.';
  $('#swap-options').innerHTML = options.map((o, i) =>
    `<button class="chip" onclick="pickSwap(${i})">${esc(o.name)}</button>`).join('');
  $('#swap-options').dataset.options = JSON.stringify(options);
  $('#swap-name').value = '';
  $('#swap-sets').value = adding ? 3 : ex.targetSets;
  $('#swap-reps').value = adding ? '10–12' : ex.targetReps;
  $('#swap-bodyweight').checked = false;
  $('#swap-keep').checked = false;
  $('#swap-keep-row').classList.toggle('hidden', !adding);
  $('#swap-library').innerHTML = libraryOptionsHTML();
  $('#btn-swap-ok').textContent = adding ? 'Add' : 'Swap';
  $('#modal-swap').classList.remove('hidden');
}

// Picking from the full library fills the name, the bodyweight box and, for a new exercise, its usual reps
function fillFromLibrary(prefix, keepReps) {
  const name = $(`#${prefix}-library`).value;
  if (!name) return;
  const lib = LIBRARY[name];
  $(`#${prefix}-name`).value = name;
  $(`#${prefix}-bodyweight`).checked = !!lib.bodyweight;
  if (!keepReps && lib.reps) $(`#${prefix}-reps`).value = lib.reps;
  $$('#swap-options .chip').forEach(c => c.classList.remove('on'));
}

function pickSwap(i) {
  const o = JSON.parse($('#swap-options').dataset.options)[i];
  $('#swap-name').value = o.name;
  $('#swap-bodyweight').checked = !!(o.bodyweight || (LIBRARY[o.name] && LIBRARY[o.name].bodyweight));
  $('#swap-library').value = '';
  $$('#swap-options .chip').forEach((c, j) => c.classList.toggle('on', j === i));
}

function applySwap() {
  if (!activeSession) return;
  const name = $('#swap-name').value.trim();
  if (!name) { alert('Pick or type an exercise.'); return; }
  const adding = swapIndex < 0;
  const old = adding ? null : activeSession.exercises[swapIndex];
  const warning = restrictionWarning(name, activeSession.program);
  if (warning && !confirm(`${warning} ${adding ? 'Add' : 'Swap to'} ${name} anyway?`)) return;
  if (old && !releaseExercise(old, 'Swap')) return;

  const options = JSON.parse($('#swap-options').dataset.options || '[]');
  const known = { ...LIBRARY[name], ...options.find(o => o.name === name) };
  const flags = libraryFlags(name);
  const sets = Math.max(1, parseInt($('#swap-sets').value) || 3);
  const reps = $('#swap-reps').value.trim() || '10–12';
  const bodyweight = $('#swap-bodyweight').checked || !!known.bodyweight;
  const original = old && (old.swappedFrom || old.name);
  const ex = {
    id: 'live_' + Date.now(),
    name,
    notes: cueFor(name, activeSession.program) || known.notes || '',
    // A new lift or probe added on the spot still needs its symptom check
    probe: flags.probe,
    gated: flags.gated,
    bodyweight,
    unilateral: !!known.unilateral,
    targetSets: sets,
    targetReps: reps,
    sets: prefillSets(name, sets),
    // Swapping back to the planned lift clears the swap
    ...(original && original !== name && { swappedFrom: original }),
    ...(adding && { added: true })
  };
  // Swapping back restores the planned lift's own flags
  if (original === name) {
    const planned = getExercisesFor(activeSession.program, activeSession.session, activeSession.dayIndex, activeSession.phase || 1)
      .find(e => e.name === name);
    if (planned) Object.assign(ex, { id: planned.id, notes: planned.notes, probe: !!planned.probe, gated: planned.gated || 0, unilateral: !!planned.unilateral, bodyweight: !!planned.bodyweight });
  }

  if (adding) {
    activeSession.exercises.push(ex);
    if ($('#swap-keep').checked) {
      const { week, type } = sessionOf(activeSession);
      customExercises.push({
        id: 'custom_' + Date.now(), name, sets, reps, notes: ex.notes, week, type,
        program: programOf(activeSession), session: sessionKeyOf(activeSession), bodyweight
      });
      save('custom', customExercises);
    }
  } else {
    activeSession.exercises[swapIndex] = ex;
  }
  saveSession();
  $('#modal-swap').classList.add('hidden');
  renderWorkoutExercises();
  if (!adding) $(`#ex-body-${swapIndex}`).classList.add('open');
}

function showReport(ei) {
  const ex = activeSession.exercises[ei];
  alert(`Record the ${ex.gated ? 'symptom check' : 'probe result'} for ${ex.name} first.`);
  $(`#ex-body-${ei}`).classList.add('open');
  $(`#ex-card-${ei} .probe-report`).scrollIntoView({ block: 'center' });
}

function hasSymptoms(ex) {
  return !!ex.probeResult && ex.probeResult.status === 'symptoms';
}

// Before a swap or removal. A probe or new lift that was attempted, or has symptoms logged, must be
// reported first and is then kept aside so the report still reaches history and the gate.
// Returns 'kept' or 'dropped', or false if the swap or removal should not go ahead.
function releaseExercise(ex, verb) {
  const done = ex.sets.some(s => s.completed);
  const keep = needsReport(ex) && (done || hasSymptoms(ex));
  if (keep && probeUnreported(ex)) { showReport(activeSession.exercises.indexOf(ex)); return false; }
  const what = keep ? ' What you logged for it is still saved.' : done ? ' The sets you ticked will not be saved.' : '';
  if (!confirm(`${verb} ${ex.name} for today?${what}`)) return false;
  if (!keep) return 'dropped';
  activeSession.retired = [...(activeSession.retired || []), { ...ex, retired: true }];
  return 'kept';
}

function removeExercise(ei) {
  if (!activeSession) return;
  const ex = activeSession.exercises[ei];
  const released = releaseExercise(ex, 'Remove');
  if (!released) return;
  activeSession.exercises.splice(ei, 1);
  if (!ex.added && released === 'dropped') activeSession.skipped = [...(activeSession.skipped || []), ex.swappedFrom || ex.name];
  saveSession();
  renderWorkoutExercises();
}

function finishWorkout() {
  if (!activeSession) return;

  // Exercises set aside mid-workout with something logged are saved along with the rest
  const all = [...activeSession.exercises, ...(activeSession.retired || [])];
  const completedSets = all.reduce((sum, e) => sum + e.sets.filter(s => s.completed).length, 0);
  const totalSets = all.reduce((sum, e) => sum + e.sets.length, 0);

  const unreported = activeSession.exercises.findIndex(probeUnreported);
  if (unreported >= 0) { showReport(unreported); return; }

  // A workout stopped by symptoms before any set was ticked is still kept, for the report
  if (completedSets === 0 && !all.some(hasSymptoms)) {
    if (!confirm('You haven\'t logged any sets. Discard this workout?')) return;
    cancelWorkout();
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
    ...(activeSession.phase && { phase: activeSession.phase }),
    duration: leftOpen ? null : elapsed,
    ...(leftOpen && { durationInvalid: true }),
    notes: activeSession.notes || '',
    ...(activeSession.skipped && activeSession.skipped.length && { skipped: activeSession.skipped }),
    exercises: all.map(e => ({
      id: e.id,
      name: e.name,
      targetReps: e.targetReps,
      ...(e.swappedFrom && { swappedFrom: e.swappedFrom }),
      ...(e.added && { added: true }),
      ...(e.retired && { removed: true }),
      ...(e.gated && { gated: e.gated }),
      // Unticked sets still hold their prefilled numbers, which were never lifted.
      // An added set that was never done is dropped rather than recorded as skipped.
      sets: e.sets.map((s, i) => s.completed ? {
        weight: s.weight, reps: s.reps, completed: true,
        ...(s.rir != null && { rir: s.rir }),
        ...(e.unilateral && { side: s.side || 'Both' }),
        ...(loadChanged(e, i) && { loadChanged: true })
      } : i < e.targetSets ? { weight: 0, reps: 0, completed: false } : null).filter(Boolean),
      ...(e.userNote && e.userNote.trim() && { userNote: e.userNote.trim() }),
      ...(needsReport(e) && { probeResult: probeRecord(e) })
    }))
  };

  history.push(record);
  saveHistory();

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
  if (r.status === 'symptoms') return `symptoms — ${r.side}, ${r.location}, ${r.sensation}/10`;
  return r.control ? `${r.status}, tempo and left side ${r.control === 'yes' ? 'in control' : 'NOT in control'}` : r.status;
}

function exerciseTag(e) {
  return [
    e.swappedFrom ? `in place of ${esc(e.swappedFrom)}` : '',
    e.added ? 'added' : '',
    e.removed ? 'stopped partway' : ''
  ].filter(Boolean).map(t => ` <span class="swap-tag-inline">${t}</span>`).join('');
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
        ${e.probeResult ? reportEditHTML(e, ei) : ''}
      </div>
    `).join('')}
    <textarea id="edit-notes" class="session-notes-textarea" placeholder="Session notes">${esc(h.notes || '')}</textarea>
  ` : `
    ${h.notes ? `<div class="detail-notes">${esc(h.notes)}</div>` : ''}
    ${h.phase ? `<div class="detail-meta">Re-entry ${h.phase > 3 ? 'review stage' : `phase ${h.phase}`}</div>` : ''}
    ${h.skipped ? `<div class="detail-meta">Removed: ${esc(h.skipped.join(', '))}</div>` : ''}
    ${h.exercises.map(e => `
      <div style="margin-bottom:12px">
        <strong style="font-size:17px">${esc(e.name)}</strong>${exerciseTag(e)}
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

function optionsHTML(values, current, blank) {
  return (blank ? '<option value="">–</option>' : '') +
    values.map(v => `<option value="${esc(v)}" ${String(current) === String(v) ? 'selected' : ''}>${esc(v)}</option>`).join('');
}

// The symptom check decides whether a session counts toward a gate, so it can be corrected here too.
// Side, location and sensation only apply when the status is symptoms.
function reportEditHTML(e, ei) {
  const r = e.probeResult;
  return `
    <div class="probe-report report-edit" data-ei="${ei}">
      <label class="chip-group"><span class="extra-label">${e.gated ? 'Symptom check' : 'Probe result'}</span>
        <select class="edit-status">${optionsHTML(PROBE_STATUSES, r.status)}</select></label>
      ${e.gated ? `<label class="chip-group"><span class="extra-label">Tempo and left side in control</span>
        <select class="edit-control">${optionsHTML(['yes', 'no'], r.control, true)}</select></label>` : ''}
      <label class="chip-group"><span class="extra-label">If symptoms: side</span>
        <select class="edit-side">${optionsHTML(PROBE_SIDES, r.side, true)}</select></label>
      <input class="input edit-location" type="text" placeholder="Where? e.g. lower back" aria-label="Location" value="${esc(r.location || '')}">
      <label class="chip-group"><span class="extra-label">Sensation 0–10</span>
        <select class="edit-sensation">${optionsHTML(Array.from({ length: 11 }, (_, n) => n), r.sensation ?? '', true)}</select></label>
    </div>
  `;
}

function readReportEdit(box, e) {
  const status = box.querySelector('.edit-status').value;
  if (status === 'symptoms') {
    const side = box.querySelector('.edit-side').value;
    const location = box.querySelector('.edit-location').value.trim();
    const sensation = box.querySelector('.edit-sensation').value;
    if (!side || !location || sensation === '') return null;
    return { status, side, location, sensation: Number(sensation) };
  }
  const control = e.gated && status === 'no symptoms' && box.querySelector('.edit-control').value;
  return { status, ...(control && { control }) };
}

function saveHistoryEdit() {
  const h = history[detailIndex];
  if (!h) return;
  const reports = [...$$('#detail-content .report-edit')].map(box => {
    const e = h.exercises[box.dataset.ei];
    return { e, result: readReportEdit(box, e) };
  });
  const missing = reports.find(x => !x.result);
  if (missing) { alert(`Add the side, location and sensation for ${missing.e.name}, or change its status.`); return; }
  reports.forEach(({ e, result }) => { e.probeResult = result; });
  $$('#detail-content .set-row').forEach(row => {
    const set = h.exercises[row.dataset.ei].sets[row.dataset.si];
    const [weight, reps] = row.querySelectorAll('.set-input');
    set.weight = parseFloat(weight.value) || 0;
    set.reps = parseFloat(reps.value) || 0;
    set.completed = row.querySelector('.edit-done').checked;
  });
  h.notes = $('#edit-notes').value;
  saveHistory();
  renderHistory();
  showHistoryDetail(detailIndex);
}

function deleteHistoryEntry() {
  if (!history[detailIndex]) return;
  if (!confirm('Delete this workout from history? This cannot be undone.')) return;
  history.splice(detailIndex, 1);
  saveHistory();
  $('#modal-detail').classList.add('hidden');
  renderHistory();
}

// ── Physio report ────────────────────────────────────────────
// One summary for an appointment: where the re-entry stands, every symptom logged, each new lift and
// probe session with its loads and check, and session notes. Shown on screen, shared as text.
const REPORT_PERIODS = [
  { id: '14', label: 'Last 2 weeks', days: 14 },
  { id: '28', label: 'Last 4 weeks', days: 28 },
  { id: '56', label: 'Last 8 weeks', days: 56 },
  { id: 'reentry', label: 'Since the first goblet squat' },
  { id: 'all', label: 'Everything logged' },
];

function reportStart(periodId) {
  const p = REPORT_PERIODS.find(x => x.id === periodId) || REPORT_PERIODS[1];
  if (p.days) {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d.getTime() - (p.days - 1) * DAY_MS;
  }
  if (p.id === 'reentry') {
    const log = liftLog('Goblet Squat');
    return log.length ? log[0].date : Date.now();
  }
  return 0;
}

function longDate(d) {
  return new Date(d).toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
}

// "8 kg × 8, 8, 8 · RIR 4, 4, 5+" with any sets not done counted on the end
function setsText(sets) {
  const done = sets.filter(s => s.completed);
  if (!done.length) return 'no sets done';
  const load = s => (s.weight ? `${s.weight} kg` : 'BW');
  const sameLoad = done.every(s => s.weight === done[0].weight);
  const main = sameLoad
    ? `${load(done[0])} × ${done.map(s => s.reps).join(', ')}`
    : done.map(s => `${load(s)} × ${s.reps}`).join(', ');
  const rir = done.some(s => s.rir != null) ? ` · RIR ${done.map(s => (s.rir == null ? '–' : RIR_LABELS[s.rir])).join(', ')}` : '';
  const missed = sets.length - done.length;
  return main + rir + (missed ? ` · ${missed} set${missed === 1 ? '' : 's'} not done` : '');
}

function checkText(e) {
  const r = e.probeResult;
  if (!r) return 'no check recorded';
  if (r.status === 'symptoms') return `SYMPTOMS — ${r.side || '?'}, ${r.location || '?'}, ${r.sensation ?? '?'}/10`;
  if (r.status === 'not done') return 'not done';
  if (!e.gated) return 'no symptoms';
  if (cleanLift(e)) return 'clean';
  return r.control === 'no' ? 'no symptoms, but tempo or left side NOT in control' : 'no symptoms, not all sets done';
}

function buildReport(periodId) {
  const start = reportStart(periodId);
  const recs = history
    .filter(h => new Date(h.date).getTime() >= start)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  // The re-entry lifts first, then any other lift that needs a symptom check (barbell work), then probes
  const flagged = flag => Object.keys(LIBRARY).filter(n => LIBRARY[n][flag] && !REENTRY_GATES.includes(n));
  const tracked = [...REENTRY_GATES, ...flagged('report'), ...flagged('probe')];
  const lifts = new Map(tracked.map(n => [n, []]));
  const symptoms = [];
  const notes = [];

  recs.forEach(h => {
    h.exercises.forEach(e => {
      const extra = [e.removed ? 'stopped partway' : '', e.userNote ? `note: ${e.userNote}` : ''].filter(Boolean);
      if (hasSymptoms(e)) symptoms.push({ date: h.date, name: e.name, check: checkText(e), sets: setsText(e.sets), extra });
      const attempted = e.sets.some(s => s.completed) || (e.probeResult && e.probeResult.status !== 'not done');
      if (lifts.has(e.name) && attempted) lifts.get(e.name).push({ date: h.date, sets: setsText(e.sets), check: checkText(e), extra });
    });
    if (h.notes && h.notes.trim()) notes.push({ date: h.date, text: h.notes.trim() });
  });

  const showPhase = isReentry(programId) || liftLog('Goblet Squat').length > 0;
  return {
    generated: Date.now(),
    start: recs.length ? Math.max(start, new Date(recs[0].date).getTime()) : start,
    workouts: recs.length,
    phase: showPhase ? phaseSummary() : null,
    symptoms,
    lifts: [...lifts].filter(([, rows]) => rows.length).map(([name, rows]) => ({ name, rows })),
    notes
  };
}

function reportText(r) {
  const out = [
    'REPORT FOR PHYSIOFLEX',
    `Spine-Safe Tracker · generated ${longDate(r.generated)}`,
    `Period: ${r.start ? longDate(r.start) : 'start'} to ${longDate(r.generated)} (${r.workouts} workout${r.workouts === 1 ? '' : 's'})`,
    ''
  ];
  if (r.phase) {
    out.push(r.phase.title.toUpperCase() + (r.phase.forced ? ' (set by hand)' : ''));
    r.phase.lines.forEach(l => out.push(`${r.phase.lift}: ${l}`));
    r.phase.notes.forEach(n => out.push(n));
    out.push('');
  }
  out.push(`SYMPTOMS (${r.symptoms.length})`);
  if (!r.symptoms.length) out.push('None logged in this period.');
  r.symptoms.forEach(s => {
    out.push(`• ${formatDate(s.date)} — ${s.name}: ${s.check}`);
    out.push(`  Sets: ${s.sets}`);
    s.extra.forEach(x => out.push(`  ${x}`));
  });
  out.push('', 'NEW LIFTS AND PROBES');
  if (!r.lifts.length) out.push('None in this period.');
  r.lifts.forEach(l => {
    out.push(l.name);
    l.rows.forEach(row => {
      out.push(`• ${formatDate(row.date)} — ${row.sets} — ${row.check}`);
      row.extra.forEach(x => out.push(`  ${x}`));
    });
  });
  if (r.notes.length) {
    out.push('', 'SESSION NOTES');
    r.notes.forEach(n => out.push(`• ${formatDate(n.date)} — ${n.text}`));
  }
  return out.join('\n');
}

function reportHTML(r) {
  const row = (date, main, sub) => `
    <li><strong>${esc(formatDate(date))}</strong> — ${main}${sub.map(x => `<br><span class="report-sub">${esc(x)}</span>`).join('')}</li>`;
  return `
    <p class="card-note">${esc(longDate(r.start || r.generated))} to ${esc(longDate(r.generated))} · ${r.workouts} workout${r.workouts === 1 ? '' : 's'}</p>
    ${r.phase ? `
      <h4>${esc(r.phase.title)}${r.phase.forced ? ' (set by hand)' : ''}</h4>
      ${r.phase.lines.map(l => `<p><strong>${esc(r.phase.lift)}</strong>: ${esc(l)}</p>`).join('')}
      ${r.phase.notes.map(n => `<p>${esc(n)}</p>`).join('')}` : ''}
    <h4>Symptoms (${r.symptoms.length})</h4>
    ${r.symptoms.length ? `<ul>${r.symptoms.map(s =>
      row(s.date, `${esc(s.name)}: <span class="report-flag">${esc(s.check)}</span>`, [`Sets: ${s.sets}`, ...s.extra])).join('')}</ul>`
      : '<p>None logged in this period.</p>'}
    <h4>New lifts and probes</h4>
    ${r.lifts.length ? r.lifts.map(l => `
      <p class="report-lift">${esc(l.name)}</p>
      <ul>${l.rows.map(x => row(x.date, `${esc(x.sets)} — ${x.check.startsWith('SYMPTOMS') ? `<span class="report-flag">${esc(x.check)}</span>` : esc(x.check)}`, x.extra)).join('')}</ul>
    `).join('') : '<p>None in this period.</p>'}
    ${r.notes.length ? `<h4>Session notes</h4><ul>${r.notes.map(n => row(n.date, esc(n.text), [])).join('')}</ul>` : ''}
  `;
}

function currentReportPeriod() { return $('#report-period').value; }

function renderReport() {
  save('reportPeriod', currentReportPeriod());
  $('#report-body').innerHTML = reportHTML(buildReport(currentReportPeriod()));
}

function openReport() {
  $('#report-period').innerHTML = REPORT_PERIODS.map(p => `<option value="${p.id}">${p.label}</option>`).join('');
  $('#report-period').value = load('reportPeriod', '28');
  if (!$('#report-period').value) $('#report-period').value = '28';
  renderReport();
  $('#modal-report').classList.remove('hidden');
}

async function shareReport() {
  const text = reportText(buildReport(currentReportPeriod()));
  if (navigator.share) {
    try { await navigator.share({ title: 'Report for PhysioFlex', text }); return; }
    catch (err) { if (err && err.name === 'AbortError') return; }
  }
  try {
    await navigator.clipboard.writeText(text);
    alert('Report copied. Paste it into an email or message.');
  } catch {
    alert('Could not share or copy here. Use Download instead.');
  }
}

function downloadReport() {
  downloadFile(`physio-report-${localDate(new Date())}.txt`, reportText(buildReport(currentReportPeriod())), 'text/plain');
}

// ── Manage View ──────────────────────────────────────────────
function renderManage() {
  const program = PROGRAMS[programId];
  $('#sel-active-program').value = programId;
  $('#manage-schedule').classList.toggle('hidden', !!program.rotation);
  $('#rotation-note').classList.toggle('hidden', !program.rotation);
  $('#sel-week').value = schedule.week;
  $('#sel-day').value = schedule.dayIndex;
  $('#phase-row').classList.toggle('hidden', !isReentry(programId));
  $('#sel-phase').value = load('phaseOverride', 0);

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
    const ex = withOverride(programId, base);
    const days = ex.days ? ` on ${ex.days.map(d => DAY_LABELS[d]).join(', ')}` : '';
    const when = ex.gated ? ` • from phase ${ex.gated}${days}` : ex.until ? ` • until phase ${ex.until}${days}` : '';
    const pair = ex.pair ? ` • ⇄ ${esc(ex.pair)}` : '';
    return `
      <div class="custom-ex-item">
        <div class="cex-info">
          ${esc(ex.name)}
          <small>${ex.sets}×${esc(ex.reps)} • rest ${formatDuration(restFor(base, programId))}${when}${pair}${overrideFor(programId, base.id) ? ' • edited' : ''}</small>
        </div>
        <button class="btn-small" onclick="editProgramExercise('${base.id}')">Edit</button>
      </div>
    `;
  }).join('');
}

// Edits apply to this program's version of the exercise only
function editProgramExercise(id) {
  const edit = overrideFor(programId, id);
  const ex = withOverride(programId, programExercise(programId, id));
  programEditId = id;
  $('#program-title').textContent = ex.name;
  $('#prog-sets').value = ex.sets;
  $('#prog-reps').value = ex.reps;
  $('#prog-notes').value = ex.notes;
  $('#prog-rest').value = (edit && edit.rest) || '';
  $('#prog-rest').placeholder = `Rest (s), default ${defaultRest(ex.name)}`;
  $('#btn-prog-reset').disabled = !edit;
  $('#modal-program').classList.remove('hidden');
}

function saveProgramExercise() {
  const base = programExercise(programId, programEditId);
  const rest = parseInt($('#prog-rest').value);
  const form = {
    sets: Math.max(1, parseInt($('#prog-sets').value) || base.sets),
    reps: $('#prog-reps').value.trim() || base.reps,
    notes: $('#prog-notes').value.trim(),
    // Blank keeps the default rest
    ...(rest > 0 && { rest: Math.min(rest, 600) })
  };
  const changed = Object.fromEntries(OVERRIDE_FIELDS.filter(f => form[f] !== undefined && form[f] !== base[f]).map(f => [f, form[f]]));
  const key = overrideKey(programId, programEditId);
  if (Object.keys(changed).length) overrides[key] = changed;
  else delete overrides[key];
  save('overrides', overrides);
  $('#modal-program').classList.add('hidden');
  renderProgram();
}

function resetProgramExercise() {
  delete overrides[overrideKey(programId, programEditId)];
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
  const warning = restrictionWarning(name, programId);
  if (warning && !confirm(`${warning} Add ${name} to the program anyway?`)) return;

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
  $('#add-library').value = '';
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
        const flags = csvCell([
          i === 0 && (h.durationInvalid || h.duration > MAX_DURATION) ? 'duration-invalid' : '',
          s.loadChanged ? 'load-changed' : '',
          i === 0 && e.swappedFrom ? `swapped-from:${e.swappedFrom}` : '',
          i === 0 && e.added ? 'added' : '',
          i === 0 && h.phase ? `phase:${h.phase}` : '',
          i === 0 && probe.control ? `control:${probe.control}` : ''
        ].filter(Boolean).join(';'));
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
    phaseOverride: load('phaseOverride', 0),
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
  // A backup from before edits were kept per program is converted the same way as on load
  overrides = migrateOverrides(data.overrides || {});
  schedule = data.schedule || { week: 'A', dayIndex: 0 };
  // A version 1 backup predates the second program
  programId = PROGRAMS[data.program] ? data.program : 'ppl-v1';
  pickedSession = null;
  saveHistory();
  save('custom', customExercises);
  save('overrides', overrides);
  save('schedule', schedule);
  save('program', programId);
  save('phaseOverride', Number(data.phaseOverride) || 0);
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
  saveHistory();
  save('custom', customExercises);
  save('overrides', overrides);
  save('schedule', schedule);
  save('phaseOverride', 0);
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

  $('#sel-phase').addEventListener('change', () => {
    save('phaseOverride', Number($('#sel-phase').value));
    renderToday();
  });
  $('#btn-swap-ok').addEventListener('click', applySwap);
  $('#swap-library').addEventListener('change', () => fillFromLibrary('swap', swapIndex >= 0));
  $('#add-library').innerHTML = libraryOptionsHTML();
  $('#add-library').addEventListener('change', () => fillFromLibrary('add', false));
  $('#btn-swap-cancel').addEventListener('click', () => $('#modal-swap').classList.add('hidden'));

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

  $('#btn-report').addEventListener('click', openReport);
  $('#report-period').addEventListener('change', renderReport);
  $('#btn-report-share').addEventListener('click', shareReport);
  $('#btn-report-download').addEventListener('click', downloadReport);
  $('#btn-report-close').addEventListener('click', () => $('#modal-report').classList.add('hidden'));
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
