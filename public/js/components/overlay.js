import React from 'react';
import uuidV4 from 'uuid/v4';

const Overlay = React.createClass({
    propTypes: {
        updateUserData: React.PropTypes.func,
    },

    /**
     * Compiles the user data
     * @param {event} e The click event from the Send button
     * @return {void}
     */
    onUsernameEntered(e) {
        e.preventDefault();
        if (e.keyCode == 13) {
            const userData = {
                name: this.usernameInput.value,
                id: uuidV4(),
            };
            this.props.updateUserData(userData);
        }
    },


    render: function() {
        return (
            <div className="overlay">
                <div className="modal">
                    <h2>Enter your username</h2>
                    <div>
                        <input
                            type="text"
                            maxLength="50"
                            onKeyUp={this.onUsernameEntered}
                            ref={input => { this.usernameInput = input; }}
                        />
                    </div>
                </div>
            </div>
        );
    },
});

module.exports = Overlay;
