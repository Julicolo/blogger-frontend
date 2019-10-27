import Baobab from 'baobab';

const state = new Baobab({
    username: undefined,
    blogOpen: false,
    isAdmin: false,
    posts: [],
    ip: undefined
});

export default state;
