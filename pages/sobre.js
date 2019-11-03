import React from 'react';
import Head from 'next/head';
import { Layout } from 'components/organisms';
import { Title, Spacer } from 'components/atoms';
import { Seo } from 'containers';

const About = () => (
  <>
    <Seo
      title="Sobre"
    />
    <Layout>
      <Spacer bottom="xs">
        <Title>Sobre</Title>
      </Spacer>
      <h1>Ac tamen hic mallet non dolere.</h1>

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quid ait Aristoteles reliquique Platonis alumni? Si id dicis, vicimus. Ego vero isti, inquam, permitto. Sin aliud quid voles, postea. Tibi hoc incredibile, quod beatissimum. Etiam beatissimum? Tum Triarius: Posthac quidem, inquit, audacius. Duo Reges: constructio interrete. </p>

      <p>Si enim ad populum me vocas, eum. At certe gravius. Negat esse eam, inquit, propter se expetendam. Sin aliud quid voles, postea. Hoc sic expositum dissimile est superiori. </p>

      <ol>
        <li>Eam si varietatem diceres, intellegerem, ut etiam non dicente te intellego;</li>
        <li>Qui enim voluptatem ipsam contemnunt, iis licet dicere se acupenserem maenae non anteponere.</li>
        <li>Quod mihi quidem visus est, cum sciret, velle tamen confitentem audire Torquatum.</li>
        <li>Si quicquam extra virtutem habeatur in bonis.</li>
      </ol>

    </Layout>
  </>
);

export default About;
