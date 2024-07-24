import * as React from 'react';
import {useEffect, useState} from 'react';
import ClassItem from './ClassItem';
import {readClassNames, saveClassNames} from '../services/fileService';

// Static class names to be displayed on the left
const STATIC_CLASS_NAMES = [
    'SCP-173',
    'Class-D Personnel',
    'Spectator',
    'SCP-106',
    'Nine-Tailed Fox Specialist',
    'SCP-049',
    'Scientist',
    'SCP-079',
    'Chaos Insurgency Conscript',
    'SCP-096',
    'SCP-049-2',
    'Nine-Tailed Fox Sergeant',
    'Nine-Tailed Fox Captain',
    'Nine-Tailed Fox Private',
    'Tutorial',
    'Facility Guard',
    'SCP-939',
    'Chaos Insurgency Rifleman',
    'Chaos Insurgency Marauder',
    'Chaos Insurgency Repressor',
    'Overwatch',
    'Filmmaker',
    'SCP-3114',
    'SCP-1507',
    'SCP-1507-Alpha',
    'SCP-1507-049'
];

const ClassList: React.FC = () => {
    const [classNames, setClassNames] = useState<string[]>(() => {
        const savedClassNames = localStorage.getItem('classNames');
        return savedClassNames ? JSON.parse(savedClassNames) : [];
    });

    useEffect(() => {
        async function fetchClassNames() {
            const names = await readClassNames();
            const filteredNames = names.filter((name, index) => index !== 17);
            if (classNames.length === 0) {
                setClassNames(filteredNames);
            }
        }

        fetchClassNames();
    }, []);

    useEffect(() => {
        localStorage.setItem('classNames', JSON.stringify(classNames));
    }, [classNames]);

    const handleSave = async () => {
        await saveClassNames(classNames);
        alert('Class names saved successfully! Place the downloaded file into the desired translation directory.');
    };

    const handleChange = (index: number, newName: string) => {
        const updatedClassNames = [...classNames];
        updatedClassNames[index] = newName;
        setClassNames(updatedClassNames);
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target?.result as string;
                const importedClassNames = content.split('\n').filter(name => name.trim() !== '-' && name.trim() !== '');
                setClassNames(importedClassNames);
            };
            reader.readAsText(file);
        }
    };

    return (
        <div>
            <h1>SCP Secret Lab Class Editor</h1>
            <p className="hint">
                Place the downloaded file in<br/>
                C:\Program Files (x86)\Steam\steamapps\common\SCP Secret Laboratory\Translations\en
            </p>
            {STATIC_CLASS_NAMES.map((staticName, index) => (
                <ClassItem
                    key={index}
                    staticName={staticName}
                    editableName={classNames[index] || ''}
                    onChange={(newName) => handleChange(index, newName)}
                />
            ))}
            <div className="button-container">
                <button onClick={handleSave}>Save</button>
                <label htmlFor="file-upload" className="file-upload-label">
                    Import previous configuration
                </label>
                <input id="file-upload" type="file" accept="text/plain" onChange={handleFileUpload}/>
            </div>
        </div>
    );
};

export default ClassList;
