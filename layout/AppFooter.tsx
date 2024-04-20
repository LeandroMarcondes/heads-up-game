/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';

const AppFooter = () => {
   
    return (
        <div className="layout-footer">            
            A game made by
            <span className="font-medium ml-2">Leandro Abreu</span>
            <small className='text-500 mx-2'>Powered by PrimeReact</small>
        </div>
    );
};

export default AppFooter;
