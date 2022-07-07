import React, {FC} from "react";
import {IButton} from "./form.types";

export const Button: FC<IButton> = ({children, onClick, value, ...rest}) => {


    return <button onClick={onClick} value={value} {...rest}>{children}</button>
}