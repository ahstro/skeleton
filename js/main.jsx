let React = require('react')
let ReactDOM = require('react-dom')

let Foo = (props) => <h1>foobar</h1>

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Foo />,
    document.getElementById('reactTarget')
  )
})
