import React from 'react';
import styled from 'styled-components';
import { Icon } from 'components/atoms';
import { TwitchChannel } from 'components/molecules';
import Link from 'next/link';
import { useRouter } from 'next/router';

const NavDesktop = () => {
  const { push } = useRouter();
  return (
    <>
      <Navigation.Start>
        <Navigation.Links>
          <Link href="/">
            <a title="Resultados dos Qualificadores e Jornadas">Resultados</a>
          </Link>
          <Link href="/p/calendario">
            <a title="Calendário da Liga Nacional de PUBG">Calendário</a>
          </Link>
          <Link href="/p/sobre">
            <a title="Sobre a Liga Nacional de PUBG">Sobre</a>
          </Link>
        </Navigation.Links>
      </Navigation.Start>
      <Navigation.Logo onClick={() => push('/')}>
        <img src="/sml_header.png" alt="Logótipo da Shootsgud Major League. Rectângulo amarelo a esquerda e preto a direito, no meio está uma cara com capacete de metal e barba." />
      </Navigation.Logo>
      <Navigation.End>
        <Navigation.Links>
          <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/shootsgud">
            <Icon icon="twitter" color="#1DA1F2" />
          </a>
          <a target="_blank" rel="noopener noreferrer" href="https://discord.gg/Jnr2wfC">
            <Icon icon="discord" color="#7289DA" />
          </a>
          <TwitchChannel />
        </Navigation.Links>
      </Navigation.End>
    </>
  );
};

const Nav = () => (
  <Navigation>
    <Navigation.Inner className="zi-layout">
      <NavDesktop />
    </Navigation.Inner>
  </Navigation>
);

const Navigation = styled.nav`
  background-color: white;
  width: 100%;
  box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.06);
  padding-top: ${(props) => props.theme.spacing.xs3};
`;

Navigation.Inner = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding-top: 0;
  padding-bottom: 0;
`;

Navigation.Links = styled.div`
  display: flex;
  padding-top: ${(props) => props.theme.spacing.xs2};
  a {
    padding: ${(props) => props.theme.spacing.xs4};
  }
`;

Navigation.Start = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  a {
    margin-right: ${(props) => props.theme.spacing.m};
  }
  padding-left: 2.5rem;
`;

Navigation.End = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  a {
    margin-left: ${(props) => props.theme.spacing.xs3};
  }
  padding-right: 2.5rem;
`;

Navigation.Logo = styled.div`
  text-align: center;
  cursor: pointer;
  width: 100%;
  min-height: 55px;
  img {
    transform: translateY(15%);
  }
`;

export default Nav;
