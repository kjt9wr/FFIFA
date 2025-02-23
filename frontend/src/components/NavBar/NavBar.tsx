import { useState } from "react";
import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarToggler,
  UncontrolledDropdown,
} from "reactstrap";
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar
        className="navbar navbar-dark bg-dark navbar-expand-lg"
        fixed="top"
      >
        <NavItem>
          <NavLink href="/"> FFIFA </NavLink>
        </NavItem>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Rosters
              </DropdownToggle>
              <DropdownMenu left={"true"}>
                <DropdownItem href="/roster/Kevin"> Kevin </DropdownItem>
                <DropdownItem href="/roster/Luigi"> Luigi </DropdownItem>
                <DropdownItem href="/roster/Casey"> Casey </DropdownItem>
                <DropdownItem href="/roster/Patrick"> Patrick </DropdownItem>
                <DropdownItem href="/roster/Jeff"> Jeff </DropdownItem>
                <DropdownItem href="/roster/Alex"> Alex </DropdownItem>

                <DropdownItem divider />
                <DropdownItem href="/roster/Michael"> Michael </DropdownItem>
                <DropdownItem href="/roster/Nikos"> Nikos </DropdownItem>
                <DropdownItem href="/roster/Brent"> Brent </DropdownItem>
                <DropdownItem href="/roster/Christian">Christian</DropdownItem>
                <DropdownItem href="/roster/Justin"> Justin </DropdownItem>
                <DropdownItem href="/roster/Matt"> Matt </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Trades
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href="/trade"> Trade Tracker </DropdownItem>
                <DropdownItem href="/tradepreview">Preview Trade</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Prices
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href="/franchise"> Franchise Tag </DropdownItem>
                <DropdownItem href="/supermax">Supermax</DropdownItem>
                <DropdownItem href="/arbitration">Arbitration</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <NavLink href="/cap">Cap Tracker</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/fa">Free Agency</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/draft">Draft Day</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/admin">Admin</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <br /> <br /> <br />
    </div>
  );
};

export default NavBar;
