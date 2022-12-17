import Card from "./Card";
const CardList = ({ popularTV }) =>
  popularTV.map((tv, i) => (
    <>
      <Card movie={tv} i={i} />
    </>
  ));
export default CardList;
