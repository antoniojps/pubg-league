import React, { useMemo } from 'react';
import { pt } from 'date-fns/locale';
import { format, formatDistance } from 'date-fns';
import styled, { css } from 'styled-components';
import Link from 'next/link';

const PostCard = ({
  title, body, publishedAt, slug,
}) => {
  const date = useMemo(() => {
    const publishedDate = new Date(publishedAt);
    const nowDate = new Date();
    const dateInWords = format(publishedDate, 'EEEE, d LLLL yyyy', { locale: pt });
    const dateDistance = formatDistance(publishedDate, nowDate, { locale: pt });
    return `Publicado - ${dateInWords} (à ${dateDistance})`;
  },
  [publishedAt]);

  return (
    <Link href="/p/[slug]" as={`/p/${slug.current}`}>
      <a title={title} style={{ color: 'black' }}>
        <Wrapper className="zi-card zi-fieldset">
          <div className="zi-fieldset-content">
            <h1>{title}</h1>
            <h2>
              {body}
...
            </h2>
          </div>
          <div className="zi-fieldset-footer">
            <p>{date}</p>
            <Link href="/p/[slug]" as={`/p/${slug.current}`}>
              <a className="zi-btn mini auto">Ler</a>
            </Link>
          </div>
        </Wrapper>
      </a>
    </Link>
  );
};

const Wrapper = styled.div((props) => css`
  padding: 0;
  cursor: pointer;
`);

export default PostCard;
