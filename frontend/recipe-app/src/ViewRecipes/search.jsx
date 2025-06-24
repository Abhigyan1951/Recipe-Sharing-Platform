import React, { createContext, useContext, useState } from 'react';
const toSearch=createContext();
export const Search=({children})=>{
    const [searchTerm, setSearchTerm]=useState('');
    return(
        <toSearch.Provider value={{ searchTerm, setSearchTerm}}>
            {children}
        </toSearch.Provider>
    );
};

export const useSearch=()=>useContext(toSearch);