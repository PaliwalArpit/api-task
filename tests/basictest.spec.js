import { test, expect } from "@playwright/test";
const utils = require('../utils/apiutils')
const apiUrl = 'https://en.wikipedia.org/w/api.php';
const searchString = 'furry&rabbit';
const title = 'Sesame Street'

test("Test for checking title =>", async ({ page }) => {
  await page.goto(`${apiUrl}?action=query&list=search&srsearch=${searchString}&format=json`);
  // Get the JSON response
  const jsonResponse = await page.evaluate(() => {
    return fetch(location.href).then(response => response.json());
  });

  // Iterate through the search results and print the title of each page
  jsonResponse.query.search.forEach(async result => {
    const title = result.title;
    console.log('Title:', title);
  });
  await expect(title).toContain('Sesame Street')
});

test("Test for checking timestamp and return page details =>", async ({ page }) => {

  await page.goto(`${apiUrl}?action=query&list=search&srsearch='furry&rabbit'&format=json`);

  const jsonResponse = await page.evaluate(() => {
    return fetch(location.href).then(response => response.json());
  });

  jsonResponse.query.search.forEach(async result => {
    const timestamp = result.timestamp;
    //console.log('Timestamps:' + timestamp);
    const date = new Date(timestamp);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 because getMonth() returns zero-based month (0 for January)
    const dd = String(date.getDate()).padStart(2, '0');

    const formattedDate = `${yyyy}-${mm}-${dd}`;
    //console.log(formattedDate)
    if(formattedDate > '2023-08-17'){
      return result.snippet
    }
  })
})


