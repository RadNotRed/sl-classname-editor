import * as React from 'react';

interface ClassItemProps {
    staticName: string;
    editableName: string;
    onChange: (newName: string) => void;
}

const ClassItem: React.FC<ClassItemProps> = ({staticName, editableName, onChange}) => {
    return (
        <div className="class-item">
            <span>{staticName}</span>
            <input
                type="text"
                value={editableName}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};

export default ClassItem;
