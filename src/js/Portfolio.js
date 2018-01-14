import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Modal } from 'react-bootstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

/**
* Portfolio page rendering data dynamically
*/
class Portfolio extends Component {
  categories = ['All', 'Web', 'Android', 'Design', 'Backend'];
  state = {
    currentCat: 'All',
    items: this.getItemsOfCategory('All'),
    selectedItem: null,
    showModal: false
  }

  handleCategoryOnClick(e, category) {
    e.preventDefault();
    this.setState({
      currentCat: category,
      items: this.getItemsOfCategory(category)
    });
  }

  getItemsOfCategory(category) {
    if (category === 'All') {
      return this.props.portfolioContent.sort((a, b) => a.order - b.order);
    }
    return this.props.portfolioContent.filter(a => a.categories.includes(category)).sort((a, b) => a.order - b.order);
  }

  handleItemOnClick(item) {
    this.setState({
      showModal: true,
      selectedItem: item
    });
  }

  handleModalOnHide() {
    this.setState({
      showModal: false,
      selectedItem: null
    });
  }

  render() {
    return (
      <div className="portfolio">
        <div className="portfolio-title-banner">
          <h1 className="portfolio-title">Portfolio</h1>
        </div>

        <div className="portfolio-content container">
          <Row>
            <Col xs={12} sm={10} smOffset={1}>
              {/* Category Control */}
              <div className="portfolio-cat-control card">
                {
                  this.categories.map((item, index) => {
                    return (
                      <a className={`portfolio-cat-link ${this.state.currentCat === item ? 'portfolio-cat-link-active' : ''}`}
                        key={index}
                        onClick={event => this.handleCategoryOnClick(event, item)} >
                        {item}
                      </a>
                    )
                  })
                }
              </div>

              {/* Items Display */}
              <Row>
                <ReactCSSTransitionGroup
                  transitionName="portfolio-item-animation"
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={300}>
                  {
                    this.state.items.map((item, index) => {
                      return (
                        <Col className="portfolio-item-wrapper" xs={6} sm={4} md={3} key={index}>
                          <div className="portfolio-item card clickable-card"
                            onClick={e => this.handleItemOnClick(item)}
                            style={{
                              backgroundImage: `linear-gradient(-135deg, ${item.style.primaryColor}, ${item.style.secondaryColor})`
                            }}>
                            <img alt="logo" src={item.logo} />
                            <h5>{item.title}</h5>
                          </div>
                        </Col>
                      )
                    })
                  }
                </ReactCSSTransitionGroup>
              </Row>

            </Col>
          </Row>
        </div>

        <Modal show={this.state.showModal}
          onHide={this.handleModalOnHide.bind(this)}
          dialogClassName="portfolio-modal-wrapper">
          {this.state.selectedItem ?
            <div className="portfolio-modal card"
              style={{
                backgroundImage: `linear-gradient(-135deg, ${this.state.selectedItem.style.primaryColor}, ${this.state.selectedItem.style.secondaryColor})`
              }}>
              <Modal.Header closeButton>
                <Modal.Title />
              </Modal.Header>
              <Modal.Body>
                <p>{this.state.selectedItem.desc}</p>
              </Modal.Body>
            </div>
            :
            null
          }
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    portfolioContent: state.staticContent.portfolioContent
  }
}

export default connect(mapStateToProps)(Portfolio);
