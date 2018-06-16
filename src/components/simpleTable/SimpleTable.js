import * as R from 'ramda';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from 'constants/colors';
import uuid from 'uuid/v4';

const tableBgColor = '#f5f5f5';

const Table = styled.table`
  width: 100%;
  border: 8px solid ${tableBgColor};
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background-color: ${tableBgColor};
`;

const TableHeaderCell = styled.th`
  padding: 8px;
  border-right: 1px solid ${colors.GreyLighter};
  border-bottom: 8px solid ${tableBgColor};
`;

const TableCell = styled.td`
  border-bottom: 2px solid ${tableBgColor};
  padding: 8px;
  text-align: center;
`;

export default function SimpleTable(props) {
  return (
    <Table>
      <TableHeader>
        <tr>
          {props.columns.map(column => (
            <TableHeaderCell key={column.key}>
              {column.title}
            </TableHeaderCell>
          ))}
        </tr>
      </TableHeader>
      <tbody>
        {props.data.map(record => (
          <tr key={record.id+uuid()}>
            {props.columns.map(column => (
              <TableCell key={`${record.id}_${column.key}`}>
                {R.pipe(
                  R.when(
                    () => R.is(Function, column.transform),
                    value => column.transform(value, record),
                  ),
                  R.when(
                    () => R.equals(true, record.bold),
                    value => <b>{value}</b>,
                  ),
                )(record[column.key])}
              </TableCell>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

SimpleTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    transform: PropTypes.func,
  })),
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    bold: PropTypes.bool,
  })),
};

SimpleTable.defaultProps = {
  columns: [],
  data: [],
};
