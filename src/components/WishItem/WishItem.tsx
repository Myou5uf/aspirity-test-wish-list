import React, {useCallback, useRef, useState} from 'react';
import './WishItem.scss';
import {IWish} from '../../models/IWish';
import {useAppDispatch} from '../../hooks/redux';
import {addPriorityWish, deleteWish, fulfillWish, updateNameWish} from '../../store/reducers/wishesSlice';
import EditIcon from '../ui/Icons/EditIcon';
import {CheckBox} from '../ui/CheckBox';
import StarFillIcon from '../ui/Icons/StarFillIcon';
import StarEmptyIcon from '../ui/Icons/StarEmptyIcon';
import DeleteIcon from '../ui/Icons/DeleteIcon';
import {ToolTip} from '../ui/ToolTip';

interface IProps {
    wish: IWish;
    dragStartHandler: (e: React.DragEvent<HTMLLIElement>, wish: IWish) => void;
    dragEndHandler: (e: React.DragEvent<HTMLLIElement>) => void;
    dragOverHandler: (e: React.DragEvent<HTMLLIElement>) => void;
    dropHandler: (e: React.DragEvent<HTMLLIElement>, wish: IWish) => void;
}

function WishItem(props: IProps) {
    const {wish, dragStartHandler, dragEndHandler, dragOverHandler, dropHandler} = props;
    const dispatch = useAppDispatch();
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [edited, setEdited] = useState(false);

    const handleClickEdit = useCallback(() => {
        if (textAreaRef.current) {
            setEdited(true);
            textAreaRef.current.disabled = false;
            textAreaRef.current.selectionStart = textAreaRef.current.value.length;
            textAreaRef.current.focus();
        }
    }, []);

    const handleKeyEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            if (textAreaRef.current) {
                if (textAreaRef.current.value.trim().length === 0) return;
                textAreaRef.current.disabled = true;
                textAreaRef.current.blur();
                setEdited(false);
                dispatch(updateNameWish({id: wish.id, name: textAreaRef.current.value}));
            }
        }
    };

    const handleClickCheckBox = useCallback(() => {
        dispatch(fulfillWish(wish.id));
    }, [dispatch, wish.id]);

    return (
        <li
            className='wishItem'
            draggable
            onDragStart={(e) => dragStartHandler(e, wish)}
            onDragLeave={(e) => dragEndHandler(e)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropHandler(e, wish)}
        >
            <div className='wishItem__priority'>
                <button
                    type='button'
                    onClick={() => dispatch(addPriorityWish(wish.id))}
                    className='wishItem__btn wishItem__btn_addPriority'
                >
                    {wish.priority
                        ? (
                            <ToolTip
                                text='Click if you want to remove the priority'
                                className='wishItem__priority-toolTip'
                            >
                                <StarFillIcon />
                            </ToolTip>
                        )

                        : (
                            <ToolTip
                                text='Click if you want to add priority'
                                className='wishItem__priority-toolTip'
                            >
                                <StarEmptyIcon />
                            </ToolTip>
                        )}
                </button>

            </div>
            <textarea
                ref={textAreaRef}
                className={edited ? 'wishItem__text wishItem__text_focus' : 'wishItem__text'}
                style={edited ? {cursor: 'default'} : {cursor: 'grab'}}
                disabled
                defaultValue={wish.name}
                onKeyDown={(e) => handleKeyEnter(e)}
            />
            <small
                className={edited ? 'wishItem__text_open' : 'wishItem__text_close'}
            >
                After editing, press Enter
            </small>
            <div className='wishItem__btns'>
                <ToolTip text='Click if the wish has been fulfilled (not fulfilled)'>
                    <CheckBox
                        onChange={handleClickCheckBox}
                        className='wishItem__fulfill'
                        checked={wish.fulfilled}
                    />
                </ToolTip>
                <ToolTip text='Click if you want to edit the wish'>
                    <button
                        type='button'
                        onClick={handleClickEdit}
                        className='wishItem__btn wishItem__btn_edit'
                    >
                        <EditIcon />
                    </button>
                </ToolTip>
                <ToolTip text='Click if you want to delete the wish'>
                    <button
                        type='button'
                        onClick={() => dispatch(deleteWish(wish.id))}
                        className='wishItem__btn wishItem__btn_delete'
                    >
                        <DeleteIcon />
                    </button>
                </ToolTip>
            </div>
        </li>
    );
}

export default React.memo(WishItem);
