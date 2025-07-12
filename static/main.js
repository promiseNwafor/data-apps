console.log('Hello World')

const outer = (n) => () => n++

const increment = outer(10)
