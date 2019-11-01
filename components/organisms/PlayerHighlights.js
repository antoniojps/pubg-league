import React from 'react';
import { PlayerCard } from 'components/molecules';
import styled from 'styled-components';
import PropTypes from 'prop-types'

const PlayerHighlights = ({ playerSummaries }) => (
  <Grid>
    <PlayerCard player={playerSummaries ? playerSummaries[5] : null}/>
  </Grid>
);

const Grid = styled.div`
 display: grid;
 display: grid;
grid-template-columns: 1.5fr repeat(4, 1fr);
grid-template-rows: 1fr;
grid-column-gap: ${(props) => props.theme.spacing.s};
grid-row-gap: 0px;
`;

PlayerHighlights.propTypes = {
  playerSummaries: PropTypes.arrayOf(PropTypes.shape({})),
}

PlayerHighlights.defaultProps = {
  playerSummaries: null,
}

export default PlayerHighlights;
