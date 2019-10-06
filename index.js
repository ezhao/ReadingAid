// WIP
(() => {
  let current = 0;
  let count = 0;
  // for New Yorker:
  // let entries = document.querySelectorAll('#articleBody p').entries();
  let entries = document.querySelectorAll('p').entries();
  // in case we need to access the index of the paragraph
  for (const [idx, el] of entries) {
    // TODO: split text more intelligently
    el.innerHTML = el.innerHTML
      .split('. ')
      .map((sentence, i) => {
        count += 1;
        return `<span id="emily-${count}">${sentence}</span>`;
      })
      .join('. ');
  }

  document.addEventListener('keydown', e => {
    // TODO: "j" should go backward, "k" should go forward
    if (e.key == 'j' || e.key == 'k') {
      let prev = document.getElementById(`emily-${current}`);
      // remove highlight if it exists
      if (prev && prev.style) {
        prev.style.background = 'initial';
      }
      current += 1;
      let next = document.getElementById(`emily-${current}`);
      // highlight text
      if (next && next.style) {
        next.style.background = 'yellow';
      }
      // reset
      if (current > count) {
        current = 0;
      }
    }
  });
})();
