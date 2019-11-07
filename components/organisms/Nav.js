import React from 'react';
import styled from 'styled-components';
import { Icon } from 'components/atoms';
import { TwitchChannel } from 'components/molecules';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { below, above } from 'services/breakpoints';

const NavDesktop = () => {
  const { push } = useRouter();
  return (
    <NavigationDesktop>
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
          <Link href="/p/info">
            <a title="Informação">Info</a>
          </Link>
        </Navigation.Links>
      </Navigation.Start>
      <Navigation.End>
        <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/Shootsgud/">
          <Icon icon="facebook" color="#1778F2" />
        </a>
        <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/shootsgud">
          <Icon icon="twitter" color="#1DA1F2" />
        </a>
        <a target="_blank" rel="noopener noreferrer" href="https://discord.gg/HCn4FvT">
          <Icon icon="discord" color="#7289DA" />
        </a>
        <TwitchChannel />
      </Navigation.End>
    </NavigationDesktop>
  );
};

const Navigation = styled.nav`
  background-color: ${(props) => props.theme.colors.bg};
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
  padding-top: 0;
  padding-bottom: 0;

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
  ${below.md`
     margin-left: 0;
     padding-top: 0;
     align-items: center;
  `}
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
    padding: ${(props) => props.theme.spacing.xs4};
    line-height: 1;
  }

  display: flex;
  padding-top: ${(props) => props.theme.spacing.xs2};
  margin-left: ${(props) => props.theme.spacing.m};

  ${below.md`
     margin-left: 0;
     padding-top: 0;
     align-items: center;
  `}
`;

Navigation.Logo = styled.div`
  cursor: pointer;
  height: 55px;
  min-width: 84px;
  display: flex;
  align-items: center;
  ${below.md`
      margin-right: 15px;
  `}
`;


const NavMobile = () => {
  const { push } = useRouter();
  return (
    <NavMob>
      <NavMob.Top>
        <Navigation.Logo onClick={() => push('/')}>
          <img src="/sml_header.png" alt="Logótipo da Shootsgud Major League. Rectângulo amarelo a esquerda e preto a direito, no meio está uma cara com capacete de metal e barba." />
        </Navigation.Logo>
        <NavMob.Links>
          <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/Shootsgud/">
            <Icon icon="facebook" color="#1778F2" />
          </a>
          <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/shootsgud">
            <Icon icon="twitter" color="#1DA1F2" />
          </a>
          <a target="_blank" rel="noopener noreferrer" href="https://discord.gg/HCn4FvT">
            <Icon icon="discord" color="#7289DA" />
          </a>
          <TwitchChannel />
        </NavMob.Links>
      </NavMob.Top>
      <NavMob.Bottom>
        <NavMob.Categories>
          <Link href="/">
            <a title="Resultados dos Qualificadores e Jornadas">Resultados</a>
          </Link>
          <Link href="/p/calendario">
            <a title="Calendário da Liga Nacional de PUBG">Calendário</a>
          </Link>
          <Link href="/p/sobre">
            <a title="Sobre a Liga Nacional de PUBG">Sobre</a>
          </Link>
          <Link href="/p/info">
            <a title="Sobre a Liga Nacional de PUBG">Info</a>
          </Link>
        </NavMob.Categories>
      </NavMob.Bottom>
    </NavMob>
  );
};

const NavigationDesktop = styled.div`
  display: none;
  ${above.md`
    display: flex;
    justify-content: space-between;
    width: 100%;
  `}
`;

const NavMob = styled.div`
  padding-top: 0.625rem;
  width: 100%;
  display: none;
  ${below.md`
    display: flex;
    flex-direction: column;
  `};
`;
NavMob.Links = styled.div`
  display: flex;
  padding-top: ${(props) => props.theme.spacing.xs2};
  a {
    padding: ${(props) => props.theme.spacing.xs4};
    line-height: 1;
  }
  ${below.md`
     margin-left: 0;
     padding-top: 0;
     align-items: center;
  `}

  margin-left: 0;
  max-width: 100%;
  overflow-x: auto;
`;

NavMob.Categories = styled.div`
  display: flex;
  flex-basis: 100%;
  flex-grow: 1;
  flex-shrink: 0;
  justify-content: space-between;
  max-width: 100%;
  overflow-x: auto;
  padding-top: ${(props) => props.theme.spacing.xs2};
  a {
    padding: ${(props) => props.theme.spacing.xs4};
    line-height: 1;
  }
  font-size: ${(props) => props.theme.sizes.s};
  font-weight: ${(props) => props.theme.weight.base};
`;

NavMob.Top = styled.div`
  display: flex;
  padding: 0 ${(props) => props.theme.spacing.xs3};
  justify-content: space-between;
`;
NavMob.Bottom = styled.div`
  margin-left: 0;
  width: 100%;
  margin-top: ${(props) => props.theme.spacing.xs3};
  padding: 0 ${(props) => props.theme.spacing.xs3};
  padding-bottom: ${(props) => props.theme.spacing.xs3};
`;


const Nav = () => (
  <Navigation>
    <Navigation.Inner className="zi-layout">
      <NavMobile />
      <NavDesktop />
    </Navigation.Inner>
  </Navigation>
);

export default Nav;
