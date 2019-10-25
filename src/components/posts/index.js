import React from 'react';

export default function Posts() {
    return (
        <React.Fragment>
            <span>Hello</span>
        </React.Fragment>
    );
}

// import React from 'react';
// import {branch} from 'baobab-react/higher-order';
// import * as actions from '../../actions';

// class Posts extends React.Component {
//     constructor(props) {
//         super(props);

//         // Initial state
//         this.state = {inputColor: undefined};
//     }

//     // Controlling the input's value
//     updateInput(e) {
//         this.setState({inputColor: e.target.value});
//     }

//     // Adding a color on click
//     handleClick() {
//         // A dispatcher is available through `props.dispatch`
//         this.props.dispatch(actions.addColor, this.state.inputColor);

//         // Resetting the input
//         this.setState({inputColor: undefined});
//     }

//     render() {
//         const colors = this.props.colors;

//         function renderItem(color) {
//             return <li key={color}>{color}</li>;
//         }

//         return (
//             <div>
//                 <ul>{colors.map(renderItem)}</ul>
//                 <input type="text" value={this.state.inputColor || ''} onChange={e => this.updateInput(e)} />
//                 <button type="button" onClick={() => this.handleClick()}>
//                     Add
//                 </button>
//             </div>
//         );
//     }
// }

// export default branch(
//     {
//         colors: ['colors']
//     },
//     Posts
// );

// // import React from 'react';
// // import styled from 'styled-components';
// // // import {branch} from 'baobab-react/higher-order';
// // // import {colors} from '../../css-utils.js';

// // export default function Posts() {
// //     return (
// //         <React.Fragment>
// //             <StyledPosts>
// //                 <h1>Posts</h1>
// //             </StyledPosts>
// //         </React.Fragment>
// //     );
// // }

// // const StyledPosts = styled.div`
// //     display: flex;
// //     flex-flow: row wrap;
// //     justify-content: space-between;
// //     flex: 1;
// //     margin: 1rem;
// // `;
