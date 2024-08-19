import $ from "https://cdn.jsdelivr.net/npm/jquery@3.7.1/+esm";

export function registerInterest(activity_id) {
  $.ajax({
    url: "/activities/api",
    type: "post",
    data: {
      method: "register-group-interest",
      activity_id: activity_id,
    },
    success: function () {
      location.reload();
    },
    error: function (error) {
      console.log(error);
    },
  });
}

export function unregisterInterest(activity_id) {
  $.ajax({
    url: "/activities/api",
    type: "post",
    data: {
      method: "unregister-group-interest",
      activity_id: activity_id,
    },
    success: function () {
      location.reload();
    },
    error: function (error) {
      console.log(error);
    },
  });
}
