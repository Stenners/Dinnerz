var React = require('react');
var ReactDOM = require('react-dom');
var Rebase = require('re-base');
var List = require('./List');
var AddItem = require('./AddItem');

var base = Rebase.createClass({apiKey: "AIzaSyA6nMjyQ3XC9KvJLI3VhWIeCu49635vLEU", authDomain: "dinnerz-f5ffa.firebaseapp.com", databaseURL: "https://dinnerz-f5ffa.firebaseio.com"});

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            loading: true,
            weekData: 'week' + this.getWeekNumber(Date.now())[1]
        }
    }

    componentDidMount() {

        this.ref = base.syncState(this.state.weekData, {
            context: this,
            state: 'list',
            asArray: true,
            queries: {
              orderByChild: 'votes'
            },
            then() {
                this.setState({loading: false})
            }
        });
    }

    getWeekNumber(d) {
        d = new Date(+d);
        d.setHours(0,0,0);
        d.setDate(d.getDate() + 4 - (d.getDay()||7));
        var yearStart = new Date(d.getFullYear(),0,1);
        var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
        return [d.getFullYear(), weekNo];
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    handleAddItem(newItem) {
        newItem = {
            'name': newItem,
            'votes': 0
        };
        //console.log(this.state.list);
        this.setState({
            list: this.state.list.concat([newItem])
        });
    }

    handleRemoveItem(index) {
        var newList = this.state.list;
        newList.splice(index, 1);
        this.setState({list: newList})
    }

    handleThumbsUp(index, votes) {
        base.update(this.state.weekData + '/' + index, {
            data: {
                votes: votes-1
            },
            then(err) {
                if (!err) {
                    console.log('success');
                }
            }
        });
    }

    render() {
        var styles = {
            header: {
                color: "rgb(132, 204, 218)",
                fontFamily: "Patua One",
                fontSize: 33
            }
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <h3 style={styles.header} className="text-center">DINNA</h3>
                        <AddItem add={this.handleAddItem.bind(this)}/> {this.state.loading === true
                            ? <h3 className="text-center">LOADING...</h3>
                            : <List items={this.state.list} remove={this.handleRemoveItem.bind(this)} thumbsup={this.handleThumbsUp.bind(this)}/>}
                    </div>
                </div>
            </div>
        )
    }
};

ReactDOM.render(
    <App/>, document.getElementById('app'));
