import React from 'react';
import styled from 'styled-components';
import { Icon } from 'components/atoms';
import { TwitchChannel } from 'components/molecules';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { below } from 'services/breakpoints';
import useBreakpoints from 'hooks/useBreakpoints';

const NavDesktop = () => {
  const { push } = useRouter();
  return (
    <>
      <Navigation.Start>
        <Navigation.Logo onClick={() => push('/')}>
          <img src="/sml_header.png" alt="Logótipo da Shootsgud Major League. Rectângulo amarelo a esquerda e preto a direito, no meio está uma cara com capacete de metal e barba." />
        </Navigation.Logo>
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
      <Navigation.End>
        <Navigation.Links>
          <a target="_blank" rel="noopener noreferrer" href="https://discord.gg/Jnr2wfC">
            <Icon icon="facebook" color="#1778F2" />
          </a>
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


const Navigation = styled.nav`
  background-color: white;
  width: 100%;
  box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.06);
  padding-top: ${(props) => props.theme.spacing.xs3};
  padding-bottom: ${(props) => props.theme.spacing.xs3};
  ${below.md`
    padding-bottom: 0;
  `};
`;

Navigation.Inner = styled.div`
  display: flex;
  justify-content: space-between;
  ${below.md`
    width: 100% !important;
    padding: 0 !important;
  `}
`;

Navigation.Links = styled.div`
  display: flex;
  padding-top: ${(props) => props.theme.spacing.xs2};
  margin-left: ${(props) => props.theme.spacing.m};
  a {
    padding: ${(props) => props.theme.spacing.xs4};
    line-height: 1;
  }
`;

Navigation.Start = styled.div`
  a {
    margin-right: ${(props) => props.theme.spacing.xs};
  }
  display: flex;
`;

Navigation.End = styled.div`
  a {
    margin-left: ${(props) => props.theme.spacing.xs3};
  }
`;

Navigation.Logo = styled.div`
  cursor: pointer;
  height: 55px;
  width: 84px;
  display: flex;
  align-items: center;
`;


const NavMobile = () => {
  const { push } = useRouter();
  return (
    <NavMob>
      <NavMob.Top>
        <Navigation.Logo onClick={() => push('/')}>
          <img src="/sml_header.png" alt="Logótipo da Shootsgud Major League. Rectângulo amarelo a esquerda e preto a direito, no meio está uma cara com capacete de metal e barba." />
        </Navigation.Logo>
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
      </NavMob.Top>
      <NavMob.Bottom>
        <NavMob.Links>
          <a target="_blank" rel="noopener noreferrer" href="https://discord.gg/Jnr2wfC">
            <Icon icon="facebook" color="#1778F2" />
          </a>
          <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/shootsgud">
            <Icon icon="twitter" color="#1DA1F2" />
          </a>
          <a target="_blank" rel="noopener noreferrer" href="https://discord.gg/Jnr2wfC">
            <Icon icon="discord" color="#7289DA" />
          </a>
          <TwitchChannel />
        </NavMob.Links>
      </NavMob.Bottom>
    </NavMob>
  );
};

const NavMob = styled.div`
  padding-top: 0.625rem;
  width: 100%;
`;
NavMob.Links = styled(Navigation.Links)`
  margin-left: 0;
`;

NavMob.Top = styled.div`
  display: flex;
  padding: 0 ${(props) => props.theme.spacing.xs3};
`;
NavMob.Bottom = styled.div`
  margin-left: 0;
  background-color: ${(props) => props.theme.colors.bgDarkerS};
  width: 100%;
  margin-top: ${(props) => props.theme.spacing.xs3};
  padding: 0 ${(props) => props.theme.spacing.xs3};
  padding-bottom: ${(props) => props.theme.spacing.xs3};

`;


const Nav = () => {
  const { md } = useBreakpoints();
  return (
    <Navigation>
      <Navigation.Inner className="zi-layout">
        { md ? <NavDesktop /> : <NavMobile />}
      </Navigation.Inner>
    </Navigation>
  );
};

export default Nav;
