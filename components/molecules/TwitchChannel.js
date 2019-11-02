import React, { useEffect, useState } from 'react';
import { Icon } from 'components/atoms';
import styled from 'styled-components';

const TwitchChannel = () => {
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const requestTwitch = async () => {
      const result = await fetch(
        'https://api.twitch.tv/helix/streams?user_id=26490481',
        {
          headers: {
            'Client-ID': '4v47fovd21ldzwyhyme2bsgmlthmzt',
          },
        },
      );
      const { data } = await result.json();
      if (data && data.length > 0) {
        setIsLive(true);
      } else {
        setIsLive(false);
      }
    };
    requestTwitch();
  }, []);

  return (
    <TwitchAnchor target="_blank" rel="noopener noreferrer" href="https://www.twitch.tv/shootsgud">
      <Icon icon="twitch" color="#8E24AA" />
      {isLive && (
        <Live>
          <Live.Icon />
          <Live.Warning>
          EM DIRETO!
          </Live.Warning>
        </Live>
      )}
    </TwitchAnchor>
  );
};

const Live = styled.div`
  height: 24px;
  display: flex;
  align-items: center;
  margin-left: ${(props) => props.theme.spacing.xs3};
  transition: opacity 1s;
`;

Live.Icon = styled.div`
  width: ${(props) => props.theme.sizes.xs2};
  height:  ${(props) => props.theme.sizes.xs2};
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.red};
  animation-name: blink;
  animation-duration: 1s;
  animation-iteration-count: infinite;

  @keyframes blink {
    0% {opacity: 0.2;}
    50% {opacity: 1;}
    100% {opacity: 0.2;}
  }
`;

Live.Warning = styled.div`
  font-size: ${(props) => props.theme.sizes.xs};
  color: ${(props) => props.theme.colors.red};
  padding-left: ${(props) => props.theme.spacing.xs4};
`;

const TwitchAnchor = styled.a`
  display: flex;
`;

export default TwitchChannel;
