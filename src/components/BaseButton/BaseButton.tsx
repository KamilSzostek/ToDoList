import { FC } from 'react';
import Link from 'next/link';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './BaseButton.module.scss'

interface IBaseButtonProps {
    text: string
    icon?: IconDefinition
    isDark?: boolean
    urlPath?: string
    onClick?: () => void
    specialClass?: string
    type?: "button" | "submit" | "reset" | undefined
}

const BaseButton: FC<IBaseButtonProps> = ({ text, isDark, icon, urlPath, onClick, specialClass, type }) => {
    const bootstrapClasses = `d-flex gap-2 align-items-center justify-content-center`
    const style = `${bootstrapClasses} ${styles.basic} ${isDark ? styles.isDark : ''} ${specialClass}`
    return urlPath ? (<Link className={style} href={urlPath}><span>{text}</span>{icon && <FontAwesomeIcon className={styles.icon} icon={icon}></FontAwesomeIcon>}</Link>) : (<button className={style} type={type} onClick={onClick}><span>{text}</span>{icon && <FontAwesomeIcon className={styles.icon} icon={icon}></FontAwesomeIcon>}</button>)
};

export default BaseButton;
