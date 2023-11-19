import { FC, ReactElement } from 'react';
import styles from './FormLayout.module.scss'

interface IFormLayoutProps {
    title: string
    children: ReactElement
}

const FormLayout: FC<IFormLayoutProps> = ({title, children}) => {

    return(
        <div className={`${styles.formContainer}`}>
            <h1 className={styles.formTitle}>{title}</h1>
            {children}
        </div>
    );
};

export default FormLayout;