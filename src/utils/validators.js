const minLen = (n) => {
  return (input) => input.length < n
    ? `Min length expected ${n} chars`
    : null
}

const len = (n) => {
  return (input) => input.length !== n
    ? `Length must be ${n} chars`
    : null
}

const isNumber = () => {
  return (input) => /^-?\d+$/.test(input)
    ? null
    : `Number expected`;
}

const notEmpty = () => {
  return (input) => input.length === 0
    ? `Should not be empty`
    : null
}

export {
  minLen,
  len,
  isNumber,
  notEmpty
}
