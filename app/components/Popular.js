var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api')

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
					//console.log('Down here', this);
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

function RepoGrid (props) {
  return (
  	<ul className='popular-list'>
  	  {
  	  	props.repos.map(function (repo,index) {
	  	  	<li key={repo.name} className='popular-item'>
	  	  	  <div className='popular-rank'>#{index + 1}</div>
	  	  	  <ul className='space-list-items'>
	  	  	    <li>
	  	  	      <img 
	  	  	        className='avatar'
	  	  	        src={repo.owner.avatar_url}
	  	  	        alt={'Avatar for ' + repo.owner.login} />
	            </li>
	  	  	  </ul>
	  	  	</li>
  	  	})}
  		</ul>}
  		)
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

	componentDidMount() {
		this.updateLanguage(this.state.selectedLanguage);
	}

	updateLanguage(lang) {
		this.setState(function(){
			return {
				selectedLanguage: lang,
				repos: null
			}
		});

		api.fetchPopularRepos(this.state.selectedLanguage)
		  .then(function (repos) {
		  	console.log('fetching popular repo{%s}', this.state.selectedLanguage);
		  	this.setState(function () {
		  		return {
		  			repos: repos
		  		}
		  	});
		 	}.bind(this));
	}
	render() {
		//console.log('Up here!', this);
		
		return (
			<div>
				<SelectLanguage
					selectedLanguage={this.state.selectedLanguage}
					onSelect={this.updateLanguage}
				/>
				<RepoGrid repos={this.state.repos} />
				
			</div>
		)
	}
}

module.exports = Popular;