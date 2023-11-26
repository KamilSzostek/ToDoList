import { FC, ReactElement } from 'react';
import Link from 'next/link';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './BaseButton.module.scss'

interface IBaseButtonProps {
    text: string
    icon?: IconDefinition
    element?: ReactElement
    isLoading?: boolean 
    isDark?: boolean
    urlPath?: string
    onClick?: () => void
    specialClass?: string
    type?: "button" | "submit" | "reset" | undefined
    isDisabled?: boolean
}

const BaseButton: FC<IBaseButtonProps> = ({ text, isDark, icon, urlPath, onClick, specialClass, type, isDisabled, isLoading, element }) => {
    const bootstrapClasses = `d-flex gap-2 align-items-center justify-content-center`
    const style = `${bootstrapClasses} ${styles.basic} ${isDark ? styles.isDark : ''} ${specialClass}`
    return urlPath ? (<Link className={style} href={urlPath}><span>{text}</span>{isLoading ? element : (icon && <FontAwesomeIcon className={styles.icon} icon={icon}></FontAwesomeIcon>)}</Link>) 
    : (<button className={style} type={type} onClick={onClick} disabled={isDisabled ? true : false}><span>{text}</span>{isLoading ? element : (icon && <FontAwesomeIcon className={styles.icon} icon={icon}></FontAwesomeIcon>)}</button>)
};

export default BaseButton;
