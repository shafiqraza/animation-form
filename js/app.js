const submitForm = () => {
  const nextBtns = document.querySelectorAll('.material-icons-outlined');
  const inputs = document.querySelectorAll("input");

  // if click on arrow btn
  nextBtns.forEach(nextBtn => nextBtn.addEventListener('click', getData));
  
  // else if pressed enter
  inputs.forEach(input => input.addEventListener('keyup', (e) => {
    if(e.key === "Enter") {
      getData(e, "enter");
    }
  }))
}

const getData = (e, pressed = "arrow") => {
  let currentInput;
  const currentParent = e.target.parentElement;
  const nextParent =  currentParent.nextElementSibling;
  
  pressed === "enter" ? currentInput = e.target : currentInput = e.target.previousElementSibling
  
  if(validateInput(currentInput.value, currentInput.type, currentParent)){
    nextField(currentParent, nextParent)
  }

}

const validateInput = (value, type, activeParent) => {
  if(value.length < 1) {
    showError(activeParent);
    return false;
  }else {
    let validator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(type === "email" && !validator.test(value)) {
      showError(activeParent);
      return false;
    }else {
      return true;
    }
  }
}

const showError = (activeParent) => {
  document.body.style.background = "linear-gradient(to right, #e40017, #fa1e0e)";
  activeParent.classList.add("invalid");
  activeParent.children[1].focus()
  setTimeout(() => {
    document.body.style.background = "linear-gradient(to right , #6ddccf, #94ebcd)";
    activeParent.classList.remove("invalid")
  },300)
}

const nextField = (current, next) => {
  current.classList.remove('active')
  next.classList.add('active')
  next.children[1].focus();
} 

submitForm();