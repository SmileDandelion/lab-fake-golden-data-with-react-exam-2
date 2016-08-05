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
    addElement: function (ele) {
        const elements = this.state.elements;
        elements.push(ele);
        this.setState({elements});
    },
    render: function () {
        const isEditor = this.state.isEditor;
        return <div>
            <button onClick={this.toggle}>{isEditor ? 'preview' : 'editor'}</button>
            <Editor className={isEditor ? '' : 'hidden'} elements = {this.state.elements} onAdd={this.addElement}/>
            <Preview className={isEditor ? 'hidden' : ''}/>
        </div>
    }
});
const Editor = React.createClass({
    render: function () {
        return <div className={this.props.className}>
            <Left elements = {this.props.elements}/>
            <Right onAdd={this.props.onAdd}/>
        </div>
    }
});
const Left = React.createClass({
    render: function () {
        const elements = this.props.elements.map((ele, index)=> {
            return <div key={index}>
                <input type={ele}/>
                <input type="button" value='-'/>
            </div>
        })
        return <div >
            {elements}
        </div>
    }
});

const Right = React.createClass({
    add: function () {
        const elements = $('input[name=element]:checked').val();
        this.props.onAdd(elements);
    },
    render: function () {
        return <div >
            <input type='radio' name='element' value='text'/>text
            <input type='radio' name='element' value='date'/>date
            <input type="button" value='+' onClick={this.add}/>
        </div>
    }
});

const Preview = React.createClass({
    render: function () {
        return <div className={this.props.className}>
            editor
        </div>
    }
});

ReactDOM.render(<App/>, document.getElementById('content'));
