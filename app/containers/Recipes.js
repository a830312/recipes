import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadRecipes, triggerPagination, handleFilterClicked, handleStarRecipe,
  LOADED_RECIPES_PAGIN, LOADED_RECIPES } from 'actions/recipes'
import { Link } from 'react-router'
import { get as _get, isFunction as _isFunction } from 'lodash'
import Recipes from 'components/Recipes'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import Pagination from 'components/Pagination'

class RecipesContainer extends Component {
  static fetchData({ store, params }) {
    let page = _get(params, 'page'),
        type = page ? LOADED_RECIPES_PAGIN : LOADED_RECIPES
    return store.dispatch(loadRecipes(page, type))
  }

  constructor(props) {
    super(props)
    this._handleFilterClicked = this._handleFilterClicked.bind(this)
  }

  componentDidMount() {
    let { loadRecipes, location, params } = this.props,
        { page } = params,
        type = page ? LOADED_RECIPES_PAGIN : LOADED_RECIPES
    if (_isFunction(loadRecipes))
      loadRecipes(page, type)
  }

  componentWillReceiveProps(nextProps) {
    let { loadRecipes, params, isFilter } = this.props,
        thisPage = _get(params, 'page'),
        nextPage = _get(nextProps, 'params.page'),
        nextFilter = _get(nextProps, 'isFilter')


    if (thisPage !== nextPage && _isFunction(loadRecipes))
      loadRecipes(nextPage, LOADED_RECIPES_PAGIN)

    if (isFilter !== nextFilter)
      loadRecipes()
  }

  _handleFilterClicked(e) {
    e.preventDefault()
    let { handleFilterClicked } = this.props
    if (_isFunction(handleFilterClicked))
      handleFilterClicked()

  }

  render() {
    let { params, recipes, isFilter, handleStarRecipe, likedRecipes } = this.props,
        page = _get(params, 'page'),
        isPagin = !!page,
        paginData = isPagin ? _get(recipes, ['pagin', page], []) : _get(recipes, 'data', []),
        totalPage = _get(recipes, 'totalPage'),
        totalItems = _get(recipes, 'totalItems'),
        title = page ? `List Page - Page ${page}` : 'List Page'

    return (
      <div>
        <Helmet
          title={ title }
        />
        <h2>{ title }</h2>

        <Link to="#" onClick={this._handleFilterClicked}>Show only my Favourite recipes</Link>
        
        <Recipes recipes={ paginData } isFilter={ isFilter }
          handleStarRecipe={ handleStarRecipe } likedRecipes={likedRecipes} />

        { isFilter ? false : <Pagination totalPage={ totalPage } totalItems={totalItems} /> }

      </div>
    )
  }
}

function mapStateToProps ({ recipes, isFilter, likedRecipes }) {
  return { recipes, isFilter, likedRecipes }
}

const mapDispatchToProps = {
  triggerPagination,
  loadRecipes,
  handleFilterClicked,
  handleStarRecipe
}

export { RecipesContainer }
export default connect(mapStateToProps, mapDispatchToProps)(RecipesContainer)
