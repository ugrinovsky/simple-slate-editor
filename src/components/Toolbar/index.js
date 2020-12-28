import React from 'react';
import ToolbarButton from "../ToolbarButton";
import ToolbarColorButton from "../ToolbarColorButton";

class Toolbar extends React.Component {
    render() {
        return(
            <div className="tooblar">
                <ToolbarButton
                    title="Code"
                    format="code"
                    editor={this.props.editor} />
                <ToolbarButton
                    title="Bold"
                    format="bold"
                    editor={this.props.editor} />
                <ToolbarButton
                    title="Italic"
                    format="italic"
                    editor={this.props.editor} />
                <ToolbarButton
                    title="Underline"
                    format="underline"
                    editor={this.props.editor} />
                <ToolbarColorButton
                    title="Color"
                    format="color"
                    editor={this.props.editor} />
                <ToolbarColorButton
                    title="Background"
                    format="background"
                    editor={this.props.editor} />
            </div>
        )
    }
}

export default Toolbar;
