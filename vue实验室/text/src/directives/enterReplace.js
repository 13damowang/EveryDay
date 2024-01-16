const enterReplace = {
  update: (el, binding, vnode) => {
    const input = el.getElementsByTagName('input')[0]
    let oldValue = ''
    input.addEventListener('input', function (e) {
      inputReplace(input)
    })
    function inputReplace (input) {
      const valueCopye = JSON.parse(JSON.stringify(input.value))
      if (input.value === oldValue) return
      input.value = input.value.replace(new RegExp(binding.value, 'g'), '')
      oldValue = valueCopye
      input.dispatchEvent(new Event('input'))
    }
  }
}

export default enterReplace