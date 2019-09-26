import styled from "styled-components";

export const MainContentGrid = styled.div`
display:grid;
padding: 1%;
grid-gap:30px;
grid-template-columns:48% 48%
grid-template-rows: 48% 48%
grid-area: "box-one box-two"
        "box-three box-two"`;

export const BoxOne = styled.div`
  grid-area: "box-one";
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
  background-image: url("https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80");
  display: flex;
  background-size: cover;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0px -1px 15px 0px rgba(87, 71, 4, 0.43);
  -webkit-box-shadow: 0px -1px 15px 0px rgba(87, 71, 4, 0.43);
  -moz-box-shadow: 0px -1px 15px 0px rgba(87, 71, 4, 0.43);
`;

export const BoxThree = styled.div`
  grid-area: "box-two";
  /* width: 45vw; */
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
  background: ${props => (props.primary ? "#009FFD" : "#192aa9")};
  color: ${props => (props.primary ? "#192aa9" : "#009FFD")};
  border: 1px solid #192aa9;
  font-size: 15px;
  width: 150px;
  min-height: 35px;
  cursor: pointer;
  margin-top: 20px;
`;

export const InputFields = styled.input``;

export const ClickablePTags = styled.p`
  cursor: pointer;
  min-width: 15vw;
  align-self: flex-start;
  padding-left: 10px;

  &:hover {
    color: #009ffd;
    font-size: bold;
  }
`;

export const List = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  padding: 30px 30px;
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
    width: 60%;
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
