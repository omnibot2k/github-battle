var React = require('react');

class Popular extends React.Component {
	constructor (props) {
		super(props);

		//set the default state
		this.state = {
			selectedLanguage: 'All'
		};

        //define a new function this.function that is always bound to this object
		this.updateLanguage = this.updateLanguage.bind(this);
	}
	updateLanguage(lang) {
		this.setState(function(){
			return {
				selectedLanguage: lang
			}
		});
	}
	render() {
		var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']
		console.log('Up here!', this);
		
		return (
		  <ul className='languages'>
		    <p>Selected language: {this.state.selectedLanguage}</p>
		    { 
		      languages.map(function (lang){
		      
			    //prior to passing the second param this to map this was undefined!!	
			    console.log('Down here', this);
			   	  
			   	return (
			   	  <li 
			   	    style = {lang === this.state.selectedLanguage ? {color : '#d0021b'} : null}
	                onClick={this.updateLanguage.bind(null, lang)}
			   	  	key={lang}>
			   	  	{lang}
			   	  </li>
			   	 )
			  }, this)}
		  </ul>
		)
	}
}

module.exports = Popular;