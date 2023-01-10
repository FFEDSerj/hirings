import { type ReactNode } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
  children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({ children }) =>
  createPortal(<div className="modal">{children}</div>, document.body);

export default Modal;
