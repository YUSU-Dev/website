import $ from "https://cdn.jsdelivr.net/npm/jquery@3.7.1/+esm";

export function registerInterest(activity_id) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "/activities/api",
      type: "post",
      data: {
        method: "register-group-interest",
        activity_id: activity_id,
      },
    })
      .done(function (response) {
        resolve(response); // Resolve the promise with the response
      })
      .fail(function (response) {
        console.log("There was an error: " + response);
        reject(response);
      });
  });
}

export function unregisterInterest(activity_id) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "/activities/api",
      type: "post",
      data: {
        method: "unregister-group-interest",
        activity_id: activity_id,
      },
    })
      .done(function (response) {
        resolve(response); // Resolve the promise with the response
      })
      .fail(function (response) {
        console.log("There was an error: " + response);
        reject(response);
      });
  });
}
