import React from 'react'
import Head from 'next/head'
import { Layout, Nav } from 'components/organisms'
import styled from 'styled-components'

const Home = () => (
  <HomeStyle>
    <Head>
      <title>Liga Nacional de PUBG</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Nav />
    <Layout>
      <h1>Liga</h1>
    </Layout>
  </HomeStyle>
)

const Title = styled.p`
  font-size: ${props => props.theme.sizes.xl8};
  padding: ${props => props.theme.spacing.s};
  text-align: center;
  font-weight: ${props => props.theme.weight.bold};
`

const HomeStyle = styled.div`
  span.title-comment {
    font-weight: ${props => props.theme.weight.xlight};
  }
`

export default Home
