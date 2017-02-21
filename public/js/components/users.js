import React from 'react';
const socket = io(); // eslint-disable-line no-undef

const Users = React.createClass({
    getInitialState() {
        return {
            users: [],
        };
    },

    /**
     * Listens for events on the socket
     * @return {void}
     */
    componentDidMount() {
        socket.on('connect', () => socket.emit('users-client-ready'));
        socket.on('users-fetched', this.updateUsers);
    },

    /**
     * Limit re-rendering to user list updates
     * @param {object} nextProps The updated props object
     * @param {object} nextState The updated state object
     * @return {boolean} Whether the component should re-render
     */
    shouldComponentUpdate: function(nextProps, nextState) {
        return this.state.users !== nextState.users;
    },

    /**
     * Updates the state with the latest list of users
     * @param {array} users A list of user objects
     * @return {void}
     */
    updateUsers(users) {
        this.setState({users});
    },

    /**
     * Renders the users as list elements
     * @param {array} users A list of all the chat room users
     * @return {Array} Array of users in jsx
     */
    renderUsers(users) {
        return users.map((user, index) => <li key={index}>{user.name}</li>);
    },

    render: function() {
        return (
            <aside>
                <div>USERS</div>
                <ul className="users">{this.renderUsers(this.state.users)}</ul>
            </aside>
        );
    },
});

module.exports = Users;
