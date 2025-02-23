/* eslint-disable @next/next/no-img-element */

import React from 'react';
import AppMenuitem from './AppMenuitem';
import { MenuProvider } from './context/menucontext';
import { AppMenuItem } from '@/types';

const AppMenu = () => {

    const model: AppMenuItem[] = [
        {
            label: 'Home',
            items: [
                { label: 'About', icon: '', to: '/' },
                { label: 'Play The Game', icon: 'pi pi-fw pi-play', to: '/pages/play' }
            ]

        },
        {
            label: 'Categories',
            items: [
                { label: 'Select Categories', icon: 'pi pi-fw pi-th-large', to: '/pages/category' },
                { label: 'Custom Category', icon: 'pi pi-fw pi-star-fill', to: '/pages/category/custom' },

            ]
        },

    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}

            </ul>
            <div style={{ position: 'absolute', bottom: '10px' }}>
                <small className='text-500 mx-3'>Made With <a target='_blank' href='https://primereact.org/'>PrimeReact</a></small>
            </div>
        </MenuProvider>
    );
};

export default AppMenu;
