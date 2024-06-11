import React, { useState } from 'react';
import CountryList from './components/CountryList';
import CountryDetail from './components/CountryDetail';
import './App.css';

const App = () => {
    const [selectedCountry, setSelectedCountry] = useState(null);

    const handleSelectCountry = (country) => {
        setSelectedCountry(country);
    };

    return (
        <div className="App">
            
            <div className="content">
                <CountryList onSelectCountry={handleSelectCountry} />
                <CountryDetail country={selectedCountry} />
            </div>
        </div>
    );
};

export default App;
