import React from 'react';
import styled from 'styled-components';
import { Icon } from 'components/atoms';
import Link from 'next/link';

const NavDesktop = () => (
  <>
    <Navigation.Start>
      <Navigation.Links>
        <Link href="/">
          <a title="Resultados dos Qualificadores e Jornadas">Resultados</a>
        </Link>
        <Link href="/calendario">
          <a title="Calendário da Liga Nacional de PUBG">Calendário</a>
        </Link>
        <Link href="/sobre">
          <a title="Sobre a Liga Nacional de PUBG">Sobre</a>
        </Link>
      </Navigation.Links>
    </Navigation.Start>
    <Navigation.Logo>
      <img src="/pubg-portugal-logo-black.png" alt="Logótipo do PUBG Portugal. Uma placa metalica rodeia o nome PUBG maior em cima, por baixo esta escrito Portugal. A preto." />
    </Navigation.Logo>
    <Navigation.End>
      <Navigation.Links>
        <a>
          <Icon icon="twitter" color="#1DA1F2" />
        </a>
        <a>
          <Icon icon="discord" color="#7289DA" />
        </a>
      </Navigation.Links>
    </Navigation.End>
  </>
);

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
  padding-left: 1.785714285714286rem;
`;

Navigation.End = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  a {
    margin-left: ${(props) => props.theme.spacing.xs3};
  }
  padding-right: 1.785714285714286rem;
`;

Navigation.Logo = styled.div`
  text-align: center;
  width: 100%;
  img {
    transform: translateY(15%);
  }
`;

export default Nav;
