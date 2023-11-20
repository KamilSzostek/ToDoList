import { FC } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useFormik } from 'formik';
import BaseButton from '../BaseButton/BaseButton';
import { faFingerprint } from '@fortawesome/free-solid-svg-icons';

import styles from './SignInForm.module.scss'

interface IFormValues {
    login?: string
    password?: string
}

const validate = (values: IFormValues) => {
    const errors: IFormValues = {};
    if (!values.login)
        errors.login = 'Login jest wymagany.';
    return errors;
};

const SignInForm: FC = () => {
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            login: '',
            password: ''
        },
        validate,
        validateOnChange: false,
        onSubmit: async (values: IFormValues) => {
            const status = await signIn(
                'credentials',
                { redirect: false, login: values.login, password: values.password },
            )
            if (status?.ok)
                router.push('/todo')
            else {
                formik.errors.login = 'Nieprawidłowy login lub hasło.';
                values.login = ''
                values.password = ''
            }
        },
    });
    return (
        <form className={`d-flex flex-column p-5 ${styles.signInForm}`} onSubmit={formik.handleSubmit}>
            <div className='d-flex flex-column  mb-3'>
                {formik.errors.login ? (<div className={styles.error}>{formik.errors.login}</div>) : null}
                <div className='d-flex justify-content-between'>
                    <label htmlFor="login">Login: </label>
                    <input
                        id="login"
                        name="login"
                        type="text"
                        autoComplete='false'
                        onChange={formik.handleChange}
                        value={formik.values.login}
                    />
                </div>
            </div>
            <div className='d-flex justify-content-between mb-4'>
                <label htmlFor="password">Hasło: </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete='false'
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
            </div>
            <BaseButton type='submit' specialClass='w-100 mb-5' text='Zaloguj się' icon={faFingerprint} isDark />
            <p className='fs-4 text-center'>lub jeśli nie posiadasz konta <Link className='fs-2' href='/registration' onClick={()=>delete formik.errors.login}> Zarejestruj się.</Link></p>
        </form>
    );
};

export default SignInForm;

