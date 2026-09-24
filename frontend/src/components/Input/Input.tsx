import type { InputHTMLAttributes } from "react"
import styles from "./Input.module.css"

type InputProps = InputHTMLAttributes<HTMLInputElement>

export function Input({ className = "", ...props }: InputProps) {
    return <input className={`${styles.input} ${className}`.trim()} {...props} />
}
