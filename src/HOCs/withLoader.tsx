import React, {FunctionComponent} from 'react';
import styled from 'styled-components';
import Spinner from 'react-spinner-material';
import {JSX} from '@babel/types';

const Container = styled.div`
  position: relative;
`;

const Loader = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => props.theme.colors.secondary};
`;

const SpinnerWrapper = styled.div`
  position: absolute;
  top: calc(50% - 25px);
  left: calc(50% - 25px);
  opacity: 1;
`;

interface WithLoaderProps {
    isLoading: boolean;
    children: JSX.Element[] | JSX.Element;
}

const withLoader = (WrappedComponent: FunctionComponent) => ({isLoading, ...props }: WithLoaderProps) => {
    return <Container>
        {
            isLoading &&
                <>
                    <Loader/>
                    <SpinnerWrapper>
                        <Spinner
                            size={50}
                            spinnerColor={'rgb(131, 49, 244)'}
                            spinnerWidth={4}
                            visible={true}
                        />
                    </SpinnerWrapper>
                </>

        }
        <WrappedComponent {...props}/>
    </Container>
};

export default withLoader;