import React, { useState, useEffect } from 'react';
import CategoriesService from '../../services/CategoriesService';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';

const GridSetCategories = ({ callback }) => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [allSelect, setAllSelect] = useState(false);
    const [isCustomSelected, setIsCustomSelected] = useState(false);
    const allCategories = CategoriesService.getAllCategories();

    useEffect(() => {
        const storedCategories = JSON.parse(localStorage.getItem('selected-categories')) || [];
        setSelectedCategories(storedCategories);
        setIsCustomSelected(localStorage.getItem('custom-category-selected') === 'true' ? true : false);
    }, []);

    const isCategorySelected = (categoryCode) => {
        return selectedCategories.includes(categoryCode);
    };

    const toggleCategory = (categoryCode) => {
        let updatedCategories;
        if (selectedCategories.includes(categoryCode)) {
            updatedCategories = selectedCategories.filter(code => code !== categoryCode);
        } else {
            updatedCategories = [...selectedCategories, categoryCode];
        }
        setSelectedCategories(updatedCategories);

        if (typeof window !== 'undefined') {
            localStorage.setItem('selected-categories', JSON.stringify(updatedCategories));
        }

        callback(updatedCategories?.length);
    };

    const toggleAllSelect = () => {
        let updatedCategories;
        if (allSelect) {
            updatedCategories = [];
        } else {
            updatedCategories = allCategories.map(category => category.code);
        }
        setSelectedCategories(updatedCategories);
        setAllSelect(!allSelect);

        if (typeof window !== 'undefined') {
            localStorage.setItem('selected-categories', JSON.stringify(updatedCategories));

            if (localStorage.getItem('custom-category-title')) {
                localStorage.setItem('custom-category-selected', JSON.stringify(!allSelect));
                setIsCustomSelected(!allSelect);
            }
        }

        callback(updatedCategories?.length);
    };

    const displayCategory = (category) => {

        const isSelected = isCategorySelected(category.code);

        return (
            <div className="col-12 sm:col-6 md:col-4 lg:col-4 xl:col-3 " key={category.code}>
                <div className={classNames({ "card mb-0 lg:max-w-18rem xl:max-w-18rem cursor-pointer hover:shadow-8 hover:bg-primary-reverse": true, "border-purple-600": isSelected })}
                    onClick={() => toggleCategory(category.code)}>
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">{category.theme}</span>
                            <div className="text-900 font-medium text-xl">{category.title}</div>
                        </div>
                        {isSelected &&
                            < div className="flex align-items-center justify-content-center bg-purple-500 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                <i className="pi pi-check text-white text-xl" />
                            </div>
                        }
                    </div>
                    <span className="text-purple-500 font-medium">{category.words?.length} words </span>
                    <span className="text-500">on this category</span>
                </div>
            </div>

        );

    };

    return (
        <>
            <div className="grid mb-5">
                <div className="col mb-2" >
                    {selectedCategories?.length} {selectedCategories?.length === 1 ? 'category' : 'categories'} selected
                    <div
                        onClick={() => { window.location.href = '/pages/category/custom'; }}
                        className={classNames({ 'mt-2 cursor-pointer': true, 'text-yellow-600': isCustomSelected })}>
                        <i className={`pi pi-star${isCustomSelected ? '-fill' : ''}`}></i> Custom
                    </div>
                </div>

                <div className="col mb-2 mx-3 text-right" >
                    <Button
                        label={allSelect ? "Deselect all" : "Select all"}
                        text className='p-0'
                        icon={`pi pi-${allSelect ? "minus" : "plus"}`}
                        onClick={() => { toggleAllSelect() }} />
                </div>
                <div className="col-12" ></div>
                {allCategories.map(category => (
                    displayCategory(category)
                ))}
            </div>
        </>
    );
}

GridSetCategories.defaultProps = {
    callback: (numberOfSelected) => { }
};

export default GridSetCategories;
