// querySelect function
const qselect = (element, elements=false) => {
  if (elements === false) { //single element
    return document.querySelector(element)
  } else { //all elements
    return document.querySelectorAll(element)
  }
}