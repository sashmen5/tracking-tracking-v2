import React, {FC} from 'react';
import {Link} from 'react-router-dom';

const WrongRouter: FC = () =>
    <>
        <h1>Whoops</h1>
        <h2>404 - wrong page</h2>
        <Link replace={true} to='/'>Go Home</Link>
    </>;

export default WrongRouter;