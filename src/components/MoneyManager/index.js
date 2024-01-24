import {Component} from 'react'
import {v4 as v4uuid} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    transactionList: [],
    title: '',
    amount: '',
    type: 'Income',
    income: 0,
    expenses: 0,
  }

  deleteItem = (id, amo, typ) => {
    const {transactionList, income, expenses} = this.state
    const filteredList = transactionList.filter(each => each.id !== id)

    this.setState({transactionList: filteredList})

    const isTrue = typ === transactionTypeOptions[1].displayText

    if (isTrue) {
      this.setState(prevState => ({
        income: prevState.income - parseInt(amo),
      }))
    } else {
      this.setState(prevState => ({
        expenses: prevState.expenses - parseInt(amo),
      }))
    }
    console.log(expenses)
    console.log(income)
  }

  onPrevent = event => {
    event.preventDefault()
    const {title, amount, type} = this.state
    const newList = {
      id: v4uuid(),
      title,
      amount,
      type,
    }

    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, newList],
      title: '',
      amount: '',
      type: 'Income',
    }))

    const isTrue = type === 'INCOME' || type === 'Income'
    if (isTrue) {
      this.setState(prevState => ({
        income: prevState.income + parseInt(amount),
      }))
    } else {
      this.setState(prevState => ({
        expenses: prevState.expenses + parseInt(amount),
      }))
    }
  }

  onTitle = event => {
    this.setState({title: event.target.value})
  }

  onAmount = event => {
    this.setState({amount: event.target.value})
  }

  onType = event => {
    this.setState({type: event.target.value})
  }

  render() {
    const {title, amount, type, transactionList, income, expenses} = this.state
    console.log(type)

    return (
      <div className="bg-container">
        <div className="main-container1">
          <h1>Hi, Richard</h1>
          <p>
            Welcome back to your
            <span className="main-span"> Money Manager</span>
          </p>
        </div>
        <div>
          <MoneyDetails income={income} expenses={expenses} />
        </div>
        <div className="main-container3">
          <form className="form-con1" onSubmit={this.onPrevent}>
            <h2>Add Transaction</h2>
            <label htmlFor="label1" className="app-label1">
              TITLE
            </label>
            <input
              id="label1"
              type="text"
              value={title}
              className="app-input-element"
              placeholder="Title"
              onChange={this.onTitle}
            />
            <label className="app-label1" htmlFor="label2">
              AMOUNT
            </label>
            <input
              id="label2"
              type="text"
              value={amount}
              onChange={this.onAmount}
              className="app-input-element"
              placeholder="Amount"
            />
            <label className="app-label1" htmlFor="label3">
              TYPE
            </label>
            <select
              id="label3"
              onChange={this.onType}
              value={type}
              className="app-input-element"
            >
              {transactionTypeOptions.map(each => (
                <option value={each.optionId} key={each.displayText}>
                  {each.displayText}
                </option>
              ))}
            </select>
            <button type="submit" className="app-button">
              Add
            </button>
          </form>
          <div className="main-con2">
            <h2>History</h2>
            <div className="ul-container">
              <div className="con1">
                <p className="main-history-p">Title</p>
                <p className="main-history-p">Amount</p>
                <p className="main-history-p">Type</p>
              </div>
              <ul className="ul">
                {transactionList.map(each => (
                  <TransactionItem
                    itemDetails={each}
                    deleteItem={this.deleteItem}
                    key={each.id}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager

// Write your code here
