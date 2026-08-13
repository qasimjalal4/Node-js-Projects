import fs from 'fs/promises'
import path, { format } from 'path'
 

const command = process.argv[2]
 
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


  if(!category) {
    continue;
  }

  const categoryPath = path.join(folderPath,category)

  await fs.mkdir(categoryPath,{recursive:true})

  const oldPath = path.join(folderPath,file)
  const newPath = path.join(categoryPath,file)

  await fs.rename(oldPath,newPath)

 }
  
}



async function main() {
  
  if(command === 'organize') {
    await fileOrganizer()
  } else {
    console.log('Unknown command!')
  }
}


main()