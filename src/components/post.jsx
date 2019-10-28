// Convert to functional w/ effects

// import React from 'react';
// import styled from 'styled-components';
// import {Link} from 'react-router-dom';

// export default class Post extends React.Component {
//     componentDidMount() {
//         const url = 'http://localhost/mysql/les4/blog-backend/post.php',
//             fetchData = () => {
//                 console.log(this.props);
//                 return fetch(url, {
//                     method: 'POST',
//                     body: JSON.stringify({post: this.state.start})
//                 })
//                     .then(res => res.json())
//                     .then(result => {
//                         if (result === null) {
//                             this.setState({endReached: true});
//                             return;
//                         }

//                         this.setState(state => ({
//                             blogPosts: [...state.blogPosts, ...result]
//                         }));
//                     });
//             };

//         fetchData();
//     }

//     // TODO: make window close with a button instead of the whole post!
//     render() {
//         return <StyledPost></StyledPost>;
//     }
// }

// const StyledPost = styled.div`
//     background: white;
//     position: fixed;
//     top: 4.5rem;
//     width: 100vw;
//     height: 100%;
//     padding: 3rem;
//     overflow: auto;

//     h2 {
//         margin-top: 0;
//     }

//     p {
//         line-height: 1.5rem;
//     }
// `;
