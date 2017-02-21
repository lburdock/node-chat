import React from 'react';

const socket = io(); // eslint-disable-line no-undef
const bodyEl = document.querySelector('body');
let currentSpeaker = null;

const Messages = React.createClass({
    propTypes: {
        userData: React.PropTypes.object,
    },

    getInitialState() {
        return {
            messages: [],
        };
    },

    /**
     * Listens for events on the socket
     * @return {void}
     */
    componentDidMount() {
        socket.on('connect', () => socket.emit('messages-client-ready'));
        socket.on('messages-fetched', this.updateMessages);
        socket.on('message-saved', this.onMessageSaved);
    },

    /**
     * Limit re-rendering to user list updates
     * @param {object} nextProps The updated props object
     * @param {object} nextState The updated state object
     * @return {boolean} Whether the component should re-render
     */
    shouldComponentUpdate: function(nextProps, nextState) {
        return this.state.messages !== nextState.messages;
    },

    /**
     * Adjusts the window so the latest messages are visible
     * @return {void}
     */
    componentDidUpdate() {
        bodyEl.scrollTop += this.messagesList.scrollHeight;
    },

    /**
     * Updates the state with the latest messages
     * @param {array} messages A list of message objects
     * @return {void}
     */
    updateMessages(messages) {
        currentSpeaker = null;
        this.setState({messages});
    },

    /**
     * Handles a user submiting text to the chat room
     * @param {event} e The keyup event
     * @return {void}
     */
    onMessageEntered(e) {
        e.preventDefault();
        if (e.keyCode == 13) {
            const message = Object.assign({}, this.props.userData, {message: this.messageInput.value});
            socket.emit('message-entered', message);
            this.messageInput.value = '';
        }
    },

    /**
     * Adds saved messages to the state's messages array
     * @param {object} message A message in the chat room with user data
     * @return {void}
     */
    onMessageSaved(message) {
        this.updateMessages(this.state.messages.concat(message));
    },

    /**
     * Renders the chat messages to the page
     * @param {array} messages A list of all the chat room messages
     * @return {Array} Array of messages in jsx
     */
    renderMessages(messages) {
        return messages.map((msg, index) => {
            if (msg.id !== currentSpeaker) {
                currentSpeaker = msg.id;
                return (
                    <li key={index}>
                        <div className="username">{msg.name}</div>
                        <div>{msg.message}</div>
                    </li>
                );
            } else {
                return <li key={index}><div>{msg.message}</div></li>;
            }
        });
    },

    render: function() {
        return (
            <section>
                <ul
                    className="messages"
                    ref={ul => { this.messagesList = ul; }}
                >
                    {this.renderMessages(this.state.messages)}
                </ul>
                <footer>
                    <input
                        type="text"
                        placeholder="Enter your message"
                        onKeyUp={this.onMessageEntered}
                        ref={input => { this.messageInput = input; }}
                    />
                </footer>
            </section>
        );
    },
});

module.exports = Messages;
