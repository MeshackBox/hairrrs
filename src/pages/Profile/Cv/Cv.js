import React from 'react'
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Cv() {
  const history = useHistory();
  useEffect(() => {
    history.push('/cv/me');
  }, [history])
  return (<></>)
}
export default Cv