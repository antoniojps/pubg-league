import React from 'react';
import { MatchCard } from 'components/molecules';
import { Layout } from 'components/organisms';

const Page = () => (
  <Layout>
    <MatchCard
      teamName="CUCURUU"
      teamLogo="https://cdn.sanity.io/images/4sveemsz/production/18404a7bb1f843f4e2ecf52903729a08ba8ded7c-512x512.png"
      createdAt="2019-11-11T23:33:26Z"
    />
  </Layout>
);

export default Page;
