import fs from 'fs/promises'

export async function addNote(filePath,note) {

  try {

   const data = await fs.readFile(filePath,'utf8')
   const notes = JSON.parse(data)


   notes.push({
    id: notes.length + 1,
    text: note
   })

   const JsonData = JSON.stringify(notes,null,2)

   await fs.writeFile(filePath, JsonData)

  } catch(error) {

    console.log(error.message)
  }

}



export async function listNotes(filePath) {

  try {

    const data = await fs.readFile(filePath,'utf8')
    const notes = JSON.parse(data)
    
    notes.forEach((note) => {
      console.log(`${note.id}. ${note.text}`)
    })

  } catch(error) {

    console.log(error.message)
  }


}


export async function deleteNote(filePath, id) {


  try {

      const data = await fs.readFile(filePath,'utf8')
      const notes = JSON.parse(data)

      
      const noteExists = notes.some(note => note.id === id)

      if(noteExists) {
        const newNotes = notes.filter(note => note.id !== id)
      
        newNotes.forEach((note,index) => {
         note.id = index + 1
        })

        const JsonData = JSON.stringify(newNotes,null,2)

        await fs.writeFile(filePath,JsonData)

        console.log('Note deleted!')

      } else {
        console.log(`Note with id: ${id} not found!`)
      }
 

  } catch(error) {

    console.log(error.message)
  }
  
}

