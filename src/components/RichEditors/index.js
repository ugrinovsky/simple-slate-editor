import React from 'react'
import { createEditor, Editor, Point, Transforms } from 'slate';

import RichEditor from '../RichEditor';

import './styles.css';
import {ReactEditor} from "slate-react";

class RichEditors extends React.Component {
    constructor(props) {
        super(props);

        this.editor = <RichEditor
            onKeyDownHandler={this.onKeyDownHandler}
            onFocusCallback={this.onEditorFocusHandler}
        />;

        this.state = {
            editors: [this.editor],
            editorsComponents: [],
            activeEditorIndex: 0,
            activeEditor: null
        };
    }

    onEditorFocusHandler = (editor) => {
        this.state.activeEditor = editor;
        // ReactEditor.focus(editor);
        this.state.editorsComponents.push(editor);
    }

    onKeyDownHandler = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();

            const editors = this.state.editors;
            editors.push(this.editor);
            this.setState({editors: editors});

            this.state.activeEditorIndex++;
        }
        if (event.keyCode === 8) {
            this.state.activeEditorIndex--;
            // ReactEditor.focus(this.state.activeEditor);
            ReactEditor.focus(this.state.editorsComponents[this.state.activeEditorIndex]);
        }
    }

    render() {
        return (
            <div>
                {this.state.editors.map(e => {
                    return e;
                })}
            </div>
        )
    }
}

export default RichEditors;
