import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from '../../helpers/i18n';
import SearchArea from '../../visual-components/search-area';
import { searchPokemonName } from '../../store/actions/search-area';
import Router from 'next/router';

class SearchAreaContainer extends Component {
  onSuggestItemClick = id => {
    this.props.searchPokemonName('');
    Router.push(`/pokemons?id=${id}`, `/pokemons/${id}`).then(() => window.scrollTo(0, 0));
  };

  render() {
    const { t, lang, searchPokemonName, isLoading, data, error } = this.props;
    return (
      <SearchArea
        searchPokemonName={searchPokemonName}
        isLoading={isLoading}
        data={data}
        error={error}
        onSuggestItemClick={this.onSuggestItemClick}
        lang={lang}
      />
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.searchArea.isLoading,
  data: state.searchArea.data,
  error: state.searchArea.error
});

const mapDispatchToProps = dispatch => ({
  searchPokemonName: (name, isfullsearch) => {
    dispatch(searchPokemonName(name, isfullsearch));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(SearchAreaContainer));
