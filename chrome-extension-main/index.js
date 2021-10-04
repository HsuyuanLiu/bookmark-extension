
let url_item = []
let input_label=[]
//url_item.push("Home page")
//input_label.push("chrome://newtab/")
const inputButton = document.getElementById("input-button")
const deleteButton = document.getElementById("delete-button")
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const labelFromLocalStorage = JSON.parse(localStorage.getItem("mylabel"))

var tablink
if (leadsFromLocalStorage) {
    url_item = leadsFromLocalStorage
    input_label = labelFromLocalStorage
    render(url_item,input_label)
}

inputButton.addEventListener("click", function () {

    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        tablink=tabs[0].url;
        input_label.push(tablink)
        
    localStorage.setItem("mylabel", JSON.stringify(input_label))
    render(url_item,input_label)
        
    })
    if (inputEl.value != ''){
        url_item.push(inputEl.value)
        
    }   
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(url_item))

})


deleteButton.addEventListener("dblclick", function () {
    localStorage.clear()
    url_item = []
    render(url_item,input_label)
})
//show in the content-menu
function render(leads,input_label) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
        <li>
            <a href="${input_label[i]}" "target="_blank">${leads[i]}</a>
        </li>`
    }
    ulEl.innerHTML = listItems
}
