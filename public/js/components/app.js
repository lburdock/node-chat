import React from 'react';

const socket = io(); // eslint-disable-line no-undef
const bodyEl = document.querySelector('body');

const App = React.createClass({
    getInitialState() {
        return { messages: [] };
    },

    /**
     * Listens for events on the socket
     * @return {void}
     */
    componentDidMount() {
        socket.on('message-added', this.addMessage);
        socket.on('connect', () => socket.emit('join'));
    },

    /**
     * Adjusts the window so the latest messages are visible
     * @return {void}
     */
    componentDidUpdate() {
        bodyEl.scrollTop += this.messagesList.scrollHeight;
    },

    /**
     * Adds incoming messages to the state's messages array
     * @param {string} message A message in the chat room
     * @return {void}
     */
    addMessage(message) {
        this.setState({ messages: this.state.messages.concat(message) });
    },

    /**
     * Handles a user submiting text to the chat room
     * @param {event} e The click event from the Send button
     * @return {void}
     */
    onSubmit(e) {
        e.preventDefault();
        socket.emit('message-added', this.textInput.value);
        this.textInput.value = '';
    },

    /**
     * Renders individual messages to the page
     * @return {Array} Array of messages in jsx
     */
    renderMessages() {
        return this.state.messages.map((message, index) => <li key={index}>{message}</li>);
    },

    render: function() {
        return (
            <div>
                <ul
                    id="messages"
                    ref={ul => { this.messagesList = ul; }}
                >
                    {this.renderMessages()}
                </ul>
                <form onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        autoComplete="off"
                        ref={(input) => { this.textInput = input; }}
                    />
                    <button>Send</button>
                </form>
            </div>
        );
    },
});

module.exports = App;
