// NoteEditor.tsx
import React, { useState, useEffect } from 'react';

type NoteEditorProps = {
  note: string,
  updateNote: (content: string) => void,
  createNote: (content: string) => void,
};

const NoteEditor: React.FC<NoteEditorProps> = ({ note, updateNote, createNote }) => {
  const [content, setContent] = useState<string>(note);

  useEffect(() => {
    setContent(note);
  }, [note]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = event.target.value;
    setContent(newContent);

    // If the note doesn't exist and the user has started typing, create a new note
    if (note === '' && newContent.trim() !== '') {
      createNote(newContent);
    } else if (note !== '') {
      // If the note exists, update it as the user types
      updateNote(newContent);
    }
  };

  return (
    <textarea 
      value={content} 
      onChange={handleChange}
      className="form-control mt-3"
      style={{height: 'calc(100vh - 120px)'}}
    />
  );
};

export default NoteEditor;
