import React from 'react';
import Users from './users';
import Messages from './messages';
import Overlay from './overlay';
const socket = io(); // eslint-disable-line no-undef

const App = React.createClass({
    getInitialState() {
        return {
            chatroom: 'general-chat',
            userData: null,
        };
    },

    /**
     * Save the user data locally and let the server know a user has joined
     * @param {object} userData Data about the user (name and id)
     * @return {void}
     */
    updateUserData(userData) {
        socket.emit('user-joined', userData);
        this.setState({userData});
    },

    render: function() {
        return (
            <div>
                <main>
                    <nav>{`#${this.state.chatroom}`}</nav>
                    <Users />
                    <Messages userData={this.state.userData} />
                </main>
                { !this.state.userData
                    ? <Overlay updateUserData={this.updateUserData} />
                    : null
                }
            </div>
        );
    },
});

module.exports = App;
