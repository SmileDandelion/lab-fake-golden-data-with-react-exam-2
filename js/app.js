const App = React.createClass({
    getInitialState: function () {
        return ({
            isEditor: true,
            elements: []
        });
    },
    toggle: function () {
        this.setState({isEditor: !this.state.isEditor});
    },
    render: function () {
        const isEditor = this.state.isEditor;
        return <div>
            <button onClick={this.toggle}>{isEditor ? 'preview' : 'editor'}</button>
            <Editor className={isEditor ? '' : 'hidden'}/>
            <Preview className={isEditor ? 'hidden' : ''}/>
        </div>
    }
});
const Editor = React.createClass({
   render:function () {
       return <div className={this.props.className}>
           editor
       </div>
   }
});
const Preview = React.createClass({
    render:function () {
        return <div className={this.props.className}>
            editor
        </div>
    }
});

ReactDOM.render(<App/>, document.getElementById('content'));
