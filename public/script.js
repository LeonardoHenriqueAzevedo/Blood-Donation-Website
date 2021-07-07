const headerButton = document.querySelector('header button');

headerButton.addEventListener('click', () => {
  document.querySelector(".form").classList.toggle("hide");
});