import React from 'react';
import RichEditor from "./components/RichEditor";
import RichEditors from "./components/RichEditors";

class App extends React.Component {
    render() {
        const viewMode = window.location.search.split('viewMode=')[1];

        return (
            viewMode === 'single' ? <RichEditor/> : <RichEditors/>
        );
    }
}
export default App;
