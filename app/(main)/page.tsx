/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect, useState, useContext } from 'react';
import { useInterval } from 'primereact/hooks';
import { Button } from 'primereact/button';
import CategoriesService from '@/services/CategoriesService';
import { AppTopbarRef, LayoutConfig } from '@/types';
import { LayoutContext } from '@/layout/context/layoutcontext';

const Dashboard = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const [logoTheme, setLogoTheme] = useState('logo_dark');

    useEffect(() => {
        if (layoutConfig?.colorScheme === 'light') {
            setLogoTheme('logo_white');
        } else {
            setLogoTheme('logo_dark');
        }
    }, [layoutConfig]);

    return (
        <div >
            <div className="hero-banner border-round-xl">
                <div className="flex flex-column justify-content-center">
                    <div className="flex flex-column justify-content-center align-items-center">
                        <h1 className='text-white font-semibold text-center'>Welcome to Words Up Game</h1>
                    </div>
                </div>

            </div>

            <div className="hero-logo max-w-max" >
                <img className='w-15rem'
                    src={`/layout/images/head_up_${logoTheme === 'light' ? 'logo_dark' : 'logo_white'}.png`} alt="logo" />
            </div>

            <div className="h-10rem">  </div>
            <div className="flex justify-content-center flex-wrap">
                <div className="flex align-items-center justify-content-center">
                    <div className="" style={{ maxWidth: '60rem' }}>
                        <div className='text-left mb-5'><h2>How to Play</h2></div>
                        <div className='grid text-lg'>
                            <div className='col-12 text-left '>
                                <p className='mb-0'>Words Up Game is a fun and engaging!</p>
                                <p className=''>Select some categories and click on Play</p>
                                <p className='text-2xl'>There are many ways to having fun  </p>
                            </div>
                            <div className='col-12 md:col-6 '>
                                <div className='flex flex-wrap align-content-center h-full'>
                                    <div className='flex '>
                                        <div>
                                            <p className='text-purple-400 font-semibold'><i className='pi pi-lightbulb mr-2'></i> You Guess your word </p>
                                            <p className=''> You can hold your phone up to your forehead and try to guess the word on the screen from your friends' clues. </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 md:col-6 text-center'>
                                <img className='w-100 border-round-xl max-h-20rem mt-5'
                                    src='/layout/images/you_guess.jpg' alt='You Guess your word' />
                            </div>
                            <div className='col-12 md:col-6 text-center'>
                            <img className='w-100 border-round-xl max-h-20rem mt-5'
                                    src='/layout/images/others_guess.jpg' alt='You Guess your word' />
                            </div>
                            <div className='col-12 md:col-6 mt-5'>
                                <div className='flex flex-wrap align-content-center h-full'>
                                    <div className='flex '>
                                        <div>
                                            <p className='text-purple-400 font-semibold'><i className='pi pi-comments mr-2'></i> Everyone Guess your word </p>
                                            <p className=''> You read your words and try to act them out without speaking while everyone else tries to guess the word. </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 my-5'></div>
                            <div className='col-12 md:col-6'>
                                <p className=''>
                                    You can play with friends, family, or even strangers (scary). <br />
                                    Create your own <a href='/pages/category/custom'  >
                                        <i className="pi pi-star-fill"></i> category
                                    </a> , with your chosen words. <br />

                                </p>
                                <p className=''>
                                    Create your own rules and have FUN!
                                </p>
                            </div>
                            <div className='col-12 md:col-6 text-center'>
                                <div className=' mb-5'><h2>Ready to Play?</h2></div>
                                <Button label="Start Game" icon="pi pi-play" onClick={() => window.location.href = '/pages/play'} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="play-game my-5 h-5rem" ></div>

            {/* Donations Section */}
            <div className="donations my-5 py-5 text-center" >
                <div className='flex flex-column justify-content-center align-items-center'>
                    <div className='grid max-w-30rem'>
                        <div className='col'>
                            <h2>Buy Me a Coffe</h2>
                            <p>If you enjoy the game, please consider making a donation <br />
                                I really need it.</p>
                        </div>
                        <div className='col h-full'>
                            <div className='mt-5'>
                                <Button label="Donate" icon="pi pi-heart-fill" onClick={() => window.location.href = 'https://donate.stripe.com/7sIg0ka3E4MY6TCeUU'} />
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>

    );


};

export default Dashboard;
