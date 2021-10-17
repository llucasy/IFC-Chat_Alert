const form = document.querySelector('form')

const elFirstAlert = document.querySelector('#firstAlert')
const elSecondAlert = document.querySelector('#secondAlert')

window.onload = () => {
  chrome.storage.sync.get(['firstAlert', 'secondAlert'], (data) => {
    elFirstAlert.value = data.firstAlert
    elSecondAlert.value = data.secondAlert
  })
}

form.addEventListener('change', () => {
  chrome.storage.sync.set({ firstAlert: elFirstAlert.value, secondAlert: elSecondAlert.value })
})