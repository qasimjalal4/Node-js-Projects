import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'


const command = process.argv[2]
const note = process.argv[3]

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const folderPath = path.join(__dirname,'data')

const filePath = path.join(folderPath,'notes.json')

async function setup() {
  
 try {

   await fs.mkdir(folderPath, {recursive: true})

   try {
    
    await fs.access(filePath)

   } catch(error) {

    await fs.writeFile(filePath,'[]')

   }

 } catch(error) {

   console.log('sSet up failed: ',error.message)
 }

}





async function addNote() {

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



async function listNotes() {

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


async function deleteNote() {

  const id = Number(process.argv[3])

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
        console.log(`Note ${id} not found!`)
      }
 

  } catch(error) {

    console.log(error.message)
  }
  
}



 
 

async function main() {
  
 await setup() 

 if(command === 'add') {

  if(!note) {
    console.log('Please provide a note too!')
    return
  }

  await addNote()
  console.log('Note added successfully!')
  

 } else if(command === 'list') {
  await listNotes()

 } else if(command === 'delete') {
  await deleteNote()

 } else {
  console.log('Unknown command!')
 }
}


main()