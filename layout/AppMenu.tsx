/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import Link from 'next/link';
import { AppMenuItem } from '@/types';

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);

    const model: AppMenuItem[] = [
        {
            label: 'Home',
            items: [{ label: 'Play The Game', icon: 'pi pi-fw pi-play', to: '/' }]
        },
        {
            label: 'Categories',
            items: [
                { label: 'Select Categories', icon: 'pi pi-fw pi-id-card', to: '/pages/category' },
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
        </MenuProvider>
    );
};

export default AppMenu;
