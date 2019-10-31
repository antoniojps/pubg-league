import React from 'react'
import Head from 'next/head'
import { Layout, Nav } from 'components/organisms'
import { Title } from 'components/atoms'
import styled from 'styled-components'

const Calendar = () => (
  <CalendarStyle>
    <Head>
      <title>Calendário - Liga Nacional de PUBG</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Nav />
    <Layout>
      <Title>Calendário</Title>
      <p>
        O campeonato inicia-se com dois qualificadores que irão decorrer no dia
        11 a 14 de Novembro...
      </p>
      <p className="zi-comment">Jogos ocorrem das 21 horas às 23 horas.</p>
      <TitleCenter>
        21h <span className="title-comment">às</span> 23h
      </TitleCenter>

      <p className="zi-note alert">
        <span className="zi-note-type">NOTA:</span> Os jogadores devem estar
        presentes às 20h45 para arrancar o lobby.
      </p>

      <h3>Qualificadores</h3>
      <p className="zi-comment">8 rondas no total, 4 rondas por dia.</p>
      <div className="zi-card">
        <b>8 equipas</b> qualificadas por qualificador.
        <ul>
          <li>
            1º Qualificador: <b>11 e 12 de Novembro</b>
          </li>
          <li>
            2º Qualificador: <b>13 e 14 de Novembro</b>
          </li>
        </ul>
      </div>
      <br />
      <h3>Jornadas</h3>
      <p className="zi-comment">3 rondas por jornada, 21 no total.</p>
      <div className="zi-card">
        <ul>
          <li>
            1ª Jornada: <b>18 de Novembro</b>
          </li>
          <li>
            2ª Jornada: <b>25 de Novembro</b>
          </li>
          <li>
            3ª Jornada: <b>27 de Novembro</b>
          </li>
          <li>
            4ª Jornada: <b>29 de Novembro</b>
          </li>
          <li>
            5ª Jornada: <b>2 de Dezembro</b>
          </li>
          <li>
            6ª Jornada: <b>4 de Dezembro</b>
          </li>
          <li>
            7ª Jornada: <b>9 de Dezembro</b>
          </li>
        </ul>
      </div>
      <br />
    </Layout>
  </CalendarStyle>
)

const TitleCenter = styled.p`
  font-size: ${props => props.theme.sizes.xl8};
  padding: ${props => props.theme.spacing.s};
  text-align: center;
  font-weight: ${props => props.theme.weight.bold};
`

const CalendarStyle = styled.div`
  span.title-comment {
    font-weight: ${props => props.theme.weight.xlight};
  }
`

export default Calendar
