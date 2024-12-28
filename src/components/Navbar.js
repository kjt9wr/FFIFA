import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
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
        <Link to="/" className="navbar-brand">
          FFIFA
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Rosters
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href="/roster/Kevin"> Kevin </DropdownItem>
                <DropdownItem href="/roster/Nikos"> Nikos </DropdownItem>
                <DropdownItem href="/roster/Casey"> Casey </DropdownItem>
                <DropdownItem href="/roster/Patrick"> Patrick </DropdownItem>
                <DropdownItem href="/roster/Luigi"> Luigi </DropdownItem>
                <DropdownItem href="/roster/Brent"> Brent </DropdownItem>
                <DropdownItem divider />
                <DropdownItem href="/roster/Justin"> Justin </DropdownItem>
                <DropdownItem href="/roster/Christian">Christian</DropdownItem>
                <DropdownItem href="/roster/Jeff"> Jeff </DropdownItem>
                <DropdownItem href="/roster/Alex"> Alex </DropdownItem>
                <DropdownItem href="/roster/Matt"> Matt </DropdownItem>
                <DropdownItem href="/roster/Michael"> Michael </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <Link to="/trade" className="nav-link">
                Trade Tracker
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/cap" className="nav-link">
                Cap Tracker
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/franchise" className="nav-link">
                Franchise Tag
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/supermax" className="nav-link">
                Super Max
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/fa" className="nav-link">
                Free Agency
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/arbitration" className="nav-link">
                Arbitration
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/draft" className="nav-link">
                Draft
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/admin" className="nav-link">
                Admin
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <br /> <br /> <br />
    </div>
  );
};

export default NavBar;
