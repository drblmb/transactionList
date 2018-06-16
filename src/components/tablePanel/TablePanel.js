import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import colors from 'constants/colors';
import { titleFont } from 'constants/variables';

const PanelHeader = styled.div`
  font-family: ${titleFont};
  background-color: ${colors.backgroundLevel1};
  border: solid 1px ${colors.backgroundLevel2};
  padding: 8px;
  font-size: 20px;
  font-weight: normal;
`;

const SubTitle = styled.span`
  font-size: 16px;
  color: ${colors.GreyHover};
  display: inline-block;
  margin-left: 8px;
`;

export default function TablePanel(props) {
  return (
    <div>
      <PanelHeader>
        {props.title}
        <SubTitle>({props.total})</SubTitle>
      </PanelHeader>
      {props.children}
    </div>
  );
}

TablePanel.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  total: PropTypes.number,
};

TablePanel.defaultProps = {
  children: null,
  title: null,
  total: null,
};
