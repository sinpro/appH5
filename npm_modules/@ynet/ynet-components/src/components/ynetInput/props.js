export default {
	type: {
    type: String,
    default: 'text'
  },
  placeholder: String,
  align: {
    type: String,
    default: 'left'
  },
  title: String,
  max: String | Number,
  isTitleHidden: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  value: {
    type: String,
    default: '',
  },
  isEncry: {
    type: Boolean,
    default: false
  },
  randomKey: String,
  isVirtualKeyboard: {
    type: Boolean,
    default: false
  }
}