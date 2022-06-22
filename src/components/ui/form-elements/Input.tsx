import React, {FC} from "react";
import {IInput} from "./form.interface";

export const Input: FC<IInput> = ({type, checked}) => {
    return <input type={type} checked={checked}/>
}