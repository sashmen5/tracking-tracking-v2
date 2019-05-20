import React, { FC } from 'react';
// @ts-ignore
import { useDispatch, useSelector } from 'react-redux';

import { AppState } from 'store/reducers';
import { closeError } from 'store/actions';

import { ModalContent } from 'components/CommontStyledComponents';
import Modal from 'components/Modal';

const Error: FC = () => {
  const { message, isOccurred } = useSelector((state: AppState) => state.error);
  const dispatch = useDispatch();

  if (!isOccurred) return <></>;

  return (
    <Modal closeModal={() => dispatch(closeError())}>
      <ModalContent>
        Some error occurred.
        <br />
        {message && message}
      </ModalContent>
    </Modal>
  );
};

export default Error;
