import React from 'react';

interface ContentProps {
    children: JSX.Element[] | JSX.Element | string
}

const Content = ({children}: ContentProps) => {
    return (
        <div className="content">{children}</div>
    )
};

export default Content;