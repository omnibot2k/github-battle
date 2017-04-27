var React = require('react');
var PropTypes = require('prop-types');

class SelectLanguage extends React.Component {

	render() {
		var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']

    return (
	    
	    //when moving this up here replace state with props
	    //  state lives in popular component		
			<ul className='languages'>
				<p>Selected language: {this.props.selectedLanguage}</p>
				{ 
					languages.map(function (lang){
						
					//prior to passing the second param this to map this was undefined!!	
					console.log('Down here', this);
					return (			
						<li 
							style = {lang === this.props.selectedLanguage ? {color : '#d0021b'} : null}
									onClick={this.props.onSelect.bind(null, lang)}
							key={lang}>
								{lang}
						</li>
					)
				}, this)}
			</ul>	
		)
	}
}

SelectLanguage.propTypes = {
	selectedLanguage: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired,
}


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
		console.log('Up here!', this);
		
		return (
			<div>
				<SelectLanguage
					selectedLanguage={this.state.selectedLanguage}
					onSelect={this.updateLanguage}
				/>
			</div>
		)
	}
}

module.exports = Popular;