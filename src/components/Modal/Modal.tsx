import { FC, ReactElement, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom'
import styles from './Modal.module.scss'

interface IModalProps {
    showModal: boolean
    closeModal: () => void
    children: ReactElement
}

const Modal: FC<IModalProps> = ({ children, showModal, closeModal }) => {
    const modalRef = useRef<HTMLDialogElement>(null);
    useEffect(()=>{
        modalRef.current?.classList.add(`${styles.comeIn}`)
    }, [])
    const onClose = () => {
        modalRef.current?.classList.add(`${styles.comeOut}`)
        setTimeout(()=>{
            closeModal()
        }, 500)
    }
    return (
        ReactDOM.createPortal(<>
            <div className={styles.backdrop} onClick={onClose} />
            <dialog ref={modalRef} className={styles.modal} open={showModal}>
                {children}
            </dialog>
        </>, document.body)
    );
};

export default Modal;
