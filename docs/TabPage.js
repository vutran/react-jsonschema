import React, { Component, PropTypes } from 'react';
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Form from 'react-jsonschema'; // eslint-disable-line import/no-unresolved

const log = msg => console.log(msg); // eslint-disable-line no-console

export default class TabPage extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleSubmitButton = this.handleSubmitButton.bind(this);
  }

  /**
   * Retrieve the style
   *
   * @return {object}
   */
  getStyles() {
    let styles = {
      display: 'none',
    };
    if (this.props.visible) {
      styles = {
        display: 'block',
      };
    }
    return styles;
  }

  /**
   * @param {object} e
   */
  handleError(e) {
    log(e);
  }

  /**
   * @param {object} e
   */
  handleSubmit(e) {
    log(e);
  }

  handleSubmitButton() {
    this.handleSubmit(this.f.state.formData);
  }

  render() {
    const { schema, formData } = this.props;
    return (
      <div style={this.getStyles()}>
        <Card>
          <CardTitle title={schema.title} />
          <CardText>
            <Form
              schema={schema}
              formData={formData}
              onError={this.handleError}
              onSubmit={this.handleSubmit}
              ref={(f) => { this.f = f; }}
            />
          </CardText>
          <CardActions>
            <RaisedButton label="Submit" onClick={this.handleSubmitButton} />
          </CardActions>
        </Card>
      </div>
    );
  }
}

TabPage.propTypes = {
  tab: PropTypes.string.isRequired,
  schema: PropTypes.object.isRequired,
  formData: PropTypes.object.isRequired,
  visible: PropTypes.bool,
};

TabPage.defaultProps = {
  visible: false,
};
