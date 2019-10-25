import Baobab from 'baobab';

const state = new Baobab({
    colors: ['yellow', 'blue', 'orange'],
    alternativeColors: ['purple', 'orange', 'black'],
    isLoginButtonClicked: false,
    username: false,
    isAdmin: false,
    posts: {},
    ip: ''
});

export default state;
