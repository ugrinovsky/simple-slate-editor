import React from 'react';
import ColorPanel from "../ColorPanel";
import {Editor} from "slate";

class ToolbarColorButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {isActive: false};
    }

    onMouseDownHandler = (value) => {
        this.setState({isActive: value});
    }

    isButtonActive = () => {
        const marks = Editor.marks(this.props.editor);
        return marks ? marks[this.props.format] === true : false
    }

    handler = (color) => {
        const isActive = this.isButtonActive();

        if (isActive) {
            Editor.removeMark(this.props.editor, this.props.format)
        } else {
            Editor.addMark(this.props.editor, this.props.format, color)
        }
        this.onMouseDownHandler(false);
    }

    render() {
        return (
            <div
                onMouseEnter={() => this.onMouseDownHandler(true)}
                onMouseLeave={() => this.onMouseDownHandler(false)}
                className={`toolbarButton ${this.state.isActive ? 'toolbarButtonActive' : ''}`}>
                {this.props.title}

                {this.state.isActive && <ColorPanel
                    updateActiveColor={this.handler}
                />}
            </div>
        )
    }
}

export default ToolbarColorButton;
