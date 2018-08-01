// Dom7
var $$ = Dom7;

// Theme
var theme = 'auto';
if (document.location.search.indexOf('theme=') >= 0) {
  theme = document.location.search.split('theme=')[1].split('&')[0];
}

//googleapis


// Init App
var app = new Framework7({
  id: 'io.framework7.testapp',
  root: '#app',
  touch:{materialRipple:false, },
  theme: theme,
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');

    },
  },
  routes: routes,
  vi: {
    placementId: 'pltd4o7ibb9rc653x14',
  },
});
