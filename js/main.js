'use strict';

(function () {

  const form = document.querySelector('#form');
  const inputFile = form.querySelector('#jsonFile');
  const newForm = document.querySelector('.new-form');
  const resetButton = document.querySelector('.reset');
  const elementsFormTemplate = document.querySelector('#elementsForm');
  const checkboxFormTemplate = document.querySelector('#checkboxForm');
  const selectFormTemplate = document.querySelector('#selectForm');

  // загрузка json файла //

  const btnLoad = document.querySelector('#btnLoad');
  btnLoad.addEventListener('click', () => {
    addClassElement(newForm, 'new-form--show');
    addClassElement(resetButton, 'reset--show');
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
      let newArrLabel = Array.from(newArr.fields);
      newForm.innerHTML = '';
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
        createElementsForm(item, content[i].label, content[i].input.type, content[i].input.required, content[i].input.placeholder, content[i].input.multiple, content[i].input.filetype, content[i].input.mask, content[i].input.technologies);
        container.appendChild(item);
      });
    }

    function createNewReferences(container, wrap, content) {
      for (let i = 0; i < wrap.length; i++) {
        let item = document.createElement('div');
        item.classList.add('new-form__wrap');
        if (content[i].input) {
          item.classList.add('new-form__checkbox');
          createCheckboxForm(item, content[i].input.type, content[i].input.required, content[i].input.checked);
        } else {
          item.classList.add('new-form__link');
          createReferencesForm(item, content[i].text, content[i].ref);
        }
        container.appendChild(item);
      };
    }

    // создание и заполнение Label и Input контентом и атрибутами //

    function createElementsForm(container, contentLabel, contentInputType, contentInputRequired, contentInputPlaceholder, contentInputMultiple, contentInputFiletype, contentInputMask, contentTechnology) {
      var elementsForm = elementsFormTemplate.cloneNode(true).content.querySelector('div');;
      elementsForm.querySelector('label').classList.add('new-form__label');
      elementsForm.querySelector('input').classList.add('new-form__input');
      elementsForm.querySelector('label').textContent = contentLabel;
      elementsForm.querySelector('label').for = contentLabel;
      elementsForm.querySelector('input').id = contentLabel;
      elementsForm.querySelector('input').type = contentInputType;
      if (contentInputPlaceholder) {
        elementsForm.querySelector('input').placeholder = contentInputPlaceholder;
      }

      if (contentInputFiletype) {
        let newArrFiletype = Array.from(contentInputFiletype);
        elementsForm.querySelector('input').accept = newArrFiletype;
        elementsForm.querySelector('input').multiple = contentInputMultiple;
      }
      if (contentInputMask) {
        elementsForm.querySelector('input').placeholder = contentInputMask;
      }
      if (contentInputType === 'technology') {
        elementsForm.querySelector('input').classList.add('visually-hidden');
        createSelectForm(elementsForm, contentTechnology, contentInputMultiple);
      }
      elementsForm.querySelector('input').required = contentInputRequired;
      container.appendChild(elementsForm);
    }

    // создание и заполнение select контентом и атрибутами //

    function createSelectForm (container, contentTechnology, contentInputMultiple) {
      let elementSelect = selectFormTemplate.cloneNode(true).content.querySelector('select');
      elementSelect.classList.add('new-form__select');
      elementSelect.multiple = contentInputMultiple;
      let newArrTechnologies = Array.from(contentTechnology);
      newArrTechnologies.forEach(function (item, i) {
        item = document.createElement('option');
        item.classList.add('new-form__option');
        item.textContent = newArrTechnologies[i];
        elementSelect.appendChild(item);
      });
      container.appendChild(elementSelect);
    }

    // создание и заполнение Checkbox контентом и атрибутами //

    function createCheckboxForm(container, contentInputType, contentInputRequired, contentInputChecked) {
      var elementsForm = checkboxFormTemplate.cloneNode(true).content.querySelector('div');
      elementsForm.querySelector('input').type = contentInputType;
      elementsForm.querySelector('input').required = contentInputRequired;
      elementsForm.querySelector('input').checked = contentInputChecked;
      container.appendChild(elementsForm);
    }

    // создание и заполнение ссылок контентом и атрибутами //

    function createReferencesForm(container, contentText, contentRef) {
      let elementsForm = document.createElement('a');
      elementsForm.classList.add('new-form__ref');
      elementsForm.textContent = contentText;
      elementsForm.href = contentRef;
      container.appendChild(elementsForm);
    }

    // вспомогательные функции //
   
    function addClassElement (element, className) {
      element.classList.add(className);
    }
    function removeClassElement (element, className) {
      element.classList.remove(className);
    }

  // маска для поля input type //

  function setMaskForInputFile() {
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

  setMaskForInputFile();
  removeForm();
})();
