import Head from 'next/head'
import BaseLayout from '@/components/BaseLayout/BaseLayout'
import SignInHeroBg from './../../public/assets/login.jpg'
import SignInForm from '@/features/Sign/SignInForm/SignInForm'
import FormLayout from '@/components/FormLayout/FormLayout'
import { GetServerSideProps } from 'next/types';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default function Home() {
  const heroBg = {
    src: SignInHeroBg,
    alt: 'Stare drzwi zabezpieczone łańczuchem spiętym kłódką.'
  }
  return (
    <>
      <Head>
        <title>Logowanie</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BaseLayout image={heroBg} isAlignItemsCenter>
        <FormLayout title='Logowanie'>
          <SignInForm />
        </FormLayout>
      </BaseLayout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const token = await getServerSession(
      req,
      res,
      authOptions
  )
  if (token) return {
      redirect: {
          destination: '/todo',
          permament: false
      },
      props: {}
  }
  else return {
      props: {}
  }
}