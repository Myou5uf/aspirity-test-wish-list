import React from 'react';

function PlusIcon() {
    return (
        <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 12 16"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path fillRule="evenodd" d="M12 9H7v5H5V9H0V7h5V2h2v5h5v2z" />
        </svg>
    );
}

export default React.memo(PlusIcon);
