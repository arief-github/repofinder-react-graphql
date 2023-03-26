import React from 'react';
import { Spinner } from 'reactstrap';

const Loading = () => (
  <div className="d-flex justify-content-center align-items-center">
    <Spinner color="primary" />
  </div>
);

export default Loading;
