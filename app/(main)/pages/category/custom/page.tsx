/* eslint-disable @next/next/no-img-element */
'use client';
import { Button } from 'primereact/button';
import { Chips } from 'primereact/chips';
import { InputSwitch } from 'primereact/inputswitch';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Nullable } from 'primereact/ts-helpers';
import React, {  useEffect, useRef, useState } from 'react';

const FromEditCustomCategory = () => {

    const [formData, setFormData] = useState({ theme: '', words: [] as Nullable<string[]>});
    const [isCustomSelected, setIsCustomSelected] = useState(false);
    const saveToast = useRef(null);

    useEffect(() => {
        setIsCustomSelected(localStorage.getItem('custom-category-selected') === 'true' ? true : false);
        setFormData({
            theme: localStorage.getItem('custom-category-title') ?? '',
            words: JSON.parse(localStorage.getItem('custom-category-words') ?? '[]')
        });
    }, []);

    useEffect(() => {
        localStorage.setItem('custom-category-selected', isCustomSelected.toString());
        let currentSelectedCategories = JSON.parse(localStorage.getItem('selected-categories') ?? '[]');

        if (!isCustomSelected) {
            // remove custom category from selected categories
            currentSelectedCategories = currentSelectedCategories.filter((category: any) => category !== 999);
        } else {
            // add custom category to selected categories if it's not already present
            if (!currentSelectedCategories.includes(999)) {
                currentSelectedCategories.push(999);
            }
        }

        localStorage.setItem('selected-categories', JSON.stringify(currentSelectedCategories));
    }, [isCustomSelected]);

    const onSelectCustomCategory = (selected: boolean) => {
        setIsCustomSelected(selected);
    };

    const onSaveCustomCategory = (e: any) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('custom-category-title', formData?.theme);
            localStorage.setItem('custom-category-words', JSON.stringify(formData?.words));
        }
        if (saveToast.current) {
            (saveToast.current as any)?.show({ severity: 'success', summary: 'Saved', detail: 'The Custom category has been saved into your browser.' });
        }
    };

    const onDelete = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('custom-category-title');
            localStorage.removeItem('custom-category-words');
            localStorage.setItem('custom-category-selected', 'false');
        }
        if (saveToast.current) {
            (saveToast.current as any)?.show({ severity: 'success', summary: 'Deleted', detail: 'The Custom category has been deleted from your browser.' });
        }
        setIsCustomSelected(false);
        setFormData({ theme: '', words: [] });
    };
    return (
        <>
            <Toast ref={saveToast} />
            <div className="grid py-3" style={{ maxWidth: '50rem' }}>
                <div className="col-12 lg:col-12 xl:col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="grid">
                                <div className="col-12 lg:col-12 xl:col-12">
                                    <h1 className='text-yellow-600'>
                                        <i className='pi pi-star-fill text-4xl mr-3'></i>
                                        Custom Category
                                    </h1>
                                </div>
                                <div className="col-12 lg:col-12 xl:col-12">
                                    <div className="flex flex-column gap-2">
                                        <label htmlFor="username">Select</label>
                                        <InputSwitch checked={isCustomSelected} onChange={(e) => onSelectCustomCategory(e.value)} />
                                    </div>
                                </div>

                                <div className="col-12 lg:col-12 xl:col-12">
                                    <div className="flex flex-column gap-2">
                                        <label htmlFor="Theme">Theme</label>
                                        <InputText id="Theme"
                                            value={formData?.theme}
                                            onInput={(e) => { setFormData((prevState) => ({ ...prevState, theme: (e.target as HTMLInputElement)?.value })) }} />
                                    </div>
                                </div>
                                <div className="col-12 lg:col-12 xl:col-12 mb-5">
                                    <div className="flex flex-column gap-2 p-fluid">
                                        <label htmlFor="categoryWords">Words</label>
                                        <Chips
                                            className='w-full'
                                            value={formData?.words || []} // Fix: Ensure value is of type string[]
                                            onChange={(e) => setFormData((prevState) => ({ ...prevState, words: e?.value as string[] }))} />
                                    </div>
                                </div>
                                <div className="col-12 lg:col-6 xl:col-6">
                                    <Button
                                        onClick={(e) => { onSaveCustomCategory(e) }}
                                        label='Save' icon='pi pi-save'
                                        className='p-button-primary p-button-text-icon-left' />

                                </div>
                                <div className="col-12 lg:col-6 xl:col-6 text-right">
                                    <Button
                                        onClick={(e) => { onDelete()}}
                                        label='Delete' icon='pi pi-trash'
                                        severity='danger'
                                        text
                                        className='p-button-primary p-button-text-icon-left' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

};
export default FromEditCustomCategory;