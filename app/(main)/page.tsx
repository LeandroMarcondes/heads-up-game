/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useInterval } from 'primereact/hooks';
import GridSetCategories from '@/components/categories/GridSetCategories';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import CategoriesService from '@/services/CategoriesService';

const Dashboard = () => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [startGameButtonVisible, setStartGameButtonVisible] = useState(false);
    const [currentWord, setCurrentWord] = useState('');
    const [timeToNextWord, setTimeToNextWord] = useState(5);
    const [currentCategory, setCurrentCategory] = useState({
        code: 0,
        title: "",
        theme: "",
        words: [""]
    });
    const avalableWords = CategoriesService.getSelectedCategories();

    useInterval(
        () => {
            setTimeToNextWord((prevTime) => (prevTime - 1)); //fn
        },
        1000,   //delay (ms)
        timeToNextWord > 0  //condition (when)
    );

    useEffect(() => {
        const loadedLocalStorage = localStorage.getItem('selected-categories');
        if (!loadedLocalStorage) return;

        const storedCategories = JSON.parse(loadedLocalStorage ?? '') || [];
        setSelectedCategories(storedCategories);

    }, []);

    useEffect(() => {
        if (timeToNextWord <= 1) {
            getWord();
        }
    }, [timeToNextWord]);


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
        const _currentWord = currentWord;
        let randomCategoryIndex = Math.floor(Math.random() * avalableWords.length);
        let randomWordIndex = Math.floor(Math.random() * avalableWords[randomCategoryIndex].words.length);
        let _nextCurrentWord = avalableWords[randomCategoryIndex].words[randomWordIndex];

        let _tries = 0;
        while (_nextCurrentWord === _currentWord) {
            randomCategoryIndex = Math.floor(Math.random() * avalableWords.length);
            randomWordIndex = Math.floor(Math.random() * avalableWords[randomCategoryIndex].words.length);
            _nextCurrentWord = avalableWords[randomCategoryIndex].words[randomWordIndex];
        
            _tries++;
            if (_tries > 10) {  // prevent infinite loop }
                break;
            }
        }

        setCurrentWord(_nextCurrentWord);
        setCurrentCategory(avalableWords[randomCategoryIndex]);
        return _nextCurrentWord;
    };

    const runTimer = () => {
        setTimeToNextWord(5);
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

    if (timeToNextWord > 0) {
        return (
            <div className=''>
                <div className="flex align-items-center justify-content-center">
                    <div className="flex align-items-center justify-content-center">
                        New Word in:
                    </div>
                </div>
                <div className="flex align-items-center justify-content-center">
                    <div className="flex align-items-center justify-content-center">
                        <h1 className='text-6xl'>{timeToNextWord}</h1>
                    </div>
                </div>
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
                    <h1 className='text-6xl'>{currentWord}</h1>
                    {!currentWord && <h1 className='text-3xl'>Que isso Magida!!</h1>}
                </div>
            </div>
            <div className="flex align-items-end justify-content-between h-6rem m-5">
                <div className="flex align-items-center justify-content-center">
                    <small className='text-700'>Theme: {currentCategory?.title}</small>
                </div>
                <div className="flex align-items-center justify-content-center">
                    <Button
                        onClick={() => runTimer()}
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
