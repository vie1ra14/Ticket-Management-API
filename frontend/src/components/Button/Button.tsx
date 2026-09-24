import type { ButtonHTMLAttributes } from "react"
import styles from "./Button.module.css"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function Button({ className = "", ...props }: ButtonProps) {
    return <button className={`${styles.button} ${className}`.trim()} {...props} />
}
