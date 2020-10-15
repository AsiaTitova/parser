'use strict';

(function () {

  const form = document.querySelector('#form');
  const inputFile = form.querySelector('#jsonFile');
  const newForm = document.querySelector('.new-form');

  // загрузка json файла //

  const btnLoad = document.querySelector('#btnLoad');
  btnLoad.addEventListener('click', () => {
    addClassElement(newForm, 'new-form--show');
    createJsonFiles();
  });

  // создание json файла //
  function createJsonFiles() {
    let file, fr;

    if (typeof window.FileReader !== 'function') {
      alert('Файлы API не поддерживаются этим браузером');
      return;
    }

    file = inputFile.files[0];
    fr = new FileReader();
    fr.onload = receivedText;
    fr.readAsText(file);

    function receivedText(e) {
      let forms = e.target.result;
      let newArr = JSON.parse(forms); 
      console.log(newArr);
      let newArrLabel = Array.from(newArr.fields);
      console.log(newArrLabel);
      createNewWrap(newForm, newArr.fields);
      createNewButton(newForm, newArr.buttons, newArr.buttons.text);
      console.log(newArr.buttons);
      createLabel(newArrLabel);
    }
  }

  //отрисовка button //
    function createNewButton(container, button, content) {
      button.forEach (function (item, i) {
        item = document.createElement('button');
        item.classList.add('new-form__button');
        item.innerHTML = content;
        container.appendChild(item);
      });
    }

    // отрисовка label //
    function createNewWrap(container, wrap) {
      wrap.forEach (function (item, i) {
        item = document.createElement('div');
        item.classList.add('new-form__wrap');
        container.appendChild(item);
      });
    }

    function createLabel(value) {
        value.forEach (function (item, i) {
        item = document.createElement('label');
        item.classList.add('new-form__label');
        item.innerHTML = item.label;
        document.querySelectorAll('.new-form__wrap').forEach(function (element, i) {
          element.appendChild(item);
        });
      });
    }

    function addClassElement (element, className) {
      element.classList.add('new-form--show');
    }
})();
