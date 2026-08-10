import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { addNote, listNotes, deleteNote } from './notes.js'

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



 

 
 

async function main() {
  
 await setup() 

 if(command === 'add') {

  if(!note) {
    console.log('Please provide a note too!')
    return
  }

  await addNote(filePath,note)
  console.log('Note added successfully!')
  

 } else if(command === 'list') {
  await listNotes(filePath)

 } else if(command === 'delete') {

  const id = Number(process.argv[3])
  await deleteNote(filePath,id)

 } else {
  console.log('Unknown command!')
 }
}


main()