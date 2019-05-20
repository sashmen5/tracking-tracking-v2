import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;

  border-radius: ${prop => prop.theme.borderRadius};
  background-color: ${props => props.theme.colors.backgroundContainer};
`;

export const Title = styled.div`
  font-size: 30px;
  color: ${props => props.theme.colors.main};
`;

export const Button = styled.button`
  height: 34px;
  text-transform: uppercase;
  color: white;
  cursor: pointer;
  background-color: ${props => props.theme.colors.main};
  border-radius: ${props => props.theme.borderRadius};
  font-weight: ${props => props.theme.fontWeight};
`;

export const Input = styled.input`
  height: 30px;
  margin-top: 10px;
  text-align: center;
  border-radius: ${props => props.theme.borderRadius};
  border: ${props => props.theme.border};
  color: ${props => props.theme.colors.secondary};
  font-weight: ${props => props.theme.fontWeight};
  font-size: ${props => props.theme.fontSize};
`;

export const SpacedBottomInput = styled(Input)`
  margin-top: 0;
  margin-bottom: 15px;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 300px;
  border-radius: ${prop => prop.theme.borderRadius};
  background-color: ${props => props.theme.colors.backgroundContainer};
`;
