import React from "react";
import styled from "styled-components";
import { TickerData } from "../types";
import Table from "./Table"; // Import the custom Table component
import Spinner from "./Spinner"; // Import Spinner component

interface TableViewProps {
  data: TickerData[];
}

const SymbolContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: bold;

  & span {
    color: #9c9fa1;
    font-size: 0.9rem;
    font-weight: 300;
  }
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  & span {
    margin-top: 0.4rem;
    font-size: 0.9rem;
  }
`;

const PriceChangePercentSpan = styled.span<{ $negative?: boolean }>`
  color: ${({ $negative }) => ($negative ? "red" : "green")};
`;

const TableView: React.FC<TableViewProps> = ({ data }) => {
  return (
    <Table $columns="1fr 1fr">
      {/* <Table.Header> */}
      {/* Optionally, any header content can be placed here */}
      {/* </Table.Header> */}
      <Table.Body
        data={data}
        render={(item) => (
          <Table.Row key={item.s}>
            <SymbolContainer>
              {item.s} <span>Perpetual</span>
            </SymbolContainer>
            <PriceContainer>
              {item.c}
              <PriceChangePercentSpan $negative={parseFloat(item.P) < 0}>
                {parseFloat(item.P) > 0
                  ? `+${parseFloat(item.P).toFixed(2)}%`
                  : `${parseFloat(item.P).toFixed(2)}%`}
              </PriceChangePercentSpan>
            </PriceContainer>
          </Table.Row>
        )}
      />
      {data.length === 0 && <Spinner />}
      <Table.Footer>
        {/* Optionally, any footer content can be placed here */}
      </Table.Footer>
    </Table>
  );
};

export default TableView;
