export const manageScroll = (sectionElts) => {
  syncHorizontalScroll(sectionElts.noteDisplay, sectionElts.ruler);
  syncHorizontalScroll(sectionElts.noteDisplay, sectionElts.automationLane);
  syncVerticalScroll(sectionElts.noteDisplay, sectionElts.midiKeyboard);
};

export const syncVerticalScroll = (a, b) => {
  let prev = 0;
  a.addEventListener('scroll', ({ target }) => {
    if (target.scrollTop === prev) return;
    b.scrollTop = target.scrollTop;
    prev = target.scrollTop;
  });
  b.addEventListener('scroll', ({ target }) => {
    if (target.scrollTop === prev) return;
    a.scrollTop = target.scrollTop;
    prev = target.scrollTop;
  });
};
export const syncHorizontalScroll = (a, b) => {
  let prev = 0;
  a.addEventListener('scroll', ({ target }) => {
    if (target.scrollLeft === prev) return;
    b.scrollLeft = target.scrollLeft;
    prev = target.scrollLeft;
  });
  b.addEventListener('scroll', ({ target }) => {
    if (target.scrollLeft === prev) return;
    a.scrollLeft = target.scrollLeft;
    prev = target.scrollLeft;
  });
};
