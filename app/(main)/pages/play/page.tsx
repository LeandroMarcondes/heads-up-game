/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useInterval } from 'primereact/hooks';
import GridSetCategories from '@/components/categories/GridSetCategories';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import CategoriesService from '@/services/CategoriesService';
import { Skeleton } from 'primereact/skeleton';

const PlayGame = () => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [IsCategoriesReady, setIsCategoriesReady] = useState(false);
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
        if (!loadedLocalStorage) {
            setIsCategoriesReady(true);
            return;
        }

        const storedCategories = JSON.parse(loadedLocalStorage ?? '') || [];
        setSelectedCategories(storedCategories);
        setIsCategoriesReady(true);

    }, []);

    useEffect(() => {
        if (timeToNextWord === 1) {
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

    if (!IsCategoriesReady) {

        return (
            <Skeleton className='w-full' height="20rem" />
        );
    }

    if (selectedCategories?.length <= 0) {

        return (
            <div className='grid'>
                <div className='col-12 lg:col-12 xl:12 text-center'>
                    <h1>Select Categories Before Start =^.^=</h1>
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
                    <Button size='large' icon='pi pi-play' className='text-2xl' label='Start' onClick={() => { window.location.href = '/pages/play' }} />
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
        <div className='w-full'>
            <div className='card' style={{ maxWidth: '50rem', margin: '0 auto' }}>
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
                <div className="flex align-items-end justify-content-between h-4rem my-3 pb-3">
                    <div className="flex align-items-center justify-content-center mr-2">
                        <small className='text-700'>Theme: {currentCategory?.title}</small>
                    </div>
                    <div className="flex align-items-center justify-content-center">
                        <Button
                            onClick={() => runTimer()}
                            label="Change"
                            icon='pi pi-angle-double-right'
                            iconPos="right"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayGame;
