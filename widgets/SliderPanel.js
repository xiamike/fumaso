import ScaleSlider from './ScaleSlider';
import View from '../components/View';

export default class SliderPanel extends View {
  constructor(node, options = {}) {
    super(node, options);

    this.sliders = [];
    this._initSliders();
  }

  _initSliders() {
    let slider, label, sliderProps;
    let offsetY = 0;
    for (let i = 0; i < this.options.sliders.length; i++) {
      sliderProps = this.options.sliders[i];
      if (sliderProps.label) {
        // Create a label
        label = new View(this.node.addChild());
        label
          .setSizeMode(View.ABSOLUTE_SIZE, View.ABSOLUTE_SIZE, View.ABSOLUTE_SIZE)
          .setAbsoluteSize(160, 40, 0)
          .setPosition(5, offsetY-5, 0)
          .createDOMElement({
            content: sliderProps.label || '',
            properties: {
              backgroundColor: '#ffffff',
              color: '#333333',
              lineHeight: '40px',
              fontFamily: 'Lato, sans-serif',
              fontWeight: '800',
              textTransform: 'uppercase',
              fontSize: '15px'
            }
          });
        offsetY += 20;
      } else if (sliderProps.fn) {
        // Create a slider
        slider = new ScaleSlider(this.node.addChild(), sliderProps);
        slider.setPosition(5, 5 + offsetY, 0);
        this.sliders.push(slider);
        offsetY += 30;
      }
    }
  }
}
