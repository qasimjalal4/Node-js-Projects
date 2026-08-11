import fs from 'fs/promises'

export async function  addExpense(filePath,expense,price) {
  
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


export async function listExpenses(filePath) {

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


export async function deleteExpense(filePath,id) {

  try {


  } catch(error) {

    console.log(error)
  }
  
}