import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import {addExpense, listExpenses, deleteExpense, calculateTotal} from './expense.js'

const command = process.argv[2]
const expense = process.argv[3]
const price = Number(process.argv[4])

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

 


async function main() {

  await setup()

  if(command === 'add') {
    await addExpense(filePath,expense,price)

  } else if(command === 'list') {
    await listExpenses(filePath)

  } else if(command === 'delete') {
    const id = Number(process.argv[3])
    await deleteExpense(filePath,id)
  
  } else if(command === 'total') {
    await calculateTotal(filePath)

  } else {
    console.log('Unknown command!')
  }
  
}


main()