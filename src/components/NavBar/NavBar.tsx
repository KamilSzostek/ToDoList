import { FC } from 'react';
import {useRouter} from 'next/router';
import { signOut } from 'next-auth/react';
import BaseButton from '../BaseButton/BaseButton';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons/faUser';
import styles from './NavBar.module.scss'

interface INavBarProps {
  userName: string
}

const NavBar: FC<INavBarProps> = ({ userName }) => {
  const router = useRouter();
  const onSignOut = () => {
    signOut();
    router.push('/')
  }
  return (
    <nav className='w-100 d-flex justify-content-between gap-5 align-items-center ps-2 pe-2'>
      <span className='fs-1 fw-bold pt-1'><FontAwesomeIcon className={styles.icon} icon={faUser} />{userName}</span>
      <BaseButton text='Wyloguj' icon={faPowerOff} onClick={onSignOut} />
    </nav>
  );
};

export default NavBar;
