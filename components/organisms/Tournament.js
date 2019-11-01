import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Title, Select } from 'components/atoms';
import { Tabs } from 'components/molecules';
import { Layout, PlayerHighlights } from 'components/organisms';
import styled from 'styled-components';

const seasonOptions = [
  {
    value: '2019',
    label: '2019',
  },
];

const tabs = [
  {
    title: 'Liga',
    to: '/',
  },
  {
    title: 'Qualificadores',
    to: '/t/qualificadores',
  },
];

const seasonDefault = '2019';

const Tournament = ({ tournament, playerSummaries, teamStats }) => {
  const [season, setSeason] = useState(seasonDefault);

  const handleSeasonChange = (valueSelected) => {
    setSeason(valueSelected);
  };

  useEffect(() => {
    console.log({ tournament, playerSummaries, teamStats });
  }, [tournament, playerSummaries, teamStats]);

  return (
    <Wrapper>
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
      <Tabs tabs={tabs} />
      <div className="zi-layout">
        <PlayerHighlights playerSummaries={playerSummaries} />
      </div>
    </Wrapper>
  );
};

Tournament.propTypes = {
  tournament: PropTypes.shape({}),
  playerSummaries: PropTypes.arrayOf(PropTypes.shape({})),
  teamStats: PropTypes.arrayOf(PropTypes.shape({})),
};

Tournament.defaultProps = {
  tournament: null,
  playerSummaries: [],
  teamStats: [],
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${(props) => props.theme.spacing.xs};
`;

const Wrapper = styled.div`
  .zi-layout {
    padding-bottom: 0;
  }
`;

export default Tournament;
