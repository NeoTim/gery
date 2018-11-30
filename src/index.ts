type F = () => any
const fn: F = () => {
  const bar = 'bar'
  console.log(`foo ${bar}!`)
}

export default fn
