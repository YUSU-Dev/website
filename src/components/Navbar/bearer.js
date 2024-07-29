import $ from "https://cdn.jsdelivr.net/npm/jquery@3.7.1/+esm";

export const accessStudentDashboard = (uri = "") => getBearerToken(uri);
// Original method was called getBearerToken - Renamed but kept original as to not break anything

export const getBearerToken = (uri = "") => {
  $("#studentDashboardLink").text("Loading...");

  let url = "/auth/dashboard";

  if (uri !== "") {
    url += "?uri=" + uri;
  }

  $.ajax({
    url: url,
    method: "POST",
  })
    .done((response) => {
      if (response.url) {
        location.href = response.url;
        $("#studentDashboardLink").text("Student Dashboard");
      } else {
        $("#studentDashboardLink").text("Student Dashboard");
        if (response.error && typeof response.message === "string") {
          alert(response.message);
        } else {
          alert(
            "Could not be redirected at this time, please try again later.",
          );
        }
      }
    })
    .fail(() => {
      $("#studentDashboardLink").text("Student Dashboard");
      alert("Network error, please try again later.");
    });
};
