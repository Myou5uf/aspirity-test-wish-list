import React from 'react';
import './CheckBox.scss';

interface IProps {
    checked?: boolean;
    onChange: () => void;
    className?: string;
}

function CheckBox(props: IProps) {
    const {checked, onChange, className} = props;
    const classes = [className, 'checkBox', checked ? 'checkBox_checked' : null].join(' ').trim();

    return (
        <input
            type='checkbox'
            checked={checked}
            onChange={onChange}
            className={classes}
        />
    );
}

export default React.memo(CheckBox);
