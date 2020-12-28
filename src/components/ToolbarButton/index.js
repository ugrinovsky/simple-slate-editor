import React from 'react';
import './styles.css';
import {Editor} from "slate";

class ToolbarButton extends React.Component {
    isButtonActive = () => {
        const marks = Editor.marks(this.props.editor);
        return marks ? marks[this.props.format] === true : false
    }

    handler = () => {
        const isActive = this.isButtonActive();

        if (isActive) {
            Editor.removeMark(this.props.editor, this.props.format)
        } else {
            Editor.addMark(this.props.editor, this.props.format, true)
        }
    }

    render() {
        const isButtonActive = this.isButtonActive();
        return (
            <div
                className={`toolbarButton ${isButtonActive ? 'toolbarButtonActive' : ''}`}
                onMouseDown={event => {
                    event.preventDefault();
                    this.handler();
                }}
            >
                {this.props.title}
            </div>
        )
    }
}

export default ToolbarButton;
