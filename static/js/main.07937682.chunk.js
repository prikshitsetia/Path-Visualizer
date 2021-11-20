(this["webpackJsonppath-visualizer"]=this["webpackJsonppath-visualizer"]||[]).push([[0],{14:function(e,t,n){},15:function(e,t,n){},16:function(e,t,n){},18:function(e,t,n){},19:function(e,t,n){"use strict";n.r(t);var i=n(2),s=n.n(i),a=n(9),o=n.n(a),r=(n(14),n(15),n(1)),c=n(3),l=n(4),u=n(6),d=n(5),h=(n(16),n(0)),f=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){var e=this.props,t=e.col,n=e.isFinish,i=e.isStart,s=e.isWall,a=e.onMouseDown,o=e.onMouseEnter,r=e.onMouseUp,c=e.onClick,l=e.row,u=n?"node-finish":i?"node-start":s?"node-wall":null;return Object(h.jsx)("div",{id:"node-".concat(l,"-").concat(t),className:"node ".concat(u),onMouseDown:function(){return a(l,t)},onMouseEnter:function(){return o(l,t)},onMouseUp:function(){return r(l,t)},onClick:function(){return c(l,t)}})}}]),n}(i.Component),v=n(7);function j(e,t,n){var i=[];t.distance=0;for(var s=function(e){var t,n=[],i=Object(v.a)(e);try{for(i.s();!(t=i.n()).done;){var s,a=t.value,o=Object(v.a)(a);try{for(o.s();!(s=o.n()).done;){var r=s.value;n.push(r)}}catch(c){o.e(c)}finally{o.f()}}}catch(c){i.e(c)}finally{i.f()}return n}(e);s.length;){b(s);var a=s.shift();if(!a.isWall){if(a.distance===1/0)return i;if(a.isVisited=!0,i.push(a),a===n)return i;g(a,e)}}}function b(e){e.sort((function(e,t){return e.distance-t.distance}))}function g(e,t){var n,i=function(e,t){var n=[],i=e.col,s=e.row;s>0&&n.push(t[s-1][i]);s<t.length-1&&n.push(t[s+1][i]);i>0&&n.push(t[s][i-1]);i<t[0].length-1&&n.push(t[s][i+1]);return n.filter((function(e){return!e.isVisited}))}(e,t),s=Object(v.a)(i);try{for(s.s();!(n=s.n()).done;){var a=n.value;a.distance=e.distance+1,a.previousNode=e}}catch(o){s.e(o)}finally{s.f()}}var m=[-1,0,1,0],p=[0,1,0,-1];function O(e,t,n){return!(t<0||n<0||t>=e.length||n>=e[0].length)&&(!e[t][n].isVisited&&!e[t][n].isWall)}n(18);var k=10,S=15,x=10,y=35,N=10,C=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(){var e;return Object(c.a)(this,n),(e=t.call(this)).state={grid:[],mouseIsPressed:!1,isStartNodeClicked:!1,isVisualizing:!1,isFinishNodeClicked:!1},e}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=w();this.setState({grid:e})}},{key:"handleMouseDown",value:function(e,t){if(!this.state.isStartNodeClicked){var n=M(this.state.grid,e,t);this.setState({grid:n,mouseIsPressed:!0})}}},{key:"handleMouseEnter",value:function(e,t){if(this.state.mouseIsPressed&&!this.state.isStartNodeClicked){var n=M(this.state.grid,e,t);this.setState({grid:n})}}},{key:"handleMouseClick",value:function(e,t){if(this.state.isStartNodeClicked){var n=F(this.state.grid,e,t);this.setState({grid:n,isStartNodeClicked:!1,mouseIsPressed:!1}),k=e,S=t}else if(this.state.isFinishNodeClicked){var i=P(this.state.grid,e,t);this.setState({grid:i,isFinishNodeClicked:!1,mouseIsPressed:!1}),x=e,y=t}else e===k&&t===S?this.setState({isStartNodeClicked:!0,mouseIsPressed:!1}):e===x&&t===y&&this.setState({isFinishNodeClicked:!0,mouseIsPressed:!1})}},{key:"handleMouseUp",value:function(e,t){this.setState({mouseIsPressed:!1})}},{key:"resetBoard",value:function(){for(var e=w(),t=0;t<20;t++)for(var n=0;n<50;n++)document.getElementById("node-".concat(t,"-").concat(n)).className=t===k&&n===S?"node node-start":t===x&&n===y?"node node-finish":"node";this.setState({grid:e})}},{key:"clearPath",value:function(){for(var e=w(),t=0;t<20;t++)for(var n=0;n<50;n++)t===k&&n===S?document.getElementById("node-".concat(t,"-").concat(n)).className="node node-start":t===x&&n===y?document.getElementById("node-".concat(t,"-").concat(n)).className="node node-finish":this.state.grid[t][n].isWall?(document.getElementById("node-".concat(t,"-").concat(n)).className="node node-wall",e[t][n].isWall=!0,e[t][n].isVisited=!1):this.state.grid[t][n].isVisited&&(document.getElementById("node-".concat(t,"-").concat(n)).className="node",e[t][n].isVisited=!1);this.setState({grid:e})}},{key:"animateAlgo",value:function(e,t){for(var n=this,i=function(i){if(i===e.length)return setTimeout((function(){n.animateShortestPath(t)}),N*i),{v:void 0};setTimeout((function(){var t=e[i];document.getElementById("node-".concat(t.row,"-").concat(t.col)).className="node node-visited"}),N*i)},s=0;s<=e.length;s++){var a=i(s);if("object"===typeof a)return a.v}}},{key:"animateShortestPath",value:function(e){for(var t=function(t){setTimeout((function(){var n=e[t];document.getElementById("node-".concat(n.row,"-").concat(n.col)).className="node node-shortest-path"}),N*t*2)},n=0;n<e.length;n++)t(n);this.setState({isVisualizing:!1})}},{key:"visualizeAlgo",value:function(e){var t=e.target.value;this.setState({isVisualizing:!0});var n=this.state.grid,i=n[k][S],s=n[x][y],a=null;switch(t){case"dijkstra":a=j(n,i,s);break;case"bfs":a=function(e,t,n){var i=[],s=[e[t.row][t.col]];for(e[t.row][t.col].isVisited=!0;0!==s.length;){var a=s[0],o=a.row,r=a.col;if(e[o][r].isFinish)return i.push(a),i;s.shift();for(var c=0;c<4;c++){var l=o+m[c],u=r+p[c];O(e,l,u)&&(s.push(e[l][u]),e[l][u].isVisited=!0,e[l][u].previousNode=a)}i.push(a)}return i}(n,i)}var o=function(e){var t=[],n=e;for(;null!==n;)t.unshift(n),n=n.previousNode;return t}(s);this.animateAlgo(a,o)}},{key:"speedHandler",value:function(e){N="fast"===e.target.value?10:"average"===e.target.value?20:40}},{key:"render",value:function(){var e=this,t=this.state,n=t.grid,i=t.mouseIsPressed;return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsxs)("nav",{className:"main-nav",children:[Object(h.jsx)("div",{className:"logo",children:Object(h.jsxs)("h2",{children:[Object(h.jsx)("span",{children:"P"}),"ath ",Object(h.jsx)("span",{children:"V"}),"isualizer"]})}),Object(h.jsx)("div",{className:"menu-link",children:Object(h.jsxs)("ul",{children:[Object(h.jsx)("li",{children:Object(h.jsxs)("select",{name:"algo",id:"algoList",onChange:function(t){return e.visualizeAlgo(t)},disabled:this.state.isVisualizing,children:[Object(h.jsx)("option",{value:"dijkstra",children:"Dijkstra"}),"\xa0",Object(h.jsx)("option",{value:"bfs",children:"BFS"})]})}),Object(h.jsx)("li",{children:Object(h.jsx)("button",{disabled:this.state.isVisualizing,className:"button",onClick:function(){return e.resetBoard()},children:"Reset Board"})})," ",Object(h.jsx)("li",{children:Object(h.jsx)("button",{disabled:this.state.isVisualizing,className:"button",onClick:function(){return e.clearPath()},children:"Clear Path"})})," ",Object(h.jsx)("li",{children:Object(h.jsxs)("select",{name:"speed",id:"speedList",onChange:function(t){return e.speedHandler(t)},children:[Object(h.jsx)("option",{selected:!0,value:"fast",children:"Fast"}),"\xa0",Object(h.jsx)("option",{value:"average",children:"Average"}),Object(h.jsx)("option",{value:"slow",children:"Slow"})]})})]})})]}),Object(h.jsx)("div",{className:"grid",children:n.map((function(t,n){return Object(h.jsx)("div",{children:t.map((function(t,n){var s=t.row,a=t.col,o=t.isFinish,r=t.isStart,c=t.isWall;return Object(h.jsx)(f,{col:a,isFinish:o,isStart:r,isWall:c,mouseIsPressed:i,onMouseDown:function(t,n){return e.handleMouseDown(t,n)},onMouseEnter:function(t,n){return e.handleMouseEnter(t,n)},onMouseUp:function(){return e.handleMouseUp(s,a)},row:s,onClick:function(){return e.handleMouseClick(s,a)}},n)}))},n)}))})]})}}]),n}(i.Component),w=function(){for(var e=[],t=0;t<20;t++){for(var n=[],i=0;i<50;i++)n.push(I(i,t));e.push(n)}return e},I=function(e,t){return{col:e,row:t,isStart:t===k&&e===S,isFinish:t===x&&e===y,distance:1/0,isVisited:!1,isWall:!1,previousNode:null}},M=function(e,t,n){var i=e.slice(),s=i[t][n],a=Object(r.a)(Object(r.a)({},s),{},{isWall:!s.isWall});return i[t][n]=a,i},F=function(e,t,n){var i=e.slice(),s=i[t][n],a=Object(r.a)(Object(r.a)({},s),{},{isStart:!0,isWall:!1}),o=i[k][S],c=Object(r.a)(Object(r.a)({},o),{},{isStart:!1,isWall:!1});return i[k][S]=c,i[t][n]=a,i},P=function(e,t,n){var i=e.slice(),s=i[t][n],a=Object(r.a)(Object(r.a)({},s),{},{isFinish:!0,isWall:!1}),o=i[x][y],c=Object(r.a)(Object(r.a)({},o),{},{isFinish:!1,isWall:!1});return i[x][y]=c,i[t][n]=a,i};var V=function(){return Object(h.jsx)("div",{className:"App",children:Object(h.jsx)(C,{})})},W=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,20)).then((function(t){var n=t.getCLS,i=t.getFID,s=t.getFCP,a=t.getLCP,o=t.getTTFB;n(e),i(e),s(e),a(e),o(e)}))};o.a.render(Object(h.jsx)(s.a.StrictMode,{children:Object(h.jsx)(V,{})}),document.getElementById("root")),W()}},[[19,1,2]]]);
//# sourceMappingURL=main.07937682.chunk.js.map