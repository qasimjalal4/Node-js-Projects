import fs from 'fs/promises'
import path from 'path'
import { text } from 'stream/consumers'
import { fileURLToPath } from 'url'


const command = processa.argv[2]
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

   console.log('Set up complete')
 } catch(error) {

   console.log('sSet up failed: ',error.message)
 }

}

setup()



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


if(command === 'add') {
  addNote()
  console.log('Note added successfully!')
}