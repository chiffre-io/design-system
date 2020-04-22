import { NextPage } from 'next'
import Head from 'next/head'
import { StackContainer } from '@47ng/chakra-next'
import { AnimatedLogo } from '../src/index'

const DemoPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Chiffre.io - Design System</title>
      </Head>
      <StackContainer my={24} p={12}>
        <AnimatedLogo h="64px" w="100%" speed={2} />
      </StackContainer>
    </>
  )
}

export default DemoPage
