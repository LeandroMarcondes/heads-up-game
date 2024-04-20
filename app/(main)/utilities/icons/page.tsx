'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { InputText } from 'primereact/inputtext';


const IconsDemo = () => {
    

    return (
        <div className="card">
            <h2>Icons</h2>
            <p>
                PrimeReact components internally use{' '}
                <Link href="https://github.com/primefaces/primeicons" className="font-medium hover:underline text-primary" target={'_blank'}>
                    PrimeIcons
                </Link>{' '}
                library, the official icons suite from{' '}
                <Link href="https://www.primetek.com.tr" className="font-medium hover:underline text-primary" target={'_blank'}>
                    PrimeTek
                </Link>
                .
            </p>           
        </div>
    );
};

export default IconsDemo;
