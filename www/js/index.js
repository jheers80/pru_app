/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

function findObjectBykey(array,key,value) {
  for (var i=0;i<array.length;i++) {
    if (array[i][key]===value) {
      return array[i];
    }
  }
  return null;
}

var app = {
    "history":[],
    "pages":[
        {"name":"Home","options":{"onClick":"app.changePage();"}, "html":"homeHTML"},
        {"name":"Side By Side","options":{"onClick":"app.changePage();"}, "html":"sxsHTML"},
        {"name":"Evaluation","options":{"onClick":"app.changePage();"},"html":"evalHTML"},
        {"name":"PRU.com","href":"http://pizzaranchuniversity.com","target":"_blank"},
        //{"name":"Login","options":{"onClick":"app.changePage(app.pages[4]);"},"html":"loginHTML"},
        {"name":"&#9776;", "class":"icon","options":{"onClick":"app.menuDraw();return false;"}}
      ],
      drawNav:function(curr_page=this.pages[0].name) {
        function formNavLink(name, href="#", target="", cl="", curr_page="",options={}) {
          var t="<a href=\""+href+"\"";
          t+= (cl?" class='"+cl+(curr_page==name?" active'":"'"):(curr_page==name?" class='active'":""));
          for (o in options) {
            t+= " "+o+"='"+options[o]+"'";
          }
          t += (target?" target='"+target+"'":"") +">"+name;
          t += "</a>\n";
          return t;
        }
        var nav="<nav class='topnav' id='myTopnav'>";
        var pg;
        for (var i=0;i<this.pages.length;++i) {
          pg=this.pages[i];
          nav+=formNavLink(pg.name, pg.href, pg.target, pg.class,curr_page,pg.options);
        }
        nav +="</nav>";
        return nav;
      },
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        this.history=[];
        this.history.push(this.pages[0].name);
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);

    },
    changePage:function(e) {
      e=e||window.event;
      var target=e.target || e.srcElement,
      text=target.textContent || text.innerText;
      if (!text) {text=this.pages[0].name;}
      e.preventDefault();
      var pageObj=findObjectBykey(this.pages,"name",text);
      event.preventDefault();
      app.history.push(pageObj.name);
      var maincontent=document.getElementById('maincontent');
      var header=document.getElementById('header');
      //Re-draw header to reflect new active "page"
      header.innerHTML=this.drawNav(pageObj.name);
      //re-draw maincontent to display html given by function in 'html' property
      maincontent.innerHTML=this[pageObj.html]();
      console.log("Page Change: "+pageObj.name);
      return false;
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        var header=document.getElementById('deviceready').querySelector('#header');
        header.innerHTML=app.drawNav();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        receivedElement.innerHTML=this.homeHTML();
        console.log('Received Event: ' + id);
    },

    homeHTML: function() {
      var h="<h2>Welcome!</h2>\n<p>This is the  new home for all the training materials to train team members.  There are 3 Phases to our training system.</p>  <h3>Phase 1: Online Training</h3>\n<p>Phase 1 is the online portion of out training.  You will take 1 or more CBTs (Computer Based Training) modules for the learning program you have been assigned.  These modules will show you the basics of how to complete the tasks associated with your new job role.</p>\n<h3>Phase 2: Side by Side Training</h3>\n<p>Phase 2 is the side by side training that takes place in the restaurant and on the job.  The training is in an outline format so you can easily follow it, while still making sure all the necessary training points are met. This is the time where you will explain how to do the job, including any restaurant specific items. Focus on getting the new team member to a point where they can work independently, and be placed on the schedule. That\'s something we call \"Schedulable\".</p>\n<h3>Phase 3: Evaluation</h3>\n<p>How will you know if they are Schedulable? Only through observation and evaluation. Take a shift sometime after they\'ve been through the side by side training and watch their work. Follow the evaluation Criteria to see if they meet your standards.  If they do, great, they are ready to work on their own. If not, either have them practice more with a trainer, or spend time retraining.</p>";
      return h;
    },
    sxsHTML:function() {
      var h="<h2>Side By Side</h2>";
      //Draw List of Job jobrole
      h+="<div id='jobrolelist'>"
      h+="<ul>"
      for (var i=0;i<jr_list.length;++i) {
        var jr=jr_list[i];
        h+="<li><a href='#' onClick='app.showSXS();'>"+jr.name+"</a></li>";
      }
      h+="</ul>";
      h+="</div>";
      return h;
    },
    showSXS: function(e) {
      e=e||window.event;
      var target=e.target || e.srcElement,
      text=target.textContent || text.innerText;
      e.preventDefault();
      var jr=findObjectBykey(jr_list,"name",text);
      var t="";
      var outline="";
      if (typeof jr !=="object") {
        t+="No Job Role found...";
        console.log(t);
        return false;
      } else {
        outline=drawOutline(jr.sxs);
        outline=(!jr.sxs.isEmpty()?drawOutline(jr.sxs):"No Data Found.");
        var jrlistcontent=document.getElementById('jobrolelist');
        jrlistcontent.innerHTML="<div class='outline'><h3>"+jr.name+"</h3>"+outline+"</div>";
      }
    },
    evalHTML: function() {
      var h="<h2>Side By Side</h2>";
      //Draw List of Job jobrole
      h+="<div id='jobrolelist'>"
      h+="<ul>"
      for (var i=0;i<jr_list.length;++i) {
        var jr=jr_list[i];
        h+="<li><a href='#' onClick='app.showEval();'>"+jr.name+"</a></li>";
      }
      h+="</ul>";
      h+="</div>";
      return h;
    },
    showEval: function(e) {
      e=e||window.event;
      var target=e.target || e.srcElement,
      text=target.textContent || text.innerText;
      e.preventDefault();
      var jr=findObjectBykey(jr_list,"name",text);
      var t="";
      var outline="";
      if (typeof jr !=="object") {
        t+="No Job Role found...";
        console.log(t);
        return false;
      } else {
        outline=drawOutline(jr.eval);
        outline=(!jr.eval.isEmpty()?drawOutline(jr.eval):"No Data Found.");
        var jrlistcontent=document.getElementById('jobrolelist');
        jrlistcontent.innerHTML="<div class='outline'><h3>"+jr.name+"</h3>"+outline+"</div>";
      }
    },
    loginHTML:function() {
      var h="<h2>Login</h2>";
      h+="<form><label for='email'>Email</label><input type='email' name='email' id='email'>";
      h+="<label for='password'>Password</label><input type='text' name='password' id='password'>"
      h+="<input type='submit' value='Login'>";
      h="<h2>Login funtionality not implemented</h2>";
      return h;
    },
    menuDraw:function() {
      var x = document.getElementById("myTopnav");
      if (x.className === "topnav") {
        x.className += " responsive";
      } else {
        x.className = "topnav";
      }
    }
};
