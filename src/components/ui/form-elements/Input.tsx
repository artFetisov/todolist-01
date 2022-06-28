import React, {FC} from "react";
import {IInput} from "./form.interface";

export const Input: FC<IInput> = ({type, checked, ...rest}) => {
    return <input type={type} checked={checked} {...rest}/>
}