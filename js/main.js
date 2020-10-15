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
      // let newArrReferences = Array.from(newArr.references);
      // console.log(newArrReferences);
      createNewWrap(newForm, newArr.fields, newArrLabel);
      // createNewReferences(newForm, newArr.references, newArrReferences)
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

    // function createNewReferences(container, wrap, content) {
    //   wrap.forEach (function (item, i) {
    //     item = document.createElement('div');
    //     item.classList.add('new-form__wrap');
    //     createCheckboxForm(item, content[i].text, content[i].input.type, content[i].input.required, content[i].input.checked);
    //     container.appendChild(item);
    //   });
    // }

    const elementsFormTemplate = document.querySelector('#elementsForm');

    function createElementsForm(container, contentLabel, contentInputType, contentInputRequired) {
      var elementsForm = elementsFormTemplate.cloneNode(true).content.querySelector('div');;
      elementsForm.querySelector('label').classList.add('new-form__label');
      elementsForm.querySelector('input').classList.add('new-form__input');
      elementsForm.querySelector('label').textContent = contentLabel;
      elementsForm.querySelector('input').type = contentInputType;
      elementsForm.querySelector('input').required = contentInputRequired;
      container.appendChild(elementsForm);
    }

    // const checkboxFormTemplate = document.querySelector('#checkboxForm');

    // function createCheckboxForm(container, contentLabel, contentInputType, contentInputRequired, contentInputChecked) {
    //   var elementsForm = checkboxFormTemplate.cloneNode(true).content.querySelector('div');;
    //   elementsForm.querySelector('label').classList.add('new-form__label');
    //   elementsForm.querySelector('input').classList.add('new-form__checkbox');
    //   elementsForm.querySelector('label').textContent = contentLabel;
    //   elementsForm.querySelector('input').type = contentInputType;
    //   elementsForm.querySelector('input').required = contentInputRequired;
    //   elementsForm.querySelector('input').checked = contentInputChecked;
    //   container.appendChild(elementsForm);
    // }
   

    function addClassElement (element, className) {
      element.classList.add(className);
    }
})();
