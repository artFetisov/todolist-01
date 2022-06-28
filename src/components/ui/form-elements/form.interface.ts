import {ButtonHTMLAttributes, InputHTMLAttributes} from "react";

type TypeInputPropsField = InputHTMLAttributes<HTMLInputElement>

export interface IInput extends TypeInputPropsField {
}

type TypeButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export interface IButton extends TypeButtonProps {}

