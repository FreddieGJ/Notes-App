import { useEffect, useInsertionEffect, useState } from 'react';
import {nanoid} from 'nanoid';
import NotesList from "./components/NotesList";
import Search from "./components/Search";
import Header from "./components/Header.js";

const App =() => {
  const[notes, setNotes] = useState([
    {
    id: nanoid(),
    text: "This is my first Note!", 
    date: "23/07/2023"
  },
  {
    id: nanoid(),
    text: "This is my second Note!", 
    date: "34/13/2001"
  },
  {
    id: nanoid(),
    text: "This is my third Note!", 
    date: "31/08/2023"
  },
  {
    id: nanoid(),
    text: "This is my fourth Note!", 
    date: "31/08/2023"
  },
]);

const [searchText, setSearchText] = useState('');

const [darkMode, setDarkMode] = useState(false);



useEffect(() => {
    const savedNotes = JSON.parse
    (localStorage.getItem('react-notes-app-data')
    );
    
    if(savedNotes){
      setNotes(savedNotes);
    }
}, []);


useEffect(() =>{
  localStorage.setItem(
    'react-notes-app-data', 
    JSON.stringify(notes)
  );
}, [notes]);

// this notes should maybe be in square brackets []... testing to find out

//small issue, this is supposed to save the metadata between reloads of the page. E.G, you make an note, it will still be there after you reload the page.
//but that doesn't seem to want to work and I am having trouble figuring out why. When I inspect it in chrome, it says "Each child in a list should have a unique "key"""
//I'm sure I'll figure it out later, but for now, its not really working... grumble grumble.


  function addNote(text) {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString()
    };

    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  }

const deleteNote = (id) => {
    const newNotes = notes.filter((note)=> note.id !== id);
    setNotes(newNotes);
};

  return (

    <div className = {`${darkMode && 'dark-mode'}`}>
      <div className="container">
    <Header handleToggleDarkMode={setDarkMode}/>
    <Search handleSearchNote={setSearchText} />
    <NotesList 
      notes={notes.filter((note) => 
        note.text.toLowerCase().includes(searchText)
        )} 
      handleAddNote = {addNote}
      handleDeleteNote = {deleteNote}
      />
  </div>
    </div>
  
  );
};

export default App;