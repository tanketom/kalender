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
          const videoData = data[day];
          document.getElementById('videoContainer').innerHTML = `<iframe width="560" height="315" src="${videoData.url}" frameborder="0" allowfullscreen></iframe>`;
          document.getElementById('poemContainer').innerText = videoData.poem;
          document.getElementById('overlay').style.display = 'flex';
        });
    } else {
      square.classList.add('shake');
      setTimeout(() => {
        square.classList.remove('shake');
      }, 500);
    }
  }

  document.querySelector('.back').addEventListener('click', closeOverlay);

  function closeOverlay() {
    document.getElementById('overlay').style.display = 'none';
  }
});
