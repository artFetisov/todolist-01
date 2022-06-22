import React, {FC} from "react";

export const Heading: FC<{ title: string }> = ({title}) => {
    return <h3>{title}</h3>
}