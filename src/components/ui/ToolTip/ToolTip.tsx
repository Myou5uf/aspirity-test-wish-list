import React, {useRef, useState} from 'react';
import './ToolTip.scss';

interface IProps {
    text: string;
    children: React.ReactNode;
    className?: string;
}

function ToolTip(props: IProps) {
    const {text, children, className} = props;
    const [visibleToolTip, setVisibleToolTip] = useState(false);
    const refSetTimeout = useRef<NodeJS.Timeout>();
    const toolTipClasses = [className, 'toolTip-content'].join(' ').trim();

    const onMouseEnterHandler = () => {
        refSetTimeout.current = setTimeout(() => {
            setVisibleToolTip(true);
        }, 400);
    };

    const onMouseLeaveHandler = () => {
        clearTimeout(refSetTimeout.current);
        setVisibleToolTip(false);
    };

    return (
        <div
            className='toolTip-container'
            onMouseEnter={onMouseEnterHandler}
            onMouseLeave={onMouseLeaveHandler}
        >
            {children}
            {visibleToolTip && <div className={toolTipClasses}>{text}</div>}
        </div>
    );
}

export default React.memo(ToolTip);
