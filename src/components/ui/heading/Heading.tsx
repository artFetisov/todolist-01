import React, {FC} from "react";

export const Heading: FC<{ title: string, onDoubleClick?: () => void }> = ({title, onDoubleClick}) => {
    return <h3 onDoubleClick={onDoubleClick}>{title}</h3>
}