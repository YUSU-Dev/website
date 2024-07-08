export function randomImageUrl(section) {
  let images = [];

  if (section === "student-life") {
    images.push(
      "https://assets-cdn.sums.su/YU/website/img/placeholders/500x500_Yellow.webp",
    );
    images.push(
      "https://assets-cdn.sums.su/YU/website/img/placeholders/500x500_Pink.webp",
    );
    images.push(
      "https://assets-cdn.sums.su/YU/website/img/placeholders/500x500_Light_Blue.webp",
    );
  } else if (section === "student-voice") {
    images.push(
      "https://assets-cdn.sums.su/YU/website/img/placeholders/500x500_Red.webp",
    );
    images.push(
      "https://assets-cdn.sums.su/YU/website/img/placeholders/500x500_Orange.webp",
    );
    images.push(
      "https://assets-cdn.sums.su/YU/website/img/placeholders/500x500_Pink.webp",
    );
  } else if (section === "advice") {
    images.push(
      "https://assets-cdn.sums.su/YU/website/img/placeholders/500x500_Blue.webp",
    );
    images.push(
      "https://assets-cdn.sums.su/YU/website/img/placeholders/500x500_Green.webp",
    );
    images.push(
      "https://assets-cdn.sums.su/YU/website/img/placeholders/500x500_Light_Blue.webp",
    );
  } else {
    images.push(
      "https://assets-cdn.sums.su/YU/website/img/placeholders/500x500_Yellow.webp",
    );
    images.push(
      "https://assets-cdn.sums.su/YU/website/img/placeholders/500x500_Pink.webp",
    );
    images.push(
      "https://assets-cdn.sums.su/YU/website/img/placeholders/500x500_Blue.webp",
    );
    images.push(
      "https://assets-cdn.sums.su/YU/website/img/placeholders/500x500_Red.webp",
    );
  }

  return images[Math.floor(Math.random() * images.length)];
}
