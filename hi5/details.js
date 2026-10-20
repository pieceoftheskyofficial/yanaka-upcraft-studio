function bilingual(element, english, japanese) {
 element.textContent = english;
 const translation = document.createElement('span');
 translation.className = 'translation'; translation.lang = 'ja'; translation.textContent = japanese;
 element.append(translation);
}
function bookingLink(time = '') {
 const body = `Hi Daniel,\nI’d like to reserve a spot for the Hi5 collaboration event on November 15, 2026.\n\nName / お名前:\nPreferred session / ご希望の時間: ${time}\nNumber of participants / 参加人数:\nNumber of parents watching / 見学する保護者の人数:\nQuestions / ご質問:\n`;
 return `mailto:yanakaupcraftstudio@gmail.com?subject=${encodeURIComponent('Hi5 collaboration event — booking request / Hi5コラボイベント予約希望')}&body=${encodeURIComponent(body)}`;
}
document.getElementById('booking-email').href = bookingLink();
async function loadEventSchedule() {
 const target = document.getElementById('event-schedule');
 try {
  const response = await fetch('sessions.json', {cache:'no-cache'});
  if (!response.ok) throw new Error('Schedule unavailable');
  const sessions = await response.json();
  const rows = sessions.map(({time, spots}) => {
   if (!Number.isInteger(spots) || spots < 0 || spots > 4) throw new Error('Invalid availability');
   const row = document.createElement('article'); row.className = 'event-slot';
   const clock = document.createElement('time'); clock.dateTime = `2026-11-15T${time}:00+09:00`; clock.textContent = time;
   const availability = document.createElement('strong'); bilingual(availability, spots === 0 ? 'Fully booked' : `${spots} of 4 spots available`, spots === 0 ? '満席' : `定員4名・残り${spots}名`);
   row.append(clock, availability);
   if (spots > 0) {
    const link = document.createElement('a'); link.className = 'text-link'; link.href = bookingLink(time); bilingual(link, 'Email Daniel to book ↗', 'ダニエルへメールで予約 ↗'); link.setAttribute('aria-label',`Email Daniel to request the ${time} session / ${time}の回をメールで予約`); row.append(link);
   } else {
    const label = document.createElement('span'); bilingual(label, 'Please choose another session', '別の時間をお選びください'); row.append(label);
   }
   return row;
  });
  target.replaceChildren(...rows);
 } catch {
  bilingual(target, 'Availability is temporarily unavailable. Sessions are at 9:00, 10:30, 13:00, 14:30, 16:00 and 17:30. Please email Daniel to check availability.', '空き状況を表示できません。開催時間は9:00、10:30、13:00、14:30、16:00、17:30です。ダニエルへメールでお問い合わせください。');
 }
}
loadEventSchedule();
