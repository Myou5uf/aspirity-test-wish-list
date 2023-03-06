import React from 'react';
import './Message.scss';

interface IProps {
    text: string;
}

function Message(props: IProps) {
    return (
        <div className='message'>
            <h2>{props.text}</h2>
        </div>
    );
}

export default React.memo(Message);
