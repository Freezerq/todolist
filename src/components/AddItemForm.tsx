import React, {ChangeEvent, useState} from 'react';


export type AddItemFormPropsType = {
    addItem: (text: string) => void
}


const AddItemForm = (props: AddItemFormPropsType) => {
    let [localInput, setLocalInput] = useState('')
    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (event) {
            setError(null)
        }
        setLocalInput(event.currentTarget.value)
    }

    let [error, setError] = useState<string | null>(null)


    const onClickButtonHandler = () => {
        if (!localInput.trim().length) {
            setError('Field is required')
        } else {
            if (props.addItem) {
                props.addItem(localInput.trim())
                setLocalInput('')
            }

            // if (props.addTodoList) {
            //     props.addTodoList({id: v1(), title: localInput, filter: "ShowAll"})
            // }
        }
    }


    return (
        <div>
            <input
                value={localInput}
                onChange={onChangeInputHandler}
                className={error ? 'error' : ''}
            />
            <button onClick={onClickButtonHandler}
            >+
            </button>
            {error && <div className='errorMessage'>{error}</div>}
        </div>
    );
};

export default AddItemForm;