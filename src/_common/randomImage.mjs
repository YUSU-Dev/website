export function randomImageUrl(section) {
  let images = [];

  if (section === "student-life") {
    images.push(
      "https://assets-cdn.sums.su/YU/website/img/placeholders/500x500_Yellow.webp",
      "https://assets-cdn.sums.su/YU/website/img/placeholders/500x500_Pink.webp",
      "https://assets-cdn.sums.su/YU/website/img/placeholders/500x500_Light_Blue.webp",
    );
  } else if (section === "student-voice") {
    images.push(
      "https://assets-cdn.sums.su/YU/website/img/placeholders/500x500_Red.webp",
      "https://assets-cdn.sums.su/YU/website/img/placeholders/500x500_Orange.webp",
      "https://assets-cdn.sums.su/YU/website/img/placeholders/500x500_Pink.webp",
    );
  } else if (section === "advice") {
    images.push(
      "https://assets-cdn.sums.su/YU/website/img/placeholders/500x500_Blue.webp",
      "https://assets-cdn.sums.su/YU/website/img/placeholders/500x500_Green.webp",
      "https://assets-cdn.sums.su/YU/website/img/placeholders/500x500_Light_Blue.webp",
    );
  } else {
    images.push(
      "https://assets-cdn.sums.su/YU/website/img/placeholders/500x500_Yellow.webp",
      "https://assets-cdn.sums.su/YU/website/img/placeholders/500x500_Pink.webp",
      "https://assets-cdn.sums.su/YU/website/img/placeholders/500x500_Blue.webp",
      "https://assets-cdn.sums.su/YU/website/img/placeholders/500x500_Red.webp",
    );
  }

  return images[Math.floor(Math.random() * images.length)];
}
