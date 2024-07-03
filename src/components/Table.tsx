import { createContext, useContext, ReactNode } from "react";
import styled from "styled-components";

interface TableContextType {
  $columns: string;
}

const TableContext = createContext<TableContextType | undefined>(undefined);

const StyledTable = styled.div`
  /* border: 1px solid #e0e0e0; */

  font-size: 1.4rem;
  background-color: #393737;
  border-radius: 7px;
  overflow: hidden;
`;

interface CommonRowProps {
  $columns: string;
}

const CommonRow = styled.div<CommonRowProps>`
  display: grid;
  grid-template-columns: ${(props) => props.$columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: #f0f0f0;
  /* border-bottom: 1px solid #d0d0d0; */
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: #606060;
`;

const StyledRow = styled(CommonRow)`
  padding: 0.4rem 1.5rem;
  &:hover {
    background-color: #595656;
    cursor: pointer;
  }
  &:not(:last-child) {
    /* border-bottom: 1px solid #d0d0d0; */
  }
`;

const StyledBody = styled.section``;

const Footer = styled.footer`
  background-color: #f0f0f0; /* var(--color-grey-50); */
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

interface TableProps {
  $columns: string;
  children: ReactNode;
}

function Table({ $columns, children }: TableProps) {
  return (
    <TableContext.Provider value={{ $columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

interface HeaderProps {
  children: ReactNode;
}

function Header({ children }: HeaderProps) {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("Header must be used within a TableContext");
  }
  return (
    <StyledHeader role="row" $columns={context.$columns} as="header">
      {children}
    </StyledHeader>
  );
}

interface RowProps {
  children: ReactNode;
}

function Row({ children }: RowProps) {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("Row must be used within a TableContext");
  }
  return (
    <StyledRow role="row" $columns={context.$columns}>
      {children}
    </StyledRow>
  );
}

interface BodyProps<T> {
  data: T[];
  render: (item: T) => ReactNode;
}

function Body<T>({ data, render }: BodyProps<T>) {
  if (!data.length) return <Empty>No data to show at the moment</Empty>;
  return <StyledBody>{data.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
