import PreviewClass from "./Preview";

import React, { useState, useEffect } from 'react';
import Header from '../../Components/Common/Header';

const ClassView = () => {
  return (
    <div>
        <Header/>
        <PreviewClass />
    </div>
  );
};

export default ClassView;
