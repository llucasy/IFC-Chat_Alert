chrome.runtime.onMessage.addListener((response, sender, sendResponse) => {
  chrome.notifications.create({
    title: 'Google chat: ' + response.title,
    message: `Este grupo no Google Chat está inativo há ${response.leftMinutes} minutos`,
    iconUrl: 'get_started32.png',
    type: 'basic'
  })
})

setInterval(() => console.log('background funcionando'), 30000)