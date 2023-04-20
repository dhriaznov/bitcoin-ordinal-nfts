import Head from 'next/head';
import {useRouter} from 'next/router';
import {OrdinalInscription} from '@/src/types';
import {
  StyledAttribute,
  StyledAttributesTitle,
  StyledBackButton,
  StyledHr,
  StyledImage,
  StyledInscriptionTitle,
  StyledLabel,
  StyledMainAttribute,
  StyledPageTitle,
} from '@/styles/InscriptionDetailsPage.styled';
import BackIcon from '@/src/icons/Back';
import {GetServerSidePropsContext} from 'next';
import React from 'react';

interface Props {
  data?: OrdinalInscription;
  content?: string;
}

const InscriptionDetailsPage = ({data, content}: Props) => {
  const router = useRouter();

  const attributes =
    data && data.metadata
      ? [
          {name: 'Output Value', value: data.metadata['output value']},
          {name: 'Content Type', value: data.metadata['content type']},
          {name: 'Content Length', value: data.metadata['content length']},
          {name: 'Location', value: data.metadata.location},
          {
            name: 'Genesis Transaction',
            value: data.metadata['genesis transaction'],
          },
          {
            name: 'Created',
            value: new Date(data.metadata.timestamp).toDateString(),
          },
        ]
      : [];

  return (
    <>
      <Head>
        <title>{data?.inscriptionNumber} Details</title>
        <meta name="description" content="Ordinal Inscription Lookup" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        {data && data.metadata ? (
          <>
            <div className="container">
              <StyledPageTitle>
                <StyledBackButton onClick={router.back}>
                  <BackIcon />
                </StyledBackButton>
                Details
                <div />
              </StyledPageTitle>
            </div>
            {data.metadata['content type'].includes('image') ? (
              <a
                target="_blank"
                href={`https://ordin.s3.amazonaws.com/inscriptions/${data.metadata.id}`}
              >
                <StyledImage
                  src={`https://ordin.s3.amazonaws.com/inscriptions/${data.metadata.id}`}
                  width={375}
                  height={375}
                  alt="Ordinal Inscription Image"
                  priority
                />
              </a>
            ) : (
              <div className="container">{content}</div>
            )}
            <div className="container">
              <StyledInscriptionTitle>
                {data.inscriptionNumber}
              </StyledInscriptionTitle>

              <StyledHr />

              <StyledLabel>Inscription ID</StyledLabel>
              <StyledMainAttribute>{data.metadata.id}</StyledMainAttribute>

              <StyledLabel>Owner Address</StyledLabel>
              <StyledMainAttribute>{data.metadata.address}</StyledMainAttribute>

              <StyledAttributesTitle>Attributes</StyledAttributesTitle>

              {attributes.map((attribute) => (
                <React.Fragment key={attribute.name}>
                  <StyledLabel>{attribute.name}</StyledLabel>
                  <StyledAttribute>{attribute.value}</StyledAttribute>
                </React.Fragment>
              ))}
            </div>
          </>
        ) : (
          <div className="container">
            Failed to fetch the ordinal inscription
          </div>
        )}
      </main>
    </>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const {id} = context.query;
  const response = await fetch(`https://api.xverse.app/v1/ordinals/${id}`);
  const data = await response.json();
  let content = '';

  if (data.metadata && !data.metadata['content type'].includes('image')) {
    const response = await fetch(
      `https://ordin.s3.amazonaws.com/inscriptions/${id}?type=${data.metadata['content type']}}`,
    );
    content = await response.text();
  }

  return {
    props: {
      data,
      content,
    },
  };
};

export default InscriptionDetailsPage;
