import { debounce } from 'lodash';
import elementResizeDetector from 'element-resize-detector';

export default class ZoomManager {
  initialize ({ resizeBasis, horizontalZoomTargets, verticalZoomTargets }) {
    this.resizeBasis = resizeBasis;
    this.horizontalZoomTargets = horizontalZoomTargets;
    this.verticalZoomTargets = verticalZoomTargets;
    this.minWidth = this.resizeBasis.offsetWidth;
    this.minHeight = this.resizeBasis.offsetHeight;
    this.listenResize();
    this.initialized = true;
  }

  listenResize () {
    elementResizeDetector({
      strategy: 'scroll'
    }).listenTo(this.resizeBasis, debounce(() => this.handleResize(), 10));
  };

  checkInitialized () {
    if (!this.initialized) throw new Error('Not initialized');
  }

  handleResize () {
    this.checkInitialized();
    this.minWidth = this.resizeBasis.offsetWidth;
    this.minHeight = this.resizeBasis.offsetHeight;
    if (this.horizontalZoomTargets[0].offsetWidth < this.minWidth) this.resetHorizontalZoom();
    if (this.verticalZoomTargets[0].offsetHeight < this.minHeight) this.resetVerticalZoom();
  };

  resetHorizontalZoom () {
    this.checkInitialized();
    this.horizontalZoomTargets.forEach(elt => {
      elt.style.width = `100%`;
    });
  };

  horizontalZoomIn () {
    this.checkInitialized();
    this.horizontalZoomTargets.forEach(elt => {
      elt.style.width = `${Math.max(elt.offsetWidth * 1.4, this.minWidth)}px`;
    });
  };

  horizontalZoomOut () {
    this.checkInitialized();
    this.horizontalZoomTargets.forEach(elt => {
      elt.style.width = `${Math.max(elt.offsetWidth / 1.4, this.minWidth)}px`;
    });
  };

  resetVerticalZoom () {
    this.checkInitialized();
    this.verticalZoomTargets.forEach(elt => {
      elt.style.height = `100%`;
    });
  };

  verticalZoomIn () {
    this.checkInitialized();
    this.verticalZoomTargets.forEach(elt => {
      elt.style.height = `${Math.max(elt.offsetHeight * 1.4, this.minHeight)}px`;
    });
  };

  verticalZoomOut () {
    this.checkInitialized();
    this.verticalZoomTargets.forEach(elt => {
      elt.style.height = `${Math.max(elt.offsetHeight / 1.4, this.minHeight)}px`;
    });
  };
}

export const getZoomManager = (() => {
  let zoomManager;
  return () => {
    if (!zoomManager) zoomManager = new ZoomManager();
    return zoomManager;
  };
})();
