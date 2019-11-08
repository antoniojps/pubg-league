import React from 'react';
import styled from 'styled-components';
import { below } from 'services/breakpoints';

const Sponsors = () => (
  <Wrapper>
    <Inner className="zi-layout zi-dark-theme">
      <p className="title">
          sponsors
      </p>
      <SponsorList>
        <Sponsor href="https://www.globaldata.pt/?q=noblechairs" target="_blank" rel="noopener noreferrer">
          <img src="/noblechairs.svg" alt="Noblechairs logo" />
        </Sponsor>
        <Sponsor href="https://www.globaldata.pt/rato-gamer-endgame-gear-xm1-xm1" target="_blank" rel="noopener noreferrer">
          <img src="/endgame-gear.svg" alt="Endgame gear logo" />
        </Sponsor>
        <Sponsor href="https://discordapp.com/invite/Jnr2wfC" target="_blank" rel="noopener noreferrer">
          <img src="/pubg-pt.png" alt="PUBG PT logo" />
        </Sponsor>
      </SponsorList>
    </Inner>
    <Character>
      <img
        src="/character.png"
        alt="PUBG main character with helmet level 3."
      />
    </Character>
  </Wrapper>
);

const Wrapper = styled.div`
  width: 100%;
  height: 150px;
  background: ${(props) => props.theme.colors.bgInverse};
  position: relative;
  overflow: hidden;
`;

const Character = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 200px;
  height: 100%;
  margin-right: 15%;
  transition: 2s opacity;
  opacity: 0.2;
`;

const Inner = styled.div`
  .zi-layout {
    padding-top: 0;
    padding-bottom: 0 !important;
  }
  p.title {
    ${below.sm`
      display: none;
    `}
  }
  padding-bottom: 0;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
   p {
     margin: 0;
   }
`;

const Sponsor = styled.a`
  padding: ${(props) => props.theme.spacing.xs2};
  ${below.sm`
    padding: ${(props) => props.theme.spacing.xs4};
  `}
  transition: all .2s ease-in-out;
  &:hover {
    transform: scale(1.015);
  }
`;
const SponsorList = styled.div`
  display: flex;
  z-index: ${(props) => props.theme.values.zIndex.l};
`;

export default Sponsors;
