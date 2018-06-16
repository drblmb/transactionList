import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  SimpleTable,
} from 'components';
import { formatDateTime } from 'lib/dateUtils';

const InputContainer = styled.div`
  text-align: center;
  padding: 8px;
`;

const Title = styled.div`
  text-align: center;
  padding: 12px;
  font-weight: 600;
`;

const columns = [
  {
    key: 'amount',
    title: 'Amount',
  },
  {
    key: 'date',
    title: 'Date',
    transform: formatDateTime,
  },
  {
    key: 'card_last_four',
    title: 'Last Four CC',
  },
];

export default class TransactionsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: props.filter,
      transactions: props.transactions,
    };

    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      filter: nextProps.filter,
      transactions: nextProps.transactions,
    });
  }

  onChange(value) {
    console.log('Changing');
    this.props.setTransactionsFilter(value);
  }


  render() {
    return (
      <div>
        <div style={{ display: 'none' }}> {this.props.filter}</div>
        <Title>PayClip Transaction List</Title>
        <InputContainer>
          <span>Filter this list by entering text here:<input
            type="text"
            style={{ marginLeft: 25 }}
            placeholder="Enter filter text here"
            value={this.state.filter}
            onChange={e => this.onChange(e.currentTarget.value)}
          /></span>
        </InputContainer>
        <SimpleTable
          data={this.state.transactions}
          columns={columns}
        />
      </div>
    );
  }
}

TransactionsList.propTypes = {
  setTransactionsFilter: PropTypes.func.isRequired,
  filter: PropTypes.string,
  transactions: PropTypes.arrayOf(PropTypes.shape({
    amount: PropTypes.string,
    date: PropTypes.string,
    card_last_four: PropTypes.string,
  })),
};

TransactionsList.defaultProps = {
  filter: null,
  transactions: [],
};
