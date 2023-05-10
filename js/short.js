fetch('https://openapi.programming-hero.com/api/ai/tools')
  .then(response => response.json())
  .then(data => {
    // Sort the data by published_in date
    const data2 = data.data.tools.sort((a, b) => new Date(b.published_in) - new Date(a.published_in));

    // Log the sorted data to the console
    console.log(data2);
  })
  .catch(error => console.error(error));