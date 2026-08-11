import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

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


async function  addExpense() {
  
  try {

    const data = await fs.readFile(filePath,'utf8')
    const expenses = JSON.parse(data)

    expenses.push({
      id: expenses.length + 1,
      name: expense,
      price 
    })

    const JsonData = JSON.stringify(expenses,null,2)

    await fs.writeFile(filePath,JsonData)

    

  } catch(error) {

    console.log(error)
  }
}


async function listExpenses() {

  try {

    const data = await fs.readFile(filePath,'utf8')
    const expenses = JSON.parse(data)

    for(let expense of expenses) {
      console.log(`${expense.id}. ${expense.name} - ${expense.price}`)
    }



  } catch(error) {

    console.log(error)
  }
  
}


async function main() {

  await setup()

  if(command === 'add') {
    await addExpense()
  } else if(command === 'list') {
    await listExpenses()
  } else {
    console.log('Unknown command!')
  }
  
}


main()