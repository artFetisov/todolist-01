import React, {FC} from "react";
import {IButton} from "./form.interface";

export const Button: FC<IButton> = ({children, onClick, ...rest}) => {
    return <button onClick={onClick} {...rest}>{children}</button>
}