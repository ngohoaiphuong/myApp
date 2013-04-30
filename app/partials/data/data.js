var myAppData = {
  "options":{
    "dialog":{
      "backdrop": true,
      "keyboard": true,
      "backdropClick": true,
      "controller": "DialogController"
    },
    "default":{
      "url": "partials/template/",
      "img":"assets/img/languages/", 
      "lang":"en",
      "username":"",
      "hostlink": "http://www.techpropulsionlabs.com",
      "hostname": "TechPropulsionLabs"
    },
    "map":{
      "lat":10.796865,
      "lng":106.66486,
      "zoom":16,
      "zoomControl": false,
      "panControl": false,
      "draggable": false,
      "mapMaker": true,
      "scrollwheel": false
    }
  },
  "menus":{
    "top_menu":{
      "account":[
        {"name":"login", "url":"#/login"},
        {"name":"help", "url":"#/help"}
      ],
      "language":[
        {"name":"vietnamese", "short":"vi", "url":"#/switch"},
        {"name":"english", "short":"en", "url":"#/switch"}
      ]
    },
    "main_menu":[
      {"name":"tutorial", "url":"#/tutorial"}, 
      {"name":"events", "url":"#/events"},
      {"name":"projects", "url":"#/projects"}
    ],
    "footer_menu":[
      {"name":"about", "url":"#/about"}, 
      {"name":"contact", "url":"#/contact"},
      {"name":"wikis", "url":"#/wikis"}
    ]
  },
  "templates":{
    "footer":"partials/layout/footer.html",
    "header":"partials/layout/header.html",
    "about":"partials/template/about.html",
    "contact":"partials/template/contact.html",
    "event":"partials/template/events.html",
    "home":"partials/template/home.html",
    "login":"partials/template/login.html",
    "project":"partials/template/projects.html",
    "tutorial":"partials/template/tutorial.html",
    "welcome":"partials/welcome.html"
  }
};

myAppData.route = [
  { "when":"/", "controller":"HomeCtrl" },
  { "when":"/about", "controller":"AboutCtrl" },
  { "when":"/tutorial", "controller":"TutorialCtrl" },
  { "when":"/events", "controller":"EventsCtrl" },
  { "when":"/login", "controller":"LoginCtrl" },
  { "when":"/projects", "controller":"ProjectsCtrl" },
  { "when":"/contact", "controller":"ContactCtrl" },
  { "when":"/wikis", "controller":"WikisCtrl" }
];

myAppData.generateURL = function(lang, name){
  if(!lang){
    lang = 'en';
  }

  var url = this.options.default.url + lang + name + '.html';
  return url;
};
