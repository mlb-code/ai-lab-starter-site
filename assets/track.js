/* מעקב לחיצות ופניות ל-GA4 (G-F8LHTWZEMN). לא נוגע בקישורים; כל כשל כאן נבלע ולא שובר כפתור או טופס. */
(function () {
  function send(name, params) {
    try {
      if (typeof window.gtag !== 'function') return;
      var p = params || {};
      p.transport_type = 'beacon';
      window.gtag('event', name, p);
    } catch (e) { /* לעולם לא לשבור את הדף */ }
  }
  function section(el) {
    try {
      if (el.closest('footer')) return 'footer';
      if (el.closest('header,.nav,#nav')) return 'header';
      var s = el.closest('section[id]');
      return s ? s.id : 'page';
    } catch (e) { return 'page'; }
  }
  function label(el) {
    try { return (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 40); } catch (e) { return ''; }
  }
  window.alTrack = send;
  window.alTrackSection = section;

  document.addEventListener('click', function (ev) {
    try {
      var a = ev.target && ev.target.closest ? ev.target.closest('a[href]') : null;
      if (!a) return;
      var h = a.getAttribute('href') || '';
      if (h.indexOf('wa.me/972546500795') !== -1) {
        send('whatsapp_click', { cta_section: section(a), cta_label: label(a) });
      } else if (h.indexOf('my.starter.ai-lab.co.il/buy/starter-self-paced') !== -1) {
        send('begin_checkout', { cta_section: section(a), cta_label: label(a), item_name: 'starter-self-paced', value: 359, currency: 'ILS' });
      } else if (h.indexOf('my.starter.ai-lab.co.il/student') !== -1) {
        send('login_click', { cta_section: section(a) });
      }
    } catch (e) { /* שקט */ }
  }, true);
})();
