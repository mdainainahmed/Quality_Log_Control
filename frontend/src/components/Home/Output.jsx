import "./Output.css";
// eslint-disable-next-line react/prop-types
const Output = ({data}) => {
  return (
    <div className="output-container">
      <h1>Output</h1>
      <div className="output-message">
        <h1>{data ? data : "Ooops!! Server is Down"}</h1>
      </div>
    </div>
  );
};
export default Output;
