import React from 'react'
import { createEditor, Editor, Node, Text, Transforms, Element as SlateElement, Range } from 'slate';

import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import isUrl from 'is-url';
import getUrls from 'get-urls';
import linkifyIt from 'linkify-it';
import './styles.css';

import Toolbar from '../Toolbar';

const linkify = linkifyIt();

const withLinks = editor => {
    const { insertData, insertText, isInline } = editor
  
    editor.isInline = element => {
      return element.type === 'link' ? true : isInline(element)
    }
  
    editor.insertData = data => {
      const text = data.getData('text/plain');
  
      if (text && isUrl(text)) {
        wrapLink(editor, text)
      } else {
        insertData(data)
      }
    }
  
    return editor;
}
  
const isLinkActive = editor => {
    const [link] = Editor.nodes(editor, {
      match: n =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
    });
    return !!link
}
  
const wrapLink = (editor, url) => {
    if (isLinkActive(editor)) {
        Transforms.insertText(editor, url);
        return;
    }
  
    const { selection } = editor
    const isCollapsed = selection && Range.isCollapsed(selection)
    const link = {
      type: 'link',
      url,
      children: isCollapsed ? [{ text: url }] : [],
    }
  
    if (isCollapsed) {
      Transforms.insertNodes(editor, link)
    } else {
      Transforms.wrapNodes(editor, link, { split: true })
      Transforms.collapse(editor, { edge: 'end' })
    }
}

const decorate = ([node, path]) => {
    const ranges = []

    const promise = new Promise((resolve, regect) => {
        setTimeout(() => {
            if (Text.isText(node)) {
                const { text } = node;
                (linkify.match(text) || []).forEach(({ index, lastIndex, url }) => {
                    ranges.push({
                      anchor: { path, offset: lastIndex },
                      focus: { path, offset: index },
                      link: true,
                      url: 'HUI PIZDA'
                    });
                  });
            }
        
            resolve(ranges);
        }, 1000);
    });

    return promise;

   
}

const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.code) {
        children = <span className="code">{children}</span>
    }
    if (leaf.bold) {
        children = <strong>{children}</strong>
    }
    if (leaf.italic) {
        children = <em>{children}</em>
    }
    if (leaf.underline) {
        children = <u>{children}</u>
    }
    if (leaf.color) {
        children = <span style={{color: leaf.color}}>{children}</span>
    }
    if (leaf.background) {
        children = <span style={{backgroundColor: leaf.background}}>{children}</span>
    }
    if (leaf.link) {
        children = 
         <span>
            <a className="link" href={leaf.url}>
                <span className="linkTitle">{children}</span>
            </a>
         </span>
    }

    return <span {...attributes}>{children}</span>
}

const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse aliquet et velit pretium mollis. Maecenas et hendrerit quam. Pellentesque semper gravida pulvinar. Vestibulum rhoncus dolor nec ultrices pretium. Maecenas id sagittis neque. Donec hendrerit gravida urna sed tincidunt. Nulla blandit finibus blandit. Sed eget nibh nec urna tincidunt tristique. Curabitur accumsan a ligula vitae accumsan. Maecenas ac turpis ornare, scelerisque lectus a, mollis velit. Vestibulum nisl metus, lobortis eu hendrerit ut, auctor in est. Integer condimentum eu nulla ut semper. Suspendisse ornare urna a dui ullamcorper, ut ornare ante posuere. Nunc semper malesuada sollicitudin.';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.deserialize(text)
        }

        this.id = this.props.id;

        this.onChangeCallback = (value) => {
            this.setState({value});
        };

        this.Editor = Editor;

        this.editor = withLinks(withReact(createEditor()));
        this.renderLeaf = props => <Leaf {...props} />;
        this.decorate = decorate;
    }

    componentDidMount() {
        // ReactEditor.focus(this.editor);
    }

    deserialize = string => {
        return string.split ('\n').map (line => {
            return {
                children: [{text: line}],
            };
        });
    };

    onKeyDownCallback = (event) => {
        this.props.onKeyDownHandler && this.props.onKeyDownHandler(event);
    }

    onFocusCallback = () => {
        this.props.onFocusCallback && this.props.onFocusCallback({
            instance: this.editor,
            id: this.id,
            value: this.serialize(this.state.value)
        });
    }

    render() {
        return (
            <Slate
                editor={this.editor}
                value={this.state.value}
                onChange={this.onChangeCallback}
            >
                {this.props.toolbarVisibility && <Toolbar editor={this.editor} />}
                <Editable
                    style={{minHeight: this.props.height}}
                    className="editor"
                    spellCheck
                    onKeyDown={this.onKeyDownCallback}
                    onFocus={this.onFocusCallback}
                    renderLeaf={this.renderLeaf}
                    decorate={this.decorate}
                />
            </Slate>
        )
    }
}

App.defaultProps = {
    toolbarVisibility: true,
    height: '300px',
};

export default App;
