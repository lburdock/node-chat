const socket = io(); // eslint-disable-line no-undef

import React from 'react';

const App = React.createClass({
    getInitialState() {
        return { messages: [] };
    },

    componentDidMount() {
        socket.on('message-added', this.addMessage);
        socket.on('connect', () => socket.emit('join'));
    },

    addMessage(message) {
        console.log('APPEND', message);
        this.setState({ messages: this.state.messages.concat(message) });
    },

    onSubmit(e) {
        e.preventDefault();
        console.log('hello', this.textInput.value);
        socket.emit('message-added', this.textInput.value);
        this.textInput = '';
    },

    renderMessages() {
        return this.state.messages.map((message, index) => <li key={index}>{message}</li>);
    },

    render: function() {
        return (
            <div>
                <ul id="messages">
                    {this.renderMessages()}
                </ul>
                <form onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        ref={(input) => { this.textInput = input; }}
                        autoComplete="off"
                    />
                    <button>Send</button>
                </form>
            </div>
        );
    },
});

module.exports = App;
