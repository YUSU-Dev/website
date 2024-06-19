import $ from "https://cdn.jsdelivr.net/npm/jquery@3.7.1/+esm";

export function addToBasketHandler(productID) {
  return new Promise((resolve) => {
    $.ajax({
      url: "/shop/ajax",
      method: "POST",
      data: {
        c: "ab",
        pid: productID,
      },
    })
      .done(function (response) {
        resolve(response); // Resolve the promise with the response
      })
      .fail(function (response) {
        console.log(
          "There was an error adding the product to the basket: " +
            response.error_message,
        );
        resolve(response);
      });
  });
}
