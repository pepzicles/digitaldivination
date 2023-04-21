import bot from "./assets/bot.svg";
import user from "./assets/user.svg";

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');

let loadInterval;

//This makes the bot produce dot dot dot before it gives an answer
function loader(element){
  element.textContent = " ";
  loadInterval = setInterval(() => {
    element.textContent += '.';

    // If the loading indicator has reached three dots, reset it
    if (element.textContent === '....'){
      element.textContent = '';
    }
  }, 300)
}

//This gives the typewriter effect of typing one at a time 
function typeText(element, text){
  let index = 0;
  let interval = setInterval (() => {
    if (index < text.length){
      element.innerHTML += text.charAt(index)
      index++
    } else {
      clearInterval(interval)
    }
  }, 20)
}

//Generate a unique id for every message so that we can map over them
// necessary for typing text effect for that specific reply
// without unique ID, typing text will work on every element
function generateUniqueId(){
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`;
}


//Implement the different colored strips for both questions and answers
//value = ai generated message
function chatStripe(isAi, value, uniqueId) {
  return (
    `
    <div class = "wrapper ${isAi && 'ai'}">
      <div class = "chat">
        <div class = "profile">
          <img 
            src = ${isAi ? bot : user} 
            alt = "${isAi ? 'bot' : 'user'}"
          />
        </div>
        <div class = "message" id = ${uniqueId} > ${value} </div> 
      </div>
    </div>
    `
  )
}




//Submit function -> Trigger for chatbot to respond
const handleSubmit = async(e) => {
  e.preventDefault();

  const data = new FormData(form);

  //user's chatstripe
  chatContainer.innerHTML += chatStripe(false, data.get('prompt'))
  //clear text area input
  form.reset()

  //bot's chatstripe
  const uniqueId = generateUniqueId()
  chatContainer.innerHTML += chatStripe(true, " ", uniqueId)

  //lets user constantly see newly generated message- constant scroll to bottom
  chatContainer.scrollTop = chatContainer.scrollHeight

  const messageDiv = document.getElementById(uniqueId)
  loader(messageDiv)

  //fetch data from server- bot's response
  const response = await fetch('http://localhost:5100', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: data.get('prompt')
    })
  })

  clearInterval(loadInterval);
  messageDiv.innerHTML = " " //add message

  if (response.ok) {
    const data = await response.json(); //response from backend
    const parsedData = data.bot.trim() //trims any trailing spaces

    typeText(messageDiv, parsedData)
  } else{
    const err = await response.text()
    
    messageDiv.innerHTML = "Something went wrong"

    alert(err)
  }
}

form.addEventListener('submit', handleSubmit)
form.addEventListener('keyup', (e) => {
  if(e.keyCode === 13){ //this is the enter key
    handleSubmit(e);
  }
});