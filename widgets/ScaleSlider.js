import View from '../components/View';

export default class ScaleSlider extends View {
  constructor(node, options = {}) {
    super(node, options);

    this.width = options.width || 220;
    this.height = options.height || 20;
    this.range = options.range;
    this.value = options.range[1];

    this.back = new View(this.addChild());
    this.back
      .setSizeMode(View.ABSOLUTE_SIZE, View.ABSOLUTE_SIZE, View.ABSOLUTE_SIZE)
      .setAbsoluteSize(this.width, this.height)
      .createDOMElement({
        properties: {
          backgroundColor: 'grey'
        }
      });

    this.front = new View(this.addChild());
    this.front
      .setSizeMode(View.ABSOLUTE_SIZE, View.ABSOLUTE_SIZE, View.ABSOLUTE_SIZE)
      .setAbsoluteSize(this.width, this.height)
      .createDOMElement({
        properties: {
          backgroundColor: 'white'
        }
      });

    this.label = new View(this.addChild());
    this.label
      .setSizeMode(View.ABSOLUTE_SIZE, View.ABSOLUTE_SIZE, View.ABSOLUTE_SIZE)
      .setAbsoluteSize(this.width, this.height)
      .setPosition(5, 0, 0)
      .createDOMElement({
        content: options.name,
        properties: {
          color: 'white',
          fontFamily: 'Lato, sans-serif',
          fontWeight: '800',
          textTransform: 'uppercase',
          lineHeight: '20px',
          fontSize: '10px'
        }
      })
      .setCutoutState(false);

    this.eventBox = new View(this.node);
    this.eventBox
      .setSizeMode(View.ABSOLUTE_SIZE, View.ABSOLUTE_SIZE, View.ABSOLUTE_SIZE)
      .setAbsoluteSize(this.width, this.height)
      .on('mousedown', (ev) => this.startUpdate(ev))
      .on('mousemove', (ev) => this.dragUpdate(ev))
      .on('mouseup', () => this.endUpdate())
      .on('mouseleave', () => this.endUpdate())
      .on('mouseout', () => this.endUpdate());
  }

  startUpdate(ev) {
    this.startEv = ev;
    this._updateSliderPos(ev);
  }

  dragUpdate(ev) {
    if (this.startEv) {
      this._updateSliderPos(ev);
    }
  }

  endUpdate() {
    this.startEv = undefined;
  }

  get() {
    return this.value;
  }

  _updateSliderPos(ev) {
    var percent = ev.offsetX / this.width;
    this.front.setScale(percent, 1, 1);
    this.value = percent * (this.range[1] - this.range[0]) + this.range[0]
    this.options.fn(this.value);
    this.label.setDOMContent(this.options.name + ': ' + this.value);
  }
}
