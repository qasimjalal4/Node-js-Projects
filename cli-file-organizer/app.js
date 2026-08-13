import fs from 'fs/promises'
import path, { format } from 'path'
 
 
 
const categories = {
  images: ['.jpg', '.jpeg', '.png', '.gif'],
  documents: ['.pdf', '.txt', '.docx'],
  audio: ['.mp3', '.wav'],
  videos: ['.mp4', '.mkv']
}


const folderPath = './test-files'


async function fileOrganizer() {

 const files = await fs.readdir(folderPath)

 for(const file of files) {

  const extension = path.extname(file)

  const category = Object.keys(categories).find(category => {
    return categories[category].includes(extension)

    
 })

 }

 
  
}


fileOrganizer()