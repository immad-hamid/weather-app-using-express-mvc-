'use-strict'

const el_weatherForm = document.querySelector('form');
let el_searchInput = document.querySelector('input');

// loader
const el_loadingState = document.createElement('div');
el_loadingState.id = 'loading';
el_loadingState.innerHTML = `<div style="margin-top: 20px">Loading...</div>`

el_weatherForm.addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();
    if (el_searchInput.value !== '') fetchWeatherData(el_searchInput.value);
    el_searchInput.value = '';
}

function fetchWeatherData(location) {
    if (document.querySelector('#generatedEl') !== null) {
        document.querySelector('#generatedEl').remove();
    }
    el_weatherForm.append(el_loadingState);

    fetch(`/weather?address=${location}`)
        .then(res => res.json())
        .then(data => {
            if (data.error) return logError(data.error);
            appendHtml(data);
        })
        .catch(err => logError(err.message))
}

function appendHtml(data) {
    removeLoader();

    const el_detailBlock = document.createElement('div');
    el_detailBlock.id = 'generatedEl';

    el_detailBlock.innerHTML = `
        <table style="margin-top: 20px">
            <tbody>
                <tr>
                    <td>Address</td>
                    <td>${data.address}</td>
                </tr>
                <tr>
                    <td>Forecast</td>
                    <td>${data.forecast}</td>
                </tr>
                <tr>
                    <td>Location</td>
                    <td>${data.location}</td>
                </tr>
            </tbody>
        </table>
    `;
    el_weatherForm.append(el_detailBlock);
}

function logError(err) {
    removeLoader();

    const el_errBlock = document.createElement('div');
    el_errBlock.id = 'generatedEl';
    el_errBlock.innerHTML = `
        <p>${err}</p>
    `;
    el_weatherForm.append(el_errBlock);
}

function removeLoader() {
    el_loadingState.remove();
}