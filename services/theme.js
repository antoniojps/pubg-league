import { rem } from 'polished';

const colors = {
  white: '#fff',
  black: '#000',
  yellow: '#F5A623',
  grey: '#757575',
  greyDarker: '#111',
  greyLigther: '#EAEAEA',
  red: '#c8311e',
  orange: '#ed7900',
};

const colorsSemantic = {
  base: colors.black,
  baseInverse: colors.white,
  primary: colors.yellow,
  bg: colors.white,
  bgInverse: colors.black,
  bgDarker: colors.grey,
  border: colors.greyLigther,
};

const weight = {
  xxlight: 100,
  xlight: 200,
  light: 300,
  xbase: 400,
  base: 500,
  bold: 600,
};

const sizes = {
  base: rem('16px'),
  xs3: rem('3px'),
  xs2: rem('8px'),
  xs: rem('12px'),
  s: rem('14px'),
  m: rem('16px'),
  l: rem('18px'),
  xl: rem('20px'),
  xl2: rem('22px'),
  xl3: rem('24px'),
  xl4: rem('32px'),
  xl5: rem('40px'),
  xl6: rem('48px'),
  xl7: rem('56px'),
  xl8: rem('64px'),
  xl9: rem('128px'),
};

const typos = {
  input: sizes.xs,
  button: sizes.xs,
  link: sizes.xs,
  text: sizes.l,
  title: sizes.xl6,
};

const spacing = {
  xs4: rem('5px'),
  xs3: rem('10px'),
  xs2: rem('15px'),
  xs: rem('20px'),
  s: rem('25px'),
  sm: rem('30px'),
  m: rem('35px'),
  l: rem('40px'),
  xl: rem('45px'),
  xl1: rem('50px'),
  xl2: rem('55px'),
  xl3: rem('60px'),
  xl4: rem('65px'),
  xl5: rem('100px'),
  xl6: rem('125px'),
};

const values = {
  zIndex: {
    s: '10',
    m: '50',
    l: '100',
    superBig: '9999',
  },
};

const theme = {
  colors: {
    ...colors,
    ...colorsSemantic,
  },
  sizes,
  typos,
  weight,
  values,
  spacing,
};

export default theme;
