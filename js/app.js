const App = React.createClass({
    getInitialState: function () {
        return ({
            elements: []
        });
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
        return <div className="container">
            <center>
                <ReactRouter.Link to="/preview">
                    <button className="btn  btn-primary">preview</button>
                </ReactRouter.Link>
            </center>

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
        return <div className={this.props.className}>
            <div className='row'>
                <div className="col-lg-5 ">
                    <Left elements={this.props.elements} onDelete={this.props.onDelete}/>
                </div>
                <div className="col-lg-5">
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
                <input type="radio" name="element" value='text'/>
                <span className="input-group-addon">text</span>
            </div>
            <div className="input-group">
                <input type="radio" name="element" value='date'/>
                <span className="input-group-addon">date</span>
            </div>
            <input type="button" className="btn  btn-primary" value='+' onClick={this.add}/>
        </div>
    }
});

const Preview = React.createClass({
    render: function () {
        const elements = this.props.elements.map((ele, index)=> {
            return <div className="input-group col-lg-4" key={index}>
                <input type={ele} className="form-control" placeholder="please input ..."/>
            </div>
        });
        return <div className={this.props.className}>
            {elements}
            <input type='submit' value='submit' className="btn btn-primary" disabled="disabled"/>
        </div>
    }
});

ReactDOM.render(<ReactRouter.Router>
    <ReactRouter.Route path='/' component={App}>
        <ReactRouter.IndexRoute component={Editor}/>
        <ReactRouter.Route path='preview' component={Preview}/>
    </ReactRouter.Route>
</ReactRouter.Router>, document.getElementById('content'));
