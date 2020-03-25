window.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // Табы
  let tab = document.querySelectorAll('.info-header-tab'), // Кнопки  для переключения...
      info = document.querySelector('.info-header'), // Родитель кнопок выше
      tabContent = document.querySelectorAll('.info-tabcontent'); // Сами элементы, статьи в нашем случае, которые будем переключать.

  // Функция, которая будет скрывать табы.  
  function hideTabContent(a) { // Вспомогательная переменная a, нужна для того чтобы знать какой именно элемент мы будем удалять, а
                               // так как мы хотим оставить только один, то используем цикл.
    for(let i = a; i < tabContent.length; i++) { // Начиная с a-го, то есть, как например внизу с 1-го, то есть со второго так как массивы с 0-ля                                      
      tabContent[i].classList.remove('show'); // удалить класс 'show'
      tabContent[i].classList.add('hide'); // добавить класс 'hide' для того чтоб полностью скрыть элемент.
    }
  }
  
  hideTabContent(1); // Удалятся все кроме 1-го.

  // Функция, которая будет добавлять табы. 
  function showTabContent(b) {
    if(tabContent[b].classList.contains('hide')) {
      tabContent[b].classList.remove('hide'); // Делаем обратное предыдущей функции.
      tabContent[b].classList.add('show');
    }
  }

  info.addEventListener('click', function(e) {
    let target = e.target; // Куда нажали.

    if(target && target.classList.contains('info-header-tab')) { // в условии мы проверям, что то куда мы нажали, то есть тот элемент содержит класс
                                                                 // info-header-tab. То есть это и есть наш кнопки, которые находятся в переменной tab
      for(let i = 0; i < tab.length; i++) { // Проходим по тому циклу и смотрим. На какую именно кнопку мы нажали.
        if(target == tab[i]) { // И если то куда мы нажали совпадает с кнопкой на которую мы нажали, то мы её и активируем. Связь кнопок с элементами, которые хотим убрать.
          hideTabContent(0); // Cкрыть все элементы. Теперь у всех элементов есть класс 'hide'
          showTabContent(i); // Добавить
          break;
        }
      }
    }
  });

  // Таймер
  // alert(new Date()); Дата в тот момент, когда вызывается.
  // let t = new Date();
  // alert(Date.parse(t)); // кол-во милисекунд с 1 января 1970-го года.

  let deadLine = '2020-03-27';

  // Функция получает дату, до когда будет таймер и возвращает кол-во мс, с, мин и часов до этого момента.
  function getTimeRemaining(endTime) {
    let t = Date.parse(endTime) - Date.parse(new Date()), // кол-во милисекунд которые идут в промежутке между этими датами
        seconds = Math.floor((t/1000) % 60), // t/1000 - кол-во секунд. % 60 - вычленить все минуты, оставить только секунды
        minutes = Math.floor((t/1000/60) % 60), // t/1000/60 - кол-во минут. % 60 - вычленить минуты. Общее кол-во часов, а хвости в минуты.
        hours = Math.floor((t/(1000*60*60))); // Получаем часы.
        // hours = Math.floor((t/1000/60/60) % 24),
        // days = hours = Math.floor((t/(1000*60*60*24))); // Получаем дни.

      // Вернём объект
    return {
      'total' : t,
      'hours' : hours,
      'minutes' : minutes,
      'seconds' : seconds
    }; 
  }

  // Статичную вёрстку в динамическую. Где мы устанавливаем(то есть где в вёрстке этот таймер) и deadline, то есть дату до когда отсчитывать таймер.
  function setClock(id, endTime) {
    let timer = document.getElementById(id),
        hours = timer.querySelector('.hours'),
        minutes = timer.querySelector('.minutes'),
        seconds = timer.querySelector('.seconds'),
        timeInterval = setInterval(updateClock, 1000);
        // querySelector получает первый элемент с таким селектором

        function updateClock() {
          let t = getTimeRemaining(endTime);

          // Добавить 0 перед числом. Для того чтоб было 09,08,07,06... а не просто 9,8,7,6...
          function addZero(n) {
            if(n <= 9) {
              return '0' + n;
            } else return n;
          }

          hours.textContent = addZero(t.hours);
          minutes.textContent = addZero(t.minutes);
          seconds.textContent = addZero(t.seconds);

          if (t.total <= 0) {
            clearInterval(timeInterval);
            hours.textContent = '00';
            minutes.textContent = '00';
            seconds.textContent = '00';
          }
        }
  }

  setClock('timer', deadLine);

  // Modal

  let more = document.querySelector('.more'),
      overlay = document.querySelector('.overlay'),
      close = document.querySelector('.popup-close'),
      description = document.querySelector('.description-btn');

  this.addEventListener('click', function(e) {
    let target = e.target;

    if(target.classList.contains('more') || target.classList.contains('description-btn')) {
      console.log(this); // Ссылаемся на window
      console.log(target); // Это собственно и есть то, на что мы нажали.
      overlay.style.display = 'block';
      target.classList.add('more-splash');
      document.body.style.overflow = 'hidden';
    }
  });

  // more.addEventListener('click', function() {
  //   overlay.style.display = 'block';
  //   this.classList.add('more-splash');
  //   document.body.style.overflow = 'hidden';
  // });

  close.addEventListener('click', function() {
    overlay.style.display = 'none';

    if(more.classList.contains('more-splash')) {
      more.classList.remove('more-splash');
    }

    if(description.classList.contains('more-splash')) {
      description.classList.remove('more-splash');
    }

    document.body.style.overflow = '';
  });
});