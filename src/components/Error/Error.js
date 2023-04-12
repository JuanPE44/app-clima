import "./Error.scss";

export default function Error() {
  return (
    <div className="clima-error">
      <img src={require("../../assets/imgs/404.png")} alt="imagen de error 404"/>
      <h5>Oops! localizacion no encotrada :/</h5>
    </div>
  );
}
