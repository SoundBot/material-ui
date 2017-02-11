import React, {Component, PropTypes} from 'react';
import {isInner} from './timeUtils';

function getStyles(props, context) {
  const styles = {
    root: {
      directionInvariant: true,
      display: 'inline-block',
      position: 'absolute',
      width: 32,
      height: 32,
      borderRadius: '100%',
      left: 'calc(50% - 16px)',
      top: 10,
      textAlign: 'center',
      paddingTop: 5,
      userSelect: 'none', /* Chrome all / Safari all */
      fontSize: '1.1em',
      pointerEvents: 'none',
      boxSizing: 'border-box',
    },
  };

  const {muiTheme} = context;

  let pos = props.value;

  if (props.type === 'hour') {
    pos %= 12;
  } else {
    pos = pos / 5;
  }

  const posarr = [];
  const height = 280;
  const width = 260;
  const radius = 110;

  for (let k = -3; k < 9; k++) {
    let rads =  (k * 7.5 * Math.PI) / 180;
    const x = radius * Math.cos(rads);
    const y = radius * Math.sin(rads);

    // rotation
    rads =  (-180 * 30 * Math.PI) / 180;
    const x1 = x * Math.cos(rads) + y * Math.sin(rads);
    const y1 = -1 * x * Math.sin(rads) + y * Math.cos(rads) + 115;

    posarr.push([x1, y1]);
  }

  const positions = posarr;

  const innerPositions = [
    [0, 40],
    [36.9, 49.9],
    [64, 77],
    [74, 114],
    [64, 151],
    [37, 178],
    [0, 188],
    [-37, 178],
    [-64, 151],
    [-74, 114],
    [-64, 77],
    [-37, 50],
  ];

  if (props.isSelected) {
    styles.root.backgroundColor = muiTheme.timePicker.accentColor;
    styles.root.color = muiTheme.timePicker.selectTextColor;
  }

  let transformPos = positions[pos];

  if (isInner(props)) {
    styles.root.width = 28;
    styles.root.height = 28;
    styles.root.left = 'calc(50% - 14px)';
    transformPos = innerPositions[pos];
  }

  const [x, y] = transformPos;

  styles.root.transform = `translate(${x}px, ${y}px)`;

  return styles;
}

class ClockNumber extends Component {
  static propTypes = {
    isSelected: PropTypes.bool,
    onSelected: PropTypes.func,
    type: PropTypes.oneOf(['hour', 'minute']),
    value: PropTypes.number,
  };

  static defaultProps = {
    value: 0,
    type: 'minute',
    isSelected: false,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  render() {
    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);
    const clockNumber = this.props.value === 0 ? '00' : this.props.value;

    return (
      <span style={prepareStyles(styles.root)}>{clockNumber}</span>
    );
  }
}

export default ClockNumber;
