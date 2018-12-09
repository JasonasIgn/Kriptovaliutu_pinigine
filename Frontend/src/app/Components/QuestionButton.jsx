import React from "react";

const QuestionButton = () => (
  <div>
    <div
      className="question"
      onClick={() => {
        document.getElementById("questionModal").style.display = "block";
        console.log("asd");
      }}
    />
    <div id="questionModal" className="modal">
      <div className="modal-content">
        <span
          className="close"
          onClick={() =>
            (document.getElementById("questionModal").style.display = "none")
          }
        >
          &times;
        </span>
        <form>
          <h1 className="title"> Susisiekite</h1>
          <div className="form-group">
            <label className="col-form-label" htmlFor="question">
              Klausimas
            </label>
            <textarea type="question" className="form-control" id="question" />
          </div>
          <button type="submit" className="btn btn-primary">
            Siųsti
          </button>
        </form>
      </div>
    </div>
  </div>
);
export default QuestionButton;

window.onclick = function(event) {
  if (event.target == document.getElementById("questionModal")) {
    document.getElementById("questionModal").style.display = "none";
  }
};
