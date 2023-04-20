import Head from 'next/head';
import {useState} from 'react';
import {
  StyledButton,
  StyledFormLabel,
  StyledImage,
  StyledInput,
  StyledItemTitle,
  StyledLink,
  StyledList,
  StyledPageTitle,
  StyledSubTitle,
} from '@/styles/InscriptionListPage.styled';
import {useForm} from 'react-hook-form';
import {OrdinalInscription, UnspentOutput} from '@/src/types';
import ForwardIcon from '@/src/icons/Forward';

interface LookupForm {
  walletAddress: string;
}

const InscriptionListPage = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<LookupForm>();
  const [loading, setLoading] = useState(false);
  const [ordinalList, setOrdinalList] = useState<OrdinalInscription[]>();

  const getOrdinalId = async (txid: string) => {
    const response = await fetch(
      `https://api.xverse.app/v1/ordinals/output/${txid}/0`,
    );
    const ordinalIdObj = await response.json();
    return ordinalIdObj.id;
  };

  const getOrdinalData = async (ordinalId: string) => {
    const response = await fetch(
      `https://api.xverse.app/v1/ordinals/${ordinalId}`,
    );
    return await response.json();
  };

  const onSubmit = async ({walletAddress}: LookupForm) => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://blockstream.info/api/address/${walletAddress}/utxo`,
      );
      const unspentOutputs = await response.json();

      const filteredOrdinalIdList = (
        await Promise.allSettled(
          unspentOutputs.map((item: UnspentOutput) => {
            return getOrdinalId(item.txid);
          }),
        )
      ).filter((ordinal) => ordinal.status === 'fulfilled');

      const filteredOrdinalList: OrdinalInscription[] = await Promise.all(
        filteredOrdinalIdList.map(
          (ordinal) =>
            ordinal.status === 'fulfilled' && getOrdinalData(ordinal.value),
        ),
      );
      setOrdinalList(filteredOrdinalList);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Ordinal Inscription Lookup</title>
        <meta name="description" content="Ordinal Inscription Lookup" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <div className="container">
          <StyledPageTitle>Ordinal Inscription Lookup</StyledPageTitle>

          <form onSubmit={handleSubmit(onSubmit)}>
            <StyledFormLabel>Owner Bitcoin Address:</StyledFormLabel>
            <StyledInput
              {...register('walletAddress', {
                required: true,
                pattern:
                  /^(1|3)[1-9A-HJ-NP-Za-km-z]{25,34}|bc1[ac-hj-np-z02-9]{6,87}$/,
              })}
              placeholder="Enter a Bitcoin wallet address"
            />
            {errors.walletAddress && (
              <p>Please enter a valid Bitcoin wallet address.</p>
            )}
            <StyledButton type="submit">Look up</StyledButton>
          </form>

          {loading && <div>Loading...</div>}

          {!!ordinalList?.length && (
            <StyledList>
              <StyledSubTitle>Results</StyledSubTitle>

              {ordinalList?.map((ordinal: OrdinalInscription) => (
                <StyledLink
                  key={ordinal.inscriptionNumber}
                  href={ordinal.metadata.id}
                >
                  <StyledItemTitle>
                    {ordinal.metadata['content type'].includes('image') && (
                      <StyledImage
                        src={`https://ordin.s3.amazonaws.com/inscriptions/${ordinal.metadata.id}`}
                        width={40}
                        height={40}
                        alt={`${ordinal.inscriptionNumber} Image`}
                      />
                    )}
                    <div>{ordinal.inscriptionNumber}</div>
                  </StyledItemTitle>
                  <ForwardIcon />
                </StyledLink>
              ))}
            </StyledList>
          )}
        </div>
      </main>
    </>
  );
};

export default InscriptionListPage;
