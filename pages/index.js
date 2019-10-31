import React, { useState } from 'react'
import Head from 'next/head'
import { Layout, Nav } from 'components/organisms'
import styled from 'styled-components'
import { Title, Select, Spacer } from 'components/atoms'
import { Tabs } from 'components/molecules'

const seasonOptions = [
  {
    value: '2019',
    label: '2019'
  }
]

const seasonDefault = '2019'

const Home = () => {
  const [season, setSeason] = useState(seasonDefault)

  const handleSeasonChange = valueSelected => {
    setSeason(valueSelected)
  }

  return (
    <HomeStyle>
      <Head>
        <title>Liga Nacional de PUBG</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <Layout>
        <Header>
          <Title>Resultados</Title>
          <Select
            options={seasonOptions}
            value={season}
            onSelect={handleSeasonChange}
          />
        </Header>
      </Layout>
      <Tabs />
    </HomeStyle>
  )
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${props => props.theme.spacing.xs};
`
const HomeStyle = styled.div`
  .zi-layout {
    padding-bottom: 0;
  }
`

export default Home
