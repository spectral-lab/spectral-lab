import hotkeys from 'hotkeys-js';
import { debounce } from 'lodash';
import elementResizeDetector from 'element-resize-detector';
import { ZOOM } from '../../../../constants/key-bindings';

export default class ZoomManager {
  constructor ({ resizeBasis, horizontalZoomTargets, verticalZoomTargets }) {
    this.resizeBasis = resizeBasis;
    this.horizontalZoomTargets = horizontalZoomTargets;
    this.verticalZoomTargets = verticalZoomTargets;
    this.minWidth = this.resizeBasis.offsetWidth;
    this.minHeight = this.resizeBasis.offsetHeight;

    hotkeys(ZOOM.horizontalZoomIn.keys, ZOOM.horizontalZoomIn.scope, () => this.horizontalZoomIn());
    hotkeys(ZOOM.horizontalZoomOut.keys, ZOOM.horizontalZoomOut.scope, () => this.horizontalZoomOut());
    hotkeys(ZOOM.verticalZoomIn.keys, ZOOM.verticalZoomIn.scope, () => this.verticalZoomIn());
    hotkeys(ZOOM.verticalZoomOut.keys, ZOOM.verticalZoomOut.scope, () => this.verticalZoomOut());
    this.listenResize();
  };

  listenResize () {
    elementResizeDetector({
      strategy: 'scroll'
    }).listenTo(this.resizeBasis, debounce(() => this.handleResize(), 10));
  };

  handleResize () {
    this.minWidth = this.resizeBasis.offsetWidth;
    this.minHeight = this.resizeBasis.offsetHeight;
    if (this.horizontalZoomTargets[0].offsetWidth < this.minWidth) this.resetHorizontalZoom();
    if (this.verticalZoomTargets[0].offsetHeight < this.minHeight) this.resetVerticalZoom();
  };

  resetHorizontalZoom () {
    this.horizontalZoomTargets.forEach(elt => {
      elt.style.width = `100%`;
    });
  };

  horizontalZoomIn () {
    this.horizontalZoomTargets.forEach(elt => {
      elt.style.width = `${Math.max(elt.offsetWidth * 1.4, this.minWidth)}px`;
    });
  };

  horizontalZoomOut () {
    this.horizontalZoomTargets.forEach(elt => {
      elt.style.width = `${Math.max(elt.offsetWidth / 1.4, this.minWidth)}px`;
    });
  };

  resetVerticalZoom () {
    this.verticalZoomTargets.forEach(elt => {
      elt.style.height = `100%`;
    });
  };

  verticalZoomIn () {
    this.verticalZoomTargets.forEach(elt => {
      elt.style.height = `${Math.max(elt.offsetHeight * 1.4, this.minHeight)}px`;
    });
  };

  verticalZoomOut () {
    this.verticalZoomTargets.forEach(elt => {
      elt.style.height = `${Math.max(elt.offsetHeight / 1.4, this.minHeight)}px`;
    });
  };
}
