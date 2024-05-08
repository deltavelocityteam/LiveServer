const scriptURL = 'https://script.google.com/macros/s/AKfycbzChfMJ1aZglym8E_lgz9blxKDaTqGF9yozVWEOr2W76FtJgowHzfAcEJVdMAMxgwbI/exec'

let popup = document.getElementById("popup");

const form = document.forms['contact-form']
form.addEventListener('submit', e => {
    e.preventDefault()
    const drop = document.getElementById("order-inMonth")
    const brand = document.getElementById("brand")
    const carrier = document.getElementById("carrier")
    const formData = new FormData(form);

    formData.append('order', drop.innerText);
    formData.append('brand', brand.innerText);
    formData.append('carrier', carrier.innerText);


    fetch(scriptURL, {
        method: 'POST',
        body: formData,
    })
        .then(response =>
            popup.classList.add("open-popup")
            // alert("Thank you! your form is submitted successfully.")
        )
        .then(() => {
            drop.innerText = "Select Options"
            brand.innerText = "Select Options"
            carrier.innerText = "Select Options"
        })
        .catch(error => console.error('Error!', error.message))
})

function closePopup() {
    popup.classList.remove("open-popup");
    form.reset();
}

// const sheetName = 'form data'
// const scriptProp = PropertiesService.getScriptProperties()

// function initialSetup() {
//     const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
//     scriptProp.setProperty('key', activeSpreadsheet.getId())
// }

// function doPost(e) {
//     const lock = LockService.getScriptLock();
//     lock.tryLock(10000);

//     try {
//         const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
//         const sheet = doc.getSheetByName(sheetName)
//         const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
//         const nextRow = sheet.getLastRow() + 1;

//         const newRow = headers.map(function (header) {
//             return header === 'Date' ? new Date() : e.parameter[header]
//         })

//         sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow])

//         return ContentService
//             .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
//             .setMimeType(ContentService.MimeType.JSON)
//     }

//     catch (e) {
//         return ContentService
//             .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
//             .setMimeType(ContentService.MimeType.JSON)
//     }

//     finally {
//         lock.releaseLock()
//     }
// };