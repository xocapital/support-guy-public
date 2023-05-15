const CHAT_BUTTON_SIZE = 50 // size of the chat button in pixels
const CHAT_BUTTON_RADIUS = CHAT_BUTTON_SIZE / 2 // radius of the chat button in pixels
const CHAT_BUTTON_BACKGROUND_COLOR = '#1c4ed8' // background color of the chat button
const scriptTag = document.currentScript
const CHAT_BUTTON_ICON = `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z" fill="#FFFFFF"/>
  </svg>
`
const CLOSE_CHAT_ICON = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" style="width:1.5rem;height:1.5rem">
<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>
`

// create the chat button element
const chatButton = document.createElement('div')
// apply styles to the chat button
chatButton.setAttribute('id', 'chatbase-bubble-button')
chatButton.style.position = 'fixed'
chatButton.style.bottom = '30px'
chatButton.style.right = '30px'
chatButton.style.width = CHAT_BUTTON_SIZE + 'px'
chatButton.style.height = CHAT_BUTTON_SIZE + 'px'
chatButton.style.borderRadius = CHAT_BUTTON_RADIUS + 'px'
chatButton.style.backgroundColor = CHAT_BUTTON_BACKGROUND_COLOR
chatButton.style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2)'
chatButton.style.cursor = 'pointer'
chatButton.style.zIndex = 999999999
chatButton.style.transition = 'all .2s ease-in-out'

chatButton.addEventListener('mouseenter', (event) => {
  chatButton.style.transform = 'scale(1.05)'
  chatButton.style.opacity = '.9'
})
chatButton.addEventListener('mouseleave', (event) => {
  chatButton.style.transform = 'scale(1)'
  chatButton.style.opacity = '1'
})

// create the chat button icon element
const chatButtonIcon = document.createElement('div')

// apply styles to the chat button icon
chatButtonIcon.style.display = 'flex'
chatButtonIcon.style.alignItems = 'center'
chatButtonIcon.style.justifyContent = 'center'
chatButtonIcon.style.width = '100%'
chatButtonIcon.style.height = '100%'
chatButtonIcon.style.zIndex = 999999999

// add the chat button icon to the chat button element
chatButtonIcon.innerHTML = CHAT_BUTTON_ICON
chatButton.appendChild(chatButtonIcon)

// add the chat button to the page

// toggle the chat component when the chat button is clicked
chatButton.addEventListener('click', () => {
  // toggle the chat component
  if (chat.style.display == 'none') {
    chat.style.display = 'flex'
    chatButtonIcon.innerHTML = CLOSE_CHAT_ICON
  } else {
    chat.style.display = 'none'
    chatButtonIcon.innerHTML = CHAT_BUTTON_ICON
  }
})

const chat = document.createElement('div')
chat.setAttribute('id', 'chatbase-bubble-window')

chat.style.position = 'fixed'
chat.style.flexDirection = 'column'
chat.style.justifyContent = 'space-between'
chat.style.bottom = '100px'
chat.style.right = '30px'
chat.style.width = '85vw'
chat.style.height = '70vh'
chat.style.boxShadow =
  '0 6px 6px 0 rgba(0,0,0,.02),0 8px 24px 0 rgba(0,0,0,.12)'
chat.style.display = 'none'
chat.style.borderRadius = '10px'
chat.style.zIndex = 999999999
chat.style.overflow = 'hidden'

document.body.appendChild(chat)

// "http://localhost:3000/chatbot/${scriptTag.id}"
// "https://www.supportguy.co/chatbot/${scriptTag.id}"
chat.innerHTML = `<iframe
src=""https://www.supportguy.co/chatbot/${scriptTag.id}"
width="100%"
height="100%"
frameborder="0"
></iframe>`

// Create a condition that targets viewports at least 768px wide
const mediaQuery = window.matchMedia('(min-width: 550px)')

function handleChatWindowSizeChange(e) {
  // Check if the media query is true
  if (e.matches) {
    chat.style.height = '550px'
    chat.style.width = '360px'
  }
}

// Register event listener
mediaQuery.addEventListener('change', handleChatWindowSizeChange)

// Initial check
handleChatWindowSizeChange(mediaQuery)

const getChatButtonColor = async () => {
  const response = await fetch(
    `https://www.supportguy.co/api/getChatbotTheme?id=${scriptTag.id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  const data = await response.json()
  chatButton.style.backgroundColor = data.color || CHAT_BUTTON_BACKGROUND_COLOR
  document.body.appendChild(chatButton)
}

window.addEventListener('keydown', function (e) {
  if (e.key == 'Escape') {
    chat.style.display = 'none'
    chat.style.opacity = 0
    chatButtonIcon.innerHTML = CHAT_BUTTON_ICON
  }
})

window.onmessage = function (d) {
  if (d.data?.message?.which == 27) {
    chat.style.display = 'none'
    chat.style.opacity = 0
    chatButtonIcon.innerHTML = CHAT_BUTTON_ICON
  }
}

getChatButtonColor()
