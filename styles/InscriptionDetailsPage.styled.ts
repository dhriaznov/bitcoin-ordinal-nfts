import styled from '@emotion/styled';
import Image from 'next/image';

export const StyledPageTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 30px;
  margin-bottom: 16px;
  padding-top: 30px;
  font-weight: 500;
`;

export const StyledLabel = styled.label`
  display: block;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
  margin-top: 24px;
  margin-bottom: 10px;
`;

export const StyledHr = styled.hr`
  border: none;
  border-top: 2px solid #24252c;
`;

export const StyledMainAttribute = styled.div`
  word-break: break-word;
  font-weight: 500;
`;

export const StyledAttribute = styled.div`
  background-color: #24252c;
  padding: 12px;
  border-radius: 8px;
  word-break: break-word;
  font-weight: 500;
`;

export const StyledBackButton = styled.div`
  padding: 6px;
  cursor: pointer;
`;

export const StyledImage = styled(Image)`
  width: 100%;
  max-width: 100%;
  height: auto;

  @media (min-width: 768px) {
    width: 375px;
    margin-left: 16px;
  }
`;

export const StyledInscriptionTitle = styled.h3`
  margin: 16px 0;
  font-weight: 600;
`;

export const StyledAttributesTitle = styled.h3`
  margin-top: 48px;
  margin-bottom: 30px;
  font-weight: 600;
`;
