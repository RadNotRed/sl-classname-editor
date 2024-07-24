export const readClassNames = async (): Promise<string[]> => {
    const response = await fetch('/Class_Names.txt');
    if (!response.ok) {
        throw new Error('Failed to fetch class names');
    }
    const text = await response.text();
    return text.split('\n').map(line => line.trim());
};

export const saveClassNames = async (classNames: string[]): Promise<void> => {
    // Insert the - line in the dl file
    const lines = [...classNames];
    lines.splice(17, 0, '-');

    const data = lines.join('\n');
    const blob = new Blob([data], {type: 'text/plain'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'Class_Names.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};
