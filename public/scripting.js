document.getElementsByName("userLoginId").value = ""
document.getElementsByName("password").value = ""


  document.getElementsByName("userLoginId").value = "nichardakinmade2@gmail.com"
  console.log(document.getElementsByName("userLoginId").value)
  document.getElementsByName("password").value = "8ZG?hq$&#h!2qP7"

setTimeout( () => {
  console.log(document.querySelectorAll("button")[0])
  document.querySelectorAll("button")[0].click()
}, 5000)