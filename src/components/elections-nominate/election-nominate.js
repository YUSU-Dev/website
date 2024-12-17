// Using ID
const form = document.getElementById('election-nominate-form');

async function saveForm() {
  // unpack formData and for each item in the object send a post request to the URL end point with the KV data
  const formData = new FormData(form);
  const url = self.location.href;
  for (var pair of formData.entries()) {
    const key = pair[0];
    const value = pair[1];
    
    console.log(key);
    console.log(value);
    var redirect = true;
  // check if the value is not null or empty string and the key is not itemUploader
    if (value && key !== "itemUploader") {
      const formData = new FormData();
      formData.append("item", value);
      formData.append("document", key);
      formData.append("do", "update");

      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      console.log(response);

      if( response.redirected != true) {
        redirect = false;
        break;
      }
    }
  };
  // location reload
  if(redirect) {
    self.location.reload();
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  await saveForm();
});
