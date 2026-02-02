import $ from "https://cdn.jsdelivr.net/npm/jquery@3.7.1/+esm";

export function submitVoteHandler(electionId, formData) {
  return new Promise((resolve) => {
    $.ajax({
      url: "/elections/vote/" + electionId,
      method: "POST",
      data: formData,
    })
      .done(function (response) {
        console.log("Vote submission successful:", response);
        resolve(response); // Resolve the promise with the response
      })
      .fail(function (response) {
        console.log("There was an error voting:", response);
        console.log("Error message:", response.error_message);
        resolve(response);
      });
  });
}
