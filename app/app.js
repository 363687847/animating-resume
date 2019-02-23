import React from "react";
import ReactDOM from "react-dom";
import StyleEditor from "./StyleEditor.js";
import ResumeEditor from "./ResumeEditor.js";
import "./style/reset.css";
import Prism from "prismjs";
import co from "co";

class ReactClass extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			style: "",
		};
		this.interval = 40;
		this.resumeEditorContent = `
# HUI CHEN

### Basic Information

* Personal info: Hui Chen/Male
* School: University of Houston
* Major:Computer Science
* Location: Houston, TX

### Contact

* Website: 363687847.github.io
* Email: c0922h@gmail.com

### Skills

* HTML
* CSS
* Javascript
* C/C++
* Assembly
* SQL
* Python(new)
* Bootstrap(new)
* React(new)
* Node.js(new)

### Skill detail

> HTML / CSS
>Building website with different style etc.
> C / C++
>Trafficing simulation by it's direction and maximum number of cars per direction etc. 
> Javascript
>Made modules for address validation from USPS API and currency broker for Software Design
> Node.js
>Made my own discord bot using node,js
> React
>Building animated resume with React/Javascript/HTML


### What do I think of Myself

* Eager to learn
* Love doing what I like without hestitation
* Horror movie lover

** Github: **https://github.com/363687847
** Markdown: https://363687847.github.io/**

> If u like it，Fork [PROJECT](https://github.com/363687847/)，BUILD YOUR OWN VERSION！`;

		this.styleEditorContent = [`/*
* Inspired by http://strml.net/
*
* HOWDY, my name is HUI CHEN
*
* I found some animated resume pages, it's pretty cool, so i decided to make one for myself
* Hope you like it too! :)
*/

/* Let's get started by adding elements */
* {
  -webkit-transition: all .3s;
  transition: all .3s;
}
/* change the background */
html {
  color: #888; background: rgb(222,222,222);
}
/* lets add some more style to the text~~ */
.styleEditor {
  background-color: #303030;
  padding: .5em;
  border: 1px solid;
  margin: .5em;
  overflow: auto;
  width: 45vw; height: 90vh;
}
/* As a programmer，gotta make your color look better and easy to distinguish */
.token.comment{ color: #857F6B; font-style: italic; }
.token.selector{ color: #E86E75; }
.token.property{ color: #F78C6C; }
.token.punctuation{ color: #88DCFE; }
.token.function{ color: #82AAFF; }

/* add some more 3D effect to make it look cool */
html{
  -webkit-perspective: 1000px;
          perspective: 1000px;
}
.styleEditor {
	margin-top: 50px;
  position: fixed; left: 0; top: 0;
  -webkit-transition: none;
  transition: none;
  -webkit-transform: rotate(-10deg) translateZ(-100px) ;
          transform: rotate(-10deg) translateZ(-100px) ;
}
/* Do you like!？ */

/* Ok, next, i gonna need to make a editor to save my resume information */
.resumeEditor{
  position: fixed; right: 0; top: 0;
  padding: .5em;  margin: 1.5em;
  width: 48vw; height: 90vh;
  border: 1px solid;
  background: white; color: #222;
  overflow: auto;
	-webkit-transform: rotate(10deg) translateZ(-100px) ;
          transform: rotate(10deg) translateZ(-100px) ;
}

/* Time to start putting stuff down */
`,
`
/* Am i missing something!?
 * Yep，it's formmated in Markdown, i need to adjust a bit
 * By using open source tool to convert to HTML, Here we go!!!
 *           3
 *           2
 *           1
 *         BINGO！
 */
`,
`
/* add some more HTML elements */
.resumeEditor{
  padding: 2em;
}
.resumeEditor h1{
  display: block;
  width: 80px;
  margin: 0 auto;
}
.resumeEditor h2{
  display: inline-block;
  border-bottom: 1px solid;
  margin: 1em 0 .5em;
}
.resumeEditor h3{
	display: inline-block;
	margin: 0.5em 0;
}
.resumeEditor a{
	color: #000;
}
.resumeEditor ul{
	list-style: none;
}
/* Almost there o(≧v≦)o~~ */
.resumeEditor ul>li::before {
	content: "•";
	margin-left: 1em;
	margin-right: 0.5em;
}
.resumeEditor blockquote {
  margin: 1em;
  padding: .5em;
  background: #ddd;
	overflow: scroll;
}
/*
* Hope you like it, LAST UPDATE: FEB, 2019
*/
`];
	}

	addToStyle(char) {
		this.setState({
			style: this.state.style + char,
		});
	}

	replaceStyle(style) {
		this.setState({
			style: style,
		});
	}

	replaceStyleEditorContent() {

	}

	showStyleEditorContent(n) {
		let lastContentLength = 0;
		if (n !== 0) {lastContentLength = this.state.style.length;}
		let style = this.styleEditorContent[n];
		let len = style.length;
		return new Promise((resolve, reject) => {
			let showStyle = function () {
				let currentLen = this.state.style.length - lastContentLength;
				if (currentLen < len) {
					let char = style.substring(currentLen, currentLen+1);
					this.refs.StyleEditor.addToContent(char);
					this.addToStyle(char);
					setTimeout(showStyle, this.interval);
				} else {
					resolve();
				}
			}.bind(this);
			showStyle();
		});
	}

	showResumeContent() {
		let content = this.resumeEditorContent;
		let len = content.length;
		return new Promise((resolve, reject) => {
			let showContent = function() {
				let currentLen = this.refs.ResumeEditor.getCurrentContentLength();
				if (currentLen < len) {
					let char = content.substring(currentLen, currentLen+1);
					this.refs.ResumeEditor.addToContent(char);
					setTimeout(showContent, this.interval);
				} else {
					resolve();
				}
			}.bind(this);
			showContent();
		});
	}

	setResumeMarkdown() {
		return new Promise((resolve, reject) => {
			setTimeout(this.refs.ResumeEditor.setIsMarkdown(true), this.interval);
			resolve();
		});
	}

	async startShow() {
		await this.showStyleEditorContent(0).then(function() {console.log('done! show Content 0')});
		await this.showResumeContent();
		await this.showStyleEditorContent(1).then(function() {console.log('done! show Content 1')});
		await this.setResumeMarkdown();
		await this.showStyleEditorContent(2).then(function() {console.log('done! show Content 2')});
	}

	componentDidMount() {
		this.startShow();
		console.log(111);
		// this.refs.StyleEditor.replaceContent(this.content[0]);
		// this.replaceStyle(this.content[0]);
		// this.refs.ResumeEditor.replaceContent("");
	}

	render() {
		return (
			<div>
				<StyleEditor ref="StyleEditor" />
				<ResumeEditor ref="ResumeEditor" />
				<style>{this.state.style}</style>
			</div>);
	}
}
ReactDOM.render(<ReactClass />, document.getElementById("content"));
