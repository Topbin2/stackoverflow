import styled from 'styled-components';

export const Wrapper = styled.span`
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
  color: var(--fc-dark);
  margin-bottom: 6px;

  @media (max-width: 640px) {
    font-size: 13px;
    margin-right: 6px;
  }
`;

export const Wrapper2 = styled.span`
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
  color: var(--black-500);
  margin-bottom: 6px;

  @media (max-width: 640px) {
    font-size: 13px;
    margin-right: 6px;
  }
`;

export const Wrapper3 = styled.span`
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
  color: var(--black-500);
  margin-bottom: 6px;

  @media (max-width: 640px) {
    font-size: 13px;
    margin-right: 6px;
`;

export const Container = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 108px;
  flex-shrink: 0;
  margin-right: 16px;

  @media (max-width: 640px) {
    margin: 0px 0px 4px 0px;
    flex-direction: row;
    width: auto;
  }
`;
