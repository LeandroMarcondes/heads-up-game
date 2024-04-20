/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useContext, useEffect, useRef, useState } from 'react';
import GridSetCategories from '@/components/categories/GridSetCategories';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import CategoriesService from '@/services/CategoriesService';

const Dashboard = () => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [startGameButtonVisible, setStartGameButtonVisible] = useState(false);
    const [currentWord, setCurrentWord] = useState('');
    const [currentCategory, setCurrentCategory] = useState({
        code: 0,
        title: "",
        theme: "",
        words: [""]
    });
    const avalableWords = CategoriesService.getSelectedCategories();

    useEffect(() => {
        const loadedLocalStorage = localStorage.getItem('selected-categories');
        if(!loadedLocalStorage) return; 

        const storedCategories = JSON.parse(loadedLocalStorage ?? '') || [];
        setSelectedCategories(storedCategories);
        
    }, []);

    useEffect(() => {
        getWord();
    }, []);


    const onSelectCategories = (selected: number) => {
        if (selected > 0) {
            setStartGameButtonVisible(true);
        } else {
            setStartGameButtonVisible(false);
        }
    };

    const getWord = () => {
        if (avalableWords?.length <= 0) {
            return;
        }

        let randomCategoryIndex = Math.floor(Math.random() * avalableWords.length);
        let randomWordIndex = Math.floor(Math.random() * avalableWords[randomCategoryIndex].words.length);
        let _currentWord = avalableWords[randomCategoryIndex].words[randomWordIndex];
        
        while (_currentWord === currentWord) {
            randomCategoryIndex = Math.floor(Math.random() * avalableWords.length);
            randomWordIndex = Math.floor(Math.random() * avalableWords[randomCategoryIndex].words.length);
            _currentWord = avalableWords[randomCategoryIndex].words[randomWordIndex];
        }
        
        setCurrentWord(_currentWord);
        setCurrentCategory(avalableWords[randomCategoryIndex]);
        return _currentWord;
    };

    if (selectedCategories?.length <= 0) {

        return (
            <div className='grid'>
                <div className='col-12 lg:col-12 xl:12'>
                    <h1>Please select some Categories :)</h1>
                </div>
                <div className='col-12 lg:col-12 xl:12'>
                    <GridSetCategories callback={(selected: number) => { onSelectCategories(selected) }} />
                </div>
                <Dialog
                    showHeader={false}
                    visible={startGameButtonVisible}
                    modal={false}
                    position={'bottom-right'}
                    className='p-0'
                    pt={{ content: { className: 'p-0' } }}
                    onHide={() => setStartGameButtonVisible(false)}
                    draggable={false} resizable={false}>
                    <Button size='large' icon='pi pi-play' className='text-2xl' label='Start' onClick={() => { window.location.href = '/' }} />
                </Dialog>
            </div>
        );
    }

    return (
        <div className=''>
            <div className="flex align-items-center justify-content-center">
                <div className="flex align-items-center justify-content-center">
                    Your Word is:
                </div>
            </div>
            <div className="flex align-items-center justify-content-center">
                <div className="flex align-items-center justify-content-center">
                    <h1 className='text-7xl'>{currentWord}</h1>
                </div>
            </div>
            <div className="flex align-items-end justify-content-between h-6rem m-5">
                <div className="flex align-items-center justify-content-center">
                    <small className='text-500'>{currentCategory?.title}</small>
                </div>
                <div className="flex align-items-center justify-content-center">
                    <Button
                        onClick={() => getWord()}
                        label="Change"
                        icon='pi pi-angle-double-right'
                        iconPos="right"
                        className="p-button-success" />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
