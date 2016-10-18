var React = require('react');

class List extends React.Component {
    render() {
        var styles = {
            listGroup: {
                margin: '5px 0'
            },
            removeItem: {
                fontSize: 16,
                position: "absolute",
                top: 14,
                left: 9,
                cursor: "pointer",
                color: "rgb(132, 204, 218)",
                border: "none",
                background: "none",
                padding: 0
            },
            thumbsUp: {
                fontSize: 16,
                position: "absolute",
                top: 14,
                right: 10,
                cursor: "pointer",
                color: "rgb(132, 204, 218)",
                border: "none",
				outline: "none",
                background: "none",
                padding: 0
            },
            votes: {
                fontSize: 15,
                position: "absolute",
                color: "rgb(132, 204, 218)",
                top: 11,
                right: 33
            },
            todoItem: {
                paddingLeft: 20,
                fontSize: 17
            }
        };
        var listItems = this.props.items.map((item, index) => {
            return (
                <li key={index} className="list-group-item" style={styles.listGroup}>
                    <button className="glyphicon glyphicon-remove" style={styles.removeItem} onClick={this.props.remove.bind(null, index)}/>
                    <span style={styles.todoItem}>
                        {item.name}
                    </span>
                    <span style={styles.votes}>+{item.votes}</span>
                    <button className="glyphicon glyphicon-thumbs-up" style={styles.thumbsUp} onClick={this.props.thumbsup.bind(null, index, item.votes)}/>
                </li>
            )
        });
        return (
            <div className="col-sm-12">
                <ul className="list-group">
                    {listItems}
                </ul>
            </div>
        )
    }
};

module.exports = List;
