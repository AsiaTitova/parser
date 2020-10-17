'use strict';

(function () {

  const form = document.querySelector('#form');
  const inputFile = form.querySelector('#jsonFile');
  const newForm = document.querySelector('.new-form');
  const resetButton = document.querySelector('.reset');

  // загрузка json файла //

  const btnLoad = document.querySelector('#btnLoad');
  btnLoad.addEventListener('click', () => {
    addClassElement(newForm, 'new-form--show');
    addClassElement(resetButton, 'reset--show');
    createJsonFiles();
  });

  // удаление формы //

  function removeForm() {
    resetButton.addEventListener('click', () => {
      if (newForm) {
        newForm.innerHTML = '';
        removeClassElement(newForm, 'new-form--show');
        removeClassElement(resetButton, 'reset--show');
      }
    });
  }

  removeForm();

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
      createNewWrap(newForm, newArr.fields, newArrLabel);
      if (newArr.references) {
        let newArrReferences = Array.from(newArr.references);
        createNewReferences(newForm, newArr.references, newArrReferences);
      }
      if (newArr.buttons) {
        createNewButton(newForm, newArr.buttons, newArr.buttons);
      }
    }
  }

  //отрисовка button //
    function createNewButton(container, button, content) {
      button.forEach (function (item, i) {
        item = document.createElement('button');
        item.classList.add('new-form__button');
        item.textContent = content[i].text;
        container.appendChild(item);
      });
    }

    // отрисовка label и Input //
    function createNewWrap(container, wrap, content) {
      wrap.forEach (function (item, i) {
        item = document.createElement('div');
        item.classList.add('new-form__wrap');
        createElementsForm(item, content[i].label, content[i].input.type, content[i].input.required);
        container.appendChild(item);
      });
    }

    function createNewReferences(container, wrap, content) {
      for (let item = 0; item < wrap.length; item++) {
        item = document.createElement('div');
        item.classList.add('new-form__wrap');
        createCheckboxForm(item, content[1].text, content[0].input.type, content[0].input.required, content[0].input.checked);
        container.appendChild(item);
      };
    }

    const elementsFormTemplate = document.querySelector('#elementsForm');

    function createElementsForm(container, contentLabel, contentInputType, contentInputRequired) {
      var elementsForm = elementsFormTemplate.cloneNode(true).content.querySelector('div');;
      elementsForm.querySelector('label').classList.add('new-form__label');
      elementsForm.querySelector('input').classList.add('new-form__input');
      elementsForm.querySelector('label').textContent = contentLabel;
      elementsForm.querySelector('label').for = contentLabel;
      elementsForm.querySelector('input').id = contentLabel;
      elementsForm.querySelector('input').type = contentInputType;
      if (elementsForm.querySelector('input').type === 'file') {
        elementsForm.querySelector('input').classList.add('visually-hidden');
        let span = document.createElement('span');
        span.classList.add('form__label--text');
        elementsForm.querySelector('label').appendChild(span);
      }
      elementsForm.querySelector('input').required = contentInputRequired;
      container.appendChild(elementsForm);
    }

    const checkboxFormTemplate = document.querySelector('#checkboxForm');

    function createCheckboxForm(container, contentLabel, contentInputType, contentInputRequired, contentInputChecked) {
      var elementsForm = checkboxFormTemplate.cloneNode(true).content.querySelector('div');;
      elementsForm.querySelector('label').classList.add('new-form__label');
      elementsForm.querySelector('label').classList.add('new-form__label--checkbox');
      elementsForm.querySelector('input').classList.add('new-form__checkbox');
      elementsForm.querySelector('label').textContent = contentLabel;
      elementsForm.querySelector('input').type = contentInputType;
      elementsForm.querySelector('input').required = contentInputRequired;
      elementsForm.querySelector('input').checked = contentInputChecked;
      container.appendChild(elementsForm);
    }
   
    function addClassElement (element, className) {
      element.classList.add(className);
    }
    function removeClassElement (element, className) {
      element.classList.remove(className);
    }

    function addNewJsonFile() {
      let inputs = document.querySelectorAll('.form__input');
      Array.prototype.forEach.call(inputs, function (input) {
        let label = input.nextElementSibling,
          labelVal = label.querySelector('.form__label--text').innerText;
  
        input.addEventListener('change', function (e) {
          let countFiles = '';
          if (this.files && this.files.length >= 1)
            countFiles = this.files.length;
  
          if (countFiles)
            label.querySelector('.form__label--text').innerText = 'Выбрано файлов: ' + countFiles;
          else
            label.querySelector('.form__label--text').innerText = labelVal;
        });
      });
    }

    addNewJsonFile();
})();
