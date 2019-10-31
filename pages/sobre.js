import React from 'react'
import Head from 'next/head'
import { Layout, Nav } from 'components/organisms'
import styled from 'styled-components'
import { Title, Spacer } from 'components/atoms'

const About = () => (
  <>
    <Head>
      <title>Liga Nacional de PUBG</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Nav />
    <Layout>
      <Spacer bottom="xs">
        <Title>Sobre</Title>
      </Spacer>
    </Layout>
  </>
)

export default About
