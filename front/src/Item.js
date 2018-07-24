import React from 'react'

class Item extends React.Component {
  
  render() {
    const item = this.props.item
    return (
      <div className="PlayaList-item">
        <img src={item.picture} alt={item.name} />
        <div>{item.name}</div>
        <span className="icon-cancel-circle" onClick={() => this.props.handleDelete(item.id)}></span>
      </div>
    )
  }
}

export default Item
