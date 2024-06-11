import React, { useState, useEffect } from 'react';
import './CountryList.css';
import useFetchCountries from '../hooks/useFetchCountries';
import Swal from 'sweetalert2';

const CountryList = ({ onSelectCountry }) => {
    const { countries, loading, error } = useFetchCountries();

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedContinent, setSelectedContinent] = useState('');
    const [filteredCountries, setFilteredCountries] = useState([]);

    useEffect(() => {
        filterCountries();
    }, [searchTerm, selectedContinent, countries]);

    const filterCountries = () => {
        let filtered = countries.filter(country =>
            country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (selectedContinent) {
            filtered = filtered.filter(country => country.region === selectedContinent);
        }

        setFilteredCountries(filtered);
    };

    const getContinentClass = (continent) => {
        switch (continent) {
            case 'Asia':
                return 'asia';
            case 'Africa':
                return 'africa';
            case 'Americas':
                return 'america';
            case 'Antarctic':
                return 'antartida';
            case 'Europe':
                return 'europa';
            case 'Oceania':
                return 'oceania';
            default:
                return '';
        }
    };

    const handleSelectCountry = (country) => {
        onSelectCountry(country);
        Swal.fire({
            imageUrl: country.flags.svg,
            imageWidth: 100,
            imageHeight: 60,
            imageAlt: `Flag of ${country.name.common}`,
            title: country.name.common,
            html: `
                <p><strong>Capital:</strong> ${country.capital}</p>
                <p><strong>Región:</strong> ${country.region}</p>
                <p><strong>Subregión:</strong> ${country.subregion}</p>
                <p><strong>Población:</strong> ${country.population.toLocaleString()}</p>
                <p><strong>Área (km²):</strong> ${country.area.toLocaleString()}</p>
                <p><strong>Idiomas:</strong> ${Object.values(country.languages || {}).join(', ')}</p>
                <p><strong>Moneda:</strong> ${Object.values(country.currencies || {}).map(currency => currency.name).join(', ')}</p>
                <p><strong>Zonas Horarias:</strong> ${country.timezones.join(', ')}</p>
            `,
            showCloseButton: true,
        });
    };

    const handleSortChange = (e) => {
        setSelectedContinent(e.target.value);
    };

    const handleSearchKeyPress = (e) => {
        if (e.key === 'Enter' && filteredCountries.length === 0) {
            Swal.fire({
                title: 'No encontrado',
                text: `No se encontró ningún país con el término "${searchTerm}"`,
                icon: 'warning',
                confirmButtonText: 'Ok'
            });
        }
    };

    return (
        <div>
            <header className="header">
                <h1 className="title">
                    <img src="src/iconos/planeta.svg" alt="Planeta" width="30" height="30" style={{ marginRight: '10px' }} />
                    RESTCOUNTRIES API
                </h1>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Buscar país..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={handleSearchKeyPress}
                    />
                </div>
                <div className="sort-container" style={{ borderTopStyle: 'solid', borderTopWidth: '0px', marginTop: '0px' }}>
                    <label style={{ color: '#3C3633' }}>Filtrar por continente:</label>
                    <select value={selectedContinent} onChange={handleSortChange}>
                        <option value="">None</option>
                        <option value="Africa">África</option>
                        <option value="Americas">América</option>
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europa</option>
                        <option value="Oceania">Oceanía</option>
                        <option value="Antarctic">Antártida</option>
                    </select>
                </div>
            </header>
            <div className="country-grid" style={{ borderTopStyle: 'solid', borderTopWidth: '0px' }}>
                {filteredCountries.map(country => (
                    <div
                        key={country.cca3}
                        className={`country-card ${getContinentClass(country.region)}`}
                        onClick={() => handleSelectCountry(country)}
                    >
                        <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} width="100" />
                        <div className="country-info">
                            <h2>{country.name.common}</h2>
                            <p>Capital: {country.capital}</p>
                            <p>Región: {country.region}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CountryList;
