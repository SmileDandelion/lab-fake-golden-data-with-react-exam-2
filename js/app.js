const App = React.createClass({
    getInitialState: function () {
        return ({
            elements: [],
            isEditor: true
        });
    },
    toggle: function () {
        this.setState({isEditor: !this.state.isEditor})
    },
    addElement: function (ele) {
        const elements = this.state.elements;
        elements.push(ele);
        this.setState({elements});
    },
    deleteElement(ele){
        const elements = this.state.elements;
        elements.splice(ele, 1);
        this.setState({elements});
    },
    render: function () {
        return <div className="container-fluid bg-success">
            <center>
                <ReactRouter.Link to={this.state.isEditor ? '/preview' : '/'}>
                    <button onClick={this.toggle}
                            className="btn  btn-primary">{this.state.isEditor ? 'preview' : 'editor'}</button>
                </ReactRouter.Link>
            </center>
            <br/>
            <br/>
            <br/>

            {this.props.children && React.cloneElement(this.props.children, {
                elements: this.state.elements,
                onAdd: this.addElement,
                onDelete: this.deleteElement
            })
            }
        </div>
    }
});
const Editor = React.createClass({
    render: function () {
        return <div >
            <div className='row'>
                <div className="col-md-3 col-md-offset-2">
                    <Left elements={this.props.elements} onDelete={this.props.onDelete}/>
                </div>
                <div className="col-md-5 col-md-offset-2">
                    <Right onAdd={this.props.onAdd}/>
                </div>
            </div>
        </div>
    }
});
const Left = React.createClass({
    remove: function (index) {
        this.props.onDelete(index);
    },
    render: function () {
        const elements = this.props.elements.map((ele, index)=> {
            return <div key={index}>
                <div className="input-group">
                    <input type={ele} className="form-control" placeholder="please input ..."/>
                    <span className="input-group-btn">
        <button className="btn btn-danger" type="button" onClick={this.remove.bind(this, index)}>-</button>
      </span>
                </div>
                <br/>
                <br/>
            </div>
        });
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
        return <div>
            <div className="input-group">
                <input type="radio" name="element" value='text'/>&nbsp;&nbsp;&nbsp;text&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="radio" name="element" value='date'/>&nbsp;&nbsp;&nbsp;date
            </div>
            <br/>
            <input type="button" className="btn  btn-primary" value='+' onClick={this.add}/>
        </div>
    }
});

const Preview = React.createClass({
    render: function () {
        const elements = this.props.elements.map((ele, index)=> {
            return <div className="input-group col-lg-offset-3 col-lg-6" key={index}>
                <input type={ele} className="form-control" placeholder="please input ..."/>
                <br/>
                <br/>
                <br/>
            </div>
        });
        return <div className="bg-success row">
            {elements}
            <center><input type='submit' value='submit' className="btn btn-primary" disabled="disabled"/></center>
        </div>
    }
});

ReactDOM.render(<ReactRouter.Router>
    <ReactRouter.Route path='/' component={App}>
        <ReactRouter.IndexRoute component={Editor}/>
        <ReactRouter.Route path='preview' component={Preview}/>
    </ReactRouter.Route>
</ReactRouter.Router>, document.getElementById('content'));
