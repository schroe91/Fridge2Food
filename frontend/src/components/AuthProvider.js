import React, {Component} from 'react';

const URL = browserHistory.getCurrentLocation();
/*class AuthProvider extends Component {
    state = { isAuth: false }
    constructor() {
        super()
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.logout = this.logout.bind(this);
    }

    login(email, password) {
        fetch(URL+'login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email, password: password})
        }).then( response => response.ok ).then(success => ( success ? this.setState({isAuth: success}) : this.setState({error: {message: "Incorrect email/password"}})))
    }
    render() {
        return (
            <AuthContext.Provider value={{
                isAuth: this.state.isAuth,
                login: this.login,
                register: this.register,
                logout: this.logout
                }}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}*/