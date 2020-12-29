import React from 'react'
import { createEditor, Editor, Point, Transforms } from 'slate';

import RichEditor from '../RichEditor';

import './styles.css';
import {ReactEditor} from "slate-react";

import {v4 as uuidv4} from 'uuid';

const EDITOR_HEIGHT = '30px';

class RichEditors extends React.Component {
    constructor(props) {
        super(props);

        const id = this.generateId();
        this.editor = this.createEditor(id);

        this.state = {
            editors: [{
                template: this.editor,
                instance: null,
                id: id,
                value: ''
            }],
            activeEditorIndex: 0,
            activeEditor: null
        };
    }

    generateId = () => {
        return uuidv4();
    }

    createEditor = (id) => {
        return <RichEditor
            id={id}
            height={EDITOR_HEIGHT}
            toolbarVisibility={false}
            onKeyDownHandler={this.onKeyDownHandler}
            onFocusCallback={this.onEditorFocusHandler}
        />
    }

    onEditorFocusHandler = (editorData) => {
        this.state.activeEditor = editorData;

        const findedIndex = this.state.editors.findIndex((editor) => {
            return editor.id === editorData.id;
        });
        if (findedIndex !== -1) {
            this.state.activeEditorIndex = findedIndex;
            this.state.editors[findedIndex].value = editorData.value;
            this.state.editors[findedIndex].instance = editorData.instance;
        } else {
            this.state.activeEditorIndex = 0;
        }
    }

    onKeyDownHandler = (event) => {
        if (event.keyCode === 13 || event.keyCode === 40) {
            event.preventDefault();
            
            this.state.activeEditorIndex++;
            if (this.state.activeEditorIndex === this.state.editors.length) {

                const editors = this.state.editors;
                const id = this.generateId();
                editors.push({
                    template: this.createEditor(id),
                    instance: null,
                    id: id,
                    value: ''
                });

                this.setState({editors: editors});

            } else {
                ReactEditor.focus(this.state.editors[this.state.activeEditorIndex].instance);
            }

        }
        if (event.keyCode === 8 || event.keyCode === 38) {
            event.preventDefault ();
            this.state.activeEditorIndex--;

            if (this.state.activeEditorIndex > -1) {
                ReactEditor.focus(this.state.editors[this.state.activeEditorIndex].instance);
            }

            if (this.state.editors.length && !this.state.editors[this.state.activeEditorIndex + 1].value.length) {
                const editors = this.state.editors;
                editors.splice(this.state.activeEditorIndex + 1, 1);
                this.setState({editors: editors});
            }
        }
    }

    render() {
        return (
            <div>
                {this.state.editors.map(editor => {
                    return <div key={editor.id}>{editor.template}</div>;
                })}
            </div>
        )
    }
}

export default RichEditors;
