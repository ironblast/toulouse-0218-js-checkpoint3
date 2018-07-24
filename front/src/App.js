import React, { Component } from 'react'
import Item from './Item'
import './PlayaList.css'
import logo from './mojito.ico'

class App extends Component {
  state = {
    items: []
  }

  componentDidMount () {
    fetch('/api/items')
    .then(res => res.json())
    .then(items => {
      this.setState({
      items
      })
      console.log(items) 
    })            
  }

  handleChange = (event) => {
    const value = event.target.value
    const name = event.target.name
    this.setState({
      [name]: value
    })
  }

  createItem = () => {
    fetch('/api/items', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(item => {
      const items = [...this.state.items]
      items.push(item)
      this.setState({ items })
      console.log(item)
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.createItem()    
  }

  handleDelete = (id) => {
    fetch(`/api/items/${id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then( () => {
      const items = [...this.state.items]
      const index = items.findIndex(item => {
        return item.id === id
      })
      items.splice(index, 1)
      this.setState({ items })
    })
  }

  render() {
    return (
      <div className="PlayaList">

        <header className="PlayaList-header">
          <img src={logo} className="PlayaList-logo" alt="logo" />
          <h1 className="PlayaList-title">PlayaList</h1>
        </header>

        <div className="PlayaList-list">
          <form onSubmit={this.handleSubmit}>
            <h5>Ajouter un item</h5>
            <div>
              <input name="name" placeholder="Nom" value={this.state.name} onChange={this.handleChange} />
              <input name="picture" placeholder="image" value={this.state.picture} onChange={this.handleChange} />
              <button type="submit" >
                <span className="icon-checkmark"></span>
              </button>
            </div>
          </form>
        </div>

        <div className="PlayaList-list">
          {this.state.items.map(
            (item, key) => <Item item={item} key={key} handleDelete={this.handleDelete} />
          )}
        </div>

      </div>
    )
  }
}

export default App
