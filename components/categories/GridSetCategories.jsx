import React, { useState, useEffect } from 'react';
import CategoriesService from '../../services/CategoriesService';

const GridSetCategories = ({callback}) => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const allCategories = CategoriesService.getAllCategories();

    useEffect(() => {
        const storedCategories = JSON.parse(localStorage.getItem('selected-categories')) || [];
        setSelectedCategories(storedCategories);
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
        localStorage.setItem('selected-categories', JSON.stringify(updatedCategories));

        callback(updatedCategories?.length);
    };

    const displayCategory = (category) => {

        const isSelected = isCategorySelected(category.code);

        return (
            <div className="col-12 sm:col-6 md:col-4 lg:col-4 xl:col-3 " key={category.code}>
                <div className="card mb-0 max-w-18rem cursor-pointer hover:shadow-8 hover:bg-primary-reverse" onClick={() => toggleCategory(category.code)}>
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">{category.theme}</span>
                            <div className="text-900 font-medium text-xl">{category.title}</div>
                        </div>
                        {isSelected &&
                            < div className="flex align-items-center justify-content-center bg-green-500 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                <i className="pi pi-check text-white text-xl" />
                            </div>
                        }
                    </div>
                    <span className="text-green-500 font-medium">{category.words?.length} words </span>
                    <span className="text-500">on this category</span>
                </div>
            </div>

        );

    };

    return (
        <>
            <div className="grid mb-5">
                <div className="col-12 mb-2" >
                {selectedCategories?.length} {selectedCategories?.length === 1 ? 'category' : 'categories'} selected
                </div>
                {allCategories.map(category => (
                    displayCategory(category)
                ))}
            </div>
        </>
    );
}

GridSetCategories.defaultProps = {
    callback: (numberOfSelected) => {}
};

export default GridSetCategories;
