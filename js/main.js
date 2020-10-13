'use strict';

(function () {

  const form = document.querySelector('#form');
  const inputFile = form.querySelector('#jsonFile');

  // загрузка json файла //

  const btnLoad = document.querySelector('#btnLoad');
  btnLoad.addEventListener('click', () => {
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
    }
  }

  //отрисовка новой формы //

  var newFormTemplate = document.querySelector('#newForm').content.querySelector('.newForm__container');

  // копирование шаблона //
  function createNewForm() {
    var newForm = newFormTemplate.cloneNode(true);
    createLabel(newForm, newArr.fields.label);
  }


  //отрисовка label //
  function createLabel(container, label) {
    for (var i = 0; i < label.length; i++) {
      var labelItem = document.createElement('label');
      labelItem.classList.add('form__label');
      labelItem.textContent = label[i];
      container.appendChild(labelItem);
    }
  }

  // отрисовка input //
  function createInputs(container, input) {
    for (var i = 0; i < input.length; i++) {
      var inputItem = document.createElement('input');
      inputItem.classList.add('form__input');
      container.querySelector('.form__wrapper').appendChild(inputItem);
    }
  }

})();
