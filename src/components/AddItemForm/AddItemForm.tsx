import React, {ChangeEvent, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export type AddItemFormPropsType = {
    addItem: (text: string) => void
    disabled?: boolean
}


const AddItemForm = React.memo((props: AddItemFormPropsType) => {
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
            props.addItem(localInput.trim())
            setLocalInput('')
        }
    }


    return (
        <div>
            <TextField disabled={props.disabled}
                       id="outlined-basic"
                       label={error ? "Title is required" : error}
                       variant="outlined"
                       value={localInput}
                       onChange={onChangeInputHandler}
                       error={!!error}
            />
            <Button
                disabled={props.disabled}
                onClick={onClickButtonHandler}
                variant="contained"
                style={{
                    maxWidth: '30px', maxHeight: '30px',
                    minWidth: '30px', minHeight: '30px',
                    marginTop: '15px'
                }}
            >+</Button>
        </div>)
})
export default AddItemForm;

{/*<Input*/
}
{/*    className={error ? 'error' : ''}*/
}
{/*/>*/
}
{/*<button onClick={onClickButtonHandler}*/
}
{/*>+*/
}
{/*</button>*/
}
{/*{error && <div className='errorMessage'>{error}</div>}*/
}
