import React from 'react'
import Head from 'next/head'
import { Layout, Nav } from 'components/organisms'
import styled from 'styled-components'
import { Title } from 'components/atoms'

const Home = () => (
  <>
    <Head>
      <title>Liga Nacional de PUBG</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Nav />
    <Layout>
      <Title>Resultados</Title>
    </Layout>
  </>
)

export default Home
