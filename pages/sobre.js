import React from 'react';
import Head from 'next/head';
import { Layout } from 'components/organisms';
import { Title, Spacer } from 'components/atoms';
import { Seo } from 'containers';

const About = () => (
  <>
    <Seo
      title="Sobre"
    />
    <Layout>
      <Spacer bottom="xs">
        <Title>Sobre</Title>
      </Spacer>
    </Layout>
  </>
);

export default About;
