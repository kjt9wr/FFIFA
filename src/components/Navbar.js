import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
        <Navbar className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">FFIFA</Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret> Rosters </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem href="/roster/Kevin"> Kevin </DropdownItem>
                    <DropdownItem href="/roster/Christian"> Christian </DropdownItem>
                    <DropdownItem href="/roster/Justin"> Justin </DropdownItem>
                    <DropdownItem href="/roster/Alex"> Alex </DropdownItem>
                    <DropdownItem href="/roster/Nikos"> Nikos </DropdownItem>
                    <DropdownItem href="/roster/Chinmay"> Chinmay </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem href="/roster/Matt"> Matt </DropdownItem>
                    <DropdownItem href="/roster/Luigi"> Luigi </DropdownItem>
                    <DropdownItem href="/roster/Brent"> Brent </DropdownItem>
                    <DropdownItem href="/roster/Michael"> Michael </DropdownItem>
                    <DropdownItem href="/roster/Patrick"> Patrick </DropdownItem>
                    <DropdownItem href="/roster/Jeff"> Jeff </DropdownItem>
                </DropdownMenu>
                </UncontrolledDropdown>
            <NavItem>
                    <Link to="/trade" className="nav-link">Trade Tracker</Link>
            </NavItem>
            <NavItem>
                    <Link to="/cap" className="nav-link">Cap Tracker</Link>
            </NavItem>
            <NavItem>
                    <Link to="/franchise" className="nav-link">Franchise Tag</Link>
            </NavItem>
            <NavItem>
                    <Link to="/supermax" className="nav-link">Super Max</Link>
            </NavItem>
            <NavItem>
                    <Link to="/fa" className="nav-link">Free Agency</Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <br />
    </div>
  );
}

export default NavBar;