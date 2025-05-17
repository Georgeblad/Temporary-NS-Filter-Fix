(function () {
  console.log('▶ Temporary Filter Fix by Georgeblad/SuiteZenith');

  // fires each time a new popup appears
  const fix = () => {
    const pop = document.querySelector('div[id^="crit_"][id$="_popup"]');
    if (!pop) return; // nothing to do yet

    console.log('🔍 Popup detected → clearing ancestor clipping');

    let p = pop.parentElement;
    while (p) {
      ['overflow', 'clip', 'clipPath', 'maxHeight']
        .forEach(prop => p.style.setProperty(prop, 'visible', 'important'));
      p = p.parentElement;
    }

    pop.style.setProperty('z-index', '2147483647', 'important');
    pop.style.setProperty('overflow', 'visible', 'important');

    console.log('✅ GL popup liberated', pop);
  };

  // observe DOM changes so it runs whenever NetSuite inserts the popup
  new MutationObserver(fix).observe(document.body, {
    childList: true,
    subtree: true
  });

  // run once at load in case popup is already there
  fix();
})();
