import * as PIXI from 'pixi.js';

export const timeToX = (time, pixelPerSecond) => time * pixelPerSecond;
export const pitchToY = (pitch, pixelPerNoteNumber) => pitch * pixelPerNoteNumber;
export const removeAllChildren = container => {
  for (var i = container.children.length - 1; i >= 0; i--) {
    container.removeChild(container.children[i]);
  };
};

const composeListeners = (dragEndCb) => {
  function onDragStart (event) {
    this.data = event.data;
    this.alpha = 1;
    this.dragging = true;
  }
  function onDragEnd () {
    this.alpha = 1;
    this.dragging = false;
    this.data = null;
    dragEndCb();
  }
  function onDragMove () {
    if (this.dragging) {
      console.log(this.x, this.y);
      const newPosition = this.data.getLocalPosition(this.parent);
      this.x = newPosition.x;
      this.y = newPosition.y;
    }
  }
  return {
    onDragStart,
    onDragEnd,
    onDragMove
  };
};
/**
 * @param  {number} radius
 * @param  {number} color
 * @param  {function} dragEndCb
 */
export const createInteractiveCircle = (radius, color, dragEndCb) => {
  const circle = new PIXI.Graphics();
  circle.interactive = true;
  circle.beginFill(color);
  circle.drawCircle(0, 0, radius);
  circle.endFill();
  const { onDragStart, onDragMove, onDragEnd } = composeListeners(dragEndCb);
  circle
    .on('pointerdown', onDragStart)
    .on('pointerup', onDragEnd)
    .on('pointerupoutside', onDragEnd)
    .on('pointermove', onDragMove);
  return circle;
};
