import * as React from 'react';
import {useEffect, useState} from 'react';
import {FaGithub, FaMoon, FaSun} from 'react-icons/fa';

const ThemeToggle: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('isDarkMode');
        return savedTheme ? JSON.parse(savedTheme) : true;
    });

    useEffect(() => {
        const root = document.documentElement;
        if (isDarkMode) {
            root.setAttribute('data-theme', 'dark');
        } else {
            root.setAttribute('data-theme', 'light');
        }
        localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    return (
        <div className="top-right-icons">
            <button onClick={toggleTheme} className="theme-toggle">
                {isDarkMode ? <FaSun/> : <FaMoon/>}
            </button>
            <a href="https://github.com/RadNotRed/sl-classname-editor" className="github-link" target="_blank"
               rel="noopener noreferrer">
                <FaGithub/>
            </a>
        </div>
    );
};

export default ThemeToggle;