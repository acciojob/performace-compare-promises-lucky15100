// Array of API URLs to fetch data from
const apiUrls = [
  "https://jsonplaceholder.typicode.com/todos/1",
  "https://jsonplaceholder.typicode.com/todos/2",
  "https://jsonplaceholder.typicode.com/todos/3",
  "https://jsonplaceholder.typicode.com/todos/4",
  "https://jsonplaceholder.typicode.com/todos/5",
  "https://jsonplaceholder.typicode.com/todos/6",
  "https://jsonplaceholder.typicode.com/todos/7",
  "https://jsonplaceholder.typicode.com/todos/8",
  "https://jsonplaceholder.typicode.com/todos/9",
  "https://jsonplaceholder.typicode.com/todos/10",
];
function fetchWithTime(apiUrl) {
  const startTime = Date.now();
  return fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const endTime = Date.now();
      return { data, timeTaken: endTime - startTime };
    });
}

async function fetchWithPromiseAll() {
  const promises = apiUrls.map(apiUrl => fetchWithTime(apiUrl));
  const results = await Promise.all(promises);
  return results;
}

async function fetchWithPromiseAny() {
  const promises = apiUrls.map(apiUrl => fetchWithTime(apiUrl));
  try {
    const result = await Promise.any(promises);
    return [result];
  } catch (error) {
    return error.errors;
  }
}

async function displayResults() {
  const outputAllTable = document.getElementById('output-all');
  const outputAnyTable = document.getElementById('output-any');

  const resultsAll = await fetchWithPromiseAll();
  const resultsAny = await fetchWithPromiseAny();

  resultsAll.forEach(result => {
    const row = outputAllTable.insertRow();
    row.insertCell(0).textContent = result.data.url;
    row.insertCell(1).textContent = result.timeTaken;
  });

  resultsAny.forEach(result => {
    const row = outputAnyTable.insertRow();
    row.insertCell(0).textContent = result.data.url;
    row.insertCell(1).textContent = result.timeTaken;
  });
}

displayResults();


// You can write your code here
