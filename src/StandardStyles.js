import styled from "styled-components";

export const MainContentGrid = styled.div`
  display: grid;
  padding: 1%;
  grid-gap: 30px;
  grid-template-columns: 48% 48%;
  grid-template-rows: 20% 68% 10%;
  /* grid-template-areas: "box-two" "box-one box-three"; */
`;

export const WelcomeGrid = styled.div`
  display: grid;

  grid-template-columns: 50vw 50vw;
  grid-template-rows: 100vh;
`;
export const Left = styled.div`
  grid-column: 1;
  background: #f2f8f5;
  z-index: 3;
  background-image: url("https://images.unsplash.com/photo-1526046881250-dbec3e06414c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
  color: #567f5d;
  padding-top: 40px;
  padding-left: 40px;
`;
export const Right = styled.div`
  grid-column:2
  background: blue;
  z-index:3;
  display:flex;
  flex-direction: column;
  justify-content:center;
  color:whitesmoke;
  padding-left:20px;
`;

export const BoxOne = styled.div`
  /* grid-area: "box-one"; */
  grid-row: 2;
  grid-column: 1;
  /* width: 47vw; */
  background-image: url("https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0px -1px 15px 0px rgba(87, 71, 4, 0.43);
  -webkit-box-shadow: 0px -1px 15px 0px rgba(87, 71, 4, 0.43);
  -moz-box-shadow: 0px -1px 15px 0px rgba(87, 71, 4, 0.43);
`;

export const BoxTwo = styled.div`
  grid-area: "box-two";
  grid-row: 1;
  grid-column: 1 / span 2;
  display: flex;
  background-size: cover;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  text-align: center;
`;

export const BoxThree = styled.div`
  grid-area: "box-three";
  grid-row: 2;
  grid-column: 2;
  background-image: url("https://images.unsplash.com/photo-1508239572561-54fae543f43f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1645&q=80");
  display: flex;
  justify-content: center;
  background-size: cover;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0px -1px 15px 0px rgba(87, 71, 4, 0.43);
  -webkit-box-shadow: 0px -1px 15px 0px rgba(87, 71, 4, 0.43);
  -moz-box-shadow: 0px -1px 15px 0px rgba(87, 71, 4, 0.43);
`;

export const Button = styled.button`
  border-radius: 10px;
  background: ${props => (props.primary ? "papayawhip" : "#192aa9")};
  color: ${props => (props.primary ? "#192aa9" : "papayawhip")};
  border: 1px solid #192aa9;
  font-size: 15px;
  width: 150px;
  min-height: 35px;
  cursor: pointer;
  margin-top: 20px;
  font-weight: bold;
`;

export const ClickablePTags = styled.p`
  cursor: pointer;
  min-width: 15vw;
  align-self: flex-start;
  padding-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;

  &:hover {
    color: #009ffd;
    font-size: bold;
  }
`;

export const List = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
  position: relative;
  border: 1px solid #b5b5b5;
  background: white;
  background: -webkit-linear-gradient(top, #dfe8ec 0%, white 8%) 0 57px;
  background: -moz-linear-gradient(top, #dfe8ec 0%, white 8%) 0 57px;
  background: linear-gradient(top, #dfe8ec 0%, white 8%) 0 57px;
  -webkit-background-size: 100% 30px;
  -moz-background-size: 100% 30px;
  -ms-background-size: 100% 30px;
  background-size: 100% 30px;

  &::before {
    content: "";
    z-index: -1;
    margin: 0 1px;
    width: 98%;
    height: 10px;
    position: absolute;
    bottom: -3px;
    left: 0;
    background: white;
    border: 1px solid #b5b5b5;
  }
  &::after {
    content: "";
    position: absolute;
    width: 0px;
    top: 0;
    left: 39px;
    bottom: 0;
    border-left: 1px solid #f8d3d3;
  }
`;
export const ListItem = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-between;
  padding-right: 10px;
  align-items: flex-start;
`;

export const IconItemTinder = styled.img`
  display: flex;
  height: 30px;
  width: 8vw;
  object-fit: contain;
  border-radius: 5px;
  border: solid 2px #ffa400;
  background: #ffa400;
  cursor: pointer;
  margin-right: 5px;
  padding: 10px;
  box-shadow: 0px -1px 15px 0px rgba(87, 71, 4, 0.43);
  -webkit-box-shadow: 0px -1px 15px 0px rgba(87, 71, 4, 0.43);
  -moz-box-shadow: 0px -1px 15px 0px rgba(87, 71, 4, 0.43);
`;

export const NavbarItem = styled.img`
  object-fit: contain;
  grid-area: "nav";
  width: 40px;
  height: 50px;
  padding-left: 10px;
  padding-right: 10px;
  cursor: pointer;
`;

export const PLessMargin = styled.p`
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const InputField = styled.input`
  font-size: 1.5rem;
  width: 70%;
  color: whitesmoke;
  background: transparent;
  border: none;
  border-bottom: 2px whitesmoke solid;
  margin-bottom: 2vh;

  &:focus {
    outline: none;
    border-bottom: 3px solid whitesmoke;
    -webkit-box-shadow: 0px 6px 5px -2px rgba(141, 147, 173, 0.75);
    -moz-box-shadow: 0px 6px 5px -2px rgba(141, 147, 173, 0.75);
    box-shadow: 0px 6px 5px -2px rgba(141, 147, 173, 0.75);
  }
`;
