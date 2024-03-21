import {IconButton, TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {useState} from "react";

type InputProps = {
    initialValue?: string,
    onChangeHandler: (value: string) => void
}

export const ReusableInput = ({onChangeHandler}: InputProps) => {
    const [value, setValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handleBlur = () => {
        onChangeHandler(value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onChangeHandler(value);
        }
    };
    return (
            <TextField
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyPress}
                size="small"
                sx={{ width: '25%', mb: 2 }}
                variant="outlined"
                InputProps={{
                    startAdornment: (
                        <IconButton>
                            <SearchIcon />
                        </IconButton>
                    ),
                }}
            />
    )
}