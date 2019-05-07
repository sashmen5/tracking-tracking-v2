import React from 'react';
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    padding: 1rem;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 9999;
    opacity: 1;
    animation: 'show .5s ease';
    overflow-x: hidden;
    overflow-y: auto;
`;

interface ModalProps {
    children: any
    closeModal: any
}

const Modal: React.FC<ModalProps> = ({children, closeModal}: ModalProps) => {
    return (
        <Container onClick={() => closeModal()}>
            <div onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </Container>
    )
};


export default Modal;