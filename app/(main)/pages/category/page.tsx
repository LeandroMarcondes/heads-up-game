/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useContext, useEffect, useRef, useState } from 'react';
import GridSetCategories from '../../../../components/categories/GridSetCategories';
import { Button } from 'primereact/button';

const selectCategories = () => {
    return (
        <>
            <div className="grid py-3">
                <div className="col-12 lg:col-12 xl:col-12">
                    <h1>Categories</h1>
                </div>
            </div>

            <GridSetCategories />            
        </>
    );

};

export default selectCategories;