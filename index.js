(() => {
  let current = 0;
  let count = 0;
  let entries = getMyEntries();

  // in case we need to access the index of the paragraph
  for (const [idx, el] of entries) {
    // TODO: split text more intelligently
    el.innerHTML = smartSplit(el.innerHTML)
      .map((sentence, i) => {
        count += 1;
        return `<span id="emily-${count}">${sentence}</span>`;
      })
      .join(' ');
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

function smartSplit(s) {
  // These should all end in a sentence ender
  const EXCEPTIONS = ["... ",
                      "a.m. ",
                      "p.m. ",
                      "U.S.",
                      "Mr. ",
                      "Ms. ",
                      "Mrs. ",
                      "Dr. ",
                      "Sept. ",
                      "Sep. ",
                      "Oct. ",
                      "Nov. ",
                      "Dec. ",
                      "St.",
                      "B.A.",
                      ];

  // These should all end in a space character
  const SENTENCE_ENDERS = [". ",
                           "? ",
                           "! ",
                           '.) ', '?) ', '!) ',
                           '." ', '?" ', '!" ',
                           '.” ', '?” ', '!” '];

  let A = [];
  let i = 0;
  let nextSentenceStart = i;
  while (i < s.length) {
    let exceptionFound = false;
    for (ex of EXCEPTIONS) {
      if (i < s.length + 1 - ex.length && s.substr(i, ex.length) == ex) {
        // we're at an sentence ender exception and should skip forward
        i = i+ex.length;
        exceptionFound = true;
        break;
      }
    }
    if (exceptionFound) {
      continue;
    }

    let endingFound = false;
    for (se of SENTENCE_ENDERS) {
      if (s.substr(i, se.length) == se) {
        i += se.length - 1;
        A.push(s.substr(nextSentenceStart, i - nextSentenceStart));
        i++;
        nextSentenceStart = i;
        endingFound = true;
        break;
      }
    }
    if (endingFound) {
      continue;
    }

    i++;
  }
  A.push(s.substr(nextSentenceStart, s.length - nextSentenceStart));
  return A;
}

function getMyEntries() {
  href = window.location.href;
  href = href.toLowerCase();
  if (href.indexOf("newyorker.com") >= 0) {
    return document.querySelectorAll('#articleBody p').entries();
  }
  if (href.indexOf("techcrunch.com") >= 0) {
    return document.querySelectorAll('.article__content-wrap p').entries();
  }
  return document.querySelectorAll('p').entries();
}

// Test cases
// let s = 'Aaa a aaaaa aaaaa. Bbbb bb b bbbbb! Cccc cc c cccccc? (Dddd dd d dddd.) Eee ee, "ee eeee." Fff ff... f ffff. G ggg gggg Sept. 26 gg Mr. Ggggg. Hhh hhhhh, "H hh hhh?" Last word.';
// smartSplit(s);
