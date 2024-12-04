document.addEventListener('DOMContentLoaded', () => {
  const calendar = document.querySelector('.calendar');
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDate = today.getDate();

  for (let i = 1; i <= 24; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.id = `square${i}`;
    square.textContent = i;

    square.addEventListener('click', () => openSquare(i, square));

    calendar.appendChild(square);
  }

  function openSquare(day, square) {
    if (currentMonth === 11 && currentDate >= day) {
      fetch(`videos.json`)
        .then(response => response.json())
        .then(data => {
          const videoUrl = data[day];
          square.style.opacity = '0';
          setTimeout(() => {
            square.innerHTML = `<iframe width="100" height="100" src="${videoUrl}" frameborder="0" allowfullscreen></iframe>`;
            square.style.opacity = '1';
          }, 500);
        });
    } else {
      square.classList.add('shake');
      setTimeout(() => {
        square.classList.remove('shake');
      }, 500);
    }
  }
});
