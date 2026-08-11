import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const folderPath = path.join(__dirname,'data')
const filePath = path.join(folderPath,'expenses.json')


async function setup() {

  try {

    await fs.mkdir(folderPath, {recursive: true})

   try {
    await fs.access(filePath)

   } catch(error) {

    await fs.writeFile(filePath, '[]')
   }


  } catch(error) {

    console.log(error)
  }


  
}

setup()