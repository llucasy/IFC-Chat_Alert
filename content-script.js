window.onload = () => {

  const leftMinutes = minutes => {

    let minute = minutes
    minute = minute*60

    unix = new Date().getTime() - ((minute)*1000)
    result = new Date(unix)

    let h = (result.getHours()<10?'0':'') + result.getHours()
    let m = (result.getMinutes()<10?'0':'') + result.getMinutes()

    return `${h}:${m}`
    
  }

  setInterval(() => {

    if (document.location.href === 'https://web.skype.com/') {
      let groups = document.querySelectorAll('div.app-container div[role="group"]')[1].querySelectorAll('div[role="button"]')

      chrome.storage.sync.get(['firstAlert', 'secondAlert'], (data) => {
        groups.forEach((group) => {
          title = group.querySelector('div[title]').title
          nodes = group.querySelectorAll('div[data-text-as-pseudo-element]:not([aria-hidden])')
          time = nodes[1].attributes["data-text-as-pseudo-element"].value

          console.log({title, time})
        
          if (time === leftMinutes(data.firstAlert)) {
            new Notification( 'Skype: ' + title, {
              body: `Este grupo no Skype está inativo há ${data.firstAlert} minutos, \n desde às ${time}`,
            })
          }
          
          if (time === leftMinutes(data.secondAlert)) {
            new Notification( 'Skype: ' + title, {
              body: `Este grupo no Skype está inativo há ${data.secondAlert} minutos, \n desde às ${time}`,
            })
          } 

        })
      })
    } else {
  
      let chats = document.querySelectorAll('span[data-starred="true"]')

      chrome.storage.sync.get(['firstAlert', 'secondAlert'], (data) => {
        chats.forEach((chat) => {
          let Gtitle = chat.querySelector('.jy2fzc').innerText
          let Gtime = chat.querySelector('.FvYVyf').innerText

          console.log({Gtitle, Gtime})

          if (Gtime === `${data.firstAlert} min`) {
            chrome.runtime.sendMessage({title: Gtitle, leftMinutes: data.firstAlert})
          }

          if (Gtime === `${data.secondAlert} min`) {
            chrome.runtime.sendMessage({title: Gtitle, leftMinutes: data.secondAlert})
          }

        })
      })
      
    }

  }, 30000)

};