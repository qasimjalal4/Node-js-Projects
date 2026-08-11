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

    const data = await fs.readFile(filePath,'utf8')
    const expenses = JSON.parse(data)

    const expenseExists = expenses.some(expense => expense.id === id)

    if(!expenseExists) {
      console.log(`Expense with id ${expense.id} doesnt exist!`)
      return
    }

    const newExpenses = expenses.filter(expense => expense.id !== id)

    newExpenses.forEach((expense,index) => {
      expense.id = index + 1
    })

    const JsonData = JSON.stringify(newExpenses,null,2)

    await fs.writeFile(filePath,JsonData)


  } catch(error) {

    console.log(error)
  }
  
}


export async function calculateTotal(filePath) {

  const data = await fs.readFile(filePath, 'utf8')
  const expenses = JSON.parse(data)

  const total = expenses.reduce((sum,expense) => {
    return sum + expense.price
  }, 0)


  console.log(`Total amount: ${total}`)
  
}