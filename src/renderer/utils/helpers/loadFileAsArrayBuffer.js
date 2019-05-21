export default f => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsArrayBuffer(f)
    reader.onload = resolve
  })
}
