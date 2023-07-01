import React, { useState } from "react";
import styled from "styled-components";
import { IoMenu } from "react-icons/io5";
import { AiOutlineSearch } from "react-icons/ai";
import { MdModeNight, MdSunny } from "react-icons/md";
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

const LogoImage = styled.img`
  height: 40px;
  margin-right: 10px;
`;

const SearchInput = styled.input`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const MobileMenuContainer = styled.nav`
  position: absolute;
  top: 70px;
  left: 0;
  width: 100%;
  background-color: #fff;
  padding: 10px 0;
`;

const MobileSearchContainer = styled.nav`
  position: absolute;
  top: 70px;
  right: 0;
  width: 100%;
  background-color: #fff;
  padding: 10px 0;
  text-align: right;
`;

const ThemeSwitchButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
`;

const ThemeSwitchBtn = styled.div`
  color: #000;

  svg {
    transform: translateY(2px);
  }
`;

const ThemeTitle = styled.span`
  color: #000;
  margin-left: 5px;
  font-weight: bold;
`;

interface HeaderProps {
  onSearch: (query: string, page: number) => void;
  toggleThemeMode: () => void;
  themeMode: string;
}

const Header: React.FC<HeaderProps> = ({
  onSearch,
  toggleThemeMode,
  themeMode,
}) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchMenuOpen, setSearchMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
    setSearchMenuOpen(false);
  };

  const toggleSearchMenu = () => {
    setSearchMenuOpen(!isSearchMenuOpen);
    setMobileMenuOpen(false);
  };

  const handleSearch = () => {
    onSearch(searchQuery, 1);
    setSearchMenuOpen(false);
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
      <MobileMenuContainer
        style={{ display: isMobileMenuOpen ? "block" : "none" }}
      >
        <ThemeTitle>Choose Theme :</ThemeTitle>
        <ThemeSwitchButton onClick={toggleThemeMode}>
          {themeMode === "light" ? (
            <ThemeSwitchBtn>
              Dark Mode <MdModeNight />
            </ThemeSwitchBtn>
          ) : (
            <ThemeSwitchBtn>
              Light Mode <MdSunny />
            </ThemeSwitchBtn>
          )}
        </ThemeSwitchButton>
      </MobileMenuContainer>
      <MobileSearchContainer
        style={{ display: isSearchMenuOpen ? "block" : "none" }}
      >
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
