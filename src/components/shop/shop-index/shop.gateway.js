import $ from "https://cdn.jsdelivr.net/npm/jquery@3.7.1/+esm";

export function removeItemHandler(itemID) {
  return new Promise((resolve) => {
    $.ajax({
      url: "/shop/ajax",
      method: "POST",
      data: {
        c: "ri",
        id: itemID,
      },
    })
      .done(function (response) {
        resolve(response); // Resolve the promise with the response
      })
      .fail(function (response) {
        console.log(
          "There was an error removing the product from the basket: " +
            response.error_message,
        );
        resolve(response);
      });
  });
}
export function emptyBasketHandler() {
  return new Promise((resolve) => {
    $.ajax({
      url: "/shop/ajax",
      method: "POST",
      data: {
        c: "eb",
      },
    })
      .done(function (response) {
        resolve(response); // Resolve the promise with the response
      })
      .fail(function (response) {
        console.log(
          "There was an error removing the product from the basket: " +
            response.error_message,
        );
        resolve(response);
      });
  });
}
export function payNowHandler() {
  return new Promise((resolve) => {
    $.ajax({
      url: "/shop/ajax",
      method: "POST",
      data: {
        c: "pn",
        "sp-conduct": $("#sp-conduct").is(":checked"),
      },
    })
      .done(function (response) {
        resolve(response); // Resolve the promise with the response
      })
      .fail(function (response) {
        console.log(
          "There was an error removing the product from the basket: " +
            response.error_message,
        );
        resolve(response);
      });
  });
}
