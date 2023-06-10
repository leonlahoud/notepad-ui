// App.tsx
import React, { useState } from 'react';
import { debounce } from 'lodash';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';

const App: React.FC = () => {
  const [notes, setNotes] = useState<string[]>([]);
  const [currentNoteIndex, setCurrentNoteIndex] = useState<number | null>(null);
  const [sidebarShown, setSidebarShown] = useState<boolean>(true);

  const selectNote = (index: number) => {
    setCurrentNoteIndex(index);
  };

  const updateNote = (content: string) => {
    if (currentNoteIndex !== null) {
      setNotes((prevNotes) => {
        const newNotes = [...prevNotes];
        newNotes[currentNoteIndex] = content;
        return newNotes;
      });
    }
  };

  const debouncedUpdateNote = debounce(updateNote, 500);

  const createNote = (content: string) => {
    setNotes((prevNotes) => [content, ...prevNotes]);
    setCurrentNoteIndex(0);
  };

  const deleteNote = () => {
    if (currentNoteIndex !== null) {
      setNotes((prevNotes) => prevNotes.filter((_, index) => index !== currentNoteIndex));
      setCurrentNoteIndex(null);
    }
  };

  const toggleSidebar = () => {
    setSidebarShown(!sidebarShown);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex justify-content-between mt-3">
          <button onClick={() => setCurrentNoteIndex(null)} className="btn btn-primary">New Note</button>
          <button onClick={deleteNote} className="btn btn-danger">Delete Note</button>
          <button onClick={toggleSidebar} className="btn btn-secondary">{sidebarShown ? 'Hide' : 'Show'} Sidebar</button>
        </div>
      </div>
      <div className="row mt-3">
        {sidebarShown && <div className="col-4">
          <NoteList 
            notes={notes} 
            currentNoteIndex={currentNoteIndex || 0} 
            selectNote={selectNote}
          />
        </div>}
        <div className="col">
          <NoteEditor 
            note={currentNoteIndex !== null ? notes[currentNoteIndex] : ''} 
            updateNote={debouncedUpdateNote}
            createNote={createNote}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
