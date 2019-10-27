import React from 'react';
import {Link} from 'react-router-dom';

export default function Error404() {
    return (
        <React.Fragment>
            <h2>Sorry but we couldn't find the page you're looking for!</h2>
            <p>
                Would you like to go back <Link to="/">home</Link> ?
            </p>
        </React.Fragment>
    );
}
