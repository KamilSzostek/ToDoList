import { FC } from 'react';
import Link from 'next/dist/client/link';
import { useRouter } from 'next/router'
import { useFormik } from 'formik';
import { signIn } from 'next-auth/react';
import BaseButton from '../../../components/BaseButton/BaseButton';
import { faFingerprint } from '@fortawesome/free-solid-svg-icons';
import styles from '../SignInForm/SignInForm.module.scss'


interface IFormValues {
    login?: string,
    password?: string,
    repassword?: string
}

const validate = async (values: IFormValues) => {
    const errors: IFormValues = {};
    if (!values.login){
        errors.login = 'Login jest wymagany'
        return errors
    }
    else if (values.login.length < 6) {
        errors.login = 'Login musi zawierać conajmniej 6 znaków.'
        return errors
    }
    else {
        const res = await fetch(`/api/users/${values.login}`)
        const data = await res.json()
        if (!data.status) {
            errors.login = 'Ten login jest już zajęty.'
            values.login = ''
            values.password = ''
            values.repassword = ''
            return errors
        }
    }
    if (!values.password || !values.repassword){
        errors.login = "Hasło i powtórzenie hasła są wymagane"
        return errors
    }
    else if (values.password !== values.repassword) {
        values.password = ''
        values.repassword = ''
        errors.login = 'Hasła nie mogą się różnić.'
    }
    return errors
};

const SignInForm: FC = () => {
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            login: '',
            password: '',
            repassword: ''
        },
        validate,
        validateOnChange: false,
        onSubmit: async function onSubmit(values: IFormValues) {
            const res = await fetch('/api/users', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ login: values.login, password: values.password })
            })
            const result = await res.json()
            if (result.status) {
                const status = await signIn(
                    'credentials',
                    { redirect: false, login: values.login, password: values.password },
                )
                status?.ok && router.push('/todo')
            }
        }
    });

    return (
        <form className={`d-flex flex-column p-5 ${styles.signInForm}`} onSubmit={formik.handleSubmit}>
            {formik.errors.login ? (<div className={styles.error}>{formik.errors.login}</div>) : null}
            <div className='d-flex flex-column  mb-3'>
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
            <div className='d-flex justify-content-between mb-4'>
                <label htmlFor="password">Powtórz hasło: </label>
                <input
                    id="repassword"
                    name="repassword"
                    type="password"
                    autoComplete='false'
                    onChange={formik.handleChange}
                    value={formik.values.repassword}
                />
            </div>
            <BaseButton type='submit' specialClass='w-100 mb-5' text='Zarejestruj się' icon={faFingerprint} isDark />
            <p className='fs-4 text-center'>Jeśli masz już konto <Link className='fs-2' href='/' onClick={()=>delete formik.errors.login}> Zaloguj się.</Link></p>
        </form>
    );
};

export default SignInForm;
