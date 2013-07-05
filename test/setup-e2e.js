
var div = document.getElementById('el')
  , query = require('query')
  , Select = require('select-dropdown')

  , select = new Select([{
    value: 10, title: 'Ten', selected: true
  }, {
    value: 20, title: 'Twenty'
  }], query('#el'))

  , select2 = new Select([{
    value: 'active',
    'class': 'active',
    title: 'Active',
    selected: true
  }, {
    value: 20,
    title: 'Twenty'
  }], query('#colored'))

  , selectHTML = new Select([{
    value: 'blue',
    html: '<span class="circle blue"></span> blue',
    selected: true
  }, {
    value: 'green',
    html: '<span class="circle green"></span> green'
  }, {
    value: 'yellow',
    html: '<span class="circle yellow"></span> yellow'
  }], query('#html'));

select.on('select', function (value) {
  console.log('selected', value);
});

select2.on('select', function (value) {
  console.log('selected 2', value);
});

selectHTML.on('select', function (value) {
  console.log('selected html', value);
});
