import $ from "https://cdn.jsdelivr.net/npm/jquery@3.7.1/+esm";
$(document).on("ready", function () {
  $(".shop-remove-item").on("click", function () {
    removeItem($(this).data("item-id"));
  });
  $("#empty-basket").on("click", function () {
    emptyBasket();
  });
  $("#pay-now").on("click", function () {
    payNow();
  });
});
export function removeItem(itemID) {
  if (!confirm("Are you sure you wish to remove this item?")) return;
  $.ajax({
    url: "/shop/ajax",
    method: "POST",
    data: {
      c: "ri",
      id: itemID,
    },
  })
    .done(function (response) {
      if (!response["success"]) {
        alert("Remove product error: " + response.error_message);
        return;
      }
      if (response["basketCount"] > 0) {
        $("#shop-sub").text(response["subTotal"]);
        $("#shop-total").text(response["total"]);
        $("#shop-fee").text(response["fee"]);
        $("#shop-item-r-" + itemID).fadeOut(150, function () {
          $(this).remove();
        });
        // refreshBasketCount();
      } else {
        window.location.replace("/shop/basket");
      }
    })
    .fail(function (response) {
      if (response.error_message != "undefined") {
        alert(
          "There was an error when removing the product: " +
            response.error_message,
        );
      } else {
        alert("Error removing product from basket");
      }
    });
}
export function emptyBasket() {
  if (!confirm("Are you sure you wish to empty the basket?")) return;
  $.ajax({
    url: "/shop/ajax",
    method: "POST",
    data: {
      c: "eb",
    },
  })
    .done(function () {
      window.location.replace("/shop/basket");
    })
    .fail(function (response) {
      if (response.error_message != "undefined") {
        alert(
          "There was an error when emptying the basket: " +
            response.error_message,
        );
      } else {
        alert("Error removing emptying the basket");
      }
    });
}
export function payNow() {
  $.ajax({
    url: "/shop/ajax",
    method: "POST",
    data: {
      c: "pn",
      "sp-conduct": $("#sp-conduct").is(":checked"),
    },
  })
    .done(function (response) {
      if (response.success) {
        location.href = response.url;
      } else {
        alert(response.error_message);
        location.reload();
      }
    })
    .fail(function (response) {
      if (response.error_message != "undefined") {
        alert(response.error_message);
      } else {
        alert("Error proceeding with payment");
      }
      location.reload();
    });
}
