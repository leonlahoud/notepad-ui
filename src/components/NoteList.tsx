import React from 'react';

type NoteListProps = {
    notes: string[],
    currentNoteIndex: number,
    selectNote: (index: number) => void,
};

const NoteList: React.FC<NoteListProps> = ({ notes, currentNoteIndex, selectNote }) => (
    <div className="note-list">
        {notes.map((note, index) => (
            <div
                key={index}
                className={`note p-3 mb-2 ${index === currentNoteIndex ? 'bg-primary text-white' : 'bg-light'}`}
                onClick={() => selectNote(index)}
            >
                {note.slice(0, 50)}
            </div>
        ))}
    </div>
);

export default NoteList;
