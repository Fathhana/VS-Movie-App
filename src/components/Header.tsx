import React, { useState } from "react";
import styled from "styled-components";
import { IoMenu } from "react-icons/io5";
import { AiOutlineSearch } from "react-icons/ai";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";

const HeaderContainer = styled.header`
  background-color: #f2f2f2;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const MenuButton = styled.button`
  display: block;
  background-color: transparent;
  border: none;
  padding: 0;
  margin-right: 10px;
  cursor: pointer;
`;

const SearchButton = styled.button`
  padding: 10px;
  cursor: pointer;
  background: #000;
  color: #fff;
`;

const MobileMenuItem = styled.a`
  display: block;
  padding: 10px;
  text-decoration: none;
  color: #333;
`;

const LogoImage = styled.img`
  height: 40px;
  margin-right: 10px;
`;

const SearchInput = styled.input`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchMenuOpen, setSearchMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const MobileMenuContainer = styled.nav<{ isOpen: boolean }>`
    display: ${({ isOpen }) => (isOpen ? "block" : "none")};
    position: absolute;
    top: 70px;
    left: 0;
    width: 100%;
    background-color: #fff;
    padding: 10px 0;
  `;

  const MobileSearchContainer = styled.nav<{ isOpen: boolean }>`
    display: ${({ isOpen }) => (isOpen ? "block" : "none")};
    position: absolute;
    top: 70px;
    right: 0;
    width: 100%;
    background-color: #fff;
    padding: 10px 0;
    text-align: right;
  `;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
    setSearchMenuOpen(false);
  };

  const toggleSearchMenu = () => {
    setSearchMenuOpen(!isSearchMenuOpen);
    setMobileMenuOpen(false);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  return (
    <HeaderContainer>
      <MenuButton onClick={toggleMobileMenu}>
        <IoMenu size={24} />
      </MenuButton>
      <Link to="/">
        <LogoImage src={logo} alt="Logo" />
      </Link>
      <MenuButton onClick={toggleSearchMenu}>
        <AiOutlineSearch size={24} />
      </MenuButton>
      <MobileMenuContainer isOpen={isMobileMenuOpen}>
        <Link to="/">
          <MobileMenuItem>Home</MobileMenuItem>
        </Link>
      </MobileMenuContainer>
      <MobileSearchContainer isOpen={isSearchMenuOpen}>
        <SearchInput
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <SearchButton onClick={handleSearch}>Search</SearchButton>
      </MobileSearchContainer>
    </HeaderContainer>
  );
};

export default Header;
