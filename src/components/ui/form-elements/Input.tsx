import React, {FC} from "react";
import {IInput} from "./form.types";

export const Input: FC<IInput> = ({type, checked, ...rest}) => {
    return <input type={type} checked={checked} {...rest}/>
}