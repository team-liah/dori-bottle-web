import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface IPortalProps {
  children: React.ReactNode;
}

//#region Styled Component

//#endregion

function Portal(props: IPortalProps) {
  const { children } = props;
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setElement(document.getElementById('portal'));
  }, []);

  if (!element) {
    return <></>;
  }

  return ReactDOM.createPortal(children, element);
}

export default Portal;
