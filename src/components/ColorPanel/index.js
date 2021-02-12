import React from 'react';
import './styles.css';
import constants from '../../constants';

class ColorPanel extends React.Component {
    constructor(props) {
        super(props);

        this.colors = Object.keys(constants.COLORS);
    }

    clickHandler = (color) => {
        this.props.updateActiveColor(color);
    }

    render() {
        return (
            <div className="colorPanel">
                {this.colors.map(index => {
                    const color = constants.COLORS[index];
                    return <div
                        onMouseDown={event => {
                            event.preventDefault();
                            this.clickHandler(index)
                        }}
                        key={index}
                        style={{backgroundColor: color}}
                        className="colorPanelItem"
                    />
                })}
            </div>
        );
    }
}

export default ColorPanel;
