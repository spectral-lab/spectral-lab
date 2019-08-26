/**
 * @param {object} param
 * @param {Element[]} param.verticalScrollTargets
 * @param {Element[]} param.horizontalScrollTargets
 */
export const syncScroll = ({ verticalScrollTargets, horizontalScrollTargets }) => {
  verticalScrollTargets.forEach((targetElement, idx, targets) => {
    const prevElement = targets[idx - 1];
    if (!prevElement) return;
    syncVerticalScroll(prevElement, targetElement);
  });
  horizontalScrollTargets.forEach((targetElement, idx, targets) => {
    const prevElement = targets[idx - 1];
    if (!prevElement) return;
    syncHorizontalScroll(prevElement, targetElement);
  });
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
