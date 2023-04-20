import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';

export const StyledPageTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 30px;
  margin-bottom: 16px;
  padding-top: 30px;
  font-weight: 500;
`;

export const StyledSubTitle = styled.div`
  margin: 10px 0;
`;

export const StyledFormLabel = styled.label`
  font-weight: 500;
`;

export const StyledInput = styled.input`
  width: 100%;
  height: 32px;
  background-color: #24252c;
  color: #fff;
  margin: 10px 0;
  font-size: 16px;
  padding: 0 8px;
`;

export const StyledButton = styled.button`
  width: 100%;
  background-color: #465ae9;
  color: #fff;
  padding: 14px 24px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #3a4fc2;
  }

  @media (min-width: 768px) {
    max-width: 180px;
  }
`;

export const StyledList = styled.div`
  max-width: 400px;
`;

export const StyledItemTitle = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  font-weight: 500;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #b4b4b4;
  }
`;

export const StyledImage = styled(Image)`
  max-width: 100%;
  height: auto;
  margin-right: 8px;
`;
