import jquery from 'jquery';
const $ = jquery;

class Scroll {
  constructor (container, pixelsPerSecond) {
    /**
     *  The scrollable element
     */
    this.element = container;

    /**
     *  the current scroll position. Used to
     *  check if there's been an update.
     *  @type  {Number}
     */
    this.currentScroll = -1;

    /**
     *  the scrolling rate
     */
    this.pixelsPerSecond = pixelsPerSecond;

    /**
     *  the last update time
     */
    this.lastUpdate = -1;

    /**
     *  whether or not the element is autoadvancing
     */
    this.autoAdvance = false;

    /**
     *  manual override if the user is scrolling
     */
    this.manualOverride = false;

    /**
     *  the difference between the current and last scroll
     */
    this.scrollDifference = 0;

    /**
     *  the timeout for resumeAuto
     */
    this.restStart = -1;

    /**
     *  stop the clock when it's scrolling
     */
    // this.element.addEventListener("mousewheel", this.scrolling.bind(this));
    // this.element.addEventListener("DomMouseScroll", this.scrolling.bind(this));
    $(this.element).on('mousewheel', this.scrolling.bind(this));

    this.element.addEventListener('touchstart', this.touchstart.bind(this));
    this.element.addEventListener('touchend', this.touchend.bind(this));

    /**
     * a prebound version of the loop function
     */
    this._boundloop = this.loop.bind(this);
    // start the loop
    this.loop();

    /**
     *  the callback function when touch override starts
     */
    this.scrubstart = function () {};

    /**
     *  the callback function when touch override end
     */
    this.scrubend = function () {};

    // scroll back to the top if the page was reloaded
    window.addEventListener('beforeunload', function () {
      this.element.scrollLeft = 0;
    }.bind(this));
  };

  /**
   *  The update loop
   */
  loop () {
    const currentTime = Date.now();
    requestAnimationFrame(this._boundloop);
    // test if manual override is over
    if (this.manualOverride && !this.touchdown) {
      const scroll = this.element.scrollLeft;
      if (scroll === this.currentScroll) {
        if (this.restStart === -1) {
          this.restStart = currentTime;
        } else if (currentTime - this.restStart > 100) {
          this.manualOverride = false;
          this.scrubend(this.currentScroll);
        }
      } else {
        this.restStart = -1;
      }
      this.currentScroll = scroll;
    }
    if (this.lastUpdate !== -1 && !this.manualOverride && this.autoAdvance) {
      const delta = currentTime - this.lastUpdate;
      this.currentScroll += (delta / 1000) * this.pixelsPerSecond;
      this.element.scrollLeft = Math.round(this.currentScroll);
    }
    this.lastUpdate = currentTime;
  };

  /**
   *  callback when it's scrolling
   */
  scrolling () {
    if (!this.manualOverride) {
      this.manualOverride = true;
      this.scrubstart();
    }
  };

  /**
   *  called on touch
   */
  touchstart () {
    this.touchdown = true;
    this.scrolling();
  };

  /**
   *  called on touchend
   */
  touchend () {
    this.touchdown = false;
  };

  /**
   *  While the scrolling isn't paused,
   *  move forward normally
   */
  move () {
    /* if (this.lastUpdate !== -1){
      const delta = currentTime - this.lastUpdate;
      this.currentScroll += (delta / 1000) * this.pixelsPerSecond;
      this.element.scrollLeft(this.currentScroll);
    } */
  };

  /**
   *  start auto advancing
   */
  start () {
    this.currentScroll = this.element.scrollLeft;
    this.autoAdvance = true;
  };

  /**
   *  stop auto advancing
   */
  stop () {
    this.autoAdvance = false;
  };

  /**
   *  restart from the beginning
   */
  restart () {
    const startOffset = this.element.offsetWidth / 2;
    this.element.scrollLeft = 0;
    this.currentScroll = 0;
  };
}

export default Scroll;
